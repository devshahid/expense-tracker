import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colours, tableNames } from '../../constants/constant';
import { Picker } from '@react-native-picker/picker';
import SQLite from '../../sqlite/sql';
import { useSelector, useDispatch } from 'react-redux';
import { updateAmountDetails } from '../../redux/slices/users';

const AddBalance = ({ state, setAddBalance }) => {
  const dispatch = useDispatch();
  const globalState = useSelector(state => state.userDetails);
  const [amountDetails, setAmountDetails] = useState({
    select: 'Bank',
    amount: 0,
  });

  const handleInputs = (value, name) => {
    setAmountDetails({
      ...amountDetails,
      [name]: value,
    });
  };
  const handleSubmitBtn = async () => {
    const newObj = {
      userId: globalState.userId,
    };

    if (amountDetails.select === 'Bank') {
      newObj['bankAmount'] = amountDetails.amount + globalState.bankAmount;
    } else {
      newObj['cashAmount'] = amountDetails.amount + globalState.cashAmount;
    }
    const updatedRows = await SQLite.updateUserDetails(tableNames.USER_TABLE, newObj);
    if (updatedRows.status) {
      delete newObj.userId;
      // update the redux state also
      dispatch(updateAmountDetails(newObj));
      // close popup and show the notification
      setAddBalance(false);
    }
  };
  return (
    <View>
      <Modal isVisible={state}>
        <View style={styles.logoutModalContainer}>
          <TouchableOpacity onPress={() => setAddBalance(false)} style={styles.xmarkContainer}>
            <Icon name="cancel" size={40} style={{ color: '#000000' }} />
          </TouchableOpacity>
          <Text style={styles.balanceTitle}>Amount Details</Text>

          <TextInput
            placeholder="Enter amount to Add"
            placeholderTextColor={'#000000'}
            style={[styles.amountValue]}
            keyboardType="numeric"
            onChangeText={value => handleInputs(Number(value), 'amount')}
          />
          <View style={styles.pickerViewContainer}>
            <Picker
              style={styles.pickerContainer}
              selectedValue={amountDetails.select}
              onValueChange={option => {
                handleInputs(option, 'select');
              }}
              dropdownIconColor="#000000">
              <Picker.Item label="Bank" value="Bank" style={{}} />
              <Picker.Item label="Cash" value="Cash" />
            </Picker>
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmitBtn}>
            <Text style={styles.submitBtnTxt}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default AddBalance;

const styles = StyleSheet.create({
  logoutModalContainer: {
    position: 'relative',
    backgroundColor: '#ffffff',
    minHeight: 400,
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    gap: 10,
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
