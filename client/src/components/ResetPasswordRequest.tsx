import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import BackButton from './BackButton';

const validationSchema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
});

const ResetPasswordRequest: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post('http://localhost:5000/api/auth/reset-password-request', values);
        toast.success('Password reset link sent to your email');
      } catch (error) {
        toast.error('Failed to send password reset link');
      }
    },
  });

  return (
    <div className="auth-container">
      <BackButton />  
      <h2>Reset Password</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </div>
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ResetPasswordRequest;
