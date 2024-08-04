'use client'

import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'

export default function About() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Pantry On The Go
          </Typography>
          <IconButton color="inherit" href="/">
            <HomeIcon />
          </IconButton>
          <IconButton color="inherit" href="/about">
            <InfoIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        width="100vw"
        height="100vh"
        display={'flex'}
        justifyContent={'center'}
        flexDirection={'column'}
        alignItems={'center'}
        gap={2}
        sx={{ paddingTop: 2 }}
      >
        <Typography variant="h4" color={'#333'} textAlign={'center'}>
          About Pantry On The Go
        </Typography>
        <Typography variant="body1" color={'#555'} textAlign={'center'} maxWidth="800px">
          Pantry On The Go is a simple and efficient inventory management system designed to help you
          keep track of your pantry items. With features to add, remove, update, and search for items,
          managing your pantry has never been easier. Our goal is to provide you with a seamless
          experience to ensure you always know what you have in stock.
        </Typography>
      </Box>
    </Box>
  )
}
