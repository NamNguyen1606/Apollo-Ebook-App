import axiosClient from './axiosClient';

export default class CategoryApi {
  static getCategory = (token: string) => {
    const url = 'Dic/Collections';
    return axiosClient.get(url, {headers: {Token: token}});
  };
}
