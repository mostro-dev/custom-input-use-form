import React, { ForwardRefRenderFunction, InputHTMLAttributes } from "react";

type Props = {
	label: string; // Add here props for your custom component
} & InputHTMLAttributes<HTMLInputElement>; // This is to add all the input props

// The ForwardRefRenderFunction allows to pass down the ref to the input inside this custom component
const CustomInput: ForwardRefRenderFunction<HTMLInputElement, Props> = (
	{ name, value, ...rest },
	ref,
) => {
	const input = (
		<input type="text" name={name} value={value} ref={ref} {...rest} /> // The ref is passed here!
	);
	return <div>{input}</div>;
};

// Don't forget to use the forwardRef into the export
export default React.forwardRef(CustomInput);
