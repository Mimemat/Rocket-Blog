import React from 'react';
import {Link} from 'react-router-dom'

import Logo from '../../assets/start-button.svg'
import {FiPlus} from 'react-icons/fi'

import './styles.scss'

const Header: React.FC = () => {
  return (
  <header className="pageHeader">
    <div className="headerContent">
    <Link to="/">
      <img src={Logo} alt="Rocket-blog"/>
    </Link>
      <span className="divider"/>
      <Link to="/login" className="create">
        Criar 
        <FiPlus size={16}/>
      </Link>
    </div>
  </header>
  );
}

export default Header;