/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../utils/auth';

function RegisterForm({ user, updateUser }) {
  const timestamp = new Date();

  const initialFormData = {
    joinDate: timestamp,
    username: '',
    email_address: '',
    fbKey: user.uid,
    account_playstation: '',
    account_xbox: '',
    account_steam: '',
    account_discord: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(() => updateUser(user.uid));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.warn(formData);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '75vh', color: 'white' }}>
      <Form onSubmit={handleSubmit} className="w-50">
        <Form.Group className="mb-3 text-center" controlId="formBasicEmail">
          <Form.Label>Register For Party Up</Form.Label>
          <FormGroup>
            Enter Username
            <Form.Control type="text" placeholder="Enter Username" name="username" required value={formData.username} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            Enter Email Address
            <Form.Control type="email" placeholder="Enter Email Address" name="email_address" required value={formData.email_address} onChange={handleChange} />
          </FormGroup>
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
