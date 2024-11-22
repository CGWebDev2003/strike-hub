import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
	try {
		const friends = await prisma.friends.findMany();

		return NextResponse.json(friends);
	} catch (error) {
		console.error("Error fetching friends:", error);
		return NextResponse.json(
			{ message: "Failed to fetch friends." },
			{ status: 500 }
		);
	}
}

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { lastname, firstname, email, phone, strikes } = body;

		if (!lastname || !firstname || !email) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 }
			);
		}

		const newFriend = await prisma.friends.create({
			data: {
				lastname,
				firstname,
				email,
				phone: phone || null,
				strikes: strikes || 0,
			},
		});

		return NextResponse.json(newFriend, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to add friend" },
			{ status: 500 }
		);
	}
}
