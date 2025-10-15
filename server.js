import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';

const app = express();
const PORT = process.env.PORT || 3000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

await server.start();

app.use(cors());
app.use(express.json());

// Ruta principal que sirve una página de bienvenida
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>GraphQL Football API</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            text-align: center;
          }
          h1 { color: #2c3e50; }
          .btn {
            display: inline-block;
            padding: 15px 30px;
            margin: 10px;
            background: #3498db;
            color: white;
            text-decoration: none;
            border-radius: 5px;
          }
          .btn:hover { background: #2980b9; }
        </style>
      </head>
      <body>
        <h1>🚀 GraphQL Football API</h1>
        <p>API GraphQL de fútbol con datos de jugadores, partidos y estadios</p>
        <a href="/graphql" class="btn">Abrir GraphQL Playground</a>
      </body>
    </html>
  `);
});

app.use('/graphql', expressMiddleware(server));

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📊 GraphQL Playground: http://localhost:${PORT}/graphql`);
});
