import React, {useRef, useContext} from 'react';
import {SubmitHandler, FormHandles} from '@unform/core'
import {useHistory, Redirect} from 'react-router-dom'
import {Form} from '@unform/web'
import * as Yup from 'yup'

import Input from '../../Components/Form/input'
import api from '../../services/api';

import './styles.scss'
import Header from '../../Components/Header';
import AuthContext from '../../contexts/auth'

const LogIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory()
  const { setSigned, signed } = useContext(AuthContext)

  const handleSubmit: SubmitHandler<FormData> = async (data) => {
  try{
    const schema = Yup.object().shape({
      email: Yup.string().required('Insira um email').email('Email Inválido'),
      password: Yup.string().required('Insira uma senha')
    })
    await schema.validate(data, {
      abortEarly: false
    })

    try {
    const response: {data:{ type: string, token: string}} = await api.post('/login', data)
    localStorage.setItem('token', response.data.token)
    setSigned(response.data.token)
    history.push('/create')
    }
    catch(err) {
      formRef.current?.setErrors({email: 'Senha ou e-mail incorretos'})
    }
  }
  catch(err) {
    if (err instanceof Yup.ValidationError) {
      const errorMessages: { [key: string]: string } = {};

      err.inner.forEach(error => [
        errorMessages[error.path] = error.message
      ])

      formRef.current?.setErrors(errorMessages)
    }
  }
  };

  return (
    signed ? <Redirect to="/create"/> :
  <div className="logInPage">
  <Header />
    <Form ref={formRef} onSubmit={handleSubmit} className="logInForm">
      <h1>Logue com sua conta</h1>
      <Input label="Seu e-mail" name="email" type="email"/>
      <Input name="password" type="password" label="Sua senha"/>
      <button type="submit">Entrar</button>
    </Form>
  </div>
  );
}

export default LogIn;