const express = require('express');
const { randomUUID } = require('crypto');
const fs = require('fs');

const app = express();

app.use(express.json());

let products = [];

fs.readFile('products.json', 'utf-8', (err, data) => {
    if(err){
        console.log(err)
    } else{
        products = JSON.parse(data);
    }
})

//INSERT PRODUCT
app.post('/products', (request, response) => {
    const { name, price } = request.body;

    const product = {
        id: randomUUID(),
        name, 
        price
    };

    products.push(product);

    productFile();

    return response.json(product)
})

//RETURN PRODUCT
app.get('/products', (request, response) => {
    return response.json(products);
})

app.get('/products/:id', (request, response) => {
    const { id } = request.params;
    const product = products.find(product => product.id === id);

    return response.json(product);
})

//UPDATE PRODUCT
app.put('/products/:id', (request, response) => {
    const { id } = request.params;
    const { name, price } = request.body;

    const productIndex = products.findIndex(product => product.id === id);

    products[productIndex] = {
        ...products[productIndex],
        name,
        price
    }

    productFile();

    return response.json({ message: 'Product successfully updated' })
})

//DELETE PRODUCT
app.delete('/products/:id', (request, response) => {
    const { id } = request.params;

    const productIndex = products.findIndex(product => product.id === id);

    products.splice(productIndex, 1);

    productFile();

    return response.json({ message: 'Product successfully deleted' })
})

function productFile(){
    fs.writeFile('products.json', JSON.stringify(products), (err) => {
        if(err){
            console.log(err)
        } else{
            console.log('Product successfully inserted')
        }
    })
}

app.listen('4002', () => console.log('Server is running at port 4002'));

