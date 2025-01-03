import { ElectronAPI } from '@electron-toolkit/preload'
import { IDatabase } from './models/IDatabase'
import { IUser } from './models/IUser'

interface idatabase {
  GetDB: () => Promise<{ success: boolean; data: IDatabase; message: string }>
  UpdateDB: (data: IDatabase) => Promise<{ success: boolean; message: string }>
}

interface LoginScreen {
  register: (data: IUser) => Promise<{ success: boolean; message: string }>
  login: (data: IUser) => Promise<{ success: boolean; message: string }>
  checkUsers: () => Promise<{ success: boolean; data: number | null; message: string }>
}

interface Categories {
  addCategorie: (description: string) => Promise<{ success: boolean; message: string }>
  getCategories: () => Promise<{ success: boolean; message: string }>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    idatabase: idatabase
    iuser: iuser
    LoginScreen: LoginScreen
    Categories: Categories
  }
}
