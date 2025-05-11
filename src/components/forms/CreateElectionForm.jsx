import React, { useEffect, useState } from 'react';
import { Form, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import './styles/CreateElectionForm.styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateElectionField } from '../../features/election/elecitonSlice';
import { to12HourFormat, to24HourFormat } from '../../utils/time';

const CreateElectionForm = () => {
  const { electionData } = useSelector((state) => state.election);
  const dispatch = useDispatch();
  const [coverImageFile, setCoverImageFile] = useState(null);

  useEffect(() => {
    if (electionData.coverImagePreview && !coverImageFile) {
      fetch(electionData.coverImagePreview)
        .then((res) => {
          res.blob();
        })
        .then((blob) => {
          const file = new File([blob], 'cover-image.jpg', { type: blob.type });

          setCoverImageFile(file);
        });
    }
  }, [electionData.coverImagePreview]);

  const handleUpdate = (key, value) => {
    dispatch(updateElectionField({ key, value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB');
        return;
      }
      setCoverImageFile(file);
      dispatch(updateElectionField({ key: 'coverImageFile', value: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(
          updateElectionField({
            key: 'coverImagePreview',
            value: reader.result,
          })
        );
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Form>
      <Form.Group controlId="formTitle" className="mb-3">
        <Form.Label className="fw-semibold">Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          value={electionData.title}
          onChange={(e) => handleUpdate('title', e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formStartDate" className="mb-3">
        <Form.Label className="fw-semibold">Start Date</Form.Label>
        <Form.Control
          type="date"
          value={electionData.startDate}
          onChange={(e) => handleUpdate('startDate', e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formStartTime" className="mb-3">
        <Form.Label className="fw-semibold">Start Time</Form.Label>
        <Form.Control
          type="time"
          value={
            electionData.startTime ? to24HourFormat(electionData.startTime) : ''
          }
          onChange={(e) =>
            handleUpdate('startTime', to12HourFormat(e.target.value))
          }
        />
      </Form.Group>

      <Form.Group controlId="formEndDate" className="mb-3">
        <Form.Label className="fw-semibold">End Date</Form.Label>
        <Form.Control
          type="date"
          value={electionData.endDate}
          onChange={(e) => handleUpdate('endDate', e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formEndTime" className="mb-3">
        <Form.Label className="fw-semibold">End Time</Form.Label>
        <Form.Control
          type="time"
          value={
            electionData.endTime ? to24HourFormat(electionData.endTime) : ''
          }
          onChange={(e) =>
            handleUpdate('endTime', to12HourFormat(e.target.value))
          }
        />
      </Form.Group>

      <Form.Group controlId="formVisibility" className="mb-3">
        <Form.Label className="d-block fw-semibold">Visibility</Form.Label>
        <ToggleButtonGroup
          type="radio"
          name="visibility"
          value={electionData.visibility}
          onChange={(val) => handleUpdate('visibility', val)}
        >
          <ToggleButton id="public" value="public" variant="outline-primary">
            Public
          </ToggleButton>
          <ToggleButton
            id="private"
            value="private"
            variant="outline-secondary"
          >
            Private
          </ToggleButton>
        </ToggleButtonGroup>
      </Form.Group>

      <Form.Group controlId="formCoverImage" className="mb-3">
        <Form.Label className="fw-semibold">Cover Image</Form.Label>
        <div className="upload-box">
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {electionData.coverImagePreview ? (
            <img
              src={electionData.coverImagePreview}
              alt="Preview"
              className="img-fluid mt-2"
              style={{
                width: '100%',
                maxHeight: '250px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
          ) : (
            <>
              <p className="upload-text">
                Drag and Drop
                <br />
                Or
                <br />
                Browse Local Files
              </p>
              <p className="file-hint">Max File Size: 2MB</p>
            </>
          )}
        </div>
      </Form.Group>
    </Form>
  );
};

export default CreateElectionForm;
