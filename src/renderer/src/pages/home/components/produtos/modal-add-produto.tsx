import { Close, FolderOpen } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CardMedia,
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
import { useNotification } from '@renderer/components/notification/NotificationContext'
import React, { useState, useEffect } from 'react'
import produtcPlaceholder from '@renderer/assets/product-placeholder.png'

interface ProductData {
  code: string
  name: string
  price: string
  stock_type: string
  category: string
  img_path: string
}

interface Categories {
  id: number
  description: string
}

interface AddProdutoProps {
  isModalOpen: boolean
  closeModal: () => void
}

export function AddProduto({ isModalOpen, closeModal }: AddProdutoProps): JSX.Element {
  const { addNotification } = useNotification()
  const [productData, setProductData] = useState<ProductData>({
    code: '',
    name: '',
    price: '',
    stock_type: 'unidade',
    category: '',
    img_path: ''
  })

  const [categories, setCategories] = useState<Categories[]>([])

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async (): Promise<void> => {
    const response = await window.Categories.getCategories()
    if (response.success) {
      setCategories(response.data)
      return
    } else {
      addNotification('Erro ao buscar as categorias')
    }
  }

  // Função para registrar o produto
  const handleRegisterProduct = (): void => {
    console.log('Produto registrado:', productData)
    setProductData({
      code: '',
      name: '',
      price: '',
      stock_type: 'unidade',
      category: '',
      img_path: ''
    })
  }

  const handleSelectImagePath = async (): Promise<void> => {
    const result = await window.api.SelectFile()
    if (result) {
      setProductData((prev) => ({ ...prev, img_path: result.replace(/\\/g, '/') }))
    }
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
                  <MenuItem key={category.id} value={category.id}>
                    {category.description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid container spacing={2} sx={{ justifyContent: 'center', marginTop: 2 }}>
            <Grid item>
              <Card
                sx={{
                  width: 120,
                  height: 120,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  borderRadius: 1
                }}
              >
                <CardMedia
                  component="img"
                  image={
                    productData.img_path ? `file://${productData.img_path}` : produtcPlaceholder
                  }
                  alt="Preview"
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    ;(e.target as HTMLImageElement).src = produtcPlaceholder
                  }}
                  sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
                <IconButton
                  onClick={handleSelectImagePath}
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white'
                  }}
                >
                  <FolderOpen />
                </IconButton>
              </Card>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="primary" onClick={handleRegisterProduct}>
              Registrar Produto
            </Button>
          </Grid>
        </Grid>

        {/* Exibindo a imagem ou o placeholder */}
      </Box>
    </Modal>
  )
}
