import axiosClient from './axiosClient';

class BookApi {
  static bookType: 'AllBooks' | 'TopSell';

  static getAll = (
    collection: 'AllBooks' | 'TopSell' | string,
    index: number,
    count: number,
    token: string,
  ) => {
    const url = `Book/Search?collection=${collection}&index=${index}&count=${count}&status=0`;
    return axiosClient.post(
      url,
      {search: '', author: ''},
      {headers: {Token: token}},
    );
  };

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

  static getDetailBook(id: number, token: string, cancelToken?: any) {
    const url = `Book/Detail?id=${id}`;
    return axiosClient.get(url, {
      headers: {Token: token},
      cancelToken: cancelToken || null,
    });
  }

  static getSuggestionBooks(id: number, token: string, cancelToken?: any) {
    const url = `Book/RefBooks?id=${id}`;
    return axiosClient.get(url, {
      headers: {token: token},
      cancelToken: cancelToken || null,
    });
  }
}

export default BookApi;
