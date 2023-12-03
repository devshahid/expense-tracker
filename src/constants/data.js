export const paymentOptions = [
  { value: 'Google Pay', img: require('../assets/gpay.png') },
  { value: 'Phone Pay', img: require('../assets/phonepay.png') },
  { value: 'Paytm', img: require('../assets/paytm.png') },
  { value: 'Amazon Pay', img: require('../assets/amazonpay.png') },
  { value: 'Cash', img: require('../assets/cash.png') },
  { value: 'Net Banking', img: require('../assets/netbanking.png') },
];
export const categoryOptions = [
  { value: 'Food', img: require('../assets/food.png') },
  { value: 'Travel', img: require('../assets/travel.png') },
  { value: 'Fuel', img: require('../assets/fuel.png') },
  { value: 'Medical', img: require('../assets/medical.png') },
  { value: 'Groceries', img: require('../assets/grocery-cart.png') },
  { value: 'Entertainment', img: require('../assets/entertainment.png') },
  { value: 'Shopping', img: require('../assets/shopping.png') },
  { value: 'Bills', img: require('../assets/bill.png') },
  { value: 'Service', img: require('../assets/services.png') },
  { value: 'Education', img: require('../assets/education.png') },
  { value: 'EMI', img: require('../assets/emi.png') },
  { value: 'Rent', img: require('../assets/rent.png') },
  { value: 'Recharge', img: require('../assets/recharge.png') },
  { value: 'Salary', img: require('../assets/salary.png') },
  { value: 'Other', img: require('../assets/other.png') },
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
export const getTransactionItem = (category) => {
  return { ...transactionItems[category] };
};

export const checkPaymentMode = (payMode) => {
  return paymentOptions.find((item) => item.value === payMode);
};
