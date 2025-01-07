import { app, dialog, ipcMain } from 'electron'
import path from 'path'

export function SelectFile(): void {
  ipcMain.handle('select-file', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openFile'],
      defaultPath: path.join(app.getPath('documents')),
      filters: [
        { name: 'Imagens', extensions: ['jpg', 'jpeg', 'png', 'gif'] },
        { name: 'PDF', extensions: ['pdf'] },
        { name: 'Todos os arquivos', extensions: ['*'] }
      ]
    })

    if (!result.canceled && result.filePaths.length > 0) {
      console.log(result.filePaths[0])
      return result.filePaths[0]
    }

    return ''
  })
}
