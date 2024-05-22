
const fs = require('fs').promises


class ManagerProducts{
    constructor(){
        this.productsFile= "productos.json";
        this.nextId = 1
    }

    async addProducto(producto){
        try {
            let productos = await this.leerProductos()
            
 

            if (productos.some(p => p.code === producto.code)) {
                console.error(`El código "${producto.code}" ya está en uso.`);
                return;
            }

           
            productos.push({ ...producto, id: this.nextId++ });
            console.log(producto)

            await fs.writeFile(this.productsFile, JSON.stringify(productos, null, 2))
            console.log("Producto Agregado correctamente")

        } catch (error) {
            console.error("error al crear el producto",error)
        }

    }
    
    async getProductos(){
        try {
            return await this.leerProductos()
        } catch (error) {
            console.error("Error al consultar productos", error)
            return[]
            
        }
    }


    
    async getProductosById(id){
        try {
            let productos = await this.leerProductos();
            const busquedad = productos.find(producto => producto.id === id);
            return busquedad;
            
       
        } catch (error) {
                console.error("Error al consultar productos", error)
                return[]
                
         }
    }

    async updateProducto(id, updatedFields) {
        try {
            let productos = await this.leerProductos();
            const index = productos.findIndex(producto => producto.id === id);

            if (index === -1) {
                console.error(`Producto con id ${id} no encontrado.`);
                return false;
            }

            productos[index] = { ...productos[index], ...updatedFields };

            await fs.writeFile(this.productsFile, JSON.stringify(productos, null, 2));
            console.log("Producto actualizado correctamente");
            return true;

        } catch (error) {
            console.error("Error al actualizar productos", error);
            return false;
        }
    }

    async deleteProducto(id) {
        try {
            let productos = await this.leerProductos();
            const index = productos.findIndex(producto => producto.id === id);

            if (index === -1) {
                console.error(`Producto con id ${id} no encontrado.`);
                return false;
            }

            productos.splice(index, 1); // Elimina el producto del array

            await fs.writeFile(this.productsFile, JSON.stringify(productos, null, 2));
            console.log("Producto eliminado correctamente");
            return true;

        } catch (error) {
            console.error("Error al eliminar producto", error);
            return false;
        }
    }




    async leerProductos(){

        try {
            const data = await fs.readFile(this.productsFile, "utf-8")
            return JSON.parse(data)
        } catch (error) {
            // VALIDACION DE QUE EL ARCHIVO NO SE ENCUENTRE VACIO
            if (error.code === "ENOENT") {
                return []
            }else{
                throw error
            }
            
            
        }
    }
}


module.exports = ManagerProducts
