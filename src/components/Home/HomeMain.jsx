import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import TransactionView from '../../views/TransactionView';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LineChart } from 'react-native-chart-kit';
import Tabs from './Tabs';
import { Colours, ScreenNames, tableNames } from '../../constants/constant';
import { useDispatch, useSelector } from 'react-redux';
import SQLite from '../../sqlite/sql';
import { updateAmountDetails } from '../../redux/slices/users';
const HomeMain = ({ navigation, route }) => {
  const globalState = useSelector(state => state.userDetails);
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState('Today');
  const [graphLabels, setGraphLabels] = useState([
    '6AM-10AM',
    '10AM-2PM',
    '2PM-6PM',
    '6PM-10PM',
    '10PM-2AM',
  ]);
  const [graphData, setGraphData] = useState([10, 15, 20, 12, 50]);
  const [refreshing, setRefreshing] = useState(false);
  const [toggleTransaction, setToggleTransaction] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    async function getUserData() {
      try {
        if (globalState.userId) {
          SQLite.checkAndCreateUserTable(tableNames.USER_TABLE, globalState.userId);
          const userData = await SQLite.fetchTableData(tableNames.USER_TABLE, globalState.userId);
          const data = { bankAmount: userData.bankAmount, cashAmount: userData.cashAmount };
          dispatch(updateAmountDetails(data));
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUserData();
  }, []);
  useEffect(() => {
    setTotalAmount(Number(globalState.cashAmount) + Number(globalState.bankAmount));
  }, [globalState.bankAmount, globalState.cashAmount]);
  useEffect(() => {
    if (selectedTab === 'Today') {
      setGraphLabels(['6AM-10AM', '10AM-2PM', '2PM-6PM', '6PM-10PM', '10PM-2AM']);
      setGraphData([10, 15, 20, 12, 50]);
    } else if (selectedTab === 'Week') {
      setGraphLabels(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
      setGraphData([254, 967, 142, 1000, 365, 111, 657]);
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
      setGraphData([666, 214, 475, 325, 10, 444, 857, 375, 124, 555, 325, 656]);
    } else if (selectedTab === 'Year') {
      setGraphLabels(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
      setGraphData([45, 968, 534, 852, 678, 751, 321]);
    }
  }, [selectedTab]);

  useEffect(() => {
    setToggleTransaction(!toggleTransaction);
  }, [route?.params?.isData]);

  const handleDataPointClick = (data, x, y, index) => {
    const selectedDataPoint = data[index];
    console.log(data, index, x, y, selectedDataPoint);
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setToggleTransaction(!toggleTransaction);
      setTotalAmount(Number(globalState.bankAmount) + Number(globalState.cashAmount));
    }, 2000);
  });
  return (
    <>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={{ flex: 1, marginHorizontal: 5, backgroundColor: Colours.WHITE_PURE }}>
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
                <Text style={styles.incomeExpAmount}>₹ 0</Text>
              </View>
            </View>
            <View style={[styles.incomeExpContainer, { backgroundColor: Colours.RED_THEME }]}>
              <View>
                <Icon name="minus-circle" size={40} style={{ color: Colours.WHITISH }} />
              </View>
              <View>
                <Text style={styles.incomeExpLabel}>Expense</Text>
                <Text style={styles.incomeExpAmount}>₹ 0</Text>
              </View>
            </View>
          </View>
          <View style={styles.graphViewContainer}>
            <Text style={styles.graphViewLabel}>Spend Frequency</Text>
          </View>
          <View style={styles.graphContainer}>
            <LineChart
              data={{
                labels: graphLabels,
                datasets: [
                  {
                    data: graphData,
                    color: (opacity = 1) => `rgba(78, 38, 102, ${opacity})`,
                  },
                ],
              }}
              width={Dimensions.get('window').width - 10} // from react-native
              height={220}
              yAxisLabel="₹ "
              chartConfig={{
                propsForVerticalLabels: {
                  fontSize: 10,
                  fontWeight: 'bold',
                  opacity: 1,
                },
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#a8c0ff',
                backgroundGradientTo: '#3f2b96',
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(39, 17, 79, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                fillShadowGradientOpacity: 0.5,
                fillShadowGradient: Colours.WHITE_PURE,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '1',
                  stroke: Colours.WHITE_PURE,
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
              onDataPointClick={({ index, value, x, y }) =>
                handleDataPointClick(graphData, x, y, index)
              }
            />
          </View>
          <View style={styles.tabMainContainer}>
            {['Today', 'Week', 'Month', 'Year'].map((element, i) => (
              <Tabs
                key={i}
                focused={element}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />
            ))}
          </View>
          <TransactionView
            route={route}
            navigation={navigation}
            toggleTransaction={toggleTransaction}
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
    fontWeight: 500,
    fontSize: 14,
    color: Colours.WHITISH,
  },
  incomeExpAmount: {
    fontWeight: 600,
    fontSize: 22,
    color: Colours.WHITISH,
  },
  graphViewContainer: {
    marginTop: 20,
    padding: 8,
  },
  graphViewLabel: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colours.BLACK,
  },
  graphContainer: {
    minheight: 150,
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
  tabMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginVertical: 5,
    marginTop: 20,
  },
  tooltipContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 8,
    borderRadius: 4,
  },
  tooltipText: {
    color: Colours.BLACK,
  },
});
export default HomeMain;
