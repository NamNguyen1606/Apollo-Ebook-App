import AsyncStorage from '@react-native-community/async-storage';
import UserInfo from '../Models/userInfo';
export default class StoreData {
  static setUserInfo = async (obj: any) => {
    try {
      const jsonValue = JSON.stringify(obj);
      await AsyncStorage.setItem('user_info', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  static getUserInfo = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('user_info');
      if (jsonData !== null) {
        let data = JSON.parse(jsonData);
        let userInfo = new UserInfo(
          data.CustomerID,
          data.Login,
          data.CustomerName,
          data.Email,
          data.Token,
        );
        return userInfo;
      } else {
        return null;
      }
    } catch (e) {
      // error reading value
    }
  };

  static clear = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {}
  };
}
