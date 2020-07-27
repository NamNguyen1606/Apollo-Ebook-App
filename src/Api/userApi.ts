import axiosClient from './axiosClient';

export default class UserApi {
  static getCustomerData = (token: string) => {
    let url: string = 'Customer/GetData';
    return axiosClient.get(url, {headers: {Token: token}});
  };
}
