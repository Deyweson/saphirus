import { ProductModel } from '../../database-models/ProductModel'
import { db } from '../database/db'

export async function DeleteProduct(id: number): Promise<{
  success: boolean
  message: string
}> {
  try {
    await db<ProductModel>('products').delete().where(id)
    return {
      success: true,
      message: 'Produto deletado com sucesso'
    }
  } catch (err) {
    console.log(err)
    return {
      success: false,
      message: 'Erro ao deletar o produto'
    }
  }
}
