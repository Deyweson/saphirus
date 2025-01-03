import { ProductModel } from '../../database-models/ProductModel'
import { db } from '../database/db'

export async function EditProduct(product: ProductModel): Promise<{
  success: boolean
  message: string
}> {
  try {
    await db<ProductModel>('products').update(product).where(product.id)
    return {
      success: true,
      message: 'Produto editado com sucesso'
    }
  } catch (err) {
    console.log(err)
    return {
      success: false,
      message: 'Erro ao editar o produto'
    }
  }
}
