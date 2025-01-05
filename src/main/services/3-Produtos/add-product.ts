import { ProductModel } from '../../database-models/ProductModel'
import { db } from '../database/db'

export async function AddProduct(
  product: ProductModel
): Promise<{ success: boolean; message: string }> {
  try {
    // validate prod code before add into database
    const codeValidate = await db<ProductModel>('products')
      .select('*')
      .where('code', product.code)
      .first()
    if (codeValidate) {
      return {
        success: false,
        message: 'O código do produto já esta cadastrado'
      }
    }

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
