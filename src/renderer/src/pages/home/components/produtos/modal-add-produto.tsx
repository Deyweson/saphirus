import { Close, FolderOpen } from '@mui/icons-material'
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography
} from '@mui/material'
import React, { useState, useEffect } from 'react'

interface ProductData {
  code: string
  name: string
  description: string
  price: string
  stock_quantity: string
  stock_type: string
  category: string
  img_path: string
}

interface AddProdutoProps {
  isModalOpen: boolean
  closeModal: () => void
}

export function AddProduto({ isModalOpen, closeModal }: AddProdutoProps): JSX.Element {
  const [productData, setProductData] = useState<ProductData>({
    code: '',
    name: '',
    description: '',
    price: '',
    stock_quantity: '',
    stock_type: 'unidade',
    category: '',
    img_path: ''
  })

  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = (): void => {
    // Mock data para categorias
    const mockCategories = ['Categoria 1', 'Categoria 2', 'Categoria 3']
    setCategories(mockCategories)
  }

  // Função para registrar o produto
  const handleRegisterProduct = (): void => {
    console.log('Produto registrado:', productData)
    // Aqui você faria o envio para o servidor ou banco de dados
    setProductData({
      code: '',
      name: '',
      description: '',
      price: '',
      stock_quantity: '',
      stock_type: 'unidade',
      category: '',
      img_path: ''
    })
    // Não fecha o modal aqui
  }

  const handleImagePathChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setProductData({ ...productData, img_path: e.target.value })
  }

  const handleSelectImagePath = (): void => {
    // Aqui você implementaria a lógica para selecionar o caminho da imagem
    alert('Selecione o caminho da imagem!')
  }

  return (
    <Modal
      open={isModalOpen}
      onClose={closeModal}
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
          onClick={closeModal}
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
          Adicionar Produto
        </Typography>

        {/* Formulário de Produto */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Código"
              variant="outlined"
              fullWidth
              value={productData.code}
              onChange={(e) => setProductData({ ...productData, code: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Nome"
              variant="outlined"
              fullWidth
              value={productData.name}
              onChange={(e) => setProductData({ ...productData, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Descrição"
              variant="outlined"
              fullWidth
              value={productData.description}
              onChange={(e) => setProductData({ ...productData, description: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Preço"
              variant="outlined"
              fullWidth
              type="number"
              value={productData.price}
              onChange={(e) => setProductData({ ...productData, price: e.target.value })}
              InputProps={{
                startAdornment: <InputAdornment position="start">R$</InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Quantidade em Estoque"
              variant="outlined"
              fullWidth
              type="number"
              value={productData.stock_quantity}
              onChange={(e) => setProductData({ ...productData, stock_quantity: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Tipo de Estoque</InputLabel>
              <Select
                value={productData.stock_type}
                onChange={(e) => setProductData({ ...productData, stock_type: e.target.value })}
              >
                <MenuItem value="unidade">Unidade</MenuItem>
                <MenuItem value="peso">Peso</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Categoria</InputLabel>
              <Select
                value={productData.category}
                onChange={(e) => setProductData({ ...productData, category: e.target.value })}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Imagem"
              variant="outlined"
              fullWidth
              value={productData.img_path}
              onChange={handleImagePathChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSelectImagePath}>
                      <FolderOpen />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="primary" onClick={handleRegisterProduct}>
              Registrar Produto
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}
