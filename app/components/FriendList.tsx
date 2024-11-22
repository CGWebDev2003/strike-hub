import React, { useEffect, useState } from "react";
import {
	AddRegular,
	DeleteRegular,
	PersonAvailableRegular,
	PersonSubtractRegular,
	PersonWarningRegular,
	SubtractRegular,
} from "@fluentui/react-icons";
import {
	TableBody,
	TableCell,
	TableRow,
	Table,
	TableHeader,
	TableHeaderCell,
	TableCellLayout,
	Button,
	Badge,
} from "@fluentui/react-components";
import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
	friendListTable: {
		padding: "1rem 2rem",
	},
	strikeCell: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	strikeBox: {
		position: "relative",
		display: "flex",
		gap: ".5rem",
		alignItems: "center",
	},
	strikeButton: {
		position: "relative",
	},
	strikeNumber: {
		width: "2rem",
		textAlign: "center",
	},
	deleteButton: {
		position: "relative",
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
	{ columnKey: "status", label: "Status" },
	{ columnKey: "lastname", label: "Lastname" },
	{ columnKey: "firstname", label: "Firstname" },
	{ columnKey: "email", label: "Email" },
	{ columnKey: "phone", label: "Phone" },
	{ columnKey: "strikes", label: "Strikes" },
	{ columnKey: "actions", label: "Actions" },
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

	const updateStrikes = async (id: number, newStrikes: number) => {
		try {
			const response = await fetch(`/api/friends/${id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ strikes: newStrikes }),
			});
			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}
			const updatedFriend: Friend = await response.json();

			// Aktualisiere den Zustand
			setFriends((prevFriends) =>
				prevFriends.map((friend) =>
					friend.id === id ? updatedFriend : friend
				)
			);
		} catch (err: any) {
			setError(err.message);
		}
	};

	const incrementStrikes = (id: number, currentStrikes: number) => {
		updateStrikes(id, currentStrikes + 1);
	};

	const decrementStrikes = (id: number, currentStrikes: number) => {
		if (currentStrikes > 0) {
			updateStrikes(id, currentStrikes - 1);
		}
	};

	const deleteFriend = async (id: number) => {
		try {
			const response = await fetch(`/api/friends/${id}`, {
				method: "DELETE",
			});
			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}
			// Aktualisiere die Liste der Freunde nach erfolgreichem Löschen
			setFriends((prevFriends) =>
				prevFriends.filter((friend) => friend.id !== id)
			);
		} catch (err: any) {
			setError(err.message);
		}
	};

	const calculateStatus = (strikes: number) => {
		const statusGreen = (
			<Badge size="extra-large" color="success" appearance="tint">
				<PersonAvailableRegular /> OK
			</Badge>
		);
		const statusYellow = (
			<Badge size="extra-large" color="warning" appearance="tint">
				<PersonWarningRegular /> Warning
			</Badge>
		);
		const statusRed = (
			<Badge size="extra-large" color="severe" appearance="tint">
				<PersonSubtractRegular /> Escalation
			</Badge>
		);

		if (strikes < 2) return statusGreen;
		if (strikes === 2) return statusYellow;
		return statusRed;
	};

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
									{calculateStatus(friend.strikes)}
								</TableCellLayout>
							</TableCell>
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
									<div className={classes.strikeCell}>
										<div className={classes.strikeBox}>
											<Button
												className={classes.strikeButton}
												shape="circular"
												icon={<SubtractRegular />}
												onClick={() =>
													decrementStrikes(
														friend.id,
														friend.strikes
													)
												}></Button>
											<p className={classes.strikeNumber}>
												{friend.strikes}
											</p>
											<Button
												className={classes.strikeButton}
												shape="circular"
												icon={<AddRegular />}
												onClick={() =>
													incrementStrikes(
														friend.id,
														friend.strikes
													)
												}></Button>
										</div>
									</div>
								</TableCellLayout>
							</TableCell>
							<TableCell>
								<TableCellLayout>
									<Button
										className={classes.deleteButton}
										shape="circular"
										icon={<DeleteRegular />}
										onClick={() => deleteFriend(friend.id)}>
										Delete
									</Button>
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
