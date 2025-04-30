import React, { useState } from 'react';
import { Button, Form, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import './styles/CreateElectionForm.styles.css';

const CreateElectionForm = () => {
  const [visibility, setVisibility] = useState('public');

  return (
    <Form>
      <Form.Group controlId="formTitle" className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter title" />
      </Form.Group>

      <Form.Group controlId="formDescription" className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Enter description" />
      </Form.Group>

      <Form.Group controlId="formStartDate" className="mb-3">
        <Form.Label>Start Date</Form.Label>
        <Form.Control type="date" />
      </Form.Group>

      <Form.Group controlId="formStartTime" className="mb-3">
        <Form.Label>Start Time</Form.Label>
        <Form.Control type="time" />
      </Form.Group>

      <Form.Group controlId="formEndDate" className="mb-3">
        <Form.Label>End Date</Form.Label>
        <Form.Control type="date" />
      </Form.Group>

      <Form.Group controlId="formEndTime" className="mb-3">
        <Form.Label>End Time</Form.Label>
        <Form.Control type="time" />
      </Form.Group>

      <Form.Group controlId="formCoverImage" className="mb-3">
        <Form.Label>Cover Image</Form.Label>
        <div className="upload-box">
          <Form.Control type="file" accept="image/*" />
          <p className="upload-text">
            Drag and Drop
            <br />
            Or
            <br />
            Browse Local Files
          </p>
          <p className="file-hint">Max File Size: 2Mb</p>
        </div>
      </Form.Group>

      <Form.Group controlId="formVisibility" className="mb-3">
        <Form.Label className="d-block">Visibility</Form.Label>
        <ToggleButtonGroup
          type="radio"
          name="visibility"
          value={visibility}
          onChange={(val) => setVisibility(val)}
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
    </Form>
  );
};

export default CreateElectionForm;
