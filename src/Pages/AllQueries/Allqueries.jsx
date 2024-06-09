import React from 'react'
import SectionTitle from '../../Shared components/SectionTitle'
import { Link } from 'react-router-dom';
import useGetQueries from '../../Hooks/useGetQueries';
import HelemetTitle from '../../Shared components/HelemetTitle';

const Allqueries = () => {
  const queries = useGetQueries();
  return (
    <div className='mt-40 w-11/12 mx-auto space-y-10'>
      <HelemetTitle title='All Queries || HH'/>
      <SectionTitle title='All Queries'/>

      <div className='flex items-center gap-4 flex-wrap'>
        {queries.map((query, i) => {
          return (
            <Link key={i} to={`/queries/${query._id}`}>
             <div className="cursor-pointer p-4 rounded-lg border shadow-lg hover:border-theme space-y-5 text-start">
               <div className="flex items-center gap-4">
                 <div className="avatar">
                   <div className="w-16 rounded-full ring ring-theme ring-offset-base-100 ring-offset-2">
                     <img src={query?.photoURL} />
                   </div>
                 </div>
                 <h1 className="text-2xl font-semibold text-text">{query?.userName}</h1>
               </div>
               <h1 className="text-xl font-medium">
                 <span className="font-bold">
                   Question: {query?.question}
                 </span>
               </h1>
             </div>
           </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Allqueries