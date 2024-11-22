import React, { useEffect, useState } from "react";
import {
	TableBody,
	TableCell,
	TableRow,
	Table,
	TableHeader,
	TableHeaderCell,
	TableCellLayout,
} from "@fluentui/react-components";
import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
	friendListTable: {
		padding: "1rem 2rem",
	},
});

type Friend = {
	id: number;
	lastname: string;
	firstname: string;
	email: string;
	phone: string | null;
	strikes: number;
};

const columns = [
	{ columnKey: "lastname", label: "Lastname" },
	{ columnKey: "firstname", label: "Firstname" },
	{ columnKey: "email", label: "Email" },
	{ columnKey: "phone", label: "Phone" },
	{ columnKey: "strikes", label: "Strikes" },
];

const FriendList = () => {
	const classes = useStyles();
	const [friends, setFriends] = useState<Friend[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchFriends = async () => {
			try {
				const response = await fetch("/api/friends");
				if (!response.ok) {
					throw new Error(`Error: ${response.statusText}`);
				}
				const data: Friend[] = await response.json();
				setFriends(data);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchFriends();
	}, []);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div className={classes.friendListTable}>
			<Table
				aria-label="Friends List Table"
				style={{ minWidth: "510px" }}>
				<TableHeader>
					<TableRow>
						{columns.map((column) => (
							<TableHeaderCell key={column.columnKey}>
								{column.label}
							</TableHeaderCell>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{friends.map((friend) => (
						<TableRow key={friend.id}>
							<TableCell>
								<TableCellLayout>
									{friend.lastname}
								</TableCellLayout>
							</TableCell>
							<TableCell>
								<TableCellLayout>
									{friend.firstname}
								</TableCellLayout>
							</TableCell>
							<TableCell>
								<TableCellLayout>
									{friend.email}
								</TableCellLayout>
							</TableCell>
							<TableCell>
								<TableCellLayout>
									{friend.phone}
								</TableCellLayout>
							</TableCell>
							<TableCell>
								<TableCellLayout>
									{friend.strikes}
								</TableCellLayout>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default FriendList;
