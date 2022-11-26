import { useState, useEffect } from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Loader from './Loader';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ConfirmPopup from './ConfirmPopup';
import ImagePopup from './ImagePopup';
import Api from '../utils/api';
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [loaderState, setLoader] = useState({isOpen:true});
  
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCardForDelete, setSelectedCardForDelete] = useState(null);  
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);  
  const [isDataRetrieving, setIsDataRetrieving] = useState(false);

  function handleEditProfileClick () {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);    
  }
  
  function handleAddPlaceClick () {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card)    
    setImagePopupOpen(!isImagePopupOpen);
  }
  
  function handleUpdateAvatar(data) {
    setIsDataRetrieving(true);
    Api
     .editAvatar(data)
     .then((res) => {
       setCurrentUser(res);
       closeAllPopups();
     })
      .catch((err) => {
        setLoader({isOpen:true, errMsg:err});
     })
      .finally(() => {
        setIsDataRetrieving(false);
     });
  }

  function handleUpdateUser(data) {
    setIsDataRetrieving(true);
    Api
      .editUserInfo(data)
      .then((res) => {        
        setCurrentUser(res);
        closeAllPopups();      
    })
    .catch((err) => {
      setLoader({isOpen:true, errMsg:err});
    })
    .finally(() => {
      setIsDataRetrieving(false);
    });
  }  
  
  function handleCardLike(card) {        
    const isLiked = card.likes.some(i => i._id === currentUser._id);       
    Api
      .toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    })
  } 
    
  function handleCardDelete (card) {
    Api
      .deleteCard(card._id)
      .then(() => {      
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(()=>closeAllPopups());
  }

  function handleAddPlace(data) {
    setIsDataRetrieving(true);
    Api
      .addCard(data)
      .then((res) => {        
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {        
        setLoader({isOpen:true, errMsg:err});
      })
      .finally(() => {
        setIsDataRetrieving(false);
    });
  }

  function handleConfirmOpen(card){    
    setConfirmPopupOpen(true);
    setSelectedCardForDelete(card);
  }

  function closeAllPopups() {      
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
    setImagePopupOpen(false);
    setConfirmPopupOpen(false);
  }

  useEffect(() => {    
    Promise.all([
        Api.getUserInfo(),
        Api.getCards()
      ])    
      .then((data) => {
        const [userData, cards] = data;
        setCurrentUser(userData);        
        setCards(cards);        
     })
     .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoader({isOpen:false, errMsg:''});
    })
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <Header />
        <Main 
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleConfirmOpen}
          cards={cards}
        />
        <Footer />
        <Loader isOpen={loaderState.isOpen} errMsg={loaderState.errMsg}/>
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isDataRetrieving={isDataRetrieving}
        />
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          isDataRetrieving={isDataRetrieving}
        /> 
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isDataRetrieving={isDataRetrieving}
        />
        <ConfirmPopup
          isOpen={isConfirmPopupOpen} 
          card={selectedCardForDelete}
          onSubmit={handleCardDelete} 
          onClose={closeAllPopups} />
        
      <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups}/>
    </div>
  </CurrentUserContext.Provider>
  );
}

export default App;