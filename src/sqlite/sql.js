import db from './db.config';
const table = 'transactions';
class SQL {
  checkAndCreateTransTable() {
    if (table) {
      db.transaction(txn => {
        txn.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name=?",
          [table],
          (tx, res) => {
            console.log('item:', res.rows.length);
            if (res.rows.length == 0) {
              txn.executeSql(`DROP TABLE IF EXISTS ${table}`, []);
              txn.executeSql(
                `CREATE TABLE IF NOT EXISTS ${table} (id INTEGER PRIMARY KEY AUTOINCREMENT, userId VARCHAR(50), name VARCHAR(50), amount VARCHAR(50), paymentMode VARCHAR(50), category VARCHAR(50), date VARCHAR(100), isExpense BOOLEAN, isSynced BOOLEAN)`,
                [],
              );
            } else {
              // txn.executeSql(`DROP TABLE IF EXISTS ${table}`, []);
            }
          },
        );
      });
    }
  }
  async insertData(transactionData) {
    const { name, amount, paymentMode, category, date, isExpense, userId } = transactionData;
    return new Promise((resolve, reject) => {
      db.transaction(txn => {
        txn.executeSql(
          `INSERT INTO ${table}(userId, name, amount, paymentMode, category, date, isExpense, isSynced) VALUES(?,?,?,?,?,?,?,?)`,
          [userId, name, String(amount), paymentMode, category, date, isExpense, false],
          (tx, res) => {
            res.rowsAffected ? resolve(res.rowsAffected) : 'no rows affected';
          },
          (tx, error) => {
            console.log('error => ', error);
            reject(error);
          },
        );
      });
    });
  }
  listAllTransactions(userId) {
    return new Promise((resolve, reject) => {
      db.transaction(txn => {
        txn.executeSql(
          `SELECT * FROM ${table} WHERE userId = ? ORDER BY id DESC`,
          [userId],
          (tx, res) => {
            const tempArr = [];
            for (let i = 0; i < res.rows.length; ++i) {
              tempArr.push(res.rows.item(i));
            }
            if (tempArr.length > 0) {
              resolve(tempArr);
            } else {
              resolve({ message: 'No data found' });
            }
          },
          (tx, error) => {
            reject(error);
          },
        );
      });
    });
  }
}

export default SQLite = new SQL();
