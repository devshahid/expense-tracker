import moment from 'moment';
export function getTodayData(transactionList) {
  // for current date
  const date = new Date();
  const currentDate = moment(date).format('DD-MM-YYYY');
  const timeSlots = [
    { start: '00', end: '04' },
    { start: '04', end: '08' },
    { start: '08', end: '12' },
    { start: '12', end: '16' },
    { start: '16', end: '20' },
    { start: '20', end: '24' },
  ];
  const amountArr = [0, 0, 0, 0, 0, 0];
  if (Array.isArray(transactionList) && transactionList.length > 0) {
    transactionList.forEach(({ amount, date, isExpense }) => {
      const [transactionDate, transactionTime] = date.split(' ');
      const [transactionHour] = transactionTime.split(':');
      if (currentDate === transactionDate && isExpense) {
        timeSlots.map((timeslot, index) => {
          if (
            (timeslot.start > timeslot.end &&
              (transactionHour >= timeslot.start || transactionHour < timeslot.end)) ||
            (timeslot.start < timeslot.end &&
              transactionHour >= timeslot.start &&
              transactionHour < timeslot.end)
          ) {
            amountArr[index] = amountArr[index] + Number(amount);
          }
        });
      }
    });
  }
  return amountArr;
}

export function getWeeklyData(transactionList) {
  // for current week
  const amountArr = [0, 0, 0, 0, 0, 0, 0];
  if (Array.isArray(transactionList) && transactionList.length > 0) {
    transactionList.map(({ date, amount, isExpense }) => {
      const [transactionDate] = date.split(' ');
      const currentDate = new Date();
      const startWeekDate = moment(currentDate).weekday(0).format('DD-MM-YYYY');
      const endWeekDate = moment(currentDate).weekday(6).format('DD-MM-YYYY');
      const startWeek = moment(startWeekDate, 'DD-MM-YYYY');
      const endWeek = moment(endWeekDate, 'DD-MM-YYYY');
      const newdate = moment(transactionDate, 'DD-MM-YYYY');

      const result = newdate.isBetween(startWeek, endWeek, null, []);
      if (result && isExpense) {
        const week = newdate.weekday(); //3
        amountArr[week] = amountArr[week] + Number(amount);
      }
    });
  }
  return amountArr;
}

export function getMonthlyData(transactionList) {
  // for current week
  const amountArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  if (Array.isArray(transactionList) && transactionList.length > 0) {
    transactionList.map(({ date, amount, isExpense }) => {
      if (isExpense) {
        const [transactionDate] = date.split(' ');
        const transactionMonth = moment(transactionDate, 'DD-MM-YYYY').month();
        amountArr[transactionMonth] = amountArr[transactionMonth] + Number(amount);
      }
    });
  }
  return amountArr;
}
