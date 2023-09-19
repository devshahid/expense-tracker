import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colours } from '../../constants/constant';
import { Picker } from '@react-native-picker/picker';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { resetTransactionAdded, updateUserAmount } from '../../redux/slices/transactions';

const AddBalance = ({ state, setAddBalance }) => {
  const dispatch = useDispatch();
  const { userId, bankAmount, cashAmount } = useSelector(state => state.userDetails);
  const { transactionAdded } = useSelector(state => state.transactions);
  const [amountDetails, setAmountDetails] = useState({
    select: 'Bank',
    amount: 0,
  });
  useEffect(() => {
    // close popup and show the notification
    if (transactionAdded) {
      setAddBalance(false);
    }
    return () => {
      dispatch(resetTransactionAdded()); // Define and dispatch this action to reset the flag
    };
  }, [dispatch, transactionAdded]);
  const handleInputs = (value, name) => {
    setAmountDetails({
      ...amountDetails,
      [name]: value,
    });
  };
  const handleSubmitBtn = async () => {
    const newObj = {
      userId,
    };
    // add a track record into db of the amount added from profile
    // create a dispatch action to update the amount bank or cash in db and state as well based on -\+
    if (amountDetails.select === 'Bank') {
      newObj['bankAmount'] = amountDetails.amount + bankAmount;
    } else {
      newObj['cashAmount'] = amountDetails.amount + cashAmount;
    }
    console.log('newObj => ', newObj);
    dispatch(updateUserAmount(newObj));
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
