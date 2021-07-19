export default function validateLogin(values, isReturningUser) {

    let errors = {};
    if (values) {
        if (!values.email) {
            errors.email = "Email required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Invalid Email address";
        }

        if (!values.password) {
            errors.password = "Password required";
        } else if (values.password.length < 6) {
            errors.password = "Need at least 6 characters";
        }

        // if (!isReturningUser) {
        //     if (!values.pin) {
        //         errors.pin = "Login Pin required";
        //     } else if (values.pin.length < 3) {
        //         errors.pin = "Need at least 4 characters";
        //     } else if (values.pin.length > 6) {
        //         errors.pin = "Max of 6 characters for the pin";
        //     }
        // }
    }
    return errors;
}
