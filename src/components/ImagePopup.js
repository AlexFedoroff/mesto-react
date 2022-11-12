function ImagePopup() {
    return (    
        <div className="popup popup_photo">
        <div className="popup__container popup__container_photo">
        <button className="popup__close-icon popup__close-icon_photo" type="button"></button>
        <img className="popup__img" src="#" alt=""/>
        <h2 className="popup__photo-description">Some description</h2>
        </div>
        </div>
    )
} 
export default ImagePopup;