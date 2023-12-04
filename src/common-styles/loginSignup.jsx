import { StyleSheet } from 'react-native';

export const loginSignupStyle = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loginImage: {
    width: 380,
    height: 350,
    borderWidth: 2,
  },
  labelContainer: {
    flex: 1,
    width: '100%',
    marginVertical: 0,
    paddingVertical: 10,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    color: '#000000',
    margin: 10,
    borderRadius: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  loginButton: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
    elevation: 1,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorTxtView: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  errorTxt: {
    color: 'red',
  },
});
