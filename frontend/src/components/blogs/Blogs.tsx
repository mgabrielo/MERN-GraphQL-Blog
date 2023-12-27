import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_BLOGS } from '../graphql/queries'
import BlogsList from './BlogsList'

const Blogs = () => {
    const {loading, data, error} = useQuery(GET_BLOGS)
    if(loading){
        return(
            <p>loading...</p>
        )
    }
    if(error){
        return(
            <p>Error...</p>
        )
    }
  return (
    <div>
        <BlogsList blogs={data?.blogs}/>
    </div>
  )
}

export default Blogs