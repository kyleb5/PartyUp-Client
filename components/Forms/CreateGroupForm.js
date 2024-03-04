/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { FormGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { getUserFromFBKey } from '../../utils/data/userData';
import { useAuth } from '../../utils/context/authContext';
import { updateGroup } from '../../utils/data/groupData';
import { createGroupPost, getGames } from '../../utils/data/gameData';

const initialState = {
  title: '',
  game: 1,
  description: '',
  needed_players: '',
  skill_level: '',
  platform: '',
  region: '',
  mic_needed: '',
  status: true,
};

function CreateGroupForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [allGames, setAllGames] = useState([]);
  const [userData, setUserData] = useState([]);
  const router = useRouter();
  const timestamp = new Date();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) setFormInput(obj);
  }, [obj]);

  useEffect(() => {
    getGames().then(setAllGames);
    getUserFromFBKey(user.uid).then(setUserData);
  }, [user.uid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateGroup({
        id: formInput.id,
        game: Number(formInput?.game),
        title: formInput.title,
        description: formInput.description,
        needed_players: formInput.needed_players,
        skill_level: formInput.skill_level,
        platform: formInput.platform,
        region: formInput.region,
        mic_needed: formInput.mic_needed === 'true' ? true : formInput.mic_needed === 'false' ? false : undefined,
        status: formInput.status,
        uuid: formInput.uuid.id,
        timestamp: formInput.timestamp,
      });
      router.push(`/group/${obj.id}`);
    } else {
      createGroupPost({
        ...formInput,
        game: Number(formInput.game),
        mic_needed: formInput.mic_needed === 'true' ? true : formInput.mic_needed === 'false' ? false : undefined,
        uuid: userData.id,
        timestamp,
      });
      router.push('/');
    }
  };

  return (
    <div className="center-block-container">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Form.Label>Group Title</Form.Label>
          <Form.Control type="text" placeholder="Enter Group Name Here" name="title" required value={formInput.title} onChange={handleChange} />
        </FormGroup>

        <Form.Group>
          <Form.Label>Select Game:</Form.Label>
          <Form.Control as="select" name="game" required value={formInput.game.id} onChange={handleChange}>
            <option disabled>Select Game</option>
            {allGames.map((game) => (
              <option key={game.id} value={game.id}>
                {game.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <FormGroup>
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="Enter Description" name="description" required value={formInput.description} onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <Form.Label>Needed Players</Form.Label>
          <Form.Control type="number" placeholder="Enter Needed Players" name="needed_players" required value={formInput.needed_players} onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <Form.Label>Enter Skill Level</Form.Label>
          <Form.Control type="text" placeholder="Enter Skill Level" name="skill_level" required value={formInput.skill_level} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Form.Label>Select Platform</Form.Label>
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
          <Form.Check type="radio" label="Yes" name="mic_needed" value="true" checked={formInput.mic_needed === 'true' || formInput.mic_needed === true} onChange={handleChange} />
          <Form.Check type="radio" label="No" name="mic_needed" value="false" checked={formInput.mic_needed === 'false' || formInput.mic_needed === false} onChange={handleChange} />
        </FormGroup>

        <Button variant="danger" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

CreateGroupForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    game: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    needed_players: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    skill_level: PropTypes.string,
    platform: PropTypes.string,
    region: PropTypes.string,
    mic_needed: PropTypes.string,
    status: PropTypes.bool,
    uuid: PropTypes.string,
    timestamp: PropTypes.number,
  }),
};

CreateGroupForm.defaultProps = {
  obj: initialState,
};

export default CreateGroupForm;
