import { ElectronAPI } from '@electron-toolkit/preload'
import { IDatabase } from './models/IDatabase'
import { IUser } from './models/IUser'

interface idatabase {
  GetDB: () => Promise<{ success: boolean; data: IDatabase; message: string }>
  UpdateDB: (data: IDatabase) => Promise<{ success: boolean; message: string }>
}

interface iuser {
  register: (data: IUser) => Promise<{ success: boolean; message: string }>
  login: (data: IUser) => Promise<{ success: boolean; message: string }>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    idatabase: idatabase
    iuser: iuser
  }
}
