// electionValidationSchema.js
import * as Yup from 'yup';

const now = new Date();

export const editElectionValidationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),

  startDate: Yup.date().min(
    new Date().toISOString().split('T')[0],
    'Start date cannot be in the past'
  ),

  startTime: Yup.string().required('Start time is required'),

  endDate: Yup.date().test(
    'is-after-start',
    'End date must be after start date',
    function (value) {
      const { startDate } = this.parent;
      return new Date(value) > new Date(startDate);
    }
  ),

  endTime: Yup.string().required('End time is required'),

  visibility: Yup.string().oneOf(
    ['public', 'private'],
    'Visibility must be Public or Private'
  ),
});
