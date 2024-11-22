"use client";

import * as React from "react";
import {
	Dialog,
	DialogTrigger,
	DialogSurface,
	DialogTitle,
	DialogBody,
	DialogActions,
	DialogContent,
	Button,
} from "@fluentui/react-components";
import NewFriendForm from "./NewFriendForm";
import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
	dialogText: {
		marginBottom: "1rem",
	},
	dialogButtonBox: {
		position: "relative",
		marginTop: "1rem",
	},
});

const FriendFormDialog = () => {
	const classes = useStyles();
	const [formData, setFormData] = React.useState({
		firstname: "",
		lastname: "",
		email: "",
		phone: "",
		strikes: 0,
	});
	const [error, setError] = React.useState<string | null>(null);
	const [isDialogOpen, setIsDialogOpen] = React.useState(false);

	function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: name === "strikes" ? parseInt(value, 10) || 0 : value,
		}));
	}

	async function addFriend() {
		try {
			const response = await fetch("/api/friends", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				throw new Error(await response.text());
			}

			const newFriend = await response.json();
			console.log("Friend added successfully:", newFriend);

			// Reset form data
			setFormData({
				firstname: "",
				lastname: "",
				email: "",
				phone: "",
				strikes: 0,
			});

			// Close the dialog
			setIsDialogOpen(false);
		} catch (err: any) {
			setError(`Failed to add friend: ${err.message}`);
		}
	}

	return (
		<Dialog
			open={isDialogOpen}
			onOpenChange={(event, data) => setIsDialogOpen(data.open)}>
			<DialogTrigger disableButtonEnhancement>
				<Button
					size="large"
					appearance="primary"
					onClick={() => setIsDialogOpen(true)}>
					Add Friend
				</Button>
			</DialogTrigger>
			<DialogSurface>
				<DialogBody>
					<DialogTitle>Add a new friend</DialogTitle>
					<DialogContent>
						<NewFriendForm
							formData={formData}
							onChange={handleInputChange}
						/>
					</DialogContent>
					<DialogActions className={classes.dialogButtonBox}>
						<DialogTrigger disableButtonEnhancement>
							<Button
								size="large"
								onClick={() => setIsDialogOpen(false)}>
								Close
							</Button>
						</DialogTrigger>
						<Button
							size="large"
							appearance="primary"
							onClick={addFriend}>
							Add Friend
						</Button>
					</DialogActions>
					{error && <p style={{ color: "red" }}>{error}</p>}
				</DialogBody>
			</DialogSurface>
		</Dialog>
	);
};

export default FriendFormDialog;
