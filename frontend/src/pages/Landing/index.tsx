import React, {useState, useEffect, useContext} from 'react';

import api from '../../services/api'  

import Posts from '../../Components/PostGrid'
import Header from '../../Components/Header'
import AuthContext from '../../contexts/auth'

import {Post} from '../../utils/types'
import './styles.scss'


const Landing: React.FC = () => {
  const { signed, token, setSigned } = useContext(AuthContext)

  const [allPosts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    api.get('/posts').then(response => {
      setPosts(response.data)
    })
  }, [])

  useEffect(() => {
    if(signed) {
      api.get('/check', 
      {headers: {
        'Authorization': `Bearer ${token}`
      }}).then(response => {  
        if((!response.data)) {
          setSigned('none', false)
          localStorage.removeItem('token')
        }
      })
    }
  }, [setSigned, signed, token])

  return (
    <div>
     <Header/>
      <div className="allPosts">
          <Posts Posts={allPosts} />
      </div>
    </div>
  );
}

export default Landing;