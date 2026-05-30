import React from 'react'

const page = async ({params}) => {
    
    let {id} = await params;
    // console.log(id);

  return (
    <div>
      <h1>This is common page jisme dynamic id aaegi - {id}</h1>
    </div>
  )
}

export default page
