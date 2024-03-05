import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { updateProfile } from '../../utils/data/userData';

const initialState = {
  account_discord: '',
  account_playstation: '',
  account_steam: '',
  account_xbox: '',
  email_address: '',
};

function EditProfileForm({ obj }) {
  const router = useRouter();
  const [formInput, setFormInput] = useState(initialState);

  useEffect(() => {
    if (obj.id) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      ...formInput,
      username: obj.username,
      joinDate: obj.joinDate,
      fbKey: obj.fbKey,
    });
    router.push('/user-profile');
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} className="w-50">
        <FormGroup>
          Enter Email
          <Form.Control type="text" placeholder="Enter Email" name="email_address" required value={formInput?.email_address} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          Enter Discord Username
          <Form.Control type="text" placeholder="Enter Discord Username" name="account_discord" value={formInput?.account_discord} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          Enter Playstation Username
          <Form.Control type="text" placeholder="Enter Playstation Username" name="account_playstation" value={formInput?.account_playstation} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          Enter Xbox Username
          <Form.Control type="text" placeholder="Enter Xbox Username" name="account_xbox" value={formInput?.account_xbox} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          Enter Steam Username
          <Form.Control type="text" placeholder="Enter Steam Username" name="account_steam" value={formInput?.account_steam} onChange={handleChange} />
        </FormGroup>
        <Button variant="danger" type="submit" className="w-100">
          Update Profile
        </Button>
      </Form>
    </div>
  );
}

EditProfileForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    fbKey: PropTypes.string,
    email_address: PropTypes.string,
    account_discord: PropTypes.string,
    account_steam: PropTypes.string,
    account_xbox: PropTypes.string,
    account_playstation: PropTypes.string,
    joinDate: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
};

export default EditProfileForm;