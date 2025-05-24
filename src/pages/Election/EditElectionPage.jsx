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
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchElectionAction,
  updateElectionAction,
} from '@features/election/electionAction';
import useForm from '@hooks/useForm';
import { to12HourFormat, to24HourFormat } from '@utils/time';
import { editElectionValidationSchema } from '@validation/EditElectionValidation';
import { toast } from 'react-toastify';

const EditElection = () => {
  const { electionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formInitialValue = {
    title: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    coverImage: '',
    visibility: 'public',
  };

  const [loading, setLoading] = useState(true);

  const election = useSelector((state) => state.election?.electionToShow);

  const { form, handleOnChange, handleOnSubmit, setFormValues } =
    useForm(formInitialValue);

  useEffect(() => {
    const fetchElection = async () => {
      try {
        setLoading(true);
        dispatch(fetchElectionAction(electionId));
      } catch (err) {
        toast.error('Failed to fetch election');
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
    const time12h = to12HourFormat(value);
    handleOnChange({ target: { name, value: time12h } });
  };

  const handleVisibilityChange = (val) => {
    handleOnChange({ target: { name: 'visibility', value: val } });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size must be less than 2MB');
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
      if (editElectionValidationSchema) {
        await editElectionValidationSchema.validate(form, {
          abortEarly: false,
        });
        setLoading(true);

        const finalStartTime = to12HourFormat(form.startTime);
        const finalEndTime = to12HourFormat(form.endTime);

        const payload = {
          ...form,
          startTime: finalStartTime,
          endTime: finalEndTime,
        };

        await dispatch(updateElectionAction(electionId, payload));
        navigate('/user/manage-elections');
      }
    } catch (error) {
      if (error.inner) {
        let errorMessage = 'Please fix the following errors:\n';
        error.inner.forEach((err) => {
          errorMessage += `${err.path}: ${err.message}\n`;
        });
        toast.error(errorMessage, {
          autoClose: 4000,
          closeOnClick: true,
          pauseOnHover: false,
          progress: undefined,
        });
      } else {
        toast.error('Failed to update election', {
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: false,
          progress: undefined,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="my-4 text-center">
        <p>Loading...</p>
      </Container>
    );
  }

  if (!election) {
    return (
      <Container className="my-4 text-center">
        <p>Election not found</p>
      </Container>
    );
  }

  return (
    <div className="bg-light p-3 p-md-5 min-vh-100 d-flex flex-column align-items-center">
      <Container className="w-100 d-flex flex-column align-items-center">
        <h2 className="mb-4 fw-bold text-center">Edit Election</h2>

        <Card className="w-100 w-md-75 p-4 rounded-4 border shadow">
          <Card.Body>
            <Form onSubmit={(e) => handleOnSubmit(e, onSubmit)}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Election Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleOnChange}
                  required
                  placeholder="Enter election title"
                />
              </Form.Group>

              <Row>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="startDate"
                      value={form.startDate}
                      onChange={handleOnChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Start Time</Form.Label>
                    <Form.Control
                      type="time"
                      name="startTime"
                      value={to24HourFormat(form.startTime)}
                      onChange={handleTimeChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">End Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="endDate"
                      value={form.endDate}
                      onChange={handleOnChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">End Time</Form.Label>
                    <Form.Control
                      type="time"
                      name="endTime"
                      value={to24HourFormat(form.endTime)}
                      onChange={handleTimeChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">Visibility</Form.Label>
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
                      size="sm"
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
                      size="sm"
                    >
                      Private
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">Cover Image</Form.Label>
                {form.coverImage && (
                  <div className="mb-3 text-center">
                    <img
                      src={form.coverImage}
                      alt="Current cover"
                      className="img-fluid rounded"
                      style={{ maxHeight: '200px', maxWidth: '100%' }}
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

              <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
                <Button
                  variant="secondary"
                  onClick={() => navigate('/user/manage-elections')}
                  className="w-100 w-md-auto"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading}
                  className="w-100 w-md-auto"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default EditElection;
