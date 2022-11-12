import AvatarBlank from '../images/avatar_blank.jpg';

function Main(props) {
return (
    <main className="content">
    <section className="profile">
        <button className="profile__avatar-btn">
        <div className="profile__avatar-edit-img">
            <img src={AvatarBlank} className="profile__avatar" alt="Аватар автора фоторабот" onClick={props.onEditAvatarClick}/>
        </div>
    </button>
    <div className="profile__info">
        <h1 className="profile__info-name"></h1>
        <button name="edit" className="profile__edit-button" type="button" onClick={props.onEditProfileClick}></button>
        <p className="profile__info-description"></p>
    </div>
    <button name="add" type="button" className="profile__add-button" onClick={props.onAddPlaceClick}></button>
    </section>
    <section className="elements">
    </section>
    </main>
    )
};

export default Main;