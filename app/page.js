'use client'

import { useState, useEffect } from 'react'
import { AppBar, Toolbar, Typography, Box, Stack, Button, Modal, TextField, IconButton } from '@mui/material'
import { firestore } from '@/firebase'
import { collection, doc, getDocs, query, setDoc, deleteDoc, getDoc } from 'firebase/firestore'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
}

export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')
  const [itemQuantity, setItemQuantity] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() })
    })
    setInventory(inventoryList)
  }

  useEffect(() => {
    updateInventory()
  }, [])

  const formatItemName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
  }

  const addItem = async (item, quantity = 1) => {
    const formattedItem = formatItemName(item)
    const docRef = doc(collection(firestore, 'inventory'), formattedItem)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity: currentQuantity } = docSnap.data()
      await setDoc(docRef, { quantity: currentQuantity + parseInt(quantity) })
    } else {
      await setDoc(docRef, { quantity: parseInt(quantity) })
    }
    await updateInventory()
  }

  const removeItem = async (item) => {
    const formattedItem = formatItemName(item)
    const docRef = doc(collection(firestore, 'inventory'), formattedItem)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, { quantity: quantity - 1 })
      }
    }
    await updateInventory()
  }

  const updateItem = async (item, quantity) => {
    const formattedItem = formatItemName(item)
    const docRef = doc(collection(firestore, 'inventory'), formattedItem)
    await setDoc(docRef, { quantity: parseInt(quantity) })
    await updateInventory()
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Manage Item
            </Typography>
            <Stack width="100%" direction={'column'} spacing={2}>
              <TextField
                id="outlined-basic"
                label="Item"
                variant="outlined"
                fullWidth
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Quantity"
                variant="outlined"
                fullWidth
                value={itemQuantity}
                onChange={(e) => setItemQuantity(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={() => {
                  addItem(itemName, itemQuantity)
                  setItemName('')
                  setItemQuantity('')
                  handleClose()
                }}
              >
                Add
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  updateItem(itemName, itemQuantity)
                  setItemName('')
                  setItemQuantity('')
                  handleClose()
                }}
              >
                Update
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  removeItem(itemName)
                  setItemName('')
                  setItemQuantity('')
                  handleClose()
                }}
              >
                Remove
              </Button>
            </Stack>
          </Box>
        </Modal>
        <Button variant="contained" onClick={handleOpen}>
          Manage Pantry Item
        </Button>
        <TextField
          id="search-bar"
          label="Search Inventory"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ marginBottom: 2, width: '50%' }}
        />
        <Box border={'1px solid #333'} sx={{ width: '80%', maxWidth: 800 }}>
          <Box
            width="100%"
            height="100px"
            bgcolor={'#ADD8E6'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Typography variant={'h4'} color={'#333'} textAlign={'center'}>
              Inventory Items
            </Typography>
          </Box>
          <Stack width="100%" spacing={2} overflow={'auto'} sx={{ maxHeight: 300 }}>
            {filteredInventory.map(({ name, quantity }) => (
              <Box
                key={name}
                width="100%"
                minHeight="150px"
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                bgcolor={'#f0f0f0'}
                padding={2}
              >
                <Typography variant={'h6'} color={'#333'} textAlign={'center'}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
                <Typography variant={'h6'} color={'#333'} textAlign={'center'}>
                  Quantity: {quantity}
                </Typography>
                <Button variant="contained" color="secondary" onClick={() => removeItem(name)}>
                  Remove
                </Button>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}
