export default class Book {
  status: boolean;
  author: string;
  id: number;
  imgUrl: string;
  fileSize: string;
  price: number;
  publicYear: number;
  title: string;
  total: number;
  summary: string;

  constructor(
    status?: boolean,
    author?: string,
    id?: number,
    imgUrl?: string,
    fileSize?: string,
    price?: number,
    publicYear?: number,
    title?: string,
    total?: number,
    summary?: string,
  ) {
    this.id = id || 0;
    this.status = status || true;
    this.author = author || '';
    this.imgUrl = imgUrl || '';
    this.fileSize = fileSize || '';
    this.price = price || 0;
    this.publicYear = publicYear || 0;
    this.title = title || '';
    this.total = total || 0;
    this.summary = summary || '';
  }
}
