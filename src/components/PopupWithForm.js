function PopupWithForm(props) {                
    return (                
    <div className={`popup popup_${props.name}${props.isOpen && " popup_opened"}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <button className={`popup__close-icon popup__close-icon_${props.name}`} type="button" onClick={props.onClose}></button>
        <form className="popup__form" name={`popup-form-${props.name}`} noValidate>
        {props.children}
         <button className={`popup__save-btn popup-save-btn_${props.name}`} type="submit">{props.saveBtnText}</button>        
        </form>
       </div>
    </div>
 )
}

export default PopupWithForm;
