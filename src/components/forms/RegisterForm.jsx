import React, { useState } from "react"

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

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
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Re-enter password",
      // value: form.password,
      required: true,
    },
  ]

  return (
    <Form className='d-flex flex-column justify-content-center p-5 border'>
      <Form.Group className='mb-3' controlId='formBasicusername'>
        <Form.Label>username</Form.Label>
        <Form.Control type='username' placeholder='Enter username' />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Email address</Form.Label>
        <Form.Control type='email' placeholder='Enter email' />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control type='password' placeholder='Password' />
      </Form.Group>

      <Button variant='primary' type='submit' className='mx-5'>
        Register
      </Button>
    </Form>
  )
}

export default RegisterForm

//
//
// TODO create custom form fields
// TODO create initial stage
// TODO create custom input loop
// TODO create handle on change
// TODO create handle on submit
// TODO create additional form buttons and links to login and to signup using google
