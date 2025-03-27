import React, { useState } from "react"

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

import CustomFormInput from "./CustomFormInput"
const RegisterForm = () => {
  const formInitialValues = {
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    dob: "",
    password: "",
  }

  const [form, setForm] = useState(formInitialValues)

  const formFields = [
    {
      label: "Full Name",
      name: "fullName",
      type: "text",
      placeholder: "Enter Full Name",
      value: form.username,
      required: true,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter Email",
      value: form.email,
      required: true,
    },
    {
      label: "Phone Number",
      name: "phoneNumber",
      type: "number",
      placeholder: "Enter Phone Number",
      value: form.phoneNumber,
      required: true,
    },
    {
      label: "Address",
      name: "address",
      type: "text",
      placeholder: "Enter address",
      value: form.address,
      required: true,
    },
    {
      label: "Date of Birth",
      name: "dob",
      type: "date",
      placeholder: "Enter Date of Birth",
      value: form.dob,
      required: true,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter password",
      value: form.password,
      required: true,
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      placeholder: "Re-enter password",
      // value: form.password,
      required: true,
    },
  ]

  const handleOnChange = (e) => {
    const updatedForm = {
      ...form,
      [e.target.name]: e.target.value,
    }

    setForm(updatedForm)
  }
  const handleOnSubmit = () => {
    console.log("Submitted")
  }

  return (
    <Form
      className='d-flex flex-column justify-content-center p-5 border'
      onSubmit={handleOnSubmit}
    >
      {formFields.map((input) => (
        <CustomFormInput key={input.name} {...input} onChange={handleOnChange} />
      ))}
      <Button variant='primary' type='submit' className='mx-5'>
        Register
      </Button>
    </Form>
  )
}

export default RegisterForm

//
//
// TODO create handle on change
// TODO create handle on submit
// TODO create additional form buttons and links to login and to signup using google
