import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const HeaderComponent = ({ onBalanceClick, navigation }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 64,
        padding: 10,
        backgroundColor: '#FFFFFF',
      }}>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon
          onPress={() => navigation.openDrawer()}
          name="user"
          size={30}
          style={{
            color: '#000000',
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Text
          style={{
            color: '#000000',
          }}>
          Drop Down
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onBalanceClick}>
        <Icon name="bell" size={30} style={{ color: '#7F3DFF' }} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#7F3DFF',
  },
});
export default HeaderComponent;
