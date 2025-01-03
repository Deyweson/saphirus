import { ipcMain } from 'electron'
import { AddProduct } from './add-product'
import { ProductModel } from '../../database-models/ProductModel'
import { GetProducts } from './get-products'
import { GetProductById } from './get-product-by-id'
import { GetProductByCode } from './get-product-by-code'
import { DeleteProduct } from './delete-product'
import { EditProduct } from './edit-product'

export function Products(): void {
  ipcMain.handle('get-products', async () => {
    return await GetProducts()
  })

  ipcMain.handle('get-product-by-id', async (__event, id: number) => {
    return await GetProductById(id)
  })

  ipcMain.handle('get-product-by-code', async (__event, code: string) => {
    return await GetProductByCode(code)
  })

  ipcMain.handle('add-product', async (__event, product: ProductModel) => {
    return await AddProduct(product)
  })

  ipcMain.handle('edit-product', async (__event, product: ProductModel) => {
    return await EditProduct(product)
  })

  ipcMain.handle('delete-product', async (__event, id: number) => {
    return await DeleteProduct(id)
  })
}
