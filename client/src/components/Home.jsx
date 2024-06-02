import React from 'react'
import LeftSidebar from './LeftSidebar'
import DnsContent from './DnsContent.jsx'
import Searching from './Searching.jsx'

const Home = () => {
  return (
    <div className='bg-slate-100'>
        <div className='flex justify-between ml-[25%]'>
            <div className=" fixed left-0 top-0 h-full">
              <LeftSidebar />    
            </div>
    
            <DnsContent className='w-[70%]'/>
        </div>
    </div>
  )
}

export default Home