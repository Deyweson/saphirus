import { Add, Delete, Edit, Search } from '@mui/icons-material'
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import AddCategoryModal from './AddCategoryModal'
import EditCategoryModal from './EditCategoryModal'
import ConfirmDeleteModal from './ConfirmDeleteModal'

interface Category {
  id: number
  description: string
}

export function Categories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddModalOpen, setAddModalOpen] = useState(false)
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = () => {
    const mockCategories = [
      { id: 1, description: 'Categoria 1' },
      { id: 2, description: 'Categoria 2' },
      { id: 3, description: 'Categoria 3' }
    ]
    setCategories(mockCategories)
  }

  const handleOpenAddModal = () => setAddModalOpen(true)
  const handleCloseAddModal = () => setAddModalOpen(false)

  const handleOpenEditModal = (id: number) => {
    setSelectedCategoryId(id)
    setEditModalOpen(true)
  }
  const handleCloseEditModal = () => setEditModalOpen(false)

  const handleOpenDeleteModal = (id: number) => {
    setSelectedCategoryId(id)
    setDeleteModalOpen(true)
  }
  const handleCloseDeleteModal = () => setDeleteModalOpen(false)

  const filteredCategories = categories.filter((category) =>
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
      {/* Barra de Pesquisa e Botão de Adicionar Categoria */}
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
            label="Pesquisar categorias"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ maxWidth: '500px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
          />
        </Box>

        {/* Botão Adicionar Categoria */}
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          sx={{ marginLeft: 2, minWidth: 300 }}
          onClick={handleOpenAddModal}
        >
          Adicionar Categoria
        </Button>
      </Box>

      {/* Tabela de Categorias */}
      <TableContainer sx={{ width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.id}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenEditModal(category.id)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleOpenDeleteModal(category.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Nenhuma categoria encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modais */}
      <AddCategoryModal isOpen={isAddModalOpen} onClose={handleCloseAddModal} />
      <EditCategoryModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        categoryId={selectedCategoryId}
      />
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        categoryId={selectedCategoryId}
      />
    </Box>
  )
}
