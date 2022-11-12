import Logo from '../images/logo.svg';

function Header() {
    return (
        <header className="header">        
        <img src={Logo} className="header__logo" alt="Логотип"/>
      </header>
    );
}

export default Header;