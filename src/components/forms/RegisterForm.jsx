import React from "react"

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

const RegisterForm = () => {
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
