import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useState } from 'react'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useNavigate } from 'react-router-dom';

function Draw() {
  const navigate=useNavigate()
  const [openMenu,setOperMenu]=useState(false)
  const Pages=[{
    pageName:"Home",
    go:'/'
  },{
    pageName:'About',
    go:"/About"
  },{
    pageName:'Products',
    go:'/Products'
  }]
  return (
      <>
    <Drawer anchor='top' PaperProps={{
      sx:{width:"100%"}
    }} transitionDuration={400} open={openMenu} onClose={()=>setOperMenu(false)}>
<List>
      {
        Pages.map((page,index)=>(
        <ListItemButton sx={{marginBottom:'10px',display:'flex',justifyContent:'center'}} key={index} onClick={()=>setOperMenu(false)}>
          <ListItemIcon>
            <ListItemText style={{transform:'scale(1.2)',color:'#ab7a5f'}} onClick={()=>navigate(page.go)}>{page.pageName}</ListItemText>
          </ListItemIcon>
        </ListItemButton>
        ))
      }
      </List>
    </Drawer>
    <IconButton style={{marginLeft:'auto',transform:'scale(2)'}} onClick={()=>setOperMenu(!openMenu)}>
        <MenuOutlinedIcon />
    </IconButton>
  </>
  )
}

export default Draw