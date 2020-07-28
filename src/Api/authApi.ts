import axiosClient from './axiosClient';

export default class AuthApi {
  static loginByPassword(key: string, username: string, password: string) {
    const url: string = `Customer/Login?key=${key}`;
    return axiosClient.post(url, {
      authenticationtype: 'password',
      device: 'android',
      devicenumber: '123456',
      username: username,
      password: password,
    });
  }
}
