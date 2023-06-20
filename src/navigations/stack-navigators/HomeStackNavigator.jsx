import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import LineGraph from '../../../assets/line-graph.png';
import {Image} from 'react-native';
const Stack = createStackNavigator();
const Tabs = props => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.setSelectedTab(props.focused);
      }}
      style={[
        styles.tabContainer,
        props.selectedTab == props.focused && styles.focusedTab,
      ]}>
      <Text
        style={[
          styles.tabText,
          props.selectedTab == props.focused && {color: '#FCAC12'},
        ]}>
        {props.focused}
      </Text>
    </TouchableOpacity>
  );
};
const TabsView = () => {
  const [selectedTab, setSelectedTab] = useState('Today');
  return (
    <View style={styles.tabMainContainer}>
      <Tabs
        focused="Today"
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <Tabs
        focused="Week"
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <Tabs
        focused="Month"
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <Tabs
        focused="Year"
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
    </View>
  );
};
const TransactionList = props => {
  return (
    <View style={styles.transactionListContainer}>
      <View style={styles.iconAndTransContainer}>
        <View
          style={[
            {
              marginHorizontal: 5,
              borderRadius: 14,
              height: 60,
              width: 60,
              alignItems: 'center',
            },
            props.backgroundColor,
          ]}>
          <Icon5
            name={props.icon}
            size={40}
            style={[props.color, {padding: 12}]}
          />
        </View>
        <View style={{marginHorizontal: 5, padding: 2}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              padding: 2,
              color: '#000000',
            }}>
            {props.title}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              padding: 2,
              color: '#91919F',
            }}>
            {props.description}
          </Text>
        </View>
      </View>
      <View style={styles.amountTimeContainer}>
        <View>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: '#FD3C4A'}}>
            {props.amount}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#91919F',
            }}>
            {props.time}
          </Text>
        </View>
      </View>
    </View>
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
  tabMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginVertical: 5,
    marginTop: 20,
  },
  tabContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 6,
    borderRadius: 16,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B2BCBC',
  },
  focusedTab: {
    backgroundColor: '#FCEEB4',
  },
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
});
const Home = () => (
  <ScrollView>
    <View style={{flex: 1, marginHorizontal: 5, backgroundColor: '#FFFFFF'}}>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceStyle}>₹ 10000</Text>
      </View>
      <View style={styles.incomeExpMainContainer}>
        <View style={[styles.incomeExpContainer, {backgroundColor: '#00A86B'}]}>
          <View>
            <Icon name="plus-circle" size={40} style={{color: '#FCFCFC'}} />
          </View>
          <View>
            <Text style={styles.incomeExpLabel}>Income</Text>
            <Text style={styles.incomeExpAmount}>₹ 6000</Text>
          </View>
        </View>
        <View style={[styles.incomeExpContainer, {backgroundColor: '#FD3C4A'}]}>
          <View>
            <Icon name="minus-circle" size={40} style={{color: '#FCFCFC'}} />
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
      <View>
        <View style={[styles.recentContainer, {marginHorizontal: 5}]}>
          <Text style={styles.recentText}>Recent Transactions</Text>
          <View style={styles.seeAll}>
            <Text style={styles.seeAllText}>See All</Text>
          </View>
        </View>
        <ScrollView>
          <TransactionList
            title="Shopping"
            description="Buy some groceries"
            amount="- 100 ₹"
            time="10:25 AM"
            icon="shopping-bag"
            color={{color: '#FC33C4'}}
            backgroundColor={{backgroundColor: '#FCEED4'}}
          />
          <TransactionList
            title="Food"
            description="Buy some food"
            amount="- 180 ₹"
            time="11:05 AM"
            icon="utensils"
            color={{color: '#FD3C4A'}}
            backgroundColor={{backgroundColor: '#FDD5D7'}}
          />
          <TransactionList
            title="Travel"
            description="Buy train ticket"
            amount="- 3000 ₹"
            time="01:35 PM"
            icon="car"
            color={{color: '#414F12'}}
            backgroundColor={{backgroundColor: '#CCE281'}}
          />
          <TransactionList
            title="Petrol"
            description="Petrol purchase"
            amount="- 200 ₹"
            time="08:25 PM"
            icon="gas-pump"
            color={{color: '#8B7E66'}}
            backgroundColor={{backgroundColor: '#B0A593'}}
          />
        </ScrollView>
      </View>
    </View>
  </ScrollView>
);

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
