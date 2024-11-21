import * as React from "react";

import type { FieldProps } from "@fluentui/react-components";
import { Field, Input } from "@fluentui/react-components";

const NewFriendForm = (props: Partial<FieldProps>) => (
	<>
		<form action="">
			<Field label="Firstname" validationState="none" {...props}>
				<Input type="text" size="large" appearance="filled-darker" />
			</Field>

			<Field label="Lastname" validationState="none" {...props}>
				<Input type="text" size="large" appearance="filled-darker" />
			</Field>

			<Field label="Email" validationState="none" {...props}>
				<Input type="email" size="large" appearance="filled-darker" />
			</Field>

			<Field label="Phone" validationState="none" {...props}>
				<Input type="tel" size="large" appearance="filled-darker" />
			</Field>

			<Field label="Initial Strikes" validationState="none" {...props}>
				<Input type="number" size="large" appearance="filled-darker" />
			</Field>
		</form>
	</>
);

export default NewFriendForm;
