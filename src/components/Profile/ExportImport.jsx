import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import ProfileModal from '../Modal/ProfileModal';
import { Colours, tableNames } from '../../constants/constant';
import { importDataFromFile, storeDataInStorage } from '../../utils/fileStorage';
import { SQLite } from '../../sqlite/sql';
import { useDispatch, useSelector } from 'react-redux';
import { convertToInsertQuery, convertToUpdateQuery } from '../../utils/convertToQuery';
import { getUserTransactions } from '../../redux/slices/transactions';
import { showMessage } from 'react-native-flash-message';
const ExportImport = ({ state, setState }) => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.userDetails);
  const handleExportBtn = async () => {
    const userData = await SQLite.getTableData(tableNames.USER_TABLE, userId);
    const transactionData = await SQLite.getTableData(tableNames.TRANSACTION_TABLE, userId);
    const userQuery = convertToUpdateQuery(tableNames.USER_TABLE, userData, userId);
    const transactionQuery = convertToInsertQuery(tableNames.TRANSACTION_TABLE, transactionData);
    if (userQuery && transactionQuery) {
      const storagePath = await storeDataInStorage([userQuery, transactionQuery]);
      console.log('storagePath => ', storagePath); // getting storage path where data is stored
      setState(false);
      showMessage({
        message: 'Exported Successfully',
        description: storagePath,
        type: 'success',
        duration: 2500,
        icon: 'success',
      });
    } else {
      console.log('Something went wrong');
      showMessage({
        message: 'Something went wrong while exporting',
        description: 'Please try again!',
        type: 'danger',
        duration: 2500,
        icon: 'danger',
      });
    }
  };
  const handleImportBtn = async () => {
    const isImported = await importDataFromFile();
    setState(false);
    if (isImported) {
      dispatch(getUserTransactions(userId));
      // close the popup box
      showMessage({
        message: 'Imported Successfully',
        type: 'success',
        duration: 2500,
        icon: 'success',
      });
    } else {
      showMessage({
        message: 'Something went wrong while importing',
        description: 'Please check you file and try again!',
        type: 'danger',
        duration: 2500,
        icon: 'danger',
      });
    }
  };
  return (
    <ProfileModal state={state} setState={() => setState(false)}>
      <Text style={styles.title}>Select Type</Text>
      <TouchableOpacity style={styles.btnContainer} onPress={handleImportBtn}>
        <Text style={styles.importBtnTxt}>Import Data</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnContainer} onPress={handleExportBtn}>
        <Text style={styles.exportBtnTxt}>Export Data</Text>
      </TouchableOpacity>
    </ProfileModal>
  );
};

export default ExportImport;

const styles = StyleSheet.create({
  title: {
    color: '#000000',
    fontSize: 24,
    fontWeight: '600',
  },
  btnContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: Colours.PURPLE_THEME,
    borderRadius: 20,
    marginTop: 20,
  },
  importBtnTxt: {
    fontSize: 18,
    alignItems: 'center',
    fontWeight: 'bold',
    color: Colours.WHITE_PURE,
  },
  exportBtnTxt: {
    fontSize: 18,
    alignItems: 'center',
    fontWeight: 'bold',
    color: Colours.WHITE_PURE,
  },
});
