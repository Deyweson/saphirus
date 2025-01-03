import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { IDatabase } from './models/IDatabase'
import { IUser } from './models/IUser'

// Custom APIs for renderer
const api = {}

const idatabase = {
  GetDB: (): Promise<{ success: boolean; data: IDatabase; message: string }> =>
    ipcRenderer.invoke('get-db'),
  UpdateDB: (data: IDatabase): Promise<{ success: boolean; message: string }> =>
    ipcRenderer.invoke('update-db', data)
}

const LoginScreen = {
  login: (data: IUser): Promise<{ success: boolean; message: string }> =>
    ipcRenderer.invoke('login', data),
  checkUsers: (): Promise<{ success: boolean; data: number | null; message: string }> =>
    ipcRenderer.invoke('check-users'),
  register: (data: IUser): Promise<{ success: boolean; message: string }> =>
    ipcRenderer.invoke('register', data)
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('idatabase', idatabase)
    contextBridge.exposeInMainWorld('LoginScreen', LoginScreen)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
  // @ts-ignore (define in dts)
  window.idatabase = idatabase
  // @ts-ignore (define in dts)
  window.iuser = iuser
  // @ts-ignore (define in dts)
  window.LoginScreen = LoginScreen
}
