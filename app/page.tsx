"use client";

import { useState, useEffect } from "react";
import { Button, Text, Input } from "@fluentui/react-components";

import Header from "./components/header/Header";

interface User {
	id: number;
	name: string;
	email: string;
}

export default function Home() {
	const [users, setUsers] = useState<User[]>([]);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	useEffect(() => {
		fetch("/api/users")
			.then((res) => res.json())
			.then(setUsers);
	}, []);

	const addUser = async () => {
		const res = await fetch("/api/users", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, email }),
		});
		const newUser = await res.json();
		setUsers([...users, newUser]);
	};

	return (
		<>
			<Header></Header>
			<div style={{ padding: 20 }}>
				{/* Remove variant prop and add styling via style or Fluent tokens */}
				<Text style={{ fontSize: "20px", fontWeight: "bold" }}>
					User List
				</Text>
				<ul>
					{users.map((user) => (
						<li key={user.id}>
							{user.name} ({user.email})
						</li>
					))}
				</ul>
				<Input
					placeholder="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<Input
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Button onClick={addUser}>Add User</Button>
			</div>
		</>
	);
}
