import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomFormInput from "./CustomFormInput";
import * as Yup from "yup";
import { formFields } from "../../assets/form/formFields";
import { FcGoogle } from "react-icons/fc";
import useForm from "../../hooks/useForm";
import { registerValidationSchema } from "../../validation/RegisterValidation";
import { signUpUserApi } from "../../services/authApi";
import { BarLoader } from "react-spinners";

const RegisterForm = () => {
    const formInitialValues = {
        fullName: "Prashrijan Shrestha  ",
        email: "admin@admin.com",
        phone: "1234567890",
        address: "sydney",
        dob: "19-12-2021",
        password: "Pr@sh4484",
        confirmPassword: "Pr@sh4484",
    };

    const [loading, setLoading] = useState(false);

    const { form, handleOnChange, handleOnSubmit, errors, resetForm } = useForm(
        formInitialValues,
        registerValidationSchema
    );

    const handleRegister = async () => {
        setLoading(true);
        try {
            const res = await signUpUserApi(form);
            setLoading(false);
            res && resetForm();
        } catch (error) {
            setLoading(false);
            console.log(error);
            return;
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center px-4 pb-4">
            {loading ? (
                <BarLoader />
            ) : (
                <Form
                    className="p-4 border rounded shadow bg-light"
                    style={{ width: "500px" }}
                    onSubmit={(e) =>
                        handleOnSubmit(e, () => handleRegister(form))
                    }
                >
                    {formFields.map((input) => (
                        <div key={input.name} className="mb-3">
                            <CustomFormInput
                                {...input}
                                value={form[input.name]}
                                onChange={handleOnChange}
                            />
                            {errors[input.name] && (
                                <p className="text-danger small mt-1 mb-0">
                                    {errors[input.name]}
                                </p>
                            )}
                        </div>
                    ))}

                    <Button variant="dark" type="submit" className="w-100 mt-3">
                        Register
                    </Button>
                    <div className="text-center mt-3">
                        <p>
                            Already have an account? <a href="/login">Login</a>
                        </p>
                        <Button
                            variant="outline-dark"
                            className="mt-2 w-100 d-flex justify-content-center align-items-center gap-1"
                        >
                            <FcGoogle />
                            Sign up with Google
                        </Button>
                    </div>
                </Form>
            )}
        </div>
    );
};

export default RegisterForm;
