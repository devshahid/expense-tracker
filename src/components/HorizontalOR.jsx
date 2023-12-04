import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const HorizontalOR = () => {
  return (
    <View style={styles.orContainer}>
      <View style={styles.horizontalDiv} />
      <Text style={styles.orText}>OR</Text>
      <View style={styles.horizontalDiv} />
    </View>
  );
};

export default HorizontalOR;

const styles = StyleSheet.create({
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: '80%',
  },
  horizontalDiv: {
    flex: 1,
    height: 1,
    backgroundColor: '#999',
  },
  orText: {
    marginHorizontal: 10,
    color: '#999',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
