import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import TransactionList from '../components/Home/TransactionList';
import AsyncStorage from '@react-native-async-storage/async-storage';
const TransactionView = ({ route }) => {
  const [dataArr, setDataArr] = useState([]);
  const [showModal, setShowModal] = useState(false);
  console.log('dataArr => ', dataArr);
  useEffect(() => {
    async function getTransactionItems() {
      const dataArr = await AsyncStorage.getItem('transactionData');
      if (dataArr) {
        setDataArr(JSON.parse(dataArr));
      }
    }
    getTransactionItems();
  }, [route.params?.isData]);
  return (
    <View>
      <View style={[styles.recentContainer, { marginHorizontal: 5 }]}>
        <Text style={styles.recentText}>Recent Transactions</Text>
        <TouchableOpacity style={styles.seeAll} onPress={() => setShowModal(true)}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {dataArr.length > 0 ? (
          dataArr
            .slice(0, 10)
            .map((element, i) => (
              <TransactionList
                key={i}
                name={element.name}
                category={element.category}
                amount={element.amount}
                date={element.date}
                isExpense={element.isExpense}
              />
            ))
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              minHeight: 100,
              backgroundColor: '#FC3459',
              width: '100%',
            }}>
            <Text style={{ color: '#000000' }}>No Transaction Available</Text>
          </View>
        )}
      </ScrollView>
      <Modal visible={showModal}>
        <View>
          {dataArr.length > 0 &&
            dataArr.map(({ name }, index) => (
              <Text key={index} style={{ color: '#000000' }}>
                {name}
              </Text>
            ))}
        </View>
        <TouchableOpacity onPress={() => setShowModal(false)} style={{ backgroundColor: 'red' }}>
          <Text style={{ color: '#000000' }}>Close</Text>
        </TouchableOpacity>
      </Modal>
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
