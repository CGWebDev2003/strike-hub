import * as React from "react";

import type { FieldProps } from "@fluentui/react-components";
import { Field, Input } from "@fluentui/react-components";

type Props = {
	formData: {
		firstname: string;
		lastname: string;
		email: string;
		phone: string;
		strikes: number;
	};
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const NewFriendForm = ({ formData, onChange, ...props }: Props) => (
	<>
		<form>
			<Field label="Firstname" validationState="none" {...props}>
				<Input
					type="text"
					name="firstname"
					value={formData.firstname}
					onChange={onChange}
					size="large"
					appearance="filled-darker"
				/>
			</Field>

			<Field label="Lastname" validationState="none" {...props}>
				<Input
					type="text"
					name="lastname"
					value={formData.lastname}
					onChange={onChange}
					size="large"
					appearance="filled-darker"
				/>
			</Field>

			<Field label="Email" validationState="none" {...props}>
				<Input
					type="email"
					name="email"
					value={formData.email}
					onChange={onChange}
					size="large"
					appearance="filled-darker"
				/>
			</Field>

			<Field label="Phone" validationState="none" {...props}>
				<Input
					type="tel"
					name="phone"
					value={formData.phone}
					onChange={onChange}
					size="large"
					appearance="filled-darker"
				/>
			</Field>

			<Field label="Initial Strikes" validationState="none" {...props}>
				<Input
					type="number"
					name="strikes"
					onChange={onChange}
					size="large"
					appearance="filled-darker"
				/>
			</Field>
		</form>
	</>
);

export default NewFriendForm;
