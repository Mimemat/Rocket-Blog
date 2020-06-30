import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form } from '@unform/web'
import {SubmitHandler, FormHandles} from '@unform/core'
import Lottie, {Options} from 'react-lottie'
import * as Yup from  'yup'
import Dropzone from '../../Components/Dropzone'

import Header from '../../Components/Header'
import animationData from '../../assets/lottie/checkmark.json'
import Input from '../../Components/Form/input'
import api from '../../services/api'
import './styles.scss'

interface FormData{
  name: string;
  email: string;
  password: string;
  password_confirmation: string
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const history = useHistory()
  const [success, setSuccess] = useState<Boolean>(false)
  const [pfp, setPfp] = useState<File>()

  const LottieOptions: Options = {
    animationData,
    loop: false,
    autoplay: true,
    rendererSettings: {
      
    }
  }

  const handleSubmit: SubmitHandler<FormData> = async (data) => {
    try{
      const schema = Yup.object().shape({
        name: Yup.string().required('Um nome é obrigatório').max(100, 'No máximo 100 caracteres'),
        email: Yup.string().required('Insira um email').email('Email Inválido'),
        password: Yup.string().required('Uma senha é obrigatória'),
        password_confirmation: Yup.string().oneOf([Yup.ref('password'), undefined], 'Ambas as senhas deve ser iguais'),
        pfp: Yup.mixed().required('Uma foto de perfil é obrigatória')
      })  
      await schema.validate({...data, pfp}, {
        abortEarly: false
      })
      try{
        const { email, name, password, password_confirmation  } = data
        
        const passedData = new FormData()

        passedData.append('email', email)
        passedData.append('name', name)
        passedData.append('password', password)
        passedData.append('password_confirmation', password_confirmation)
        if(pfp) { passedData.append('pfp', pfp) }

        await api.post('/sign', passedData)

        setSuccess(true)
      }
      catch(err) {
        if(err.response.status === 422) {
          console.log(err.response.data)
          const errorResponse: {field: string, message: string, rule: string}[] = err.response.data.errors
          const errorMessages: { [key: string]: string } = {};
          errorResponse.forEach((error => [
            errorMessages[error.field] = error.message
          ]))
          formRef.current?.setErrors(errorMessages)
        }
      }
    }
    catch(err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages: { [key: string]: string } = {};
        err.inner.forEach(error => [
          errorMessages[error.path !== 'pfp' ? error.path : 'name'] = error.message
        ])
        formRef.current?.setErrors(errorMessages)
      }
    }
  }

  return (
    success ? 
    <div className="successAnimation">
      <Lottie 
      style={{alignSelf: 'center'}}
      width="80%"
      height="80%"
      options={LottieOptions} 
      eventListeners={[
        {
          eventName: 'complete',
          callback: () => {history.push('/')}
        }
      ]}/>
    </div>
  : 
  <div className="signup">
    <Header />
    <Form  ref={formRef} onSubmit={handleSubmit} className="signUpForm">
      <h1>Crie uma conta</h1>
      <div className="field">
        <Input name="name"  label="Seu nome"/>
      </div>
      <div className="field">
        <Input name="email"  label="Seu email"/>
      </div>
      <div className="field-group">
        <div className="field">
          <Input name="password" type="password" label="Sua senha"/>
        </div>
        <div className="field">
          <Input name="password_confirmation" type="password" label="Confirme sua senha"/>
        </div>
      </div>
      <div className="field">
        <Dropzone 
        name="Foto de perfil" onFileUploaded={setPfp} />
      </div>
      <button type="submit">Entrar</button>
    </Form>
  </div>
  );
}

export default SignUp;