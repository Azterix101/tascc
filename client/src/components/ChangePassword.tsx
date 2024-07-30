import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import BackButton from './BackButton';

const validationSchema = yup.object({
  oldPassword: yup.string().required('Old password is required'),
  newPassword: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .required('New password is required'),
});

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:5000/api/user/change-password', values, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Password changed successfully');
        navigate('/tasks');
      } catch (error) {
        toast.error('Failed to change password');
      }
    },
  });

  return (
    <div className="auth-container">
      <BackButton />  
      <h2>Change Password</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.oldPassword && formik.errors.oldPassword ? (
            <div>{formik.errors.oldPassword}</div>
          ) : null}
        </div>
        <div>
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.newPassword && formik.errors.newPassword ? (
            <div>{formik.errors.newPassword}</div>
          ) : null}
        </div>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
