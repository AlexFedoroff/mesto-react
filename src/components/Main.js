import React from 'react';
import { useState } from 'react';
import api from '../utils/api';
import Card from './Card';

function Main(props) {

  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([
        api.getUserInfo(),
        api.getCards()
      ])    
      .then((data) => {
        const [userData, cards] = data;        
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(cards);        
     })
     .catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <main className="content">
    <section className="profile">
        <button className="profile__avatar-btn">
        <div className="profile__avatar-edit-img">
          <img src={userAvatar} className="profile__avatar" alt="Аватар автора фоторабот" onClick={props.onEditAvatarClick}/>
        </div>
    </button>
    <div className="profile__info">
        <h1 className="profile__info-name">{userName}</h1>
        <button name="edit" className="profile__edit-button" type="button" onClick={props.onEditProfileClick}></button>
        <p className="profile__info-description">{userDescription}</p>
    </div>
    <button name="add" type="button" className="profile__add-button" onClick={props.onAddPlaceClick}></button>
    </section>
    <section className="elements">
      {cards.map((card) => (
        <Card           
          card={card} 
          key={card._id}
          onCardClick={props.onCardClick}
        />
      ))}
    </section>
    </main>
    )
};

export default Main;