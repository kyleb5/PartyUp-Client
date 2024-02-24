import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { FormGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const initialState = {
  title: '',
  description: '',
  needed_players: 0,
  skill_level: '',
  platform: '',
  region: '',
  mic_needed: true,
  status: true,
};

function CreateGroupForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);

  useEffect(() => {
    if (obj.id) setFormInput(obj);
  }, [obj]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    // When changing mic needed, value kept converting to a string, this will prevent that
    // eslint-disable-next-line no-nested-ternary
    const updatedValue = value === 'true' ? true : value === 'false' ? false : value;

    setFormInput((prevInput) => ({
      ...prevInput,
      [name]: updatedValue,
    }));
  };

  console.warn(formInput);

  return (
    <div className="center-block-container">
      <Form>
        <FormGroup>
          <Form.Control type="text" placeholder="Enter Group Name Here" name="title" required value={formInput.title} onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <Form.Control type="text" placeholder="Enter Description" name="description" required value={formInput.description} onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <Form.Control type="number" placeholder="Enter Needed Players" name="needed_players" required value={formInput.needed_players} onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <Form.Control type="text" placeholder="Enter Skill Level" name="skill_level" required value={formInput.skill_level} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Form.Control as="select" name="platform" required value={formInput.platform} onChange={handleChange}>
            <option value="" disabled>
              Select Platform
            </option>
            <option value="Xbox">Xbox</option>
            <option value="Playstation">Playstation</option>
            <option value="PC">PC</option>
          </Form.Control>
        </FormGroup>

        <FormGroup>
          <Form.Label>Choose Region:</Form.Label>
          <Form.Check type="radio" label="North America" name="region" value="North America" checked={formInput.region === 'North America'} onChange={handleChange} />
          <Form.Check type="radio" label="Europe" name="region" value="Europe" checked={formInput.region === 'Europe'} onChange={handleChange} />
          <Form.Check type="radio" label="Asia" name="region" value="Asia" checked={formInput.region === 'Asia'} onChange={handleChange} />
          <Form.Check type="radio" label="South America" name="region" value="South America" checked={formInput.region === 'South America'} onChange={handleChange} />
          <Form.Check type="radio" label="Oceania" name="region" value="Oceania" checked={formInput.region === 'Oceania'} onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <Form.Label>Mic Needed:</Form.Label>
          <Form.Check type="radio" label="Yes" name="mic_needed" value checked={formInput.mic_needed === true} onChange={handleChange} />
          <Form.Check type="radio" label="No" name="mic_needed" value={false} checked={formInput.mic_needed === false} onChange={handleChange} />
        </FormGroup>

        <Button variant="danger">Submit</Button>
      </Form>
    </div>
  );
}

CreateGroupForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    game: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      cover_image: PropTypes.string,
    }),
    title: PropTypes.string,
    description: PropTypes.string,
    needed_players: PropTypes.number,
    skill_level: PropTypes.string,
    platform: PropTypes.string,
    region: PropTypes.string,
    mic_needed: PropTypes.bool,
    status: PropTypes.bool,
    uuid: PropTypes.shape({
      id: PropTypes.number,
      fbKey: PropTypes.string,
      joinDate: PropTypes.number,
      account_playstation: PropTypes.string,
      account_xbox: PropTypes.string,
      account_steam: PropTypes.string,
      account_discord: PropTypes.string,
    }),
    timestamp: PropTypes.number,
  }),
};

CreateGroupForm.defaultProps = {
  obj: initialState,
};

export default CreateGroupForm;