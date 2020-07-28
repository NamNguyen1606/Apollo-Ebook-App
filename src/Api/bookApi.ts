import axiosClient from './axiosClient';

class BookApi {
  static getAllNewBook = (index: number, count: number, token: string) => {
    const url = `Book/Search?collection=AllBooks&index=${index}&count=${count}&status=0`;
    return axiosClient.post(
      url,
      {search: '', author: ''},
      {headers: {Token: token}},
    );
  };
  static getAllBestSellerBook = (
    index: number,
    count: number,
    token: string,
  ) => {
    const url = `Book/Search?collection=TopSell&index=${index}&count=${count}&status=0`;
    return axiosClient.post(
      url,
      {search: '', author: ''},
      {headers: {Token: token}},
    );
  };
}

export default BookApi;
