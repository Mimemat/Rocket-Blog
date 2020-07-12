import React, { useState, useEffect } from 'react';
import { useParams, Redirect, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import CodeBlock from '../../utils/code-block'

import api from '../../services/api'
import {Post as PostKey} from '../../utils/types'
import Header from '../../Components/Header';
import { useGet } from '../../hooks/useGet'

import './styles.scss'

const Post: React.FC = () => {
  const {id} = useParams()
  // const [postExists, setPostExists] = useState<Boolean>(true)
  const {data: post, error} = useGet(`/post/${id}`)

  // useEffect(() => {
  //   api.get(`/post/${id}`).then(response => {
  //     if(!response.data){
  //       return setPostExists(false)
  //     }
  //     const postData: PostKey = response.data
  //     return setPost(postData)
  //   })
  // }, [id])

  if(error) {
    return <Redirect to="/"/>
  }

  return(
    <div className="postTab">
      <Header />
        <div className="postHead">
          <h1>{post?.title}</h1>
          <Link to={`/user/${post?.user_id}`}>Por {post?.author}</Link>
          <img alt={post?.title} src={post?.thumbnail}/>
        </div>
      <div className="postContent">
        <ReactMarkdown 
        className="postMd"
        renderers={{ code: CodeBlock }}
        source={post?.content}/>
      </div>
    </div>
  );
}

export default Post;