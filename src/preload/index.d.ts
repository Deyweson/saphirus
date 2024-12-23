import { ElectronAPI } from '@electron-toolkit/preload'
import { IDatabase } from './models/IDatabase'

interface idatabase {
  GetDB: () => Promise<{ success: boolean; data: IDatabase; message: string }>
  UpdateDB: (data: IDatabase) => Promise<{ success: boolean; message: string }>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    idatabase: idatabase
  }
}
