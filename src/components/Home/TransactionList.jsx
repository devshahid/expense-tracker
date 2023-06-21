import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

const TransactionList = props => {
  return (
    <View style={styles.transactionListContainer}>
      <View style={styles.iconAndTransContainer}>
        <View style={[styles.transactionIcon, props.backgroundColor]}>
          <Icon5 name={props.icon} size={40} style={[props.color, { padding: 12 }]} />
        </View>
        <View style={{ marginHorizontal: 5, padding: 2 }}>
          <Text style={styles.transactionTitle}>{props.title}</Text>
          <Text style={styles.transactionDesc}>{props.description}</Text>
        </View>
      </View>
      <View style={styles.amountTimeContainer}>
        <View>
          <Text style={styles.transactionAmount}>{props.amount}</Text>
        </View>
        <View>
          <Text style={styles.transactionTime}>{props.time}</Text>
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
    color: '#000000',
  },
  transactionDesc: {
    fontSize: 14,
    fontWeight: '600',
    padding: 2,
    color: '#91919F',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FD3C4A',
  },
  transactionTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#91919F',
  },
});
export default TransactionList;
