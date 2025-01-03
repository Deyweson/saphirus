import { Add, Delete, Edit, Search } from '@mui/icons-material'
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@mui/material'
import { useState, useEffect } from 'react'
import AddCategoryModal from './AddCategoryModal'
import EditCategoryModal from './EditCategoryModal'
import ConfirmDeleteModal from './ConfirmDeleteModal'
import { useNotification } from '@renderer/components/notification/NotificationContext'

interface Category {
  id: number
  description: string
}

export function Categories(): JSX.Element {
  const [categories, setCategories] = useState<Category[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddModalOpen, setAddModalOpen] = useState(false)
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)
  const { addNotification } = useNotification()

  useEffect(() => {
    fetchCategories()
  }, [isAddModalOpen, isEditModalOpen, isDeleteModalOpen])

  const fetchCategories = async (): Promise<void> => {
    const response = await window.Categories.getCategories()
    if (response.success) {
      setCategories(response.data)
    } else {
      addNotification(response.message)
    }
  }

  const handleOpenAddModal = (): void => setAddModalOpen(true)
  const handleCloseAddModal = (): void => setAddModalOpen(false)

  const handleOpenEditModal = (id: number): void => {
    setSelectedCategoryId(id)
    setEditModalOpen(true)
  }
  const handleCloseEditModal = (): void => setEditModalOpen(false)

  const handleOpenDeleteModal = (id: number): void => {
    setSelectedCategoryId(id)
    setDeleteModalOpen(true)
  }
  const handleCloseDeleteModal = (): void => setDeleteModalOpen(false)

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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          marginBottom: 2,
          alignItems: 'center'
        }}
      >
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
