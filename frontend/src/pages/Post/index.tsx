import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import CodeBlock from '../../utils/code-block'

import api from '../../services/api'
import {Post as PostKey} from '../../utils/types'
import Header from '../../Components/Header';


import './styles.scss'

const Post: React.FC = () => {
  const {id} = useParams()
  const [post, setPost] = useState<PostKey>()
  const [postExists, setPostExists] = useState<Boolean>(true)

  useEffect(() => {
    api.get(`/post/${id}`).then(response => {
      if(!response.data){
        return setPostExists(false)
      }
      const postData: PostKey = response.data
      return setPost(postData)
    })
  }, [id])

  return(
    !postExists ? <Redirect to="/"/> :
    <div className="postTab">
      <Header />
        <div className="postHead">
          <h1>{post?.title}</h1>
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