import React, { useState } from 'react'
import { Link } from "react-router-dom"
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {
    const [isMobile, setMobile] = useState(false)
    return (
        <header className="Header">
            <div className='topbar'>
            <h1>Redux Blog App</h1>
            <IconButton onClick={()=>setMobile(!isMobile)} className='Mobile-Menu-Icons'>
                {isMobile ? <MenuIcon /> : <CloseIcon />}
            </IconButton>
            </div>
            <nav>
                <ul className={isMobile? 'hideIcons' : ''}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="post">Add Post</Link></li>
                    <li><Link to="user">Users</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header