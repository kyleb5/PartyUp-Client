/* eslint-disable object-curly-newline */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
// import { Button } from 'react-bootstrap';
import { formatDistanceToNow } from 'date-fns';

export default function PostCards({ postObj }) {
  const groupCreatedDate = new Date(postObj.timestamp);
  const formattedDate = formatDistanceToNow(groupCreatedDate);

  return (
    <div className="text-center">
      <Link href={`/group/${postObj.id}`} passHref>
        <Card style={{ backgroundColor: '#252323', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
          <Card.Text style={{ margin: '0' }}>Created {formattedDate} ago</Card.Text>
          {/*
    <Button variant="danger" style={{ width: '7rem', height: '2.5rem', marginTop: '3px' }}>
      Join Group
    </Button>
*/}
        </Card>
      </Link>
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
      joinDate: PropTypes.string,
      account_playstation: PropTypes.string,
      account_xbox: PropTypes.string,
      account_steam: PropTypes.string,
      account_discord: PropTypes.string,
    }),
    timestamp: PropTypes.string,
  }).isRequired,
};
