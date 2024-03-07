/* eslint-disable object-curly-newline */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Link from 'next/link';
import gravatar from 'gravatar';
// import { Button } from 'react-bootstrap';
import { formatDistanceToNow } from 'date-fns';

export default function PostCards({ postObj }) {
  const groupCreatedDate = new Date(postObj.timestamp);
  const formattedDate = formatDistanceToNow(groupCreatedDate);

  const gravatarUrl = gravatar.url(postObj?.uuid?.email_address, { s: '200', d: 'identicon', r: 'pg' });

  console.warn(postObj);

  return (
    <div className="text-center">
      <Link href={`/group/${postObj.id}`} passHref>
        <Card style={{ backgroundColor: '#252323', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingLeft: '15px', paddingTop: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Image src={gravatarUrl} alt="Gravatar" roundedCircle height={64} width={64} />
            <div style={{ marginLeft: '10px' }}>
              <strong>{postObj?.uuid?.username}</strong>
              <br />
              {formattedDate} ago
              <Card.Text style={{ margin: '0', color: postObj.status ? 'green' : 'red' }}>{postObj.status ? 'Open' : 'Closed'}</Card.Text>
            </div>
          </div>
          <div style={{ margin: '15px 0', textAlign: 'center', width: '100%' }}>
            <Card.Title>{postObj.title}</Card.Title>
            <strong>{postObj.skill_level}</strong>
            <br />
            <strong>Description:</strong> {postObj.description}
            <Card.Text style={{ margin: '0' }}>Platform: {postObj.platform}</Card.Text>
            <Card.Text style={{ margin: '0' }}>
              <img src="/person-icon.png" alt="Players Needed Icon" height={24} width={24} draggable="false" />
              <strong>{postObj.needed_players} Players</strong>
            </Card.Text>
            <Card.Text style={{ margin: '0' }}>
              <strong>{postObj.mic_needed ? 'Mic Needed' : 'Mic Not Needed'}</strong>
            </Card.Text>
            <Card.Text style={{ margin: '0' }}>Region: {postObj.region}</Card.Text>
            {postObj.status ? <Card.Text style={{ margin: '0' }}>Status: Open</Card.Text> : <Card.Text style={{ margin: '0' }}>Status: Closed</Card.Text>}
            {/*
    <Button variant="danger" style={{ width: '7rem', height: '2.5rem', marginTop: '3px' }}>
      Join Group
    </Button>
*/}
          </div>
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
      email_address: PropTypes.string,
      username: PropTypes.string,
    }),
    timestamp: PropTypes.string,
  }).isRequired,
};
