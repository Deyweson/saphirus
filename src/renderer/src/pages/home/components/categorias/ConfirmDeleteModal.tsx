import { Close } from '@mui/icons-material'
import { Box, Button, IconButton, Modal, Typography } from '@mui/material'
import React from 'react'

interface ConfirmDeleteModalProps {
  isOpen: boolean
  onClose: () => void
  categoryId: number | null
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ isOpen, onClose, categoryId }) => {
  const handleDeleteCategory = (): void => {
    console.log('Categoria excluída:', categoryId)
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
          Confirmar Exclusão
        </Typography>

        <Typography variant="body1" gutterBottom>
          Tem certeza que deseja excluir a categoria?
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <Button variant="contained" color="primary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="contained" color="secondary" onClick={handleDeleteCategory}>
            Excluir
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ConfirmDeleteModal
