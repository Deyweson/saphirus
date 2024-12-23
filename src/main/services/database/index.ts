import { ipcMain } from 'electron'
import { IDatabase } from '../../../preload/models/IDatabase'
import { GetDBConfig, updateConfig } from './db-services'

export function database(): void {
  ipcMain.handle('update-db', (_event, data: IDatabase) => {
    try {
      updateConfig(data)
      return {
        success: true,
        message: 'Banco de dados alterado com sucesso'
      }
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao alterar o banco de dados'
      }
    }
  })
  ipcMain.handle('get-db', () => {
    try {
      const db = GetDBConfig()
      return {
        success: true,
        message: 'Ok',
        data: db
      }
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao buscar os dados do banco de dados',
        data: null
      }
    }
  })
}
