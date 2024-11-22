import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const { id } = params;

	try {
		// Lösche den Freund anhand der ID
		const deletedFriend = await prisma.friends.delete({
			where: {
				id: Number(id), // Prisma benötigt hier die ID als Zahl
			},
		});

		return NextResponse.json(
			{
				message: `Friend with ID ${id} deleted successfully`,
				deletedFriend,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error deleting friend:", error);
		return NextResponse.json(
			{ error: "Error deleting friend" },
			{ status: 500 }
		);
	} finally {
		await prisma.$disconnect(); // Verbindung zur Datenbank schließen
	}
}
