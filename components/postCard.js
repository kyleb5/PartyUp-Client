/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

export default function PostCards({ postObj }) {
  const groupCreatedDate = new Date(postObj.timestamp);
  const year = groupCreatedDate.getFullYear();
  const month = groupCreatedDate.getMonth() + 1;
  const day = groupCreatedDate.getDate();

  return (
    <div className="text-center">
      <Card style={{ backgroundColor: '#252323', color: 'white' }}>
        <Card.Title>{postObj.title}</Card.Title>
        <Card.Text style={{ margin: '0' }}>Description: {postObj.description}</Card.Text>
        <Card.Text style={{ margin: '0' }}>Platform: {postObj.platform}</Card.Text>
        <Card.Text style={{ margin: '0' }}>
          <img src="/person-icon.png" alt="Players Needed Icon" height={24} width={24} draggable="false" />
          <strong>{postObj.needed_players} Players</strong>
        </Card.Text>
        <Card.Text style={{ margin: '0' }}>
          <strong>{postObj.mic_needed ? 'Mic Needed' : 'Mic Not Needed'}</strong>
        </Card.Text>
        <Card.Text style={{ margin: '0' }}>Region: {postObj.region}</Card.Text>
        <Card.Text style={{ margin: '0' }}>
          Created on {month}/{day}/{year}
        </Card.Text>
      </Card>
    </div>
  );
}

PostCards.propTypes = {
  postObj: PropTypes.shape({
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
  }).isRequired,
};
