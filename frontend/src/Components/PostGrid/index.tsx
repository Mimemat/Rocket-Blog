import React, {useCallback} from 'react';

import './styles.scss'

import { Post } from '../../utils/types'
import { Link } from 'react-router-dom';

interface props {
  Posts: Post[]
}

const PostThumbnail = ({ Posts }: props) => {

  const convertDate =  useCallback((receivedDate: string) => {
    const date = new Date(receivedDate)
    const dateInMilis = date.getTime()

    const currentTime = Date.now()

    const resultInDays = Math.floor((currentTime - dateInMilis) / (60*60*24*1000))
    const resultInHours =  Math.floor((currentTime - dateInMilis) / (60*60*1000))

    return resultInDays === 0 ? `${resultInHours} horas` : `${resultInDays} dias`
  }, [])
  
  return (
  <div className="PostsGrid">
    {Posts.map(post => (
      <a 
      style={{
      background: `linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6) ), url(${post.thumbnail}) center center no-repeat`, 
      backgroundSize: 'cover'}} 
        className="postA" key={post.id}
        href={`/post/${post.id}`}>

        <h2>{post.title}</h2>
        <div className="postSubText">
          <Link to={`/user/${post.author}`}>Por {post.author}</Link>
          <p>Há {convertDate(post.created_at)} atrás</p>
        </div>
      </a>
    ))}
  </div>
  );
}

export default PostThumbnail;