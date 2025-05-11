import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Form,
  Button,
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  Row,
  Col,
  Alert,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchElectionAction,
  updateElectionAction,
} from '../../features/election/electionAction';
import useForm from '../../hooks/useForm'; // adjust path as needed
import { to24HourFormat } from '../../utils/time';
const EditElection = () => {
  const { electionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const election = useSelector((state) => state.election?.electionToShow);

  const { form, handleOnChange, handleOnSubmit, setFormValues } = useForm({
    title: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    coverImage: '',
    visibility: 'public',
  });

  useEffect(() => {
    const fetchElection = async () => {
      try {
        setLoading(true);
        dispatch(fetchElectionAction(electionId));
      } catch (err) {
        setError('Failed to fetch election');
      } finally {
        setLoading(false);
      }
    };

    fetchElection();
  }, [dispatch, electionId]);

  useEffect(() => {
    if (election) {
      setFormValues({
        title: election.title || '',
        startDate: election.startDate?.split('T')[0] || '',
        endDate: election.endDate?.split('T')[0] || '',
        startTime: to24HourFormat(election.startTime) || '',
        endTime: to24HourFormat(election.endTime) || '',
        coverImage: election.coverImage || '',
        visibility: election.visibility || 'public',
      });
    }
  }, [election]);

  const handleTimeChange = (e) => {
    const { name, value } = e.target;

    handleOnChange({ target: { name, value } });
  };

  const handleVisibilityChange = (val) => {
    handleOnChange({ target: { name: 'visibility', value: val } });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        handleOnChange({
          target: { name: 'coverImage', value: reader.result },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      console.log(form);
      await dispatch(updateElectionAction(electionId, form));
      navigate('/user/manage-elections');
    } catch (err) {
      setError('Failed to update election');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="my-4">
        <p>Loading...</p>
      </Container>
    );
  }

  if (!election) {
    return (
      <Container className="my-4">
        <p>Election not found</p>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <Card className="shadow-sm">
        <Card.Body>
          <h2 className="mb-4">Edit Election</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={(e) => handleOnSubmit(e, onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Election Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={form.title}
                onChange={handleOnChange}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleOnChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="startTime"
                    value={form.startTime}
                    onChange={handleTimeChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleOnChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>End Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="endTime"
                    value={form.endTime}
                    onChange={handleTimeChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Cover Image</Form.Label>
              {form.coverImage && (
                <div className="mb-3">
                  <img
                    src={form.coverImage}
                    alt="Current cover"
                    className="img-fluid rounded"
                    style={{ maxHeight: '200px' }}
                  />
                </div>
              )}
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <Form.Text className="text-muted">
                Maximum file size: 2MB
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Visibility</Form.Label>
              <div>
                <ToggleButtonGroup
                  type="radio"
                  name="visibility"
                  value={form.visibility}
                  onChange={handleVisibilityChange}
                >
                  <ToggleButton
                    id="public"
                    value="public"
                    variant={
                      form.visibility === 'public'
                        ? 'primary'
                        : 'outline-primary'
                    }
                  >
                    Public
                  </ToggleButton>
                  <ToggleButton
                    id="private"
                    value="private"
                    variant={
                      form.visibility === 'private'
                        ? 'secondary'
                        : 'outline-secondary'
                    }
                  >
                    Private
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button
                variant="secondary"
                onClick={() => navigate('/user/manage-elections')}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditElection;
