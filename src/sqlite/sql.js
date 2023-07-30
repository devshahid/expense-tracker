import db from './db.config';
const table = 'transactions';
class SQL {
  checkAndCreateTransTable() {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name=?",
        [table],
        (tx, res) => {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql(`DROP TABLE IF EXISTS ${table}`, []);
            txn.executeSql(
              `CREATE TABLE IF NOT EXISTS ${table} (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50), amount VARCHAR(50), paymentMode VARCHAR(50), category VARCHAR(50), date DATE, isExpense BOOLEAN, isSynced BOOLEAN)`,
              [],
            );
          } else {
            // txn.executeSql(`DROP TABLE IF EXISTS ${table}`, []);
          }
        },
      );
    });
  }
  async insertData(transactionData) {
    console.log(transactionData);
    const { name, amount, paymentMode, category, date, isExpense } = transactionData;
    return new Promise((resolve, reject) => {
      db.transaction(txn => {
        txn.executeSql(
          `INSERT INTO ${table}(name, amount, paymentMode, category, date, isExpense, isSynced) VALUES(?,?,?,?,?,?,?)`,
          [name, amount, paymentMode, category, String(date), isExpense, false],
          (tx, res) => {
            resolve(res.rowsAffected);
          },
          (tx, error) => {
            reject(error);
          },
        );
      });
    });
  }
  listAllTransactions() {
    return new Promise((resolve, reject) => {
      db.transaction(txn => {
        txn.executeSql(
          `SELECT * FROM ${table} ORDER BY id DESC`,
          [],
          (tx, res) => {
            const tempArr = [];
            for (let i = 0; i < res.rows.length; ++i) {
              tempArr.push(res.rows.item(i));
            }
            resolve(tempArr);
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
