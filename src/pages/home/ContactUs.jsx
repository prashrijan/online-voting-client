import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

import useForm from '../../hooks/useForm';
import { sendHelpMessageApi } from '@services/userApi';
import Loader from '@components/loader/Loader';

const ContactUs = () => {
  const formInitialValue = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  const { form, handleOnSubmit, handleOnChange, resetForm } =
    useForm(formInitialValue);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ success: null, message: '' });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await sendHelpMessageApi(form);
      setStatus({
        success: true,
        message: 'Thanks for contacting us! We’ll get back to you soon.',
      });
      resetForm();
    } catch (error) {
      setStatus({
        success: false,
        message:
          error.response?.data?.message ||
          'Oops! Something went wrong. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light d-flex align-items-center">
      <Container className="py-5" style={{ maxWidth: '600px' }}>
        <h2 className="text-center fw-bold mb-4">Contact Us</h2>
        <p className="text-center text-muted mb-4">
          Have questions, feedback, or need support? Send us a message and we’ll
          get in touch shortly.
        </p>

        <div className="p-4 bg-white border rounded-4 shadow-sm">
          {status.message && (
            <Alert variant={status.success ? 'success' : 'danger'}>
              {status.message}
            </Alert>
          )}

          {loading ? (
            <Loader text="Sending your message..." />
          ) : (
            <Form onSubmit={(e) => handleOnSubmit(e, handleSubmit)}>
              <Form.Group className="mb-3">
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleOnChange}
                  required
                  placeholder="John Doe"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Your Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleOnChange}
                  required
                  placeholder="you@example.com"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleOnChange}
                  required
                  placeholder="What’s your message about?"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleOnChange}
                  required
                  placeholder="Let us know how we can help"
                />
              </Form.Group>

              <Button variant="dark" type="submit" className="w-100 rounded-3">
                Send Message
              </Button>
            </Form>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ContactUs;
