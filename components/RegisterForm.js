/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../utils/auth';

function RegisterForm({ user, updateUser }) {
  const currentDate = new Date();
  const timestamp = currentDate.getTime();

  const initialFormData = {
    joinDate: timestamp,
    fbKey: user.uid,
    account_playstation: '',
    account_xbox: '',
    account_steam: '',
    account_discord: '',
  };

  const [formData] = useState(initialFormData);

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(() => updateUser(user.uid));
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '75vh', color: 'white' }}>
      <Form onSubmit={handleSubmit} className="w-50">
        <Form.Group className="mb-3 text-center" controlId="formBasicEmail">
          <Form.Label>Register For Party Up</Form.Label>
        </Form.Group>
        <div className="text-center mb-4">
          <img src="/partyup_logo.jpg" alt="Website Logo" height={200} width={200} draggable="false" />
        </div>
        <Button variant="danger" type="submit" className="w-100">
          Click to Sign Up
        </Button>
      </Form>
    </div>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
