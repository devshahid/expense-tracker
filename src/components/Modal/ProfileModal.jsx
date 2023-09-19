import { StyleSheet, View, Modal, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colours } from '../../constants/constant';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileModal = ({ state, setState, children }) => {
  return (
    <Modal transparent visible={state}>
      <View style={styles.modalBackground}>
        <View style={styles.logoutModalContainer}>
          <TouchableOpacity onPress={() => setState(false)} style={styles.xmarkContainer}>
            <Icon name="cancel" size={40} style={{ color: '#000000' }} />
          </TouchableOpacity>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default ProfileModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutModalContainer: {
    position: 'relative',
    backgroundColor: '#ffffff',
    minHeight: 250,
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    gap: 10,
    width: '90%',
  },
  balanceTitle: {
    color: '#000000',
    fontSize: 22,
    fontWeight: 'bold',
    padding: 10,
    textTransform: 'uppercase',
    marginTop: 20,
  },
  amountValue: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 5,
    borderWidth: 0.5,
    color: '#000000',
    width: '100%',
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
  },
  xmarkContainer: {
    position: 'absolute',
    right: 0,
  },
  submitBtn: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: Colours.PURPLE_THEME,
    borderRadius: 20,
    marginTop: 20,
  },
  submitBtnTxt: {
    fontSize: 18,
    alignItems: 'center',
    fontWeight: 'bold',
    color: Colours.WHITE_PURE,
  },
  pickerViewContainer: {
    borderWidth: 1,
    width: '100%',
    fontWeight: '600',
  },
  pickerContainer: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    borderRadius: 10,
  },
});
