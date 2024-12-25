// types.ts

// Tipo para a tabela de Usuários
export interface User {
  id: number
  username: string
  password: string
}

// Tipo para a tabela de Categorias
export interface Categoria {
  id: number
  description: string
}

// Tipo para a tabela de Produtos
export interface Produto {
  id: number
  code: string
  name: string
  price: number
  description: string
  img_path: string
  stock_quantity: number
  stock_type: 'unidade' | 'peso'
  category_id: number
}

// Tipo para a tabela de Movimentações de Estoque
export interface StockMovement {
  id: number
  product_id: number
  movement_type: 'entrada' | 'saida'
  quantity: number
  date: Date
  reason?: string
}
