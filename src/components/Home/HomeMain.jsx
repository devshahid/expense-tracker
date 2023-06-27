import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import TransactionView from '../../views/TransactionView';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LineChart } from 'react-native-chart-kit';
import Tabs from './Tabs';

const HomeMain = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('Today');
  const [graphLabels, setGraphLabels] = useState([
    '6AM-10AM',
    '10AM-2PM',
    '2PM-6PM',
    '6PM-10PM',
    '10PM-2AM',
  ]);
  const [graphData, setGraphData] = useState([10, 15, 20, 12, 50]);
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
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

  const handleDataPointClick = (data, x, y, index) => {
    const selectedDataPoint = data[index];
    console.log(data, index, x, y, selectedDataPoint);
    setTooltipData(selectedDataPoint);
    setTooltipPosition({ x, y });
  };
  const Tooltip = ({ data, x, y }) => {
    return (
      <View style={[styles.tooltipContainer, { top: y - 30, left: x - 30 }]}>
        <Text style={styles.tooltipText}>Amount: {data.amount}</Text>
      </View>
    );
  };
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
                fillShadowGradient: '#FFFFFF',
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '1',
                  stroke: '#FFFFFF',
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
            {tooltipData && (
              <Tooltip data={tooltipData} x={tooltipPosition.x} y={tooltipPosition.y} />
            )}
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
    color: '#000000',
  },
});
export default HomeMain;
