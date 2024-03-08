import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import CustomInput from "./components/CustomInput";
import "./main.css";

// Add the inputs you are going to use
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
		control,
	} = useForm<FormInputs>({
		defaultValues: {
			comments: [{ name: "", comment: "" }], // For a dynamic field
		},
	});

	// This field can add / remove fields dynamically
	const { fields, append } = useFieldArray({
		control,
		name: "comments",
	});

	const onSubmit: SubmitHandler<FormInputs> = (data) => {
		console.log(data);
	};

	// Simple object destructuring to get error messages and show them
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
					{...register("name", {
						required: "This field is required!",
					})} /* Ref is passed here in the register */
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
							value: /@/ /* A field can be validated with RegExp */,
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

				<h2>Comments</h2>
				{fields.map((field, index) => (
					<div key={field.id}>
						{/* // Important to include key with field's id, that's getted from useHookForm 👍 */}
						<CustomInput
							label="User Name"
							placeholder="Name"
							{...register(`comments.${index}.name`)}
						/>
						<CustomInput
							key={field.id}
							label="Comment"
							placeholder="Comment"
							{...register(`comments.${index}.comment`)}
						/>
					</div>
				))}

				{/* This button will add a new dynamic field */}
				<button
					type="button"
					onClick={() => {
						append({ name: "", comment: "" });
					}}
				>
					+
				</button>

				<button type="submit">Submit</button>
			</form>
		</>
	);
}

export default App;
