import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const ActivityLoader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={40} color={'red'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dots: {
    width: 56,
    height: 31.4,
    position: 'relative',
  },
  dot: {
    width: 13.4,
    height: 13.4,
    borderRadius: 50,
    backgroundColor: '#474bff',
    position: 'absolute',
    left: 0,
    top: 0,
  },
});

export default ActivityLoader;
