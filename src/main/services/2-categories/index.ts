import { ipcMain } from 'electron'
import { GetCategories } from './get-categories'
import { AddCategorie } from './add-categories'
import { GetCategorieById } from './get-categorie-by-id'
import { ICategorie } from '../../../preload/models/ICategorie'
import { EditCategorie } from './edit-categorie'
import { DeleteCategorie } from './delete-categorie'

export function Categories(): void {
  ipcMain.handle('get-categories', async () => {
    return await GetCategories()
  })

  ipcMain.handle('get-categorie-by-id', async (__event, id: number) => {
    return await GetCategorieById(id)
  })

  ipcMain.handle('add-categorie', async (__event, description: string) => {
    return await AddCategorie(description)
  })

  ipcMain.handle('edit-categorie', async (__event, categorie: ICategorie) => {
    return await EditCategorie(categorie.id, categorie.description)
  })

  ipcMain.handle('delete-categorie', async (__event, id: number) => {
    return await DeleteCategorie(id)
  })
}
