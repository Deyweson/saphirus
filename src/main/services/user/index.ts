import { ipcMain } from 'electron'

export function database(): void {
  ipcMain.handle('login', () => {
    console.log('login')
  })
  ipcMain.handle('register', () => {
    console.log('register')
  })
}
