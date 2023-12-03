import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { Colours, ScreenNames, onboardingSlides } from '../constants/constant';
import { SQLite } from '../sqlite/sql';
const { width, height } = Dimensions.get('window');
const Slide = ({ item }) => {
  return (
    <View style={{ alignItems: 'center', marginTop: 20, width }}>
      <Image source={item.image} style={styles.sliderImage} />
      <Text style={styles.imageTitle}>{item.title}</Text>
      <Text style={styles.imageSubTitle}>{item.subtitle}</Text>
    </View>
  );
};
const OnboardingScreen = ({ navigation }) => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    SQLite.checkAndCreateTransTable();
  }, []);
  const handleNavigation = () => {
    const nextSliderIndex = sliderIndex + 1;
    if (nextSliderIndex != onboardingSlides.length) {
      const offset = nextSliderIndex * width;
      ref?.current?.scrollToOffset({ offset, animated: true });
      setSliderIndex(nextSliderIndex);
    } else {
      navigation.navigate(ScreenNames.LOGIN_SCREEN);
    }
  };
  const Footer = () => {
    return (
      <View style={styles.footerMainContainer}>
        <View style={styles.footerContainer}>
          {onboardingSlides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                sliderIndex === index && {
                  backgroundColor: Colours.PURPLE_THEME,
                  width: 15,
                  height: 15,
                  borderRadius: 10,
                },
              ]}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.bottomBtn} onPress={handleNavigation}>
          {onboardingSlides.length - 1 === sliderIndex ? (
            <Text style={styles.continueBtn}>GET STARTED</Text>
          ) : (
            <Text style={styles.continueBtn}>NEXT</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };
  const updateCurrentSlideIndex = (e) => {
    const contentOffSetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffSetX / width);
    setSliderIndex(currentIndex);
  };
  return (
    <SafeAreaView style={styles.onboardingSafeArea}>
      <StatusBar />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        pagingEnabled
        data={onboardingSlides}
        contentContainerStyle={{ height: height * 0.75 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Slide item={item} />}
        bounces={false}
      />
      <Footer />
    </SafeAreaView>
  );
};

export default OnboardingScreen;
const styles = StyleSheet.create({
  onboardingSafeArea: {
    flex: 1,
  },
  imageTitle: {
    color: '#000000',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  imageSubTitle: {
    color: '#000000',
    fontSize: 13,
    marginTop: 10,
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 23,
  },
  indicator: {
    backgroundColor: 'grey',
    marginHorizontal: 3,
    width: 8,
    height: 8,
    borderRadius: 10,
  },
  bottomBtn: {
    height: 50,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colours.PURPLE_THEME,
    marginBottom: 20,
  },
  sliderImage: {
    height: height * 0.5,
    width,
    resizeMode: 'contain',
  },
  footerMainContainer: {
    height: height * 0.22,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  continueBtn: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 15 },
});
