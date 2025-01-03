import { ProductModel } from '../../database-models/ProductModel'
import { db } from '../database/db'

export async function AddProduct(
  product: ProductModel
): Promise<{ success: boolean; message: string }> {
  try {
    await db<ProductModel>('products').insert(product)
    return {
      success: true,
      message: 'Produto adicionado com sucesso'
    }
  } catch (err) {
    return {
      success: false,
      message: 'Erro ao adicionar o produto'
    }
  }
}
