import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import auth from '../../firebase/firebase.init';
import axios from 'axios';


const googleProvider=new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const toggleTheme = () => {
        setIsDarkTheme((prev) => !prev);
        localStorage.setItem('theme', !isDarkTheme ? 'dark' : 'light');
    };

    useEffect(() => {
        // Load theme from localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkTheme(savedTheme === 'dark');
        }
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
    }, [isDarkTheme]);

    const createUser=(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }
    const userLogin=(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password);
    }

    const signInWithGoogle=()=>{
        return signInWithPopup(auth,googleProvider);
    }

    const logOut=()=>{
        return signOut(auth);
    }

    useEffect(()=>{
      const unsubscribe=  onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser);
            console.log('state captured', currentUser?.email);

            if (currentUser?.email) {
                const user = { email: currentUser.email };

                axios.post('http://localhost:5000/jwt', user, { withCredentials: true })
                    .then(res => {
                        console.log('login token', res.data);
                        setLoading(false);
                    })

            }
            else {
                axios.post('http://localhost:5000/logout', {}, {
                    withCredentials: true
                })
                .then(res => {
                    console.log('logout', res.data);
                    setLoading(false);
                })
            }
        })
        return ()=>{
            unsubscribe();
        }
    },[])

    const authInfo={
        user,
        loading,
        setLoading,
        isDarkTheme,
        toggleTheme,
        setUser,
        createUser,
        userLogin,
        signInWithGoogle,
        logOut


    }

    return (
       <AuthContext.Provider value={authInfo}>
          {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;