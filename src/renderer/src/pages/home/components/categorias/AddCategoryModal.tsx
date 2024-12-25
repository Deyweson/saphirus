import { Close } from '@mui/icons-material'
import { Box, Button, IconButton, Modal, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

interface AddCategoryModalProps {
  isOpen: boolean
  onClose: () => void
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ isOpen, onClose }) => {
  const [categoryName, setCategoryName] = useState('')

  const handleAddCategory = () => {
    console.log('Categoria adicionada:', categoryName)
    setCategoryName('')
    onClose()
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(5px)'
      }}
    >
      <Box
        sx={{
          backgroundColor: '#fff',
          padding: 3,
          borderRadius: '8px',
          width: '400px',
          position: 'relative'
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'black'
          }}
        >
          <Close />
        </IconButton>

        <Typography variant="h6" gutterBottom>
          Adicionar Categoria
        </Typography>

        <TextField
          label="Nome da Categoria"
          variant="outlined"
          fullWidth
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Button variant="contained" color="primary" onClick={handleAddCategory}>
            Adicionar
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default AddCategoryModal
