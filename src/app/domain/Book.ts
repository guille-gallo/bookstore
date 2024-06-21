import BaseEntity from './BaseEntity';

export default class Book extends BaseEntity {
  title?: string = '';
  author?: string = '';
  price?: number = 0;
  cover_url?: string = '';
  genre?: 'Science Fiction' | 'History' | 'Fantasy' | '' = '';

  constructor(id: number, title: string, author: string, price: number, cover_url: string, genre: '') {
    super(id);

    this.title = title;
    this.author = author;
    this.price = price;
    this.cover_url = cover_url;
    this.genre = genre;
  }
}
