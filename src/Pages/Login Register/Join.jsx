import React, {useState } from 'react'
import Login from './Login'
import Register from './Register'
import {AnimatePresence, motion} from 'framer-motion'
import HelemetTitle from '../../Shared components/HelemetTitle'


const Join = () => {

  const [login, setLogin] = useState(true);
  const [played, setPlayed] = useState(false);

  const joinVarient = {
    initial: {
      translateY: played  ? '100%' : 0,
      scale: 1
    },
    display: {
      scale: 1,
      translateY: '0',
      transition: {duration: .7}
    },
    hidden: {
      translateY: [0, '5%', '100%'],
  
      scale: [1, .9, .8],
      transition: {times: [0, 1, 1], duration: .8}
    }
  }


  return (
    <div className='mt-40'>
      <HelemetTitle title='Join || HH'/>
      <h1 className='boska text-6xl text-center font-semibold text-theme mb-10'>JOIN US</h1>
      <motion.div className='clippy overflow-hidden bg-theme rounded-3xl'>
        <AnimatePresence mode='popLayout'>
          {login ? <motion.div className={`${!login && '-z-10'} bg-white rounded-3xl`} key={'login'} variants={joinVarient} initial='initial' animate='display' exit='hidden'>
            <Login setLogin={setLogin} setPlayed={setPlayed}/>
          </motion.div> : <motion.div className={`${login && '-z-10'} bg-white rounded-3xl`} key={'register'} variants={joinVarient} initial='initial' animate='display' exit='hidden'>
            <Register setLogin={setLogin}/>
          </motion.div>}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default Join