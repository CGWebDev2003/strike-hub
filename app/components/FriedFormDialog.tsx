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
});

const FriendFormDialog = () => {
	function addFriend() {
		console.log("Add Friend");
	}

	return (
		<Dialog>
			<DialogTrigger disableButtonEnhancement>
				<Button size="large" appearance="primary">
					Add Friend
				</Button>
			</DialogTrigger>
			<DialogSurface>
				<DialogBody>
					<DialogTitle>Add a new friend</DialogTitle>
					<DialogContent>
						<p className="dialogText">
							Add new friends here to track their strikes.
						</p>
						<NewFriendForm></NewFriendForm>
					</DialogContent>
					<DialogActions>
						<DialogTrigger disableButtonEnhancement>
							<Button size="large">Close</Button>
						</DialogTrigger>
						<Button
							size="large"
							appearance="primary"
							onClick={addFriend}>
							Add Friend
						</Button>
					</DialogActions>
				</DialogBody>
			</DialogSurface>
		</Dialog>
	);
};

export default FriendFormDialog;
