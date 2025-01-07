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
import { useNotification } from '@renderer/components/notification/NotificationContext'

interface IProduct {
  id?: number
  code: string
  name: string
  price: number
  img_path: string
  stock_type: string
  category_id: number
}

const Produtos: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState(false) // Estado para controlar a visibilidade do modal de adicionar produto
  const [isViewModalOpen, setIsViewModalOpen] = useState(false) // Estado para controlar a visibilidade do modal de visualização
  const [selectedProductID, setSelectedProductID] = useState<number | undefined>(undefined) // Produto selecionado para visualização e edição
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [categories, setCategories] = useState<{ [key: number]: string }>({})
  const { addNotification } = useNotification()

  const loadCategories = async (products: IProduct[]): Promise<void> => {
    const categoryMap: { [key: number]: string } = {}

    for (const product of products) {
      if (!categoryMap[product.category_id]) {
        // Evita buscar categorias repetidas
        const response = await window.Categories.getCategorieById(product.category_id)
        if (response.success) {
          console.log('Aqui')
          categoryMap[product.category_id] = response.data.description
        } else {
          categoryMap[product.category_id] = 'Desconhecida'
        }
      }
    }

    setCategories(categoryMap) // Atualiza o estado com as categorias carregadas
    console.log(categories, 'here')
  }

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
  // const handleSearch = async (): Promise<void> => {
  //   const result = await fetchProducts(searchTerm)
  //   setProducts(result)
  // }

  const handleOpenDeleteModal = (id: number): void => {
    setSelectedProductID(id)
    setDeleteModalOpen(true)
  }
  const handleCloseDeleteModal = (): void => setDeleteModalOpen(false)

  useEffect(() => {
    const loadProducts = async (): Promise<void> => {
      const response = await window.Products.getProducts()
      if (response.success) {
        setProducts(response.data)
        loadCategories(response.data)
      } else {
        addNotification(response.message)
      }
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
          <IconButton onClick={() => console.log('teste')} sx={{ marginLeft: 1 }}>
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
              <TableCell>Categoria</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.code}>
                <TableCell>{product.code}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{categories[product.category_id] || 'Carregando...'}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  <IconButton onClick={() => openViewModal(product.id || 0)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleOpenDeleteModal(product.id || 0)}>
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
