import { ipcMain } from 'electron'
import { GetCategories } from './get-categories'
import { AddCategorie } from './add-categories'

export function Categories(): void {
  ipcMain.handle('get-categories', async () => {
    return await GetCategories()
  })

  ipcMain.handle('add-categorie', async (__event, description: string) => {
    return await AddCategorie(description)
  })

  ipcMain.handle('edit-categorie', async () => {})

  ipcMain.handle('delete-categorie', async () => {})
}
