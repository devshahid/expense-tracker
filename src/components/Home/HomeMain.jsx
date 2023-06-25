import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import TransactionView from '../../views/TransactionView';
import TabsView from '../../views/TabsView';
import Icon from 'react-native-vector-icons/FontAwesome';
import LineGraph from '../../assets/line-graph.png';
const HomeMain = ({ navigation }) => {
  return (
    <>
      <ScrollView>
        <View style={{ flex: 1, marginHorizontal: 5, backgroundColor: '#FFFFFF' }}>
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceStyle}>₹ 10000</Text>
          </View>
          <View style={styles.incomeExpMainContainer}>
            <View style={[styles.incomeExpContainer, { backgroundColor: '#00A86B' }]}>
              <View>
                <Icon name="plus-circle" size={40} style={{ color: '#FCFCFC' }} />
              </View>
              <View>
                <Text style={styles.incomeExpLabel}>Income</Text>
                <Text style={styles.incomeExpAmount}>₹ 6000</Text>
              </View>
            </View>
            <View style={[styles.incomeExpContainer, { backgroundColor: '#FD3C4A' }]}>
              <View>
                <Icon name="minus-circle" size={40} style={{ color: '#FCFCFC' }} />
              </View>
              <View>
                <Text style={styles.incomeExpLabel}>Expense</Text>
                <Text style={styles.incomeExpAmount}>₹ 4000</Text>
              </View>
            </View>
          </View>
          <View style={styles.graphViewContainer}>
            <Text style={styles.graphViewLabel}>Spend Frequency</Text>
          </View>
          <View style={styles.graphContainer}>
            <Image source={LineGraph} style={styles.graphImage} />
          </View>
          <TabsView />
          <TransactionView />
        </View>
      </ScrollView>
      <View id="add_expense_container" style={styles.addExpContainer}>
        <TouchableOpacity style={styles.iconBtn}>
          <Icon
            name="plus"
            size={24}
            style={styles.addIcon}
            onPress={() => navigation.navigate('Add_Expense')}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  balanceContainer: {
    alignItems: 'center',
  },
  balanceStyle: {
    fontWeight: 'bold',
    fontSize: 40,
    marginVertical: 10,
    color: '#000000',
  },
  incomeExpMainContainer: {
    flexDirection: 'row',
  },
  incomeExpContainer: {
    borderRadius: 16,
    flex: 1,
    flexDirection: 'row',
    height: 80,
    marginHorizontal: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  incomeExpLabel: {
    fontWeight: 500,
    fontSize: 14,
    color: '#FCFCFC',
  },
  incomeExpAmount: {
    fontWeight: 600,
    fontSize: 22,
    color: '#FCFCFC',
  },
  graphViewContainer: {
    marginTop: 20,
    padding: 8,
  },
  graphViewLabel: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
  },
  graphContainer: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  graphImage: {
    width: '100%',
    height: '100%',
  },
  addExpContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#7F3DFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    backgroundColor: '#7F3DFF',
    color: '#FFFFFF',
  },
});
export default HomeMain;
