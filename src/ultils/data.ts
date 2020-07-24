import Book from '../Models/book';
export default class Data {
  static bookList: Book[] = [
    new Book(
      'Silence of the Lambs',
      'Thomas Harris',
      'https://salt.tikicdn.com/cache/w1200/media/catalog/product/t/h/the-silence-of-the-lambs.jpg',
    ),
    new Book(
      'Hanibal',
      'Thomas Harris',
      'https://images-na.ssl-images-amazon.com/images/I/916r5w-WVJL.jpg',
    ),
    new Book(
      'Red Dragon',
      'Toms Vladimir',
      'https://images-na.ssl-images-amazon.com/images/I/81zvl3KfEIL.jpg',
    ),
  ];
}
