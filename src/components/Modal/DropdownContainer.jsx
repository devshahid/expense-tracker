import {
  View,
  Modal,
  ScrollView,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';

const DropdownContainer = ({
  visible,
  onClose,
  options,
  transactionDetails,
  setTransactionDetails,
  type,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const selectedItem =
    type === 'Payment' ? transactionDetails.paymentMode : transactionDetails.category;

  const items = options.map(({ value }) => {
    return value;
  });
  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(searchQuery.toLowerCase()),
  );
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
    const renderedItems = filteredItems.map(item => (
      <TouchableOpacity
        style={[styles.itemContainer, item === selectedItem && styles.selectedItemContainer]}
        key={item}
        onPress={() => handleItems(item)}>
        <Text style={[styles.itemText, item === selectedItem && styles.selectedItemText]}>
          {item}
        </Text>
      </TouchableOpacity>
    ));

    if (selectedItem) {
      const selectedRenderedItem = renderedItems.find(item => item.key === selectedItem);

      if (selectedRenderedItem) {
        renderedItems.splice(renderedItems.indexOf(selectedRenderedItem), 1);

        renderedItems.unshift(selectedRenderedItem);
      }
    }

    return renderedItems;
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
    color: 'black',
  },
  closeButton: {
    paddingHorizontal: 15,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#333',
  },
  itemContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedItemContainer: {
    backgroundColor: '#e6f2ff',
  },
  itemText: {
    fontSize: 18,
    color: 'black',
  },
  backDrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
});
