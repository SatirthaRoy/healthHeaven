import React, { useContext } from 'react'
import { Alldata } from '../Provider'

const useData = () => {
  const obj = useContext(Alldata);
  return obj;
}

export default useData