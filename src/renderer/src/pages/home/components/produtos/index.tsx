import React, { useState, useEffect } from 'react'
import {
  Box,
  TextField,
  IconButton,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  Typography,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material'
import { Search, Add, Close, FolderOpen, Edit, Delete } from '@mui/icons-material'

// Função simulada para trazer produtos do banco de dados
const fetchProducts = async (searchTerm: string) => {
  const allProducts = [
    {
      code: 'P001',
      name: 'Produto 1',
      description: 'Descrição do produto 1',
      price: 10.99,
      stock_quantity: 100,
      stock_type: 'unidade',
      img_path: '/path/to/img1.jpg'
    },
    {
      code: 'P002',
      name: 'Produto 2',
      description: 'Descrição do produto 2',
      price: 20.99,
      stock_quantity: 50,
      stock_type: 'peso',
      img_path: '/path/to/img2.jpg'
    },
    {
      code: 'P003',
      name: 'Produto 3',
      description: 'Descrição do produto 3',
      price: 15.49,
      stock_quantity: 30,
      stock_type: 'unidade',
      img_path: '/path/to/img3.jpg'
    },
    {
      code: 'P004',
      name: 'Produto 4',
      description: 'Descrição do produto 4',
      price: 25.99,
      stock_quantity: 10,
      stock_type: 'peso',
      img_path: '/path/to/img4.jpg'
    }
  ]
  return allProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(searchTerm.toLowerCase()) // Inclusão do código na pesquisa
  )
}

const Produtos: React.FC = () => {
  const [products, setProducts] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState(false) // Estado para controlar a visibilidade do modal de adicionar produto
  const [isViewModalOpen, setIsViewModalOpen] = useState(false) // Estado para controlar a visibilidade do modal de visualização
  const [selectedProduct, setSelectedProduct] = useState<any>(null) // Produto selecionado para visualização e edição
  const [productData, setProductData] = useState({
    code: '',
    name: '',
    description: '',
    price: '',
    stock_quantity: '',
    stock_type: 'unidade',
    img_path: ''
  })

  // Função para abrir o modal de adicionar produto
  const openModal = () => {
    setIsModalOpen(true)
  }

  // Função para fechar o modal de adicionar produto
  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Função para abrir o modal de visualização e edição
  const openViewModal = (product: any) => {
    setSelectedProduct(product)
    setIsViewModalOpen(true)
  }

  // Função para fechar o modal de visualização e edição
  const closeViewModal = () => {
    setIsViewModalOpen(false)
  }

  // Função para buscar os produtos
  const handleSearch = async () => {
    const result = await fetchProducts(searchTerm)
    setProducts(result)
  }

  // Função para registrar o produto
  const handleRegisterProduct = () => {
    console.log('Produto registrado:', productData)
    // Aqui você faria o envio para o servidor ou banco de dados
    setProductData({
      code: '',
      name: '',
      description: '',
      price: '',
      stock_quantity: '',
      stock_type: 'unidade',
      img_path: ''
    })
    // Não fecha o modal aqui
  }

  // Função para salvar as edições do produto
  const handleSaveEdits = () => {
    console.log('Produto editado:', selectedProduct)
    // Enviar as edições para o servidor ou banco de dados aqui
    setIsViewModalOpen(false) // Fecha o modal após salvar as edições
  }

  const handleImagePathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductData({ ...productData, img_path: e.target.value })
  }

  const handleSelectImagePath = () => {
    // Aqui você implementaria a lógica para selecionar o caminho da imagem
    alert('Selecione o caminho da imagem!')
  }

  useEffect(() => {
    const loadProducts = async () => {
      const result = await fetchProducts('')
      setProducts(result)
    }
    loadProducts()
  }, [])

  return (
    <Box
      sx={{
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid #ddd',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: 900,
        backgroundColor: '#fff',
        margin: '0 auto'
      }}
    >
      {/* Barra de Pesquisa e Botão de Adicionar */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          marginBottom: 2,
          alignItems: 'center'
        }}
      >
        {/* Barra de Pesquisa */}
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <TextField
            label="Buscar produtos"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ maxWidth: '500px' }}
          />
          <IconButton onClick={handleSearch} sx={{ marginLeft: 1 }}>
            <Search />
          </IconButton>
        </Box>

        {/* Botão Adicionar Produto */}
        <Button
          variant="contained"
          color="success"
          startIcon={<Add />}
          sx={{ marginLeft: 2, minWidth: 300 }}
          onClick={openModal}
        >
          Adicionar Produto
        </Button>
      </Box>

      {/* Tabela de Produtos */}
      <TableContainer sx={{ width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.code}>
                <TableCell>{product.code}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<Edit />}
                    onClick={() => openViewModal(product)}
                    sx={{
                      marginRight: '15px',
                      borderRadius: '4px', // Deixa o botão com bordas quadradas
                      color: 'blue', // Cor do ícone e texto
                      borderColor: 'blue', // Cor da borda do botão
                      '&:hover': {
                        backgroundColor: 'blue', // Altera o fundo ao passar o mouse
                        color: 'white' // Cor do texto e ícone ao passar o mouse
                      }
                    }}
                  >
                    Editar
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => console.log(product.code)}
                    sx={{
                      borderRadius: '4px', // Deixa o botão com bordas quadradas
                      color: 'red', // Cor do ícone e texto
                      borderColor: 'red', // Cor da borda do botão
                      '&:hover': {
                        backgroundColor: 'red', // Altera o fundo ao passar o mouse
                        color: 'white' // Cor do texto e ícone ao passar o mouse
                      }
                    }}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal para Adicionar Produto */}
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

      {/* Modal para Visualizar e Editar Produto */}
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
            padding: 3,
            borderRadius: '8px',
            width: '400px',
            position: 'relative'
          }}
        >
          <IconButton
            onClick={closeViewModal}
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
            Editar Produto
          </Typography>

          {/* Formulário de Edição */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Código"
                variant="outlined"
                fullWidth
                value={selectedProduct?.code}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, code: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Nome"
                variant="outlined"
                fullWidth
                value={selectedProduct?.name}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Descrição"
                variant="outlined"
                fullWidth
                value={selectedProduct?.description}
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
                value={selectedProduct?.price}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
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
                value={selectedProduct?.stock_quantity}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, stock_quantity: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Estoque</InputLabel>
                <Select
                  value={selectedProduct?.stock_type}
                  onChange={(e) =>
                    setSelectedProduct({ ...selectedProduct, stock_type: e.target.value })
                  }
                >
                  <MenuItem value="unidade">Unidade</MenuItem>
                  <MenuItem value="peso">Peso</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Imagem"
                variant="outlined"
                fullWidth
                value={selectedProduct?.img_path}
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
        </Box>
      </Modal>
    </Box>
  )
}

export default Produtos
