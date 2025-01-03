import { CategoriesModel } from '../../database-models/CategoriesModel'
import { db } from '../database/db'

export async function AddCategorie(
  description: string
): Promise<{ success: boolean; message: string }> {
  try {
    await db<CategoriesModel>('categories').insert({ description })
    return {
      success: true,
      message: 'Categoria adicionada com sucesso!'
    }
  } catch (error) {
    return {
      success: false,
      message: 'Erro ao adicionar a categoria!'
    }
  }
}
