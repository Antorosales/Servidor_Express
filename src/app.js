const express = require('express');
const ManagerProducts = require('./ProductManager'); 

const app = express();
const port = 8080;
const manager = new ManagerProducts();

app.use(express.json());


app.get('/products', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const products = await manager.getProductos();
        if (limit && !isNaN(limit)) {
            return res.json(products.slice(0, limit));
        }
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los productos" });
    }
});


app.get('/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await manager.getProductoById(productId);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el producto" });
    }
});


app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto: ${port}`);
});