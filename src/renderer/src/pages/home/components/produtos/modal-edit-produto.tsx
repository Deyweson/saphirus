import { useState, useEffect } from 'react'
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
  Typography,
  SelectChangeEvent
} from '@mui/material'
import { Categoria, Produto } from '@renderer/models/models'

interface ModalEditProdutoProps {
  isViewModalOpen: boolean
  closeViewModal: () => void
  productId: number
}

// Dados mockados
const mockProduct: Produto = {
  id: 1,
  code: '123456',
  name: 'Produto Exemplo',
  description: 'Descrição do produto exemplo',
  price: 100.0,
  stock_quantity: 50,
  stock_type: 'unidade',
  img_path: '/path/to/image.jpg',
  category_id: 1
}

const mockCategories: Categoria[] = [
  { id: 1, description: 'Categoria 1' },
  { id: 2, description: 'Categoria 2' },
  { id: 3, description: 'Categoria 3' }
]

export function ModalEditProduto({
  isViewModalOpen,
  closeViewModal,
  productId
}: ModalEditProdutoProps): JSX.Element {
  const [selectedProduct, setSelectedProduct] = useState<Produto | undefined>(undefined)
  const [categories, setCategories] = useState<Categoria[]>([])

  useEffect(() => {
    // Função mockada para buscar os dados do produto
    const fetchProduct = (id: number): Produto => {
      // Simula a busca do produto pelo ID
      console.log(id)
      return mockProduct
    }

    // Função mockada para buscar as categorias
    const fetchCategories = (): Categoria[] => {
      // Simula a busca das categorias
      return mockCategories
    }

    // Busca os dados do produto e das categorias
    const product = fetchProduct(productId)
    const categories = fetchCategories()

    // Atualiza o estado com os dados obtidos
    setSelectedProduct(product)
    setCategories(categories)
  }, [productId])

  const handleSaveEdits = (): void => {
    // Lógica para salvar as edições
    console.log('Produto editado:', selectedProduct)
  }

  const handleSelectImagePath = (): void => {
    // Lógica para selecionar o caminho da imagem
    console.log('Selecionar caminho da imagem')
  }

  const handleStockTypeChange = (event: SelectChangeEvent<'unidade' | 'peso'>): void => {
    setSelectedProduct((prevProduct) => ({
      ...prevProduct!,
      stock_type: event.target.value as 'unidade' | 'peso'
    }))
  }

  const handleCategoryChange = (event: SelectChangeEvent<number>): void => {
    setSelectedProduct((prevProduct) => ({
      ...prevProduct!,
      category_id: Number(event.target.value)
    }))
  }

  return (
    <Modal
      open={isViewModalOpen}
      onClose={closeViewModal}
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
          padding: 4,
          borderRadius: '10px',
          width: '500px',
          position: 'relative',
          boxShadow: 24
        }}
      >
        <IconButton
          onClick={closeViewModal}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            color: 'black'
          }}
        >
          <Close />
        </IconButton>

        <Typography variant="h5" gutterBottom>
          Editar Produto
        </Typography>

        {selectedProduct && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Código"
                variant="outlined"
                fullWidth
                value={selectedProduct.code}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, code: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Nome"
                variant="outlined"
                fullWidth
                value={selectedProduct.name}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Descrição"
                variant="outlined"
                fullWidth
                value={selectedProduct.description}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, description: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Preço"
                variant="outlined"
                fullWidth
                type="number"
                value={selectedProduct.price}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    price: parseFloat(e.target.value)
                  })
                }
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
                value={selectedProduct.stock_quantity}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    stock_quantity: parseInt(e.target.value, 10)
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Estoque</InputLabel>
                <Select value={selectedProduct.stock_type} onChange={handleStockTypeChange}>
                  <MenuItem value="unidade">Unidade</MenuItem>
                  <MenuItem value="peso">Peso</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Categoria</InputLabel>
                <Select value={selectedProduct.category_id} onChange={handleCategoryChange}>
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.description}
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
                value={selectedProduct.img_path}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, img_path: e.target.value })
                }
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
              <Button variant="contained" color="primary" onClick={handleSaveEdits}>
                Salvar Edições
              </Button>
            </Grid>
          </Grid>
        )}
      </Box>
    </Modal>
  )
}
