import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';
import DocumentPicker from 'react-native-document-picker';
import SQLite from '../sqlite/sql';
import { showMessage } from 'react-native-flash-message';
import { FileSystem } from 'react-native-file-access';
export const storeDataInStorage = async query => {
  return new Promise(async (resolve, reject) => {
    try {
      if (Platform.OS === 'android') {
        const writePermission = await checkPermission(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
        const readPermission = await checkPermission(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
        if (writePermission && readPermission) {
          const tempDir = `${RNFS.TemporaryDirectoryPath}/storageFile.sql`;

          // creating file with the sql query at temp location
          const storagePath = await writeData(query, `${tempDir}`);
          if (storagePath) {
            // copying file from temp location to download directory
            await FileSystem.cpExternal(storagePath, `storageFile.sql`, 'downloads');
            await FileSystem.unlink(storagePath);
            const [path] = storagePath.split('com');
            const filePath = `${path}downloads/storageFile.sql`;
            resolve(filePath);
          } else {
            reject('Something went wrong while writing the file');
          }
        } else {
          // show error permission not granted and a button to open the popup
          // open setting logic
          await openSettings();
        }
      }
    } catch (error) {
      showMessage({
        message: 'Something went wrong',
        description: JSON.stringify(error),
        type: 'danger',
        duration: 2500,
        icon: 'danger',
      });
      console.log('error => ', error);
      reject(error);
    }
  });
};

export const importDataFromFile = async () => {
  try {
    const { uri } = await DocumentPicker.pickSingle();
    const { userData, tranactionData } = JSON.parse(await RNFS.readFile(uri, 'utf8'));
    const userResult = await parseQuery(userData);
    const transactionResult = await parseQuery(tranactionData);
    if (userResult && transactionResult) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    showMessage({
      message: 'Something went wrong',
      description: JSON.stringify(error),
      type: 'danger',
      duration: 2500,
      icon: 'danger',
    });
    console.log(error);
  }
};
const checkPermission = async permission => {
  const status = await check(permission);
  console.log('status => ', status);
  if (status == RESULTS.GRANTED) {
    return true;
  } else {
    const result = await request(permission);
    console.log('result => ', result);
    if (result == RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  }
};

const isDirExist = async dirPath => {
  return new Promise(async (resolve, reject) => {
    if (!dirPath) {
      reject('Directory path not present');
    } else {
      RNFS.readDir(dirPath)
        .then(() => resolve(true))
        .catch(() => resolve(false));
    }
  });
};

const createDir = async dirPath => {
  return new Promise((resolve, reject) => {
    if (!dirPath) {
      reject('Directory path not present');
    } else {
      console.log('creating Dir => ', dirPath);
      RNFS.mkdir(dirPath)
        .then(data => {
          console.log('data => ', data);
          resolve(true);
        })
        .catch(error => {
          console.log('error => ', error);
          resolve(false);
        });
    }
  });
};

const writeData = async (query, dirPath) => {
  return new Promise((resolve, reject) => {
    if (Array.isArray(query) && query.length > 0) {
      const obj = {
        userData: query[0],
        tranactionData: query[1],
      };
      RNFS.writeFile(dirPath, JSON.stringify(obj), 'utf8')
        .then(() => {
          console.log('Data exported to SQL file:', dirPath);
          resolve(dirPath);
        })
        .catch(error => {
          console.log('Error exporting data:', error);
          reject(error);
        });
    }
  });
};

const parseQuery = async query => {
  try {
    if (Array.isArray(query) && query.length > 0) {
      const queries = query.map(item => {
        return SQLite.parseDataFromFile(item);
      });
      const data = await Promise.all(queries);
      console.log('multiple data => ', data, typeof data);
      return data.length > 0 ? true : false;
    } else {
      const data = await SQLite.parseDataFromFile(query);
      console.log('single data => ', data, typeof data);
      return data === 1 ? true : false;
    }
  } catch (error) {
    throw error;
  }
};
