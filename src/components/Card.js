function Card(props) {
  
  function handleCardClick() {
    props.onCardClick(props.card);
  }

  return  (     
   <div className="element">                
     <img src={props.card.link} className="element__image" alt={props.card.name} onClick={handleCardClick}/>
     <button className="element__trash" type="button" title="Удалить фото"></button>
     <div className="element__footer">
       <h2 className="element__caption">{props.card.name}</h2> 
       <div className="element__heart-container">
         <button type="button" className="element__heart" title="like"></button>
         <span className="element__heart-counter">{props.card.likes.length}</span>
       </div>          
     </div>
   </div>
  )
}

export default Card;