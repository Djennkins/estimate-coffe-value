import Input from "./Input";
import Select from "./Select";

//This component is going to decide which of the different form fields have to be rendered based on one particular prop
function FormikControl(props) {
	const { control, ...rest } = props;
	switch (control) {
		case "input":
			return <Input {...rest} />;
		case "select":
			return <Select {...rest} />;
		default:
			return null;
	}
}

export default FormikControl;
