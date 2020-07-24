export default class Book {
  private _name: string;
  private _author: string;
  private _img: string;

  constructor(name: string, author: string, img: string) {
    this._name = name;
    this._author = author;
    this._img = img;
  }

  get name(): string {
    return this._name;
  }
  set name(val: string) {
    this._name = val;
  }

  get author(): string {
    return this._author;
  }
  set author(val: string) {
    this._author = val;
  }

  get img(): string {
    return this._img;
  }
  set img(val: string) {
    this._img = val;
  }
}
