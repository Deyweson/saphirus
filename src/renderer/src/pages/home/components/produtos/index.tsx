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
  TableRow
} from '@mui/material'
import { Search, Add, Edit, Delete } from '@mui/icons-material'
import { ModalEditProduto } from './modal-edit-produto'
import { AddProduto } from './modal-add-produto'
import ConfirmDeleteProductModal from './ConfirmDeleteProductModal'

// Função simulada para trazer produtos do banco de dados
const fetchProducts = async (
  searchTerm: string
): Promise<{ id: number; name: string; description: string; code: string; price: number }[]> => {
  const allProducts = [
    {
      code: 'P001',
      name: 'Produto 1',
      description: 'Descrição do produto 1',
      price: 10.99,
      stock_quantity: 100,
      stock_type: 'unidade',
      img_path: '/path/to/img1.jpg',
      id: 1,
      category_id: 1
    },
    {
      code: 'P002',
      name: 'Produto 2',
      description: 'Descrição do produto 2',
      price: 20.99,
      stock_quantity: 50,
      stock_type: 'peso',
      img_path: '/path/to/img2.jpg',
      id: 1,
      category_id: 1
    },
    {
      code: 'P003',
      name: 'Produto 3',
      description: 'Descrição do produto 3',
      price: 15.49,
      stock_quantity: 30,
      stock_type: 'unidade',
      img_path: '/path/to/img3.jpg',
      id: 1,
      category_id: 1
    },
    {
      code: 'P004',
      name: 'Produto 4',
      description: 'Descrição do produto 4',
      price: 25.99,
      stock_quantity: 10,
      stock_type: 'peso',
      img_path: '/path/to/img4.jpg',
      id: 1,
      category_id: 1
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
  const [products, setProducts] = useState<
    { id: number; name: string; description: string; code: string; price: number }[]
  >([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState(false) // Estado para controlar a visibilidade do modal de adicionar produto
  const [isViewModalOpen, setIsViewModalOpen] = useState(false) // Estado para controlar a visibilidade do modal de visualização
  const [selectedProductID, setSelectedProductID] = useState<number | undefined>(undefined) // Produto selecionado para visualização e edição
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)

  // Função para abrir o modal de adicionar produto
  const openModal = (): void => {
    setIsModalOpen(true)
  }

  // Função para fechar o modal de adicionar produto
  const closeModal = (): void => {
    setIsModalOpen(false)
  }

  // Função para abrir o modal de visualização e edição
  const openViewModal = (id: number): void => {
    setSelectedProductID(id)
    setIsViewModalOpen(true)
  }

  // Função para fechar o modal de visualização e edição
  const closeViewModal = (): void => {
    setIsViewModalOpen(false)
  }

  // Função para buscar os produtos
  const handleSearch = async (): Promise<void> => {
    const result = await fetchProducts(searchTerm)
    setProducts(result)
  }

  const handleOpenDeleteModal = (id: number): void => {
    setSelectedProductID(id)
    setDeleteModalOpen(true)
  }
  const handleCloseDeleteModal = (): void => setDeleteModalOpen(false)

  useEffect(() => {
    const loadProducts = async (): Promise<void> => {
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
                  <IconButton onClick={() => openViewModal(product.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleOpenDeleteModal(product.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal para Adicionar Produto */}
      <AddProduto closeModal={closeModal} isModalOpen={isModalOpen} />

      {/* Modal para Visualizar e Editar Produto */}
      <ModalEditProduto
        closeViewModal={closeViewModal}
        isViewModalOpen={isViewModalOpen}
        productId={selectedProductID || 0}
      />

      <ConfirmDeleteProductModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        productId={selectedProductID || 0}
      />
    </Box>
  )
}

export default Produtos
