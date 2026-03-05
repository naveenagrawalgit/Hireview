import React from 'react'
import toast from 'react-hot-toast'

const AboutPage = () => {
  return (
    <div   >AboutPage
    
    <button className='btn btn-secondary' onClick={()=> toast.success("hello")} >clcik</button>
    
    </div>
  )
}

export default AboutPage