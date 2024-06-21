import { useState } from "react";

type BookEditFormProps = {
    onSubmit: ({ id, title, author, price, genre }) => void;
    onCancel: () => void;
}
let idCounter = 0;

const BookAddForm = ( props: BookEditFormProps )=> {
    const id = idCounter++;
    const [title, setBookTitle] = useState();
    const [author, setBookAuthor] = useState();
    const [price, setBookPrice] = useState();
    const [genre, setGenre] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Check if at least one field is populated
        if (!title && !author && !price) {
            alert('Please fill in at least one field before submitting.');
            return;
        }

        props.onSubmit({ id, title, author, price, genre });
    }

    return (
        <div className="element add">
                <form onSubmit={handleSubmit}>
                    <div className="details">
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
                    <div className="button-submit add">
                        <button onClick={props.onCancel}>Cancel</button>
                        <button type="submit">Add</button>
                    </div>
                </form>
            </div>
    )
};

export default BookAddForm;
