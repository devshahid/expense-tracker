import { openDatabase } from 'react-native-sqlite-storage';
const db = openDatabase(
  { name: 'transactions.db' },
  () => {},
  (error) => {
    console.log(error);
  },
);
export default db;
