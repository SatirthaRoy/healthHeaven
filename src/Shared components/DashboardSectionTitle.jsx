import React from 'react'

const DashboardSectionTitle = ({title}) => {
  return (
    <div className='flex-1 space-y-10 md:space-y-16'>
      <h1 className='boska text-5xl md:text-7xl font-bold text-text text-center'>{title}</h1>
    </div>
  )
}

export default DashboardSectionTitle