import type { FastifyInstance } from "fastify";
import { sellers } from "./controller";

const server = async (fastify: FastifyInstance) => {
	const { fetchAll, update, fetchById } = sellers();
	fastify.get("/vendedores", (req, res) => {
		res.send({
			data: fetchAll(),
		});
	});
	fastify.get<{ Params: { id: string } }>("/vendedores/:id", (req, res) => {
		const { id } = req.params;
		res.send(fetchById(Number(id)));
	});
};

export default server;
