import fastifyWebsocket from "@fastify/websocket";
import Fastify from "fastify";
import websocket from "./src/socket";

const fastify = Fastify();
fastify.register(fastifyWebsocket);
fastify.register(websocket);

fastify.listen({ port: 80, host: '0.0.0.0' }, (err, addr) => {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	} else {
        console.log(`Server listening at ${addr}`);
    }
});
