import React,{ createContext, useState } from 'react';

const AuthContext = createContext({signed:false, token: 'none', setSigned:(token: string, force?: boolean) => {}});

export const AuthProvider: React.FC = ({ children }) =>{
    const localToken = localStorage.getItem('token')

    const [tokenPassed, setToken] = useState(localToken !== null ? String(localToken) : 'none')

    const localAuth = tokenPassed !== 'none' ? true : false;

    const [signedPassed, setSignedPassed] = useState(localAuth)

    function changeAuth(token: string, force: boolean = true){
        setSignedPassed(force)
        setToken(token)
    }


    return(
    <AuthContext.Provider value={{signed: signedPassed, token: tokenPassed ,setSigned: changeAuth}}>
    {children}
    </AuthContext.Provider>
)}
export default AuthContext
