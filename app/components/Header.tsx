import React from "react";
import FriendFormDialog from "./FriedFormDialog";
import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
	header: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "#f4f4f4",
		boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
		height: "5rem",
		padding: "0 2rem",
	},
	logoBox: {
		position: "relative",
	},
	logoText: {
		position: "relative",
		fontSize: "1.7rem",
		fontWeight: "bold",
		color: "#333",
		userSelect: "none",
	},
});

const Header = () => {
	const classes = useStyles();

	return (
		<header className={classes.header}>
			<div className={classes.logoBox}>
				<h3 className={classes.logoText}>Strike Hub</h3>
			</div>
			<FriendFormDialog />
		</header>
	);
};

export default Header;
