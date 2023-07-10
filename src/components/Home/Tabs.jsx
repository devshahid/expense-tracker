import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Colours } from '../../constants/constant';

const Tabs = props => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.setSelectedTab(props.focused);
      }}
      style={[styles.tabContainer, props.selectedTab == props.focused && styles.focusedTab]}>
      <Text
        style={[
          styles.tabText,
          props.selectedTab == props.focused && { color: Colours.YELLOWISH },
        ]}>
        {props.focused}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
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
});
export default Tabs;
