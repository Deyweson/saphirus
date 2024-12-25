import { Close } from '@mui/icons-material'
import { Box, Button, IconButton, Modal, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'

interface EditCategoryModalProps {
  isOpen: boolean
  onClose: () => void
  categoryId: number | null
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({ isOpen, onClose, categoryId }) => {
  const [categoryName, setCategoryName] = useState('')

  useEffect(() => {
    if (categoryId !== null) {
      fetchCategoryDetails(categoryId)
    }
  }, [categoryId])

  const fetchCategoryDetails = (id: number) => {
    // Mock data para detalhes da categoria
    const categoryDetails = { id, description: `Categoria ${id}` }
    setCategoryName(categoryDetails.description)
  }

  const handleSaveCategory = () => {
    console.log('Categoria salva:', categoryId, categoryName)
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
          Editar Categoria
        </Typography>

        <TextField
          label="Nome da Categoria"
          variant="outlined"
          fullWidth
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSaveCategory}>
            Salvar
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default EditCategoryModal
