import { SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "./components/CustomInput";
import "./main.css";

interface FormInputs {
	name: string;
	email: string;
	phoneNumber: string;
	comments: {
		name: string;
		comment: string;
	}[];
}

function App() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormInputs>();

	const onSubmit: SubmitHandler<FormInputs> = (data) => {
		console.log(data);
	};

	const { name, email, phoneNumber } = errors;

	return (
		<>
			<h1>Project works!</h1>
			<form className="custom-form" onSubmit={handleSubmit(onSubmit)}>
				<CustomInput
					type="text"
					label="Name"
					placeholder="Name"
					required
					{...register("name", { required: "This field is required!" })}
				/>
				{name && <p>{name.message}</p>}

				<CustomInput
					type="text"
					label="Email"
					placeholder="E-mail"
					required
					{...register("email", {
						required: "This field is required",
						pattern: {
							value: /@/,
							message: "Email it's not valid",
						},
					})}
				/>
				{email && <p>{email.message}</p>}

				<CustomInput
					type="text"
					label="Phone Number"
					placeholder="Phone Number"
					required
					{...register("phoneNumber", { required: "This field is required" })}
				/>
				{phoneNumber && <p>{phoneNumber.message}</p>}

				{/* Comments */}

				<button type="submit">Submit</button>
			</form>
		</>
	);
}

export default App;
