import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import auth from '../../firebase/firebase.init';

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);

    const createUser=(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }
    const userLogin=(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password);
    }

    useEffect(()=>{
      const unsubscribe=  onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser);
            console.log('State captured',currentUser)
            setLoading(false);
        })
        return ()=>{
            unsubscribe();
        }
    },[])

    const authInfo={
        user,
        loading,
        setUser,
        createUser,
        userLogin

    }

    return (
       <AuthContext.Provider value={authInfo}>
          {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;