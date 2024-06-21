import { useContext, useEffect, useState } from 'react';
import Book from '../../app/domain/Book';
import BooksContext from '../../context/BooksContext';
import Header from '../../components/Header';
import BookEditForm from '../../components/BookEditForm';
import InfiniteScroll from 'react-infinite-scroller';
import BookAddForm from '../../components/BookAddForm';

export default function MainPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBookId, setEditingBookId] = useState<number | null>(null);
  const [showingDetailsBookId, setShowingDetailsBookId] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowDetails, setIsShowDetailsOpen] = useState(false);
  const [isEditingOpen, setIsEditingOpen] = useState(false);
  const [isNewBookOpen, setIsNewBookOpen] = useState(false);
  const [newBookAdded, setNewBookAdded] = useState(false);
  const [displayRestart, setDisplayRestart] = useState(false);
  const [errorCode, setErrorCode] = useState(null);

  type FindBooksType = (params?: { page?: number; perPage?: number }) => Promise<{ data: Book[]; error: unknown }>;

  const booksContext = useContext(BooksContext) as Record<string, FindBooksType>;

  useEffect(() => {
    (async () => {
      const { data, error } = await booksContext.findBooks({ page: 1, perPage: 5 });
      
      if ( error) {
          setHasMore(false);
          setDisplayRestart(true);
          setErrorCode(error);
          console.log('Error while finding books: ', error)
          // Reload the page
          setTimeout(() => {
            window.location.reload();
          }, 1000);
      }
      if (data) {
        setBooks(data);
      }
    })();
  }, [booksContext]);



  const handleEditClick = (id: number) => {
    setEditingBookId(id);
    setIsEditingOpen(!isEditingOpen);
  };

  const handleEditSubmit = async (editedBook) => {

    await booksContext.editBook(editedBook);
    
    setBooks(prevBooks => {
      return prevBooks.map(book => 
          book.id === editedBook.id ? editedBook : book
      );
    });
    setEditingBookId(null);
    setIsEditingOpen(false);
  };

  const handleAddNewSubmit = async (newBook) => {
    await booksContext.addBook(newBook);
    setBooks(prevBooks => [newBook, ...prevBooks]);
    setNewBookAdded(true)
    setIsNewBookOpen(false);
  };

  const handleShowDetailsClick = (id: number) => {
    setShowingDetailsBookId(id);
    setIsShowDetailsOpen(!isShowDetails);
  };

  const handleDeleteClick = async (id: number) => {
    await booksContext.deleteBook({ id });
    setBooks(books.filter(book => book.id !== id));
  };

  const fetchData = async (page: number) => {
      setIsLoading(true);
      try {
        if (newBookAdded) {
          page = page + 1;
          setNewBookAdded(false);
        }
        const { data, error } = await booksContext.findBooks({ page: page, perPage: 5 });

        if (error) {
          setHasMore(false);
          setDisplayRestart(true);
          setErrorCode(error);
          console.log('Error while finding books: ', error)
          // Reload the page
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
        
        if (data) {
          if (data === undefined) {
            setHasMore(false);
            return;
          }
  
          if (data?.length === 0) {
            setHasMore(false);
            return;
          }

          setBooks([...books, ...data]);
          setIsLoading(false);
        }
        
      } catch (error) {
        setHasMore(false);
        return;
      }
  };

  const loadItems = (page) => {
    if (!isLoading && books.length > 0) {
      fetchData(page)
    }
  }

  const handleAddNewClick = () => {
    setIsNewBookOpen(!isNewBookOpen);
  };

  const handleAddNewCancel = () => {
    setIsNewBookOpen(false);
  };

  return (
    <div className="container">
      {!isNewBookOpen && !displayRestart &&
        <>
          <InfiniteScroll
            pageStart={0}
            loadMore={loadItems}
            hasMore={hasMore}
            useWindow={false}
          >
            <div style={{height: '400px'}}>
                  {books?.map((eachBook: Book) => {
                    return (
                      <div className="element" key={eachBook.id}>
                        {editingBookId === eachBook.id && isEditingOpen? (
                          <BookEditForm book={eachBook} onSubmit={handleEditSubmit} />
                        ) : (
                          <div className='details-wrapper'>
                            <Header>{eachBook.title}</Header>
                            <div className="details">
                              {/* Book cover: */}
                              {!eachBook.cover_url && <img src="https://via.placeholder.com/50" alt={eachBook.title} />}
                              {eachBook.cover_url && <img src={eachBook.cover_url} alt={eachBook.title} />}
                              
                              {/* Details button: */}
                              <div className="button-details">
                                <button onClick={() => handleShowDetailsClick(eachBook.id)}> 
                                  {showingDetailsBookId === eachBook.id && isShowDetails ? '- Details' : '+ Details'}
                                </button>
                              </div>

                              {/* Book details: */}
                              {showingDetailsBookId === eachBook.id && isShowDetails && (
                                <div className="info">
                                  <p>Author: {eachBook.author}</p>
                                  <p>Genre: {eachBook.genre}</p>
                                  <p>Price: {eachBook.price}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Edit/cancel button: */}
                        <button onClick={() => handleEditClick(eachBook.id)} className='edit'>
                          {editingBookId === eachBook.id && isEditingOpen ? 'Cancel' : 'Edit'}
                        </button>
                          
                        {/* Delete button: */}
                        {!isEditingOpen && 
                          <button onClick={() => handleDeleteClick(eachBook.id)} className='delete'>
                            Delete
                          </button>
                        }
                        
                      </div>
                    );
                  })}
                  {isLoading && hasMore &&<div className='loading'>Loading...</div>}
              </div>
              
            </InfiniteScroll>
            
            <button style={{position: 'absolute', fontSize: '18px', marginTop: '12px'}} onClick={() => handleAddNewClick()}>
             { "Add Book"}
            </button>
        </>
      }
      {isNewBookOpen && 
        <BookAddForm onSubmit={handleAddNewSubmit} onCancel={handleAddNewCancel} />
      }
      {!isNewBookOpen && !displayRestart &&
        <div className="scroll-label">
          <span style={{position: 'absolute', left: '120px'}}>Scroll down to see more books!</span>
        </div>
      }
      {displayRestart && 
        <>
          {errorCode && <p>Error code: {errorCode.code}</p>}
          <p>Something went wrong. Application is restarting...</p>
        </>
      }
    </div>
  );
}
