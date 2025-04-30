import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import './styles/CreateElectionForm.styles.css';
import { useElection } from '../../context/ElectionContext';

const CreateElectionForm = () => {
  const { electionData, updateElectionData } = useElection();

  useEffect(() => {
    if (electionData.coverImageFile) {
      const objectUrl = URL.createObjectURL(electionData.coverImageFile);
      updateElectionData('coverImagePreview', objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      updateElectionData('coverImagePreview', null);
    }
  }, [electionData.coverImageFile]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };
  return (
    <Form>
      <Form.Group controlId="formTitle" className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          value={electionData.title}
          onChange={(e) => updateElectionData('title', e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formStartDate" className="mb-3">
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          value={electionData.startDate}
          onChange={(e) => updateElectionData('startDate', e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formStartTime" className="mb-3">
        <Form.Label>Start Time</Form.Label>
        <Form.Control
          type="time"
          value={electionData.startTime}
          onChange={(e) => updateElectionData('startTime', e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formEndDate" className="mb-3">
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="date"
          value={electionData.endDate}
          onChange={(e) => updateElectionData('endDate', e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formEndTime" className="mb-3">
        <Form.Label>End Time</Form.Label>
        <Form.Control
          type="time"
          value={electionData.endTime}
          onChange={(e) => updateElectionData('endTime', e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formCoverImage" className="mb-3">
        <Form.Label>Cover Image</Form.Label>
        <div className="upload-box">
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) =>
              updateElectionData('coverImageFile', e.target.files[0])
            }
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
              <p className="file-hint">Max File Size: 2Mb</p>
            </>
          )}
        </div>
      </Form.Group>

      <Form.Group controlId="formVisibility" className="mb-3">
        <Form.Label className="d-block">Visibility</Form.Label>
        <ToggleButtonGroup
          type="radio"
          name="visibility"
          value={electionData.visibility}
          onChange={(val) => updateElectionData('visibility', val)}
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
