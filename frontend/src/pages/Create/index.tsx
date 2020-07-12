import React, {useContext, useState, ChangeEvent, FormEvent, useEffect} from 'react';
import {Redirect, useHistory} from 'react-router-dom'
import * as Yup from 'yup'

import Header from '../../Components/Header'
import Dropzone from '../../Components/Dropzone'

import AuthContext from '../../contexts/auth'

import './styles.scss'
import api from '../../services/api';


interface Post {
  title: string,
  content: string
}

const Create: React.FC = () => {
  const {signed, token} = useContext(AuthContext)
  const [image, setSelectedImage] = useState<File>()
  const [postData, setPostData] = useState<Post>({
    title: '',
    content: ''
  })
  const history = useHistory()

  useEffect(() => { console.log(signed)}, [signed])

  function handleInputChange (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
    const {name, value} = event.target
    
    setPostData({...postData, [name]: value})
  }

  async function handleSubmit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log(image)
    try{
    const schema = Yup.object().shape({
      title: Yup.string().required('Insira um Título'),
      content: Yup.string().required('Insira o conteúdo do post'),
      image: Yup.mixed().required('Coloque uma thumbnail')
    })
    await schema.validate({...postData, image}, {
      abortEarly: false
    })
      try {
        const data = new FormData()
        data.append('title', postData.title)
        data.append('content', postData.content)
        if(image) {
          data.append('thumbnail', image)
        }

        const postId = await api.post('/posts', data, {headers: {
          'Authorization': `Bearer ${token}`
        }})
        history.push(`/post/${postId.data.id}`)
      }
      catch(err){
        alert('Algo deu errado, tente novamente mais tarde')
      }
    }
    catch(err) {
      if (err instanceof Yup.ValidationError){
        alert(err.inner[0].errors[0])
      }
    }

    
  }

  return ( !signed ? <Redirect to="/"/> :
  <div className="createPost">
  <Header />
    <div className="createPost-content">
      <form onSubmit={handleSubmit}>
        <h1>Criar um post</h1>
        <input type="name" name="title" placeholder="Título" onChange={handleInputChange}/>
        <Dropzone name="Thumbnail" onFileUploaded={setSelectedImage}/> 
          <textarea 
          onChange={handleInputChange}
          name="content" 
          placeholder="Escreva aqui seu conteúdo em markdown. Enquanto não possuímos uma função de preview, use ferramentas como StackEdit"
          />
        <button type="submit">Ok</button>
        </form>
    </div>
  </div>
  );
}

export default Create;