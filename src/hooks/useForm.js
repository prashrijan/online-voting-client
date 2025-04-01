import { useState } from "react";

const useForm = (initialValue, validationSchema) => {
    const [form, setForm] = useState(initialValue);
    const [errors, setErrors] = useState({});

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleOnSubmit = async (e, cb) => {
        e.preventDefault();

        try {
            await validationSchema.validate(form, { abortEarly: false });
            setErrors({});
            cb();
        } catch (error) {
            const validationErrors = {};
            error.inner.forEach((err) => {
                validationErrors[err.path] = err.message;
            });

            setErrors(validationErrors);
        }
    };

    return { form, handleOnChange, handleOnSubmit, errors };
};

export default useForm;
