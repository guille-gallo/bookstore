import Book from '../../app/domain/Book';
import { useState } from "react";

type BookEditFormProps = {
    book: Book;
    onSubmit: ({ id, title, author, price, cover_url, genre }) => void;
}

const BookEditForm = ( props: BookEditFormProps ) => {
    const id = props.book.id;
    const [title, setBookTitle] = useState(props.book.title);
    const [author, setBookAuthor] = useState(props.book.author);
    const [price, setBookPrice] = useState(props.book.price);
    const [cover_url] = useState(props.book.cover_url);
    const [genre, setGenre] = useState(props.book.genre);

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSubmit({ id, title, author, price, cover_url, genre });
    };

    return (
        <div className="element edit">
            <div style={{height: '200px'}}>
                <form onSubmit={handleSubmit}>
                    <div className="details">
                        <img src={props.book.cover_url} alt={title} />
                        <div style={{height: '10px'}}>
                            <label>
                                Title:
                                <input type="text" value={title} onChange={e => setBookTitle(e.target.value)} />
                            </label>
                            <label>
                                Author:
                                <input type="text" value={author} onChange={e => setBookAuthor(e.target.value)} />
                            </label>
                            <label>
                                Genre:
                                <select value={genre} onChange={e => setGenre(e.target.value)}>
                                    <option value="">Select a genre</option>
                                    <option value="Science Fiction">Science Fiction</option>
                                    <option value="History">History</option>
                                    <option value="Fantasy">Fantasy</option>
                                </select>
                            </label>
                            <label>
                                Price:
                                <input type="number" value={price} onChange={e => setBookPrice(e.target.value)} />
                            </label>
                        </div>
                    </div>
                    <div className="button-submit">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookEditForm;