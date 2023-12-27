import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { addBlogStyle, htmlStyles } from '../../styles/add-blog'
import { useMutation } from '@apollo/client'
import { ADD_BLOG } from '../graphql/mutations'

const Addblog = () => {
    const [title, setTitle]= useState('')
    const [content, setContent]= useState('')
    const [addBlog] = useMutation(ADD_BLOG)
    const user = JSON.parse(localStorage.getItem('userData') as string)
    const handleSubmit =async()=>{
        const date = new Date()
       
        try {
            await addBlog({
                variables:{
                    title,
                    content,
                    date,
                    user:user.id
                }
            }).then((res)=>{
                if(res.data){
                    console.log(res.data)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Box sx={addBlogStyle.container}>
        <Box sx={addBlogStyle.blogHeader}>
            <Typography>
                Authored by : {user?.name}
            </Typography>
            <Button color='success' variant='contained' onClick={()=>handleSubmit()}>
                Publish
            </Button>
        </Box>
        <form>
            <Box sx={addBlogStyle.formContainer}>
                <TextField style={htmlStyles.h2} placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)} />
                <TextField style={htmlStyles.p} placeholder='Content' multiline={true} rows={10} value={content} onChange={(e)=>setContent(e.target.value)} />
            </Box>
        </form>
    </Box>
  )
}

export default Addblog