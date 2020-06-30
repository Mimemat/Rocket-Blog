import React, {useContext} from 'react';
import {Link, useHistory} from 'react-router-dom'

import Logo from '../../assets/start-button.svg'
import {FiPlus, FiLogOut} from 'react-icons/fi'

import AuthContext from '../../contexts/auth'
import api from '../../services/api'

import './styles.scss'

const Header = () => {
  const {signed, token} = useContext(AuthContext)
  const history = useHistory()


  async function handleLogOut() {
    await api.get('/logout', {headers: {
      'Authorization': `Bearer ${token}`
    }})
    history.push('/')
  }

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
      {signed && (
        <button className="logout" onClick={handleLogOut}>
          Logout
          <FiLogOut size={14}/>
        </button>
      )}
    </div>
  </header>
  );
}

export default Header;