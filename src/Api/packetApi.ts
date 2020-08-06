import axiosClient from './axiosClient';
export default class PacketApi {
  static getPacket = (
    token: any,
    index: number,
    count: number,
    status: number,
    cancelToken?: any,
  ) => {
    const url = `Packet/Search?index=${index}&count=${count}&status=${status}`;
    return axiosClient.post(
      url,
      {search: '', author: ''},
      {headers: {Token: token}, cancelToken: cancelToken || null},
    );
  };

  static getDetailPacket = (token: any, id: string) => {
    const url = `Packet/Detail?id=${id}`;
    return axiosClient.get(url, {headers: {Token: token}});
  }
}
