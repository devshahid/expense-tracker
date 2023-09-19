import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const DotsAnimation = () => {
  const dotAnimation = new Animated.Value(0);

  useEffect(() => {
    const dotsAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(dotAnimation, {
          toValue: 1,
          duration: 1500, // 1.5 seconds
          useNativeDriver: false,
        }),
        Animated.timing(dotAnimation, {
          toValue: 0,
          duration: 0, // No duration, for immediate reset
          useNativeDriver: false,
        }),
      ]),
    );

    dotsAnimation.start();

    return () => {
      dotsAnimation.stop();
    };
  }, []);

  const dotTranslateX = dotAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -33.33], // Equivalent to "transform: translateX(calc(-100%/3))"
  });

  return (
    <View style={styles.container}>
      <View style={styles.dots}>
        <Animated.View
          style={[
            styles.dot,
            {
              transform: [{ translateX: dotTranslateX }],
            },
          ]}
        />
      </View>
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

export default DotsAnimation;
