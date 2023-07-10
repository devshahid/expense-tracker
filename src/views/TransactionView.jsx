import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import TransactionList from '../components/Home/TransactionList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Entypo';
const TransactionView = ({ route, navigation }) => {
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
  }, [route.params?.isData, showModal, navigation]);
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
        <View style={styles.modalHeaderContainer}>
          <TouchableOpacity onPress={() => setShowModal(false)}>
            <Icon name="cross" size={40} style={{ color: '#000000', paddingLeft: 10 }} />
          </TouchableOpacity>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#000000', fontSize: 16, fontWeight: '600' }}>
              View all Transactions
            </Text>
          </View>
        </View>
        <ScrollView>
          {dataArr.length > 0 &&
            dataArr.map((element, i) => (
              <TransactionList
                key={i}
                name={element.name}
                category={element.category}
                amount={element.amount}
                date={element.date}
                isExpense={element.isExpense}
              />
            ))}
        </ScrollView>
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
  modalHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
  },
});
export default TransactionView;
