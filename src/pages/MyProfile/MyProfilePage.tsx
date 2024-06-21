import { useContext, useEffect, useState } from "react";
import BooksContext from '../../context/BooksContext';
import Purchase from "../../app/domain/Purchase";
import User from "../../app/domain/User";
import Header from "../../components/Header";

export default function MyProfilePage() {
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [user, setUser] = useState<User>();
    const totalAmount = purchases.reduce((acc, purchase) => { 
        return acc + purchase.books.reduce((acc, book) => acc + book.price, 0);
    }, 0);
    
    type PurchasesType = () => Promise<{ data: Purchase[]; error: unknown }>;

    const booksContext = useContext(BooksContext) as Record<string, PurchasesType>;

    useEffect(() => {
        (async () => {
          const { data } = await booksContext.findPurchases();
          if (data) {
            setUser(data[0].user)
            setPurchases(data);
          } 
        })();
      }, [booksContext]);

    return (
        <div className="container">
            <div className="user-details">
                <div><label>User: </label>{user?.name}</div>
                <div><label>Email: </label>{user?.email}</div>
            </div>
            
            <div className="purchases">
                <Header>My Purchases</Header>
                <div className="total-amount">
                    <div className="total-label">Total amount spent: </div>
                    <div className="total-value">{totalAmount}</div>
                </div>
                <div className="books">
                    <label className="subheading">Books</label>
                    {purchases?.map((purchase) => {
                        return purchase.books.map((book) => {
                            return (
                                <div className="book-details" key={book.id}>
                                    <ul>
                                        <li><label>Title: </label><div>{book.title}</div></li>
                                        <li><label>Genre: </label><div>{book.genre}</div></li>
                                        <li><label>Price: </label><div>{book.price}</div></li>
                                    </ul>
                                </div>
                            )
                        });
                    })}
                </div>
                
            </div>
        </div>
    )
}
