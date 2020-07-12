import React, {useState, useEffect, useContext, useCallback} from 'react';

import api from '../../services/api'  

import Posts from '../../Components/PostGrid'
import Header from '../../Components/Header'
import AuthContext from '../../contexts/auth'

import {Post} from '../../utils/types'
import './styles.scss'
import { useGet } from '../../hooks/useGet';


const Landing: React.FC = () => {
  const { signed, token, setSigned } = useContext(AuthContext)

  const {data: allPosts} = useGet<Post[]>('/posts')

  const checkAuthInfo = useCallback(() => {
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

  useEffect(() => {
    checkAuthInfo()
  }, [ checkAuthInfo ])

  if(!allPosts) {
    return <p>Loading</p>
  }

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