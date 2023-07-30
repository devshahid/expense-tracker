export const ScreenNames = {
  ON_BOARDING_SCREEN: 'OnBoardingScreen',
  MAIN_SCREEN: 'MainScreen',
  ADD_EXPENSE_SCREEN: 'Add_Expense',
  LOGIN_SCREEN: 'Login',
  HOME_MAIN_SCREEN: 'HomeMain',
  HOME_TAB: 'Home',
  PROFILE_TAB: 'Profile',
  LAUNCH_SCREEN: 'LaunchScreen',
  SIGNUP_SCREEN: 'SignupScreen',
};

export const Colours = {
  BLACK: '#000000',
  PURPLE_THEME: '#7F3DFF',
  WHITISH: '#FCFCFC',
  WHITE_PURE: '#FFFFFF',
  YELLOWISH: '#FCAC12',
  ORANGISH: '#B2BCBC',
  RED_THEME: '#FD3C4A',
  GREEN_THEME: '#00A86B',
  GREY_WHITE: '#91919F',
  LIGHT_GRAY: '#C6C6C6',
};

export const Images = {
  DEFAULT_IMAGE: require('../assets/default-image.png'),
  LAUNCH_IMAGE: require('../assets/launch-image.png'),
  LOGIN_IMAGE: require('../assets/Login.png'),
  GOOGLE_IMAGE: require('../assets/google-logo.png'),
  ONBOARDING_IMAGE_1: require('../assets/money-stress.png'),
  ONBOARDING_IMAGE_2: require('../assets/money-savings.png'),
  ONBOARDING_IMAGE_3: require('../assets/money-analyze.png'),
  SIGNUP_IMAGE: require('../assets/Signup.png'),
};
export const onboardingSlides = [
  {
    id: '1',
    image: Images.ONBOARDING_IMAGE_1,
    title: 'Overwhelmed by Debts',
    subtitle: 'Take control of your finances and reduce your debt with our expense tracker app',
  },
  {
    id: '2',
    image: Images.ONBOARDING_IMAGE_2,
    title: 'Savings Made Simple',
    subtitle: 'Track your expenses and witness the power of small savings accumulating over time',
  },
  {
    id: '3',
    image: Images.ONBOARDING_IMAGE_3,
    title: 'Data-Driven Insights',
    subtitle:
      "Collaborate with our app's powerful tools and make informed decisions with your financial data",
  },
];
