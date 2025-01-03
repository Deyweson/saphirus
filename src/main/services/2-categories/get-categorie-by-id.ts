import { ICategorie } from '../../../preload/models/ICategorie'
import { db } from '../database/db'

export async function GetCategorieById(id: number): Promise<{
  success: boolean
  data: ICategorie | undefined
  message: string
}> {
  try {
    const categorie = await db<ICategorie>('categories').select('*').where({ id }).first()
    return {
      success: true,
      data: categorie,
      message: 'OK'
    }
  } catch (error) {
    return {
      success: false,
      data: undefined,
      message: 'Erro ao buscar a categoria'
    }
  }
}
