import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import IconIonics from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { categoryOptions, paymentOptions } from '../constants/data';
import DropdownContainer from '../components/Modal/DropdownContainer';
import Icon from 'react-native-vector-icons/FontAwesome5';

const AddExpense = ({ navigation }) => {
  const [selectedBox, setSelectedBox] = useState('debit');
  const [selectedHeaderTxt, setSelectedHeaderTxt] = useState('Expense');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const date = new Date();
  const formattedDate = moment(date);
  const [selectedDate, setSelectedDate] = useState(moment(formattedDate).format('DD-MM-YYYY'));
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [transactionDetails, setTransactionDetails] = useState({
    name: null,
    amount: null,
    paymentMode: 'Payment Mode',
    category: 'Select Category',
    date: formattedDate,
    isExpense: true,
  });
  const checkEmptyInput = value => {
    if (value) return true;
    else return false;
  };
  useEffect(() => {
    const { name, amount, paymentMode, category } = transactionDetails;
    if (
      checkEmptyInput(name) &&
      checkEmptyInput(amount) &&
      checkEmptyInput(paymentMode) &&
      checkEmptyInput(category)
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [transactionDetails]);

  const handleInputs = (value, name) => {
    setTransactionDetails({
      ...transactionDetails,
      [name]: value,
    });
  };
  const handleFormData = (name, value) => {
    setTransactionDetails({
      ...transactionDetails,
      [name]: value,
    });
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
    const selectedDate = moment(date).format('DD-MM-YYYY');
    setSelectedDate(selectedDate);
    hideDatePicker();
    handleFormData('date', date);
  };
  const handleDateVisibility = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };
  const handleSubmit = async () => {
    const transactionData = await AsyncStorage.getItem('transactionData');
    if (!transactionData) {
      const dataArr = [];
      dataArr.push(transactionDetails);
      await AsyncStorage.setItem('transactionData', JSON.stringify(dataArr));
    } else {
      const dataArr = JSON.parse(transactionData);
      dataArr.push(transactionDetails);
      await AsyncStorage.setItem('transactionData', JSON.stringify(dataArr));
      console.log('dataArr => ', dataArr);
    }
    navigation.navigate('HomeMain', { isData: true });
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const openModal = type => {
    setModalVisible(true);
    setModalType(type);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalType('');
  };
  return (
    <View
      style={[
        styles.mainContainer,
        selectedBox === 'debit' ? { backgroundColor: '#FD3C4A' } : { backgroundColor: '#00A86B' },
      ]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <IconIonics
            name="ios-arrow-back"
            size={32}
            style={styles.backArrowIcon}
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <View style={styles.headerTxtContainer}>
          <Text style={styles.headerTxt}>{selectedHeaderTxt}</Text>
        </View>
      </View>
      <View>
        <View style={styles.amountContainer}>
          <Text style={styles.amountValue}>₹</Text>
          <TextInput
            placeholder="0"
            placeholderTextColor={'#FCFCFC'}
            style={[styles.amountValue, { fontSize: 60 }]}
            keyboardType="numeric"
            onChangeText={value => handleInputs(value, 'amount')}
          />
        </View>
      </View>
      <ScrollView style={styles.scrollFormContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.formContainer}>
          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={value => handleInputs(value, 'name')}
                placeholder="Name"
                placeholderTextColor={'grey'}
              />
            </View>
          </View>
          <View style={styles.incomeExpContainer}>
            <TouchableOpacity
              style={[
                styles.debitContainer,
                selectedBox === 'debit'
                  ? { backgroundColor: '#FD3C4A' }
                  : { backgroundColor: '#FFFFFF' },
              ]}
              onPress={() => {
                setSelectedBox('debit');
                setSelectedHeaderTxt('Expense');
                handleFormData('isExpense', true);
              }}>
              <Text
                style={[
                  styles.radioBtn,
                  selectedBox === 'debit' ? { color: '#FFFFFF' } : { color: '#000000' },
                ]}>
                Debit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.creditContainer,
                selectedBox === 'credit'
                  ? { backgroundColor: '#00A86B' }
                  : { backgroundColor: '#FFFFFF' },
              ]}
              onPress={() => {
                setSelectedBox('credit');
                setSelectedHeaderTxt('Income');
                handleFormData('isExpense', false);
              }}>
              <Text
                style={[
                  styles.radioBtn,
                  selectedBox === 'credit' ? { color: '#FFFFFF' } : { color: '#000000' },
                ]}>
                Credit
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              onPress={() => openModal('Payment')}
              style={[styles.dropdown, styles.dropDownWithArrow]}>
              <Text style={styles.selectedTextStyle}>{transactionDetails.paymentMode}</Text>
              <Icon name="chevron-down" size={20} style={styles.iconStyle} />
            </TouchableOpacity>
          </View>
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              onPress={() => openModal('Category')}
              style={[styles.dropdown, styles.dropDownWithArrow]}>
              <Text style={styles.selectedTextStyle}>{transactionDetails.category}</Text>
              <Icon name="chevron-down" size={20} style={styles.iconStyle} />
            </TouchableOpacity>
          </View>

          <View style={{ width: '100%' }}>
            <TouchableOpacity style={styles.selectDateContainer} onPress={handleDateVisibility}>
              <Text style={{ color: '#000000' }}>{selectedDate}</Text>
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.submitBtnContainer,
              buttonDisabled ? { backgroundColor: '#CCCCCC' } : { backgroundColor: '#7F3DFF' },
            ]}>
            <TouchableOpacity
              disabled={buttonDisabled}
              style={styles.submitBtn}
              onPress={handleSubmit}>
              <Text
                style={[
                  styles.submitBtnTxt,
                  buttonDisabled ? { color: '#AAAAAA' } : { color: '#FFFFFF' },
                ]}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {modalType === 'Category' ? (
          <DropdownContainer
            type="Category"
            options={categoryOptions}
            visible={modalVisible}
            onClose={closeModal}
            transactionDetails={transactionDetails}
            setTransactionDetails={setTransactionDetails}
          />
        ) : (
          <DropdownContainer
            type="Payment"
            options={paymentOptions}
            visible={modalVisible}
            onClose={closeModal}
            transactionDetails={transactionDetails}
            setTransactionDetails={setTransactionDetails}
          />
        )}
      </ScrollView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default AddExpense;

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  headerContainer: { flexDirection: 'row', alignItems: 'center' },
  backArrowIcon: { padding: 10, color: '#FFFFFF' },
  headerTxtContainer: { flex: 1, alignItems: 'center' },
  headerTxt: {
    fontSize: 18,
    fontWeight: 600,
    color: '#FFFFFF',
  },
  amountContainer: {
    flexDirection: 'row',
    marginHorizontal: 5,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  amountValue: {
    fontSize: 64,
    fontWeight: '600',
    marginHorizontal: 5,
    color: '#FCFCFC',
  },
  scrollFormContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  inputContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    borderWidth: 0.2,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    height: 60,
    color: '#000000',
  },
  incomeExpContainer: {
    width: '75%',
    marginVertical: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  debitContainer: {
    backgroundColor: 'red',
    padding: 10,
    width: '50%',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomStartRadius: 10,
    borderWidth: 0.5,
  },
  creditContainer: {
    borderTopRightRadius: 10,
    borderBottomEndRadius: 10,
    backgroundColor: 'red',
    padding: 10,
    // backgroundColor: '#FD3C4A',
    backgroundColor: '#FFFFFF',
    width: '50%',
    alignItems: 'center',
    borderWidth: 0.5,
  },
  radioBtn: {
    padding: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dropdownContainer: {
    borderRadius: 5,
    marginVertical: 10,
    flex: 1,
    width: '75%',
  },
  dropdown: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 0.2,
    borderRadius: 5,
    paddingHorizontal: 8,
    color: '#000000',
  },
  dropDownWithArrow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#000000',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000000',
    paddingHorizontal: 10,
  },
  iconStyle: {
    color: '#000000',
    paddingRight: 10,
  },
  dropdownListContainer: {
    paddingHorizontal: 10,
  },
  submitBtnContainer: {
    flex: 1,
    width: '75%',
    backgroundColor: 'red',
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  submitBtn: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  submitBtnTxt: {
    fontSize: 18,
    alignItems: 'center',
    fontWeight: 'bold',
  },
  selectDateContainer: {
    width: '75%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
});
