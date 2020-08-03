export default class Book {
  status: boolean;
  author: string;
  authorMore: string;
  id: number;
  imgUrl: string;
  fileSize: string;
  price: number;
  publicYear: number;
  title: string;
  total: number;
  summary: string;
  publisher: string;
  subject: string;
  page: number;

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
    authorMore?: string,
    publisher?: string,
    subject?: string,
    page?: number,
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
    this.authorMore = authorMore || '';
    this.publisher = publisher || '';
    this.subject = subject || '';
    this.page = page || 0;
  }
}
