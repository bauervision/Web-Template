import { useState, useEffect } from "react";

function useFormValidation(initialState, validate, authenticateUser) {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (isSubmitting) {

            // if no errors present in form
            if (Object.keys(errors).length === 0) {
                authenticateUser();
                setSubmitting(false);
            } else {
                console.log("UN Authenicated!");
                setSubmitting(false);
            }

        }
    }, [errors]);


    function handleChange(event) {
        event.persist();
        // set form values based on change events
        setValues(prevValues => ({
            ...prevValues,
            [event.target.name]: event.target.value
        }))
    }

    const HandleBlur = () => {
        // validate the form and set errors based on its result
        setErrors(validate(values));
    }

    function handleSubmit(event) {
        event.preventDefault();
        setSubmitting(true);

        setErrors(validate(values));
    }

    return { handleChange, HandleBlur, handleSubmit, values, errors, isSubmitting }
}

export default useFormValidation;
