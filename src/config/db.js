const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI,)
        console.log('Conexão MongoDB com Sucesso! ✅ ');
    } catch (error) {
        console.error('Conexão com MongoDB Falhou ❌:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
