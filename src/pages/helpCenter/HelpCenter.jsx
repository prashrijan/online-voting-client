import { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

import useForm from '../../hooks/useForm';
import { sendHelpMessageApi } from '@services/userApi';
import Loader from '@components/loader/Loader';

const HelpCenter = () => {
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
      setLoading(false);
      setStatus({ success: true, message: 'Message sent successfully!' });
      resetForm();
    } catch (error) {
      setStatus({
        success: false,
        message:
          error.response?.data?.message || 'Failed to send. Try again later.',
      });
      setLoading(false);
    }
  };

  return (
    <div className="bg-light min-vh-100 py-4">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <h2 className="mb-4 fw-bold text-center">Help Center</h2>
            <div className="p-3 p-md-5 bg-white border rounded-4 shadow">
              {status.message && (
                <Alert variant={status.success ? 'success' : 'danger'}>
                  {status.message}
                </Alert>
              )}

              {loading ? (
                <Loader text="Sending your message..." />
              ) : (
                <Form
                  onSubmit={(e) => handleOnSubmit(e, handleSubmit)}
                  className="w-100"
                >
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Your Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleOnChange}
                      placeholder="Enter your name"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Your Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleOnChange}
                      placeholder="Enter your email"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Subject</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      required
                      value={form.subject}
                      onChange={handleOnChange}
                      placeholder="Subject"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="message"
                      required
                      value={form.message}
                      onChange={handleOnChange}
                      placeholder="Describe your issue or question"
                    />
                  </Form.Group>
                  <div className="text-center">
                    <Button type="submit" variant="primary" className="w-100">
                      Send Message
                    </Button>
                  </div>
                </Form>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HelpCenter;
