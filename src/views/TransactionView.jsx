import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import TransactionList from '../components/Home/TransactionList';
import { transactionItems } from '../constants/data';
const TransactionView = () => {
  return (
    <View>
      <View style={[styles.recentContainer, { marginHorizontal: 5 }]}>
        <Text style={styles.recentText}>Recent Transactions</Text>
        <View style={styles.seeAll}>
          <Text style={styles.seeAllText}>See All</Text>
        </View>
      </View>
      <ScrollView>
        {transactionItems.map((element, i) => (
          <TransactionList
            key={i}
            title={element.title}
            description={element.description}
            amount={element.amount}
            time={element.time}
            icon={element.icon}
            color={{ color: element.color }}
            backgroundColor={{ backgroundColor: element.backgroundColor }}
          />
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  recentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recentText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAll: {
    backgroundColor: '#EEE5FF',
    borderRadius: 20,
  },
  seeAllText: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    color: '#7F3DFF',
    fontSize: 16,
  },
});
export default TransactionView;
