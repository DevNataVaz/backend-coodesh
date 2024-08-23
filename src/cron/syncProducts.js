const cron = require('node-cron');
const axios = require('axios');
const Product = require('../models/product');

const syncProducts = cron.schedule('0 0 * * *', async () => {
    try {
        const { data: productList } = await axios.get('https://challenges.coode.sh/food/data/json/index.txt');
        const files = productList.split('\n').filter(Boolean).slice(0, 100);

        for (const file of files) {
            const { data: products } = await axios.get(`https://challenges.coode.sh/food/data/json/${file}`);
            const productsToSave = products.map(product => ({
                ...product,
                imported_t: new Date(),
                status: 'draft',
            }));

            await Product.insertMany(productsToSave, { ordered: false });
        }

        console.log('Produtos sincronizados com sucesso! ✅.');
    } catch (error) {
        console.error('Erro ao sincronizar produtos ❌:', error.message);
    }
});

module.exports = syncProducts;