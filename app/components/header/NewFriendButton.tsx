import React from "react";
import { makeStyles, Button } from "@fluentui/react-components";
import { AddCircle24Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
	newFriendButton: {
		padding: "15px",
		display: "flex",
		gap: ".5rem",
		backgroundColor: "#3e5c76",
		borderRadius: "5rem",
		transition: ".5s ease",

		"&:hover": {
			backgroundColor: "#517c96",
			transform: "scale(1.05)",
		},

		"&:focus": {
			outline: "2px solid #1D2D44",
			outlineOffset: "2px",
		},
	},
});

const NewFriendButton = () => {
	const classes = useStyles();

	return (
		<Button
			className={classes.newFriendButton}
			shape="circular"
			icon={<AddCircle24Regular />}
			appearance="primary">
			New Friend
		</Button>
	);
};

export default NewFriendButton;
