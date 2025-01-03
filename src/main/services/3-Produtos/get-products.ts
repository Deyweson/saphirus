import { ProductModel } from '../../database-models/ProductModel'
import { db } from '../database/db'

export async function GetProducts(): Promise<{
  success: boolean
  data: ProductModel[] | null
  message: string
}> {
  try {
    const products = await db<ProductModel>('products').select('*')
    return {
      success: true,
      data: products,
      message: 'OK'
    }
  } catch (err) {
    console.log(err)
    return {
      success: false,
      data: null,
      message: 'Erro ao buscar produtos no banco de dados'
    }
  }
}
