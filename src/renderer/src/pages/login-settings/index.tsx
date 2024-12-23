import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CssBaseline,
  Paper,
  IconButton,
  AppBar,
  Tabs,
  Tab,
  Toolbar
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'

const theme = createTheme()

interface User {
  name: string
  password: string
  confirmPassword: string
  secretKey: string
}

interface DatabaseConfig {
  host: string
  port: string
  user: string
  password: string
  database: string
}

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0)
  const [user, setUser] = useState<User>({
    name: '',
    password: '',
    confirmPassword: '',
    secretKey: ''
  })
  const [dbConfig, setDbConfig] = useState<DatabaseConfig>({
    host: '',
    port: '',
    user: '',
    password: '',
    database: ''
  })

  const navigate = useNavigate()

  const getDB = async (): Promise<void> => {
    const response = await window.idatabase.GetDB()
    if (response.success) {
      setDbConfig(response.data)
      console.log(response.data)
    } else {
      console.log(response.message)
    }
  }

  const updateDB = async (dbConfig: DatabaseConfig): Promise<void> => {
    const response = await window.idatabase.UpdateDB(dbConfig)
    if (response.success) {
      console.log(response.message)
    } else {
      console.log(response.message)
    }
  }

  useEffect(() => {
    getDB()
  }, [])

  const handleTabChange = (event: React.SyntheticEvent, newValue: number): void => {
    setActiveTab(newValue)
  }

  const handleUserChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  const handleDbConfigChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setDbConfig({ ...dbConfig, [event.target.name]: event.target.value })
  }

  const handleUserSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    // Lógica para adicionar um novo usuário aqui
    console.log('Novo usuário:', user)
  }

  const handleDbConfigSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    updateDB(dbConfig)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="back"
                sx={{ mr: 2 }}
                onClick={() => navigate(-1)} // Navegação para a página anterior
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Configurações
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <Box sx={{ width: '100%', mt: 4 }}>
          <Tabs value={activeTab} onChange={handleTabChange} centered>
            <Tab label="Adicionar Novo Usuário" />
            <Tab label="Configurações do Banco de Dados" />
          </Tabs>
        </Box>
        {activeTab === 0 && (
          <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6">Novo Usuário</Typography>
            <Box component="form" onSubmit={handleUserSubmit} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                margin="normal"
                required
                label="Nome"
                name="name"
                value={user.name}
                onChange={handleUserChange}
              />
              <TextField
                fullWidth
                margin="normal"
                required
                type="password"
                label="Senha"
                name="password"
                value={user.password}
                onChange={handleUserChange}
              />
              <TextField
                fullWidth
                margin="normal"
                required
                type="password"
                label="Confirmar Senha"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleUserChange}
              />
              <TextField
                fullWidth
                margin="normal"
                required
                label="Chave Secreta"
                name="secretKey"
                value={user.secretKey}
                onChange={handleUserChange}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                Salvar Usuário
              </Button>
            </Box>
          </Paper>
        )}
        {activeTab === 1 && (
          <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6">Configurações do Banco de Dados</Typography>
            <Box component="form" onSubmit={handleDbConfigSubmit} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                margin="normal"
                required
                label="Host"
                name="host"
                value={dbConfig.host}
                onChange={handleDbConfigChange}
              />
              <TextField
                fullWidth
                margin="normal"
                required
                label="Porta"
                name="port"
                value={dbConfig.port}
                onChange={handleDbConfigChange}
              />
              <TextField
                fullWidth
                margin="normal"
                required
                label="Usuário"
                name="user"
                value={dbConfig.user}
                onChange={handleDbConfigChange}
              />
              <TextField
                fullWidth
                margin="normal"
                required
                type="password"
                label="Senha"
                name="password"
                value={dbConfig.password}
                onChange={handleDbConfigChange}
              />
              <TextField
                fullWidth
                margin="normal"
                required
                label="Nome do Banco"
                name="database"
                value={dbConfig.database}
                onChange={handleDbConfigChange}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                Salvar Configurações
              </Button>
            </Box>
          </Paper>
        )}
      </Container>
    </ThemeProvider>
  )
}

export default SettingsPage
