import Snackbar from 'react-native-snackbar';

const toastMessage = (message, type = 'error') => {
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_LONG,
    marginBottom: 20,
    backgroundColor: type === 'success' ? '#3AC279' : 'red',
    textColor: type === 'success' ? '#000000' : '#FFFFFF',
  });
};

export { toastMessage };
