import React from "react";
import { makeStyles } from "@fluentui/react-components";
import NewFriendButton from "./NewFriendButton";

const useStyles = makeStyles({
	header: {
		backgroundColor: "#1a1a1a",
		color: "white",
		padding: "20px",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
	},
});

const Header = () => {
	const classes = useStyles();

	return (
		<>
			<header className={classes.header}>
				<h1>Strike Hub</h1>
				<NewFriendButton></NewFriendButton>
			</header>
		</>
	);
};

export default Header;
