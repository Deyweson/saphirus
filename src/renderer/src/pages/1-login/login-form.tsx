import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Container, TextField, Button, Typography, Box, CssBaseline, Paper } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { useNotification } from '@renderer/components/notification/NotificationContext'

const theme = createTheme()

const LoginForm: React.FC = () => {
  const [username, setusername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const navigate = useNavigate()
  const { addNotification } = useNotification()

  const handleusernameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setusername(event.target.value)
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    const response = await window.LoginScreen.login({ username, password })
    if (response.success) {
      addNotification(response.message, 'success')
      navigate('/home')
    } else {
      addNotification(response.message, 'error')
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <CssBaseline />
        <Paper elevation={3} sx={{ padding: 3, boxShadow: 'none', border: 'none' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Box component="img" src={logo} sx={{ width: '50%', height: 'auto', mb: 2 }} />
            <Typography component="h1" variant="h5">
              Login
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
                onChange={handleusernameChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Login
              </Button>
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => navigate('/home')}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  )
}

export default LoginForm
