const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const Product = require('../src/models/product');

describe('Product API', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should get all products', async () => {
        const res = await request(app).get('/products');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('should get a product by code', async () => {
        const product = new Product({ code: '12345', product_name: 'Test Product' });
        await product.save();

        const res = await request(app).get('/products/12345');
        expect(res.statusCode).toEqual(200);
        expect(res.body.code).toEqual('12345');

        await Product.deleteOne({ code: '12345' });
    });

    // Outros testes para PUT e DELETE
});
