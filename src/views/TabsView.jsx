import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Tabs from '../components/Home/Tabs';
const TabsView = () => {
  const [selectedTab, setSelectedTab] = useState('Today');
  return (
    <View style={styles.tabMainContainer}>
      {['Today', 'Week', 'Month', 'Year'].map((element, i) => (
        <Tabs key={i} focused={element} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  tabMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginVertical: 5,
    marginTop: 20,
  },
});
export default TabsView;
