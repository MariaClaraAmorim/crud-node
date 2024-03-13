// Importações necessárias do Fastify para tipos e funcionalidades
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";

// Importações dos controladores para manipular as requisições
import { DeleteStockController } from "./controllers/DeleteStockController";
import { ListStockController } from "./controllers/ListStockController";
import { CreateStockController } from "./controllers/CreateStockController";
import { LoginUserController } from "./controllers/LoginUserController";
import { RegisterUserController } from "./controllers/RegisterUserController";
import { logoutUser } from "./controllers/logoutController";
import { getUsers } from "./controllers/UsersListController";
import { deleteUserHandler } from "./controllers/DeleteUserController";

// Função responsável por definir as rotas da aplicação
export async function routes(fastify: FastifyInstance) {
  // Rota de teste simples para verificar se o servidor está online
  fastify.get(
    "/teste",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return { ok: true }; // Retorna um objeto indicando que o servidor está online
    }
  );
  // Rota de login

  fastify.post(
    "/login",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new LoginUserController().handle(request, reply);
    }
  );

  // Rota para registrar um novo usuario
  fastify.post("/register", async (request, reply) => {
    return new RegisterUserController().handle(request, reply);
  });

  // Rota para listar usuários
  fastify.get("/users", getUsers);

  // Rota para deletar um usuário
  fastify.delete("/users/:userId", deleteUserHandler);

  // Rota para logout
  fastify.post(
    "/logout",
    async (request: FastifyRequest, reply: FastifyReply) => {
      // Chama a função do controlador de logout
      await logoutUser(request, reply);
    }
  );

  // Rota para registrar um novo produto
  fastify.post(
    "/register-stock",
    async (request: FastifyRequest, reply: FastifyReply) => {
      // Cria uma instância do controlador de criação de produto e chama o método handle para lidar com a requisição
      return new CreateStockController().handle(request, reply);
    }
  );

  // Rota para listar produtos
  fastify.get(
    "/list-stock",
    async (request: FastifyRequest, reply: FastifyReply) => {
      // Cria uma instância do controlador de listagem de produtos e chama o método handle para lidar com a requisição
      return new ListStockController().handle(request, reply);
    }
  );

  // Rota para excluir um produto
  fastify.delete(
    "/delete-stock",
    async (request: FastifyRequest, reply: FastifyReply) => {
      // Cria uma instância do controlador de exclusão de produto e chama o método handle para lidar com a requisição
      return new DeleteStockController().handle(request, reply);
    }
  );
}
