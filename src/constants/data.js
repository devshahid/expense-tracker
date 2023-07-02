export const paymentOptions = [
  { value: 'Google Pay' },
  { value: 'Phone Pay' },
  { value: 'Paytm' },
  { value: 'Amazon Pay' },
  { value: 'Cash' },
  { value: 'Other' },
];
export const categoryOptions = [
  { value: 'Food' },
  { value: 'Travel' },
  { value: 'Fuel' },
  { value: 'Medical' },
  { value: 'Groceries' },
  { value: 'Entertainment' },
  { value: 'Shopping' },
  { value: 'Bills' },
  { value: 'Service' },
  { value: 'Education' },
  { value: 'EMI' },
  { value: 'Rent' },
  { value: 'Recharge' },
  { value: 'Salary' },
  { value: 'Other' },
];
export const transactionItems = {
  Shopping: {
    icon: 'shopping-bag',
    color: '#C0392B',
    backgroundColor: '#E6B0AA',
  },
  Food: {
    icon: 'utensils',
    color: '#7FB3D5',
    backgroundColor: '#1F305E',
  },
  Travel: {
    icon: 'plane',
    color: '#C39BD3',
    backgroundColor: '#76448A',
  },
  Fuel: {
    icon: 'gas-pump',
    color: '#7FB3D5',
    backgroundColor: '#2471A3',
  },
  Medical: {
    icon: 'briefcase-medical',
    color: '#CACFD2',
    backgroundColor: '#797D7F',
  },
  Groceries: {
    icon: 'shopping-cart',
    color: '#F4D03F',
    backgroundColor: '#F1C40F',
  },
  Entertainment: {
    icon: 'film',
    color: '#F8C471',
    backgroundColor: '#F39C12',
  },
  Bills: {
    icon: 'file-invoice',
    color: '#AEB6BF',
    backgroundColor: '#34495E',
  },
  Service: {
    icon: 'tools',
    color: '#ABB2B9',
    backgroundColor: '#2C3E50',
  },
  Education: {
    icon: 'graduation-cap',
    color: '#B03A2E',
    backgroundColor: '#F1948A',
  },
  EMI: {
    icon: 'hand-holding',
    color: '#7D6608',
    backgroundColor: '#F8C471',
  },
  Rent: {
    icon: 'utensils',
    color: '#7B7D7D',
    backgroundColor: '#F0F3F4',
  },
  Recharge: {
    icon: 'mobile-alt',
    color: '#626567',
    backgroundColor: '#CACFD2',
  },
  Vegetables: {
    icon: 'carrot',
    color: '#28B463',
    backgroundColor: '#ABEBC6',
  },
  Fruits: {
    icon: 'apple-alt',
    color: '#1B4F72',
    backgroundColor: '#7FB3D5',
  },
  Salary: {
    icon: 'money-bill-wave',
    color: '#0E6251',
    backgroundColor: '#A2D9CE',
  },
  Other: {
    icon: 'ellipsis-h',
    color: '#8B4513',
    backgroundColor: '#F5DEB3',
  },
};
export const getTransactionItem = category => {
  return { ...transactionItems[category] };
};
