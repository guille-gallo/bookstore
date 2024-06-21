import './App.css';
import MainPage from './pages/Main';
import MyProfilePage from './pages/MyProfile';
import BooksContext from './context/BooksContext';
import { addBook, deleteBook, editBook, findBooks } from './app/application/api/findBooks';
import { useState } from 'react';
import { findPurchases } from './app/application/api/findPurchases';

function App() {
  const [showProfile, setShowProfile] = useState(false);

  const handleMyProfileClick = () => {
    setShowProfile(!showProfile);
  };

  return (
    <BooksContext.Provider value={{ findBooks, addBook, editBook, deleteBook, findPurchases }}>
      {showProfile ? <MyProfilePage /> : <MainPage />}
      <button className='profile' onClick={() => handleMyProfileClick()}>
        {!showProfile ? 'My Profile' : 'Return'}
      </button>
    </BooksContext.Provider>
  );
}

export default App;
