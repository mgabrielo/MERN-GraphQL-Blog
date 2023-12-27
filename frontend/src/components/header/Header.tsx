import { AppBar, Box, Button, IconButton, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import { headerStyles } from '../../styles/header-styles'
import {ImBlogger} from 'react-icons/im'
import {BiLogInCircle} from 'react-icons/bi'

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import UserMenu from './user/UserMenu'
const Header = () => {
    const [value, setValue]= useState(0)
    const navigate= useNavigate()
    const {isLoggedin} = useSelector((state:any)=> state.auth)
    console.log(isLoggedin)
  return (
    <AppBar sx={headerStyles.appBar}>
        <Toolbar>
            <ImBlogger style={{borderRadius:"50%", padding:'10px', background:'#000'}} size={'30px'}/>
            <Box sx={headerStyles.addLink} onClick={()=>navigate('/add')} >
                <Typography sx={{fontSize:17}} fontFamily={'Work Sans'}>
                    Add New Blog
                </Typography>
                <IconButton>
                    <ImBlogger color='inherit' size={15}/>
                </IconButton>
            </Box>
            <Box sx={headerStyles.tabContainer}>
                <Tabs textColor='inherit' value={value} TabIndicatorProps={{style:{background:'#fff'}}} onChange={(e, val)=> setValue(val)}>
                    {/* @ts-ignore */}
                    <Tab LinkComponent={Link} to="/" label='Home' disableRipple></Tab>
                    {/* @ts-ignore */}
                    <Tab  LinkComponent={Link} to="/blogs" label='Blogs' disableRipple></Tab>
                </Tabs>
                { isLoggedin ? (
                    <UserMenu/>
                ):(
                    <Link style={{textDecoration:'none'}} to={'/auth'}>
                <Button endIcon={<BiLogInCircle/>} sx={headerStyles.authBtn}>Auth</Button>
                </Link>
                )}
            </Box>
        </Toolbar>
    </AppBar>
  )
}

export default Header