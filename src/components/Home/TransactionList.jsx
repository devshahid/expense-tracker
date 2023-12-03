import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import { getTransactionItem } from '../../constants/data';
import { Colours } from '../../constants/constant';

const TransactionList = (props) => {
  const { name, category, amount, date, isExpense } = props;
  const [transactionDate, transactionMonth] = date.split(' ')[0].split('-');
  const { icon, color, backgroundColor } = getTransactionItem(category);
  const details =
    isExpense === true || isExpense === 1
      ? { sign: '-', color: Colours.RED_THEME }
      : { sign: '+', color: Colours.GREEN_THEME };
  return (
    <View style={styles.transactionListContainer}>
      <View style={styles.iconAndTransContainer}>
        <View style={[styles.transactionIcon, { backgroundColor: backgroundColor }]}>
          <Icon5 name={icon} size={40} style={[{ color: color }, { padding: 10 }]} />
        </View>
        <View style={{ marginHorizontal: 5, padding: 2 }}>
          <Text numberOfLines={1} style={styles.transactionTitle}>
            {name}
          </Text>
          <Text style={styles.transactionDesc}>{category}</Text>
        </View>
      </View>
      <View style={styles.amountTimeContainer}>
        <View>
          <Text
            style={[
              styles.transactionAmount,
              { color: details.color },
            ]}>{`${details.sign} ${amount}`}</Text>
        </View>
        <View>
          <Text style={styles.transactionTime}>{`${transactionDate}-${transactionMonth}`}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  transactionListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: 10,
    borderRadius: 16,
    marginVertical: 8,
  },
  iconAndTransContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountTimeContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  transactionIcon: {
    marginHorizontal: 5,
    borderRadius: 14,
    height: 60,
    width: 60,
    alignItems: 'center',
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 2,
    color: Colours.BLACK,
    marginRight: 20,
  },
  transactionDesc: {
    fontSize: 14,
    fontWeight: '600',
    padding: 2,
    color: Colours.GREY_WHITE,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionTime: {
    fontSize: 14,
    fontWeight: '600',
    color: Colours.GREY_WHITE,
  },
});
export default TransactionList;
