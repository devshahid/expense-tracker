import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import TransactionView from '../../views/TransactionView';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colours, ScreenNames } from '../../constants/constant';
import { useDispatch, useSelector } from 'react-redux';
import { getUserTransactions, updateAmountArr } from '../../redux/slices/transactions';
import GraphicalView from '../../views/GraphicalView';
import ActivityLoader from '../Loaders/ActivityLoader';
const HomeMain = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.userDetails);
  const {
    transactionList,
    bankAmount,
    cashAmount,
    incomeBal,
    expenseBal,
    transactionAdded,
    dailyAmountArr,
    weeklyAmountArr,
    monthlyAmountArr,
    isLoading,
  } = useSelector((state) => state.transactions);
  const [selectedTab, setSelectedTab] = useState('Today');
  const [graphLabels, setGraphLabels] = useState([
    '6AM-10AM',
    '10AM-2PM',
    '2PM-6PM',
    '6PM-10PM',
    '10PM-2AM',
  ]);
  const [graphData, setGraphData] = useState([0, 0, 0, 0, 0, 0]);
  const [refreshing, setRefreshing] = useState(false);
  const [toggleTransaction, setToggleTransaction] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    // dispatch action to read data from db for transaction list and income expense
    dispatch(getUserTransactions(userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTotalAmount(Number(cashAmount) + Number(bankAmount));
  }, [bankAmount, cashAmount]);

  // calculation graphical data
  useEffect(() => {
    if (transactionAdded) {
      dispatch(updateAmountArr(transactionList));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionAdded]);
  useEffect(() => {
    if (selectedTab === 'Today') {
      setGraphLabels(['12AM-4AM', '4AM-8AM', '8AM-12PM', '12PM-4PM', '4PM-8PM', '8PM-12AM']);
      setGraphData(dailyAmountArr);
    } else if (selectedTab === 'Week') {
      setGraphLabels(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
      setGraphData(weeklyAmountArr);
    } else if (selectedTab === 'Month') {
      setGraphLabels([
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'June',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ]);
      setGraphData(monthlyAmountArr);
    }
  }, [selectedTab, dailyAmountArr, weeklyAmountArr, monthlyAmountArr]);

  useEffect(() => {
    setToggleTransaction(!toggleTransaction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route?.params?.isData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setToggleTransaction(!toggleTransaction);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <ActivityLoader />;
  }
  return (
    <>
      <View style={{ flex: 1, backgroundColor: Colours.WHITE_PURE }}>
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <View
            style={{
              flex: 1,
              marginHorizontal: 5,
              backgroundColor: Colours.WHITE_PURE,
            }}>
            <View style={styles.balanceContainer}>
              <Text style={styles.balanceStyle}>₹ {totalAmount}</Text>
            </View>
            <View style={styles.incomeExpMainContainer}>
              <View style={[styles.incomeExpContainer, { backgroundColor: Colours.GREEN_THEME }]}>
                <View>
                  <Icon name="plus-circle" size={40} style={{ color: Colours.WHITISH }} />
                </View>
                <View>
                  <Text style={styles.incomeExpLabel}>Income</Text>
                  <Text style={styles.incomeExpAmount}>₹ {incomeBal}</Text>
                </View>
              </View>
              <View style={[styles.incomeExpContainer, { backgroundColor: Colours.RED_THEME }]}>
                <View>
                  <Icon name="minus-circle" size={40} style={{ color: Colours.WHITISH }} />
                </View>
                <View>
                  <Text style={styles.incomeExpLabel}>Expense</Text>
                  <Text style={styles.incomeExpAmount}>₹ {expenseBal}</Text>
                </View>
              </View>
            </View>
            {/* created a specific view for graph container */}
            <GraphicalView
              graphLabels={graphLabels}
              graphData={graphData}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
            <TransactionView
              route={route}
              navigation={navigation}
              toggleTransaction={toggleTransaction}
              dataArr={transactionList}
              onRefreshComplete={onRefresh}
            />
          </View>
        </ScrollView>
        <View id="add_expense_container" style={styles.addExpContainer}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.navigate(ScreenNames.ADD_EXPENSE_SCREEN)}>
            <Icon name="plus" size={24} style={styles.addIcon} />
          </TouchableOpacity>
        </View>
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
    color: Colours.BLACK,
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
    fontWeight: '500',
    fontSize: 14,
    color: Colours.WHITISH,
  },
  incomeExpAmount: {
    fontWeight: '600',
    fontSize: 22,
    color: Colours.WHITISH,
  },

  addExpContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colours.PURPLE_THEME,
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
    backgroundColor: Colours.PURPLE_THEME,
    color: Colours.WHITE_PURE,
  },
});
export default HomeMain;
