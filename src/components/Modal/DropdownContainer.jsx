import {
  View,
  Modal,
  ScrollView,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colours } from '../../constants/constant';
import { Image } from 'react-native';

const DropdownContainer = ({
  visible,
  onClose,
  options,
  transactionDetails,
  setTransactionDetails,
  type,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState('');
  const [categoryOption, setCategoryOption] = useState([]);
  useEffect(() => {
    if (searchQuery.length > 0) {
      const lowerCaseSearchQuery = searchQuery.toLowerCase();
      const filteredOptions = options.filter(option =>
        option.value.toLowerCase().includes(lowerCaseSearchQuery),
      );
      setFilteredItems(filteredOptions);
    }
  }, [searchQuery]);

  useEffect(() => {
    setCategoryOption(options);
  }, [options]);
  const selectedItem =
    type === 'Payment' ? transactionDetails.paymentMode : transactionDetails.category;

  const handleItems = item => {
    if (type === 'Payment') {
      setTransactionDetails({
        ...transactionDetails,
        paymentMode: item,
      });
    } else if (type === 'Category') {
      setTransactionDetails({
        ...transactionDetails,
        category: item,
      });
    }
    onClose();
    setSearchQuery('');
  };
  const renderItems = () => {
    const itemsToRender = filteredItems.length > 0 ? filteredItems : categoryOption;
    return itemsToRender.map((option, i) => (
      <TouchableOpacity
        key={i}
        style={[
          styles.itemContainer,
          option.value === selectedItem && styles.selectedItemContainer,
        ]}
        onPress={() => handleItems(option.value)}>
        <View style={styles.categoryItemContainer}>
          <Text style={styles.itemText}>{option.value}</Text>
          <Image source={option.img} style={styles.categoryIcon} />
        </View>
      </TouchableOpacity>
    ));
  };
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <TouchableOpacity onPress={onClose} activeOpacity={1} style={styles.backDrop}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
              />
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
            <ScrollView>{renderItems()}</ScrollView>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default DropdownContainer;

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Blackish color for backdrop
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%', // Modal takes up 80% of the screen
    maxHeight: '80%', // Modal takes up 80% of the screen
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f2f2f2',
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    color: Colours.BLACK,
  },
  closeButton: {
    paddingHorizontal: 15,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#333',
  },
  itemContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedItemContainer: {
    // backgroundColor: Colours.PURPLE_THEME,
    backgroundColor: '#8262c2',
    display: 'flex',
    justifyContent: 'center',
  },
  categoryItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 18,
    color: Colours.BLACK,
    fontWeight: '600',
  },
  backDrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  categoryIcon: {
    width: 40,
    height: 40,
  },
});
