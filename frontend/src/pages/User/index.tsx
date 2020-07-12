import React, {useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

import { User as UserType } from '../../utils/types'
import api from '../../services/api'
import Header from '../../Components/Header'
import PostGrid from '../../Components/PostGrid'

import './styles.scss'

const User: React.FC = () => {
  const { userName } = useParams()

  const [userInfo, setUserInfo] = useState<UserType>()


  useEffect(() => {
    api.get(`/users/${userName}`).then(response => {
      setUserInfo(response.data)
    })
  }, [ userName ])

  

  return (
    <div className="userPage">
      <Header/>
      <div className="userPage-content">
        <div className="userInfo">
          <h1>
            {userInfo?.name}
          </h1>
          <p>{userInfo?.email}</p>
          <img src={userInfo?.pfp} alt={userInfo?.name}/>
        </div>
      {userInfo?.posts && <PostGrid Posts={userInfo.posts}/>}
      </div>
    </div>
  );
}

export default User;