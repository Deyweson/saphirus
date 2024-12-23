import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { IDatabase } from './models/IDatabase'

// Custom APIs for renderer
const api = {}

const idatabase = {
  GetDB: (): Promise<{ success: boolean; data: IDatabase; message: string }> =>
    ipcRenderer.invoke('get-db'),
  UpdateDB: (data: IDatabase): Promise<{ success: boolean; message: string }> =>
    ipcRenderer.invoke('update-db', data)
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('idatabase', idatabase)
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
}
