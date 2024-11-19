import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
	if (req.method === "GET") {
		const users = await prisma.friends.findMany();
		res.json(users);
	} else if (req.method === "POST") {
		const { firstName, lastName, strikes } = req.body;
		const user = await prisma.friends.create({
			data: { firstName, lastName, strikes },
		});
		res.json(user);
	} else {
		res.status(405).send({ message: "Only GET and POST allowed" });
	}
}
