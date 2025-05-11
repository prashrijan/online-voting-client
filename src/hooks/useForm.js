import { useState } from 'react';
import { toast } from 'react-toastify';

const useForm = (initialValue, validationSchema) => {
  const [form, setForm] = useState(initialValue);
  const [errors, setErrors] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };
  const setFormValues = (values) => {
    setForm((prev) => ({
      ...prev,
      ...values,
    }));
  };

  const handleOnSubmit = async (e, cb) => {
    e.preventDefault();

    try {
      if (validationSchema) {
        await validationSchema.validate(form, { abortEarly: false });
        setErrors({});
        cb();
      } else {
        cb();
      }
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
    }
  };

  const resetForm = () => {
    setForm({ ...initialValue });
  };

  return {
    form,
    handleOnChange,
    handleOnSubmit,
    errors,
    resetForm,
    setFormValues,
  };
};

export default useForm;
