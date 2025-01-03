import { ProductModel } from '../../database-models/ProductModel'
import { db } from '../database/db'

export async function GetProductById(id: number): Promise<{
  success: boolean
  data: ProductModel | undefined
  message: string
}> {
  try {
    const product = await db<ProductModel>('products').select('*').where(id).first()
    if (product == undefined) {
      return {
        success: false,
        data: product,
        message: 'Produto não encontrado'
      }
    }
    return {
      success: true,
      data: product,
      message: 'OK'
    }
  } catch (err) {
    console.log(err)
    return {
      success: false,
      data: undefined,
      message: 'Erro ao buscar produto no banco de dados pelo id'
    }
  }
}
