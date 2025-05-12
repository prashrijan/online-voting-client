// electionValidationSchema.js
import * as Yup from 'yup';

const now = new Date();

export const electionValidationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),

  startDate: Yup.date()
    .required('Start date is required')
    .min(
      new Date().toISOString().split('T')[0],
      'Start date cannot be in the past'
    ),

  startTime: Yup.string().required('Start time is required'),

  endDate: Yup.date()
    .required('End date is required')
    .test(
      'is-after-start',
      'End date must be after start date',
      function (value) {
        const { startDate } = this.parent;
        return new Date(value) > new Date(startDate);
      }
    ),

  endTime: Yup.string().required('End time is required'),

  visibility: Yup.string()
    .oneOf(['public', 'private'], 'Visibility must be Public or Private')
    .required('Visibility is required'),

  coverImageFile: Yup.mixed()
    .required('Cover image is required')
    .test(
      'fileSize',
      'File too large, must be under 2MB',
      (value) => value && value.size <= 2 * 1024 * 1024
    )
    .test(
      'fileType',
      'Unsupported File Format',
      (value) =>
        value &&
        ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(
          value.type
        )
    ),
});
