import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import auth from '../firebase.config';

export const Alldata = createContext()

const Provider = ({children}) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, loggedUser => {
      if(loggedUser) {
        setUser(loggedUser);
        setLoading(false)
      } else {
        setUser(null);
        setLoading(false);
      }
    })

    return () => unsubscribe();
  }, [])

  const logInWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logOut = () => {
    return signOut(auth);
  }

  const obj = {
    user,
    setUser,
    auth,
    loading,
    logInWithEmail,
    logOut
  }

  return (
    <Alldata.Provider value={obj}>
      {children}
    </Alldata.Provider>
  )
}

export default Provider