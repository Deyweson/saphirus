import React, { useState } from 'react'
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button
} from '@mui/material'
import { ShoppingCart, LocalAtm, Inventory, Person, Settings } from '@mui/icons-material'

import Vender from './components/vender'
import Caixa from './components/caixa'
import Produtos from './components/produtos'
import Estoque from './components/estoque'
import Usuario from './components/usuario'
import Configuracao from './components/configs'

import logo from '@renderer/assets/logo.png'
import { Categories } from './components/categorias'

// Logo
const Logo = (): JSX.Element => (
  <div style={{ padding: '16px', display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
    <img src={logo} alt="Logo" style={{ width: '100px', height: 'auto' }} />
  </div>
)

const Home: React.FC = () => {
  // Estado para controlar qual conteúdo será exibido
  const [selectedPage, setSelectedPage] = useState<string>('vender')
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  // Função para renderizar o conteúdo dependendo da página selecionada
  const renderPage = (): JSX.Element => {
    switch (selectedPage) {
      case 'vender':
        return <Vender />
      case 'caixa':
        return <Caixa />
      case 'produtos':
        return <Produtos />
      case 'categorias':
        return <Categories />
      case 'estoque':
        return <Estoque />
      case 'usuario':
        return <Usuario />
      case 'configuracao':
        return <Configuracao />

      default:
        return <Vender />
    }
  }

  const handleMenuClick = (page: string, index: number): void => {
    setSelectedPage(page)
    setSelectedIndex(index)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Menu Lateral */}
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start' // Modificado para garantir que o menu fique logo abaixo da logo
          }
        }}
        variant="permanent"
        anchor="left"
      >
        {/* Logo no topo */}
        <Logo />

        <List>
          {/* Botões do Menu */}
          <ListItemButton
            onClick={() => handleMenuClick('vender', 0)}
            sx={{
              backgroundColor: selectedIndex === 0 ? 'rgba(0, 0, 255, 0.1)' : 'transparent',
              color: selectedIndex === 0 ? 'blue' : 'black',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 255, 0.1)'
              }
            }}
          >
            <ListItemIcon>
              <ShoppingCart />
            </ListItemIcon>
            <ListItemText primary="Vender" />
          </ListItemButton>

          <ListItemButton
            onClick={() => handleMenuClick('caixa', 1)}
            sx={{
              backgroundColor: selectedIndex === 1 ? 'rgba(0, 0, 255, 0.1)' : 'transparent',
              color: selectedIndex === 1 ? 'blue' : 'black',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 255, 0.1)'
              }
            }}
          >
            <ListItemIcon>
              <LocalAtm />
            </ListItemIcon>
            <ListItemText primary="Caixa" />
          </ListItemButton>

          <ListItemButton
            onClick={() => handleMenuClick('produtos', 2)}
            sx={{
              backgroundColor: selectedIndex === 2 ? 'rgba(0, 0, 255, 0.1)' : 'transparent',
              color: selectedIndex === 2 ? 'blue' : 'black',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 255, 0.1)'
              }
            }}
          >
            <ListItemIcon>
              <Inventory />
            </ListItemIcon>
            <ListItemText primary="Produtos" />
          </ListItemButton>

          <ListItemButton
            onClick={() => handleMenuClick('categorias', 3)}
            sx={{
              backgroundColor: selectedIndex === 3 ? 'rgba(0, 0, 255, 0.1)' : 'transparent',
              color: selectedIndex === 3 ? 'blue' : 'black',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 255, 0.1)'
              }
            }}
          >
            <ListItemIcon>
              <Inventory />
            </ListItemIcon>
            <ListItemText primary="Categorias" />
          </ListItemButton>

          <ListItemButton
            onClick={() => handleMenuClick('estoque', 4)}
            sx={{
              backgroundColor: selectedIndex === 4 ? 'rgba(0, 0, 255, 0.1)' : 'transparent',
              color: selectedIndex === 4 ? 'blue' : 'black',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 255, 0.1)'
              }
            }}
          >
            <ListItemIcon>
              <Inventory />
            </ListItemIcon>
            <ListItemText primary="Estoque" />
          </ListItemButton>

          <ListItemButton
            onClick={() => handleMenuClick('usuario', 5)}
            sx={{
              backgroundColor: selectedIndex === 5 ? 'rgba(0, 0, 255, 0.1)' : 'transparent',
              color: selectedIndex === 5 ? 'blue' : 'black',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 255, 0.1)'
              }
            }}
          >
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Usuário" />
          </ListItemButton>

          <ListItemButton
            onClick={() => handleMenuClick('configuracao', 6)}
            sx={{
              backgroundColor: selectedIndex === 6 ? 'rgba(0, 0, 255, 0.1)' : 'transparent',
              color: selectedIndex === 6 ? 'blue' : 'black',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 255, 0.1)'
              }
            }}
          >
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Configuração" />
          </ListItemButton>
        </List>

        {/* Botão Sair Centralizado */}
        <Button
          variant="contained"
          color="primary"
          sx={{
            position: 'absolute',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%'
          }}
        >
          Sair
        </Button>
      </Drawer>

      {/* Conteúdo Principal à Direita */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          padding: 3
        }}
      >
        {/* Aqui será renderizado o conteúdo da página selecionada */}
        {renderPage()}
      </Box>
    </Box>
  )
}

export default Home
