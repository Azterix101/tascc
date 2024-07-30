import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import BackButton from './BackButton';

const validationSchema = yup.object({
  newEmail: yup.string().email('Invalid email format').required('New email is required'),
});

const ChangeEmail: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      newEmail: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:5000/api/user/change-email', values, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Email changed successfully');
        navigate('/tasks');
      } catch (error) {
        toast.error('Failed to change email');
      }
    },
  });

  return (
    <div className="auth-container">
      <BackButton />
      <h2>Change Email</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
            type="email"
            name="newEmail"
            placeholder="New Email"
            value={formik.values.newEmail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.newEmail && formik.errors.newEmail ? (
            <div>{formik.errors.newEmail}</div>
          ) : null}
        </div>
        <button type="submit">Change Email</button>
      </form>
    </div>
  );
};

export default ChangeEmail;
