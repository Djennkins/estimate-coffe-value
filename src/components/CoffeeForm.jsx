import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import { typeOptions } from "../data/typeOptions";
import { useState } from "react";

export default function CoffeeForm() {
	const [price, setPrice] = useState();

	const initialValues = {
		type: "",
		age: undefined,
		moisture: undefined,
		packingCondition: undefined,
		foreignImpurities: undefined,
	};

	const validtaionScheme = Yup.object({
		type: Yup.string().required("Оберіть вид кави"),
		age: Yup.number().required().min(0, "Вік повинен бути не менше 0 місяців"),
		moisture: Yup.number()
			.required()
			.min(0, "Вологість повинна бути від 0 до 100 відсотків")
			.max(100, "Вологість повинна бути від 0 до 100 відсотків"),
		packingCondition: Yup.number()
			.required()
			.min(0, "Стан упакування повинен бути від 0 до 100 відсотків")
			.max(100, "Стан упакування повинен бути від 0 до 100 відсотків"),
		foreignImpurities: Yup.number()
			.required()
			.min(0, "Відсоток сторонніх домішок бути від 0 до 100 відсотків")
			.max(100, "Відсоток сторонніх домішок бути від 0 до 100 відсотків"),
	});

	const getPrice = async (values) => {
		const url = "http://localhost:8081/coffee/price";

		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();
			setPrice(data.price);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const onSubmit = async (values) => {
		console.log(JSON.stringify(values));
		getPrice(values);
	};

	return (
		<div>
			<Formik initialValues={initialValues} validationSchema={validtaionScheme} onSubmit={onSubmit}>
				{(formik) => {
					return (
						<Form>
							<FormikControl
								control="select"
								label="Оберіть вид кави"
								name="type"
								options={typeOptions}
							/>
							<FormikControl control="input" label="Вік кави" type="text" name="age" />
							<FormikControl
								control="input"
								label="Відсоток вологісті кави"
								type="text"
								name="moisture"
							/>
							<FormikControl
								control="input"
								label="Відсоток стану упаковки"
								type="text"
								name="packingCondition"
							/>
							<FormikControl
								control="input"
								label="Відсоток сторонніх домішок"
								type="text"
								name="foreignImpurities"
							/>
							<button className="button" type="submit" disabled={!formik.isValid}>
								Submit
							</button>
						</Form>
					);
				}}
			</Formik>
			<div className="price-value">
				<span>Price of coffee:</span>
				<span>{price}₴</span>
			</div>
		</div>
	);
}
