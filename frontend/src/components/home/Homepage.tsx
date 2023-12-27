import { Box, Typography } from '@mui/material'
import { homepageStyles } from '../../styles/homepage-styles'

const Homepage = () => {
  return (
    <Box sx={homepageStyles.container}>
        <Box sx={homepageStyles.wrapper}>
            <Typography sx={homepageStyles.text}>Write and Share Your Blog With Everyone</Typography>
            <img 
            src='/blog.png' 
            width={'50%'} 
            height={'50%'} 
            // @ts-ignore
            style={homepageStyles.image}
             alt='blog'/>
        </Box>
        <Box sx={homepageStyles.wrapper}>
            <img 
            src='/publish.png' 
            width={'50%'} 
            height={'50%'} 
            // @ts-ignore
            style={homepageStyles.image}
             alt='publish'/> 
        <Typography sx={homepageStyles.text}>Write and Share Your Blog With Everyone</Typography>
        </Box>
        <Box sx={homepageStyles.wrapper}>
        <Typography sx={homepageStyles.text}>Write and Share Your Blog With Everyone</Typography> 
        <img 
        src='/articles.png' 
        width={'50%'} 
        height={'50%'} 
        // @ts-ignore
        style={homepageStyles.image}
         alt='articles'/> 
        </Box>
    </Box>
  )
}

export default Homepage