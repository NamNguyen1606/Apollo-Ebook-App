import axiosClient from './axiosClient';

export default class AuthApi {
  static loginByPassword(username: string, password: string) {
    const url: string = 'Customer/Login?key=rv7yjdz10sh0q06362ugd1n4gjpy4b';
    return axiosClient.post(url, {
      authenticationtype: 'password',
      device: 'android',
      devicenumber: '123456',
      username: username,
      password: password,
    });
  }
}
