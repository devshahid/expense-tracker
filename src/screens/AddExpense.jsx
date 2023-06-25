import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import IconIonics from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
const AddExpense = ({ navigation }) => {
  const [selectedBox, setSelectedBox] = useState('debit');
  const [selectedHeaderTxt, setSelectedHeaderTxt] = useState('Expense');
  const [paymentValue, setPaymentValue] = useState('Select payment mode');
  const [categoryValue, setCategoryValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Select Date');
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    const selectedDate = moment(date).utc().add(1, 'day').format('DD-MM-YYYY');
    setSelectedDate(selectedDate);
    hideDatePicker();
  };
  const handleDateVisibility = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };
  const paymentOptions = [
    { label: 'Google Pay', value: 'gpay' },
    { label: 'Phone Pay', value: 'phonepay' },
    { label: 'Paytm', value: 'paytm' },
    { label: 'Amazon Pay', value: 'amazonpay' },
    { label: 'Cash', value: 'cash' },
    { label: 'Other', value: 'other' },
  ];
  const categoryOptions = [
    { label: 'Food', value: 'food' },
    { label: 'Travel', value: 'travel' },
    { label: 'Petrol', value: 'petrol' },
    { label: 'Friend', value: 'friend' },
    { label: 'Other', value: 'other' },
  ];
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
          />
        </View>
      </View>
      <ScrollView style={styles.scrollFormContainer}>
        <View style={styles.formContainer}>
          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder="Name" placeholderTextColor={'grey'} />
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
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              itemContainerStyle={styles.dropdownListContainer}
              itemTextStyle={{ color: '#000000' }}
              data={paymentOptions}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={'Payment Mode'}
              value={paymentValue}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setIsFocus(false);
                setPaymentValue(item);
              }}
            />
          </View>
          <View style={styles.dropdownContainer}>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              itemContainerStyle={styles.dropdownListContainer}
              itemTextStyle={{ color: '#000000' }}
              data={categoryOptions}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={'Select Category'}
              value={categoryValue}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setIsFocus(false);
                setCategoryValue(item);
              }}
            />
          </View>

          <View style={{ width: '100%' }}>
            <TouchableOpacity style={styles.selectDateContainer} onPress={handleDateVisibility}>
              <Text style={{ color: '#000000' }}>{selectedDate}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.submitBtnContainer}>
            <TouchableOpacity style={styles.submitBtn}>
              <Text style={styles.submitBtnTxt}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    marginTop: 80,
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
    width: 30,
    height: 30,
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
    backgroundColor: '#7F3DFF',
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
    color: '#FFFFFF',
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
