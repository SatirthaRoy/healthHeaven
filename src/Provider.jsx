import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import auth from '../firebase.config';

export const Alldata = createContext()

const Provider = ({children}) => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, loggedUser => {
      if(loggedUser) {
        setUser(loggedUser)
      } else {
        setUser(null);
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
    auth,
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