import fs from 'fs';
import path from 'path';

const pagePath = path.join(__dirname, 'app/api/paystack/webhook/route.ts');
let content = fs.readFileSync(pagePath, 'utf8');

const chargeSuccessBlock = `
      case 'charge.success': {
        const { metadata, customer, plan, reference, amount, currency } = event.data;
        if (metadata && metadata.recruiter_id) {
          const recruiterId = metadata.recruiter_id;
          
          // Idempotency Check
          const { data: existingEvent } = await supabaseAdmin
            .from('webhook_events')
            .select('id')
            .eq('event_id', reference)
            .single();

          if (existingEvent) {
            console.log('Webhook already processed for reference:', reference);
            return NextResponse.json({ received: true }, { status: 200 });
          }

          // Log the event to prevent duplicate processing
          await supabaseAdmin
            .from('webhook_events')
            .insert({ event_id: reference, event_type: 'charge.success' });
          
          // Upsert the customer code
          await supabaseAdmin
            .from('recruiters')
            .update({ paystack_customer_code: customer.customer_code })
            .eq('id', recruiterId);

          // Find the active subscription
          const { data: sub } = await supabaseAdmin
            .from('subscriptions')
            .select('*')
            .eq('recruiter_id', recruiterId)
            .single();

          if (sub) {
            await supabaseAdmin
              .from('subscriptions')
              .update({ status: 'active', current_period_end: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString() })
              .eq('recruiter_id', recruiterId);
          } else {
            await supabaseAdmin
              .from('subscriptions')
              .insert({
                recruiter_id: recruiterId,
                paystack_subscription_code: reference,
                status: 'active',
                current_period_end: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString()
              });
          }

          // Generate Invoice PDF
          const invoiceData = {
            customerName: customer.first_name ? \`\${customer.first_name} \${customer.last_name || ''}\` : 'Recruiter',
            customerEmail: customer.email,
            reference: reference,
            planName: plan?.name || 'Cvyon Pro Subscription',
            amount: amount,
            currency: currency
          };
          
          const pdfBuffer = await generateInvoicePdfBuffer(invoiceData);

          // Dispatch Invoice via Brevo
          if (process.env.BREVO_API_KEY) {
            try {
              await fetch('https://api.brevo.com/v3/smtp/email', {
                method: 'POST',
                headers: {
                  'api-key': process.env.BREVO_API_KEY,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  sender: { name: 'Cvyon Billing', email: 'billing@cvyon.com' },
                  to: [{ email: customer.email }],
                  subject: \`Invoice for \${invoiceData.planName} (\${reference})\`,
                  htmlContent: \`<p>Hi there,</p><p>Thank you for your subscription. Please find your invoice attached.</p><p>The Cvyon Team</p>\`,
                  attachment: [
                    {
                      name: \`Invoice-\${reference}.pdf\`,
                      content: pdfBuffer.toString('base64')
                    }
                  ]
                })
              });
              console.log('Invoice emailed to', customer.email);
            } catch (err) {
              console.error('Failed to send invoice email:', err);
            }
          }
        }
        break;
      }
`;

content = content.replace(/case 'charge\.success': \{[\s\S]*?break;\s*\}/, chargeSuccessBlock.trim());
fs.writeFileSync(pagePath, content, 'utf8');
console.log('Updated app/api/paystack/webhook/route.ts successfully.');
