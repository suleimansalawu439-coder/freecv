import fs from 'fs';
import path from 'path';

const pagePath = path.join(__dirname, 'app/support/page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

// 1. Add supabase import if not there
if (!content.includes('import { supabase }')) {
  content = content.replace("import toast from 'react-hot-toast';", "import toast from 'react-hot-toast';\nimport { supabase } from '@/lib/supabase';");
}

// 2. Add state for tickets
const stateAdd = `
  const [tickets, setTickets] = useState<any[]>([]);
  
  // Load saved ticket IDs from local storage (poor man's auth for public users)
  useEffect(() => {
    const savedIds = JSON.parse(localStorage.getItem('my_support_tickets') || '[]');
    if (savedIds.length > 0) {
      fetchTickets(savedIds);
    }
    
    // Subscribe to realtime updates for these tickets
    const channel = supabase
      .channel('public:support_tickets')
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'support_tickets' 
      }, (payload) => {
        // If it's one of our tickets, update the state
        if (savedIds.includes(payload.new.id)) {
          setTickets(prev => prev.map(t => t.id === payload.new.id ? payload.new : t));
          if (payload.new.admin_reply && payload.old.admin_reply !== payload.new.admin_reply) {
             toast.success('An admin replied to your ticket!');
          }
        }
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchTickets = async (ids: string[]) => {
    const { data, error } = await supabase
      .from('support_tickets')
      .select('*')
      .in('id', ids)
      .order('created_at', { ascending: false });
      
    if (data) setTickets(data);
  };
`;

content = content.replace("const [isSubmitting, setIsSubmitting] = useState(false);", "const [isSubmitting, setIsSubmitting] = useState(false);\n" + stateAdd);

// 3. Update handleSubmit to save ticket ID
const submitReplace = `
      const res = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) throw new Error('Failed to submit ticket');
      
      const responseData = await res.json();
      
      // Save ID
      if (responseData.ticket?.id) {
        const savedIds = JSON.parse(localStorage.getItem('my_support_tickets') || '[]');
        savedIds.push(responseData.ticket.id);
        localStorage.setItem('my_support_tickets', JSON.stringify(savedIds));
        fetchTickets(savedIds);
      }
`;

content = content.replace(/const res = await fetch\('\/api\/support'[\s\S]*?if \(!res\.ok\) throw new Error\('Failed to submit ticket'\);/, submitReplace);

// 4. Add UI for tickets
const uiTickets = `
            {/* My Tickets */}
            {tickets.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-bold text-lg mb-4 text-gray-900">My Recent Tickets</h3>
                <div className="space-y-4">
                  {tickets.map(ticket => (
                    <div key={ticket.id} className="bg-gray-50 border border-gray-200 p-4 rounded-xl">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-sm">{ticket.subject}</h4>
                        <span className={\`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md \${ticket.status === 'open' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}\`}>
                          {ticket.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-3">{ticket.message}</p>
                      {ticket.admin_reply && (
                        <div className="bg-white border-l-4 border-blue-500 p-3 text-sm text-gray-700 rounded-r-lg shadow-sm">
                          <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest block mb-1">Admin Reply</span>
                          {ticket.admin_reply}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
`;

content = content.replace("</form>", "</form>\n" + uiTickets);

fs.writeFileSync(pagePath, content, 'utf8');
console.log('Updated app/support/page.tsx with Realtime successfully.');
