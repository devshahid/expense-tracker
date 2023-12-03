export const convertToInsertQuery = (tableName, data) => {
  if (Array.isArray(data) && data.length > 0) {
    const insertQueries = data.map((item) => {
      const objWithoutId = { ...item };
      delete objWithoutId.id;
      const columns = Object.keys(objWithoutId).join(', ');
      const values = Object.values(objWithoutId)
        .map((value) => {
          // Check if the value is a string and needs to be enclosed in single quotes
          return typeof value === 'string' ? `'${value}'` : value;
        })
        .join(', ');

      return `INSERT INTO ${tableName} (${columns}) VALUES (${values});`;
    });
    return insertQueries;
  } else return [];
};

export const convertToUpdateQuery = (tableName, data, userId) => {
  if (Array.isArray(data) && data.length > 0) {
    const updateQuery = data.map((item) => {
      const fieldUpdates = Object.keys(item)
        .filter((key) => key !== 'userId' && key !== 'id' && key !== 'userName')
        .map((key) => {
          if (key === 'cashAmount' || key === 'bankAmount') {
            return `${key} = ${item[key]}`;
          }
          return `${key} = '${item[key]}'`;
        });
      return fieldUpdates.join(', ');
    });

    return `UPDATE ${tableName} SET ${updateQuery.join(', ')} WHERE userId = '${userId}'`;
  }
};
