import type { FastifyInstance } from "fastify";
import { dashboard, sellers } from "./controller";

const MAX_ITEMS = 625;

interface Message {
	data: {
		application: string;
		clientId?: number;
		profit?: number;
		currentItems?: number;
	};
}

const websocket = async (fastify: FastifyInstance) => {
	const { fetchAll, update, fetchById } = sellers();
	fastify.get("/", { websocket: true }, (socket, req) => {
		socket.on("message", (message) => {
			const { data } = JSON.parse(message.toString()) as Message;
			if (data.application === "app-desktop") {
				const dash = dashboard();
				socket.send(JSON.stringify(dash));
			} else if (data.application === "hardware-client") {
				const currentItems = data.currentItems || 0;
				const unitsSold = MAX_ITEMS - currentItems;
				const toFinish = MAX_ITEMS - unitsSold;
				const profit = data.profit || 0;
				const seller = fetchById(data.clientId as number) ?? {
					name: "Jessica",
				};
				update(data.clientId as number, {
					...seller,
					ativo: true,
					unitsSold,
					toFinish,
					profit,
				});
				const dash = dashboard();
				const sellers = fetchAll();
				const desktopClients = fastify.websocketServer.clients;
				for (const client of desktopClients) {
					if (client.readyState === 1) {
						client.send(JSON.stringify({ ...dash, sellers }));
					}
				}
			}
		});
		socket.on("error", (err) => {
			console.error(err);
		});
	});
};

export default websocket;
