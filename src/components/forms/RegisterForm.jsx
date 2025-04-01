import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomFormInput from "./CustomFormInput";
import * as Yup from "yup";
import { formFields } from "../../assets/form/formFields";
import { FcGoogle } from "react-icons/fc";
import useForm from "../../hooks/useForm";
import { registerValidationSchema } from "../../validation/RegisterValidation";

const RegisterForm = () => {
    const formInitialValues = {
        fullName: "",
        email: "",
        phoneNumber: "",
        address: "",
        dob: "",
        password: "",
        confirmPassword: "",
    };

    const { form, handleOnChange, handleOnSubmit, errors } = useForm(
        formInitialValues,
        registerValidationSchema
    );

    return (
        <div className="d-flex justify-content-center align-items-center px-4 pb-4">
            <Form
                className="p-4 border rounded shadow bg-light"
                style={{ width: "500px" }}
                onSubmit={(e) =>
                    handleOnSubmit(e, () => console.log("form submitted", form))
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
        </div>
    );
};

export default RegisterForm;
