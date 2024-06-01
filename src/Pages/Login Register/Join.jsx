import React, {useState } from 'react'
import Login from './Login'
import Register from './Register'
import {AnimatePresence, delay, motion} from 'framer-motion'


const joinVarient = {
  initial: {
    translateY: '100%',
    scale: .9
  },
  display: {
    scale: 1,
    translateY: '0',
    transition: {duration: .7}
  },
  hidden: {
    translateY: [0, '30%','100%' ],
    scale: [1, .9, .9],
    transition: { times: [0, .3, 1], duration: .7}
  }
}

const Join = () => {

  const [login, setLogin] = useState(true);


  return (
    <div className='mt-40'>
      <h1 className='boska text-6xl text-center font-semibold text-theme mb-10'>JOIN US</h1>
      <div className='clippy overflow-hidden bg-theme rounded-3xl'>
        <AnimatePresence mode='popLayout'>
          {login ? <motion.div className={`${!login && '-z-10'} bg-white rounded-3xl`} key={'login'} variants={joinVarient} initial='initial' animate='display' exit='hidden'>
            <Login setLogin={setLogin}/>
          </motion.div> : <motion.div className={`${login && '-z-10'} bg-white rounded-3xl`} key={'register'} variants={joinVarient} initial='initial' animate='display' exit='hidden'>
            <Register setLogin={setLogin}/>
          </motion.div>}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Join