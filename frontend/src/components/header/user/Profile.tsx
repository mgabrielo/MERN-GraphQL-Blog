//@ts-nocheck
import { Avatar, Box, Typography } from '@mui/material'
import { profileStyles } from '../../../styles/profile-styles'
import BlogItem from '../../blogs/BlogItem'
import { useQuery } from '@apollo/client'
import { GET_USER_BLOGS } from '../../graphql/queries'

const Profile = () => {
     const { data} = useQuery(GET_USER_BLOGS, {
        variables:{
            id :  JSON.parse(localStorage.getItem('userData') as string).id
        }
     }) 

  return (
    <Box sx={profileStyles.container}>
        <Box sx={profileStyles.blogContainer}>
            <Typography variant='h2' sx={profileStyles.text}>Your Posts </Typography>
            <Box sx={profileStyles.cardContainer}>
                {
                    data?.user?.blogs.length > 0 && data?.user?.blogs.map((item:any, index)=>{
                        if(item){
                            return(
                                <BlogItem
                                key={index}
                                    blog={{
                                        title: item.title,
                                        content: item.content,
                                        date: item.date,
                                    }}
                                />
                            )
                        }
                        return null
                    })
                }
            </Box>
        </Box>
        <Box sx={profileStyles.profileContainer}>
            <Box sx={profileStyles.userContainer}>
                <Avatar sx={profileStyles.avatar}>
                </Avatar>
                    <Typography variant={'h5'} fontFamily={'Work Sans'}>
                        name : {data?.user?.name}
                    </Typography>
                    <Typography variant={'h5'} fontFamily={'Work Sans'}>
                        email:  {data?.user?.email}
                    </Typography>
                    <Typography variant={'h5'} fontFamily={'Work Sans'}>
                        number of blogs:  {data?.user?.blogs?.length}
                    </Typography>
            </Box>
        </Box>
    </Box>
  )
}

export default Profile