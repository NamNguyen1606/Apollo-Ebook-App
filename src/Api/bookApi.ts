import axiosClient from './axiosClient';

class BookApi {
  static getAll = (params: any) => {
    const url = '/book';
    return axiosClient.get(url, {params});
  };
}

export default BookApi;
