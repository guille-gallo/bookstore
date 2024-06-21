import BaseEntity from './BaseEntity';
import User from './User';
import Book from './Book';

export default class Purchase extends BaseEntity {
  user?: User;
  books: Book[] = [];
}
