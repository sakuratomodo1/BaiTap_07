const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');

// Import các module
const connectDB = require('./src/config/db');
const typeDefs = require('./src/graphql/typeDefs');
const resolvers = require('./src/graphql/resolvers');
const seedData = require('./src/utils/seeder');

async function startServer() {
    // 1. Kết nối Database
    await connectDB();

    // 2. Tạo dữ liệu mẫu (nếu chưa có)
    await seedData();

    // 3. Khởi tạo Apollo Server
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();

    const app = express();
    app.use(cors());
    server.applyMiddleware({ app });

    // 4. Start Server
    app.listen(4000, () => {
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    });
}

startServer();