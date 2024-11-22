import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const { id } = params;

	try {
		const deletedFriend = await prisma.friends.delete({
			where: {
				id: Number(id),
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
		await prisma.$disconnect();
	}
}

export async function PATCH(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const { id } = params;

	try {
		const { strikes } = await request.json();

		const updatedFriend = await prisma.friends.update({
			where: { id: parseInt(id, 10) },
			data: { strikes },
		});

		return NextResponse.json(updatedFriend, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Failed to update friend" },
			{ status: 500 }
		);
	}
}
