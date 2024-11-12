import fastifyWebsocket from "@fastify/websocket";
import Fastify from "fastify";

const fastify = Fastify();
fastify.register(fastifyWebsocket);
fastify.register(async (fastify) => {
	fastify.get(
		"/",
		{ websocket: true },
		(socket /* WebSocket */, req /* FastifyRequest */) => {
			socket.on("message", (message) => {
                console.log(message);
				// message.toString() === 'hi from client'
				socket.send("hi from server");
			});
			socket.on("error", (err) => {
				console.error(err);
			});
            socket.on("close", () => {
                console.log("closed");
            });
            socket.on("open", () => {
                console.log("opened");
            });
		},
	);
});

fastify.listen({ port: 80, host: '0.0.0.0' }, (err, addr) => {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	} else {
        console.log(`Server listening at ${addr}`);
    }
});
