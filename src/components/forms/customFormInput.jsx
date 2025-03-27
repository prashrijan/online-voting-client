import React from "react"

const customFormInput = ({ label, ...rest }) => {
  return (
    <Form.Group className='mb-3'>
      <Form.Label>{label}</Form.Label>
      <Form.Control {...rest} />
    </Form.Group>
  )
}

export default customFormInput
