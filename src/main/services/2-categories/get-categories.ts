import { CategoriesModel } from '../../database-models/CategoriesModel'
import { db } from '../database/db'

export async function GetCategories(): Promise<{
  success: boolean
  data: CategoriesModel[] | null
  message: string
}> {
  try {
    const result = await db<CategoriesModel>('categories').select('*')
    return {
      success: true,
      data: result,
      message: 'OK'
    }
  } catch (er) {
    console.log(er)
    return {
      success: false,
      data: null,
      message: 'Erro ao buscar as categorias'
    }
  }
}
