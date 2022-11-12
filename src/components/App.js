import { useEffect, useState } from "react";
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);

  function handleEditProfileClick () {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);    
  }
  
  function handleAddPlaceClick () {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function closeAllPopups() {      
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
  }

  return (
    <div className="root">
      <Header />
      <Main 
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onEditAvatarClick={handleEditAvatarClick}
      /> 
      
      <Footer />    

      <PopupWithForm name="edit" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} saveBtnText="Сохранить">
        <input className="popup__field popup__field_name" type="text" name="name" placeholder="Имя" id="input-name" minlength="2" maxlength="40" required/>
        <span className="popup__error popup__error_input-name" id="input-name-error"></span>
        <input className="popup__field popup__field_description" type="text" name="about" id="input-description" placeholder="Описание" minlength="2" maxlength="200" required/>
        <span className="popup__error popup__error_input-description" id="input-description-error"></span>        
      </PopupWithForm>
      
      <PopupWithForm name="add" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} saveBtnText="Создать">
        <input className="popup__field popup__field_title" type="text" name="name" placeholder="Название" id="input-title" minlength="2" maxlength="30" required/>
        <span className="popup__error popup__error_input-title" id="input-title-error"></span>
        <input type="url" className="popup__field popup__field_link" name="link" id="input-link" placeholder="Ссылка на картинку" required/>
        <span className="popup__error popup__error_input-link" id="input-link-error"></span>
      </PopupWithForm>

      <PopupWithForm name="edit-avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} saveBtnText="Сохранить">
        <input type="url" name="avatarLink" value="" placeholder="Ссылка на картинку" className="popup__field popup__field_avatar-url" id="avatar-field" required/>
        <span className="popup__error popup__error_avatar-field"></span>
      </PopupWithForm>    
    
    <div className="popup popup_delete-card">
      <div className="popup__container">
        <button className="popup__close-icon popup__close-icon_confirm-delete" type="button"></button>
          <h2 className="popup__title popup__title_confirm-delete">Вы уверены?</h2>
          <form className="popup__form popup__form_confirm-delete" name="confirm-delete" novalidate>              
              <button type="submit" className="popup__save-btn popup__save-btn_confirm-delete">Да</button>
          </form>
      </div>
    </div>
    
    <ImagePopup />

    <template id="element-template">
      <div className="element">                
        <img src="#" className="element__image" alt=""/>
        <button className="element__trash" type="button" title="Удалить фото"></button>        
        <div className="element__footer">
          <h2 className="element__caption"></h2>                    
          <div className="element__heart-container">
            <button type="button" className="element__heart" title="like"></button>
            <span className="element__heart-counter">0</span>            
          </div>          
        </div>
      </div>
    </template>    
  </div>
  );
}

export default App;
