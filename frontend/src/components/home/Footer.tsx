import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { homepageStyles } from '../../styles/homepage-styles'

const Footer = () => {
  return (
  <Box sx={homepageStyles.footerContainer}>
    <Button variant='contained' sx={homepageStyles.footerButton}>
      View Articles
    </Button>
    <Typography sx={homepageStyles.footerText}>Made With Love &#x1F498; By Grey</Typography>
    <Button variant='contained' sx={homepageStyles.footerButton}>
      Publish One
    </Button>
  </Box>
  )
}

export default Footer