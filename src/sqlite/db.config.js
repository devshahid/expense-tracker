import { openDatabase } from 'react-native-sqlite-storage';
const db = openDatabase({ name: 'transactions.db' });
export default db;
