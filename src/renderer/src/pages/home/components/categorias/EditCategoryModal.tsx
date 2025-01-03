import { Close } from '@mui/icons-material'
import { Box, Button, IconButton, Modal, TextField, Typography } from '@mui/material'
import { useNotification } from '@renderer/components/notification/NotificationContext'
import React, { useState, useEffect } from 'react'

interface EditCategoryModalProps {
  isOpen: boolean
  onClose: () => void
  categoryId: number
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({ isOpen, onClose, categoryId }) => {
  const [categoryName, setCategoryName] = useState('')
  const { addNotification } = useNotification()

  useEffect(() => {
    if (categoryId !== null) {
      fetchCategoryDetails()
    }
  }, [categoryId])

  const fetchCategoryDetails = async (): Promise<void> => {
    const response = await window.Categories.getCategorieById(categoryId)
    if (response.success) {
      setCategoryName(response.data.description)
    } else {
      addNotification(response.message)
      onClose()
    }
  }

  const handleSaveCategory = async (): Promise<void> => {
    const response = await window.Categories.editCategorie({
      id: categoryId,
      description: categoryName
    })

    if (response.success) {
      addNotification(response.message)
      onClose()
    } else {
      addNotification(response.message)
    }
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
