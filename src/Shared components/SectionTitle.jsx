import React from 'react'

const SectionTitle = ({title, phrase}) => {
  return (
    <div className='flex-1 space-y-10 md:space-y-16'>
      <h1 className='boska text-6xl md:text-9xl font-bold text-text'>{title}</h1>
      <p className='text-xl md:text-3xl font-medium'>{phrase}</p>
    </div>
  )
}

export default SectionTitle