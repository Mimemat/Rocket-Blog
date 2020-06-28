  import React,{ createContext, useState } from 'react';

const AuthContext = createContext({signed:false, token: 'none', setSigned:(token: string) => {}});

export const AuthProvider: React.FC = ({ children }) =>{
    const localToken = localStorage.getItem('token')

    const [tokenPassed, setToken] = useState(localToken !== null ? String(localToken) : 'none')

    const localAuth = localToken !== null ? true : false;

    const [signedPassed, setSignedPassed] = useState(localAuth)

    function changeAuth(token: string){
        setSignedPassed(true)
        setToken(token)
    }


    return(
    <AuthContext.Provider value={{signed: signedPassed, token: tokenPassed ,setSigned: changeAuth}}>
    {children}
    </AuthContext.Provider>
)}
export default AuthContext
