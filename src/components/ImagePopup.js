import React from 'react';
function ImagePopup(props) {
       
  if (!props.card) {
      return '';
  }
  
  return (    
      <div className={`popup popup_photo ${props.card ? 'popup_opened' : ''}`}>
        <div className="popup__container popup__container_photo">
          <button className="popup__close-icon popup__close-icon_photo" type="button" onClick={props.onClose}></button>
          <img className="popup__img" src={props.card.link} alt={props.card.name}/>
          <h2 className="popup__photo-description">{props.card.name}</h2>
        </div>
      </div>
  )
} 
export default ImagePopup;