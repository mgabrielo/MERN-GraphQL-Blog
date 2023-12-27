import { BlogType } from '../../types/types'
import { Box, Card, Typography } from '@mui/material'
import { bloglistStyles, randomColor } from '../../styles/blog-list-styles'
import {FcCalendar} from 'react-icons/fc'

type Props={
blog:BlogType
}
const BlogItem = (props:Props) => {
  return (
    <Card sx={bloglistStyles.card}>
        <Box sx={{...bloglistStyles.cardHeader, bgcolor: randomColor()}}>
            <Box sx={{display:'flex',flexDirection:'row', gap:1}}>
              <FcCalendar size={'25px'}/>
               <Typography variant='caption' fontSize={'20px'}>{new Date (Number(props.blog?.date)).toDateString()}</Typography> 
            </Box>
               <Typography variant='h4' sx={bloglistStyles.title}>{props.blog?.title}</Typography>
        </Box>
               <Box sx={bloglistStyles.cardContent}>
                <Typography sx={bloglistStyles.contentText}>
                  {props.blog.content}
                </Typography>
              </Box> 
    </Card>
  )
}

export default BlogItem