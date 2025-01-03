import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Modal, Box, TextField, Button, Typography, Paper } from '@mui/material'
import { useNotification } from '@renderer/components/notification/NotificationContext'

interface RegisterModalProps {
  open: boolean
  onClose: React.Dispatch<React.SetStateAction<boolean>>
}

const RegisterModal: React.FC<RegisterModalProps> = ({ open, onClose }) => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const { addNotification } = useNotification()

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    if (name === 'username') setUsername(value)
    if (name === 'password') setPassword(value)
    if (name === 'confirmPassword') setConfirmPassword(value)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    if (password !== confirmPassword) {
      addNotification('As senhas não coincidem!', 'error')
      return
    }

    const response = await window.LoginScreen.register({ username, password })
    if (response.success) {
      addNotification(response.message, 'success')
      onClose(false)
    } else {
      addNotification(response.message, 'error')
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 3,
          borderRadius: 2
        }}
      >
        <Paper elevation={0} sx={{ padding: 3, boxShadow: 'none' }}>
          <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
            Registrar
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirmar Senha"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={handleChange}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
              Registrar
            </Button>
          </Box>
        </Paper>
      </Box>
    </Modal>
  )
}

export default RegisterModal
