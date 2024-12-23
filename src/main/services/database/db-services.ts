import { app } from 'electron'
import fs from 'fs'
import path from 'path'
import { IDatabase } from '../../../preload/models/IDatabase'

const dbConfigPath = path.join(app.getPath('documents'), 'shapirus', 'db.json')

// Função para criar o arquivo db.json, caso ele não exista
async function CreateDBConfig(): Promise<void> {
  const dbDirectory = path.dirname(dbConfigPath)
  const defaultConfig: IDatabase = {
    host: '',
    port: '',
    user: '',
    password: '',
    database: ''
  }

  try {
    if (!fs.existsSync(dbDirectory)) {
      fs.mkdirSync(dbDirectory, { recursive: true })
    }

    if (!fs.existsSync(dbConfigPath)) {
      await fs.promises.writeFile(dbConfigPath, JSON.stringify(defaultConfig, null, 2), 'utf8')
      console.log('Arquivo db.json criado com configurações padrão.')
    }
  } catch (error) {
    console.error('Erro ao criar o arquivo de configuração:', error)
    throw error
  }
}

// Função para ler o arquivo db.json e retornar a configuração como um objeto IDatabase
export function GetDBConfig(): IDatabase | null {
  try {
    if (fs.existsSync(dbConfigPath)) {
      const configData = fs.readFileSync(dbConfigPath, 'utf-8')
      const config: IDatabase = JSON.parse(configData)
      console.log('Configuração carregada:', config)
      return config
    } else {
      console.warn('Arquivo de configuração não encontrado.')
      return null
    }
  } catch (error) {
    console.error('Erro ao ler o arquivo de configuração:', error)
    return null
  }
}

// Função para atualizar o arquivo db.json com novos dados de configuração
export function updateConfig(data: IDatabase): void {
  try {
    const newConfig = {
      host: data.host,
      port: data.port,
      user: data.user,
      password: data.password,
      database: data.database
    }
    fs.writeFileSync(dbConfigPath, JSON.stringify(newConfig, null, 2), 'utf-8')
    console.log('Configuração atualizada com sucesso!')
  } catch (error) {
    console.error('Erro ao atualizar o arquivo de configuração:', error)
  }
}

// Função principal para inicializar a configuração do banco de dados
export async function initializeDBConfig(): Promise<void> {
  try {
    await CreateDBConfig() // Garante que o arquivo seja criado se não existir
    const config = GetDBConfig() // Lê o arquivo depois que ele foi criado
    if (config) {
      console.log('Configuração inicial do banco de dados carregada:', config)
    }
  } catch (error) {
    console.error('Erro ao inicializar a configuração do banco de dados:', error)
  }
}
