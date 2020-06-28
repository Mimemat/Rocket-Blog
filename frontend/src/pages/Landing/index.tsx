import React, {useState, useEffect} from 'react';

import api from '../../services/api'  

import Posts from '../../Components/PostGrid'
import Header from '../../Components/Header'

import './styles.scss'

import {Post} from '../../utils/types'

const Landing: React.FC = () => {
  const [allPosts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    api.get('/posts').then(response => {
      setPosts(response.data)
    })
  }, [])

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