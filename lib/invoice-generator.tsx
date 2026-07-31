import React from 'react';
import { Document, Page, Text, View, StyleSheet, renderToBuffer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica' },
  header: { fontSize: 24, marginBottom: 20, fontWeight: 'bold' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  label: { fontSize: 12, color: '#666' },
  value: { fontSize: 12, fontWeight: 'bold' },
  divider: { borderBottomWidth: 1, borderBottomColor: '#EEE', marginVertical: 20 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  totalLabel: { fontSize: 14, fontWeight: 'bold' },
  totalValue: { fontSize: 18, fontWeight: 'bold' },
});

const Invoice = ({ data }: { data: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>TAX INVOICE</Text>
      
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Invoice To:</Text>
          <Text style={styles.value}>{data.customerName || 'Customer'}</Text>
          <Text style={styles.value}>{data.customerEmail}</Text>
        </View>
        <View>
          <Text style={styles.label}>Invoice No:</Text>
          <Text style={styles.value}>{data.reference}</Text>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{new Date().toLocaleDateString()}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.label}>Amount</Text>
      </View>
      
      <View style={styles.row}>
        <Text style={styles.value}>{data.planName || 'Cvyon Subscription'}</Text>
        <Text style={styles.value}>{data.currency} {(data.amount / 100).toFixed(2)}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total Paid:</Text>
        <Text style={styles.totalValue}>{data.currency} {(data.amount / 100).toFixed(2)}</Text>
      </View>
    </Page>
  </Document>
);

export async function generateInvoicePdfBuffer(data: any): Promise<Buffer> {
  const pdfBuffer = await renderToBuffer(<Invoice data={data} />);
  return pdfBuffer;
}
