/* eslint-disable object-curly-newline */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Link from 'next/link';
import gravatar from 'gravatar';
// import { Button } from 'react-bootstrap';
import { formatDistanceToNow } from 'date-fns';
import { getUserInGroup } from '../utils/data/groupData';

export default function PostCards({ postObj }) {
  const groupCreatedDate = new Date(postObj.timestamp);
  const formattedDate = formatDistanceToNow(groupCreatedDate);
  const [memberCount, setMemberCount] = useState(0);

  const gravatarUrl = gravatar.url(postObj?.uuid?.email_address, { s: '200', d: 'identicon', r: 'pg' });

  useEffect(() => {
    getUserInGroup(postObj.id).then((data) => {
      setMemberCount(data.length + 1);
    });
  });

  return (
    <Link href={`/group/${postObj.id}`} passHref>
      <div className="two-row-container" style={{ backgroundColor: '#252323', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '15px' }}>
        <div className="left-column" style={{ display: 'flex', alignItems: 'center' }}>
          <Image src={gravatarUrl} alt="Gravatar" roundedCircle height={64} width={64} />
          <div className="user-info" style={{ marginLeft: '10px' }}>
            <strong>{postObj?.uuid?.username}</strong>
            <br />
            {formattedDate} ago
            <Card.Text style={{ margin: '0', color: postObj.status ? 'green' : 'red' }}>{postObj.status ? 'Open' : 'Closed'}</Card.Text>
          </div>
        </div>

        <div className="right-column" style={{ flex: 1, marginLeft: '15px', textAlign: 'center' }}>
          <Card.Title>{postObj.title}</Card.Title>
          <div>
            <strong>{postObj.skill_level}</strong>
            <br />
            <strong>Description:</strong> {postObj.description}
            <Card.Text style={{ margin: '0' }}>Platform: {postObj.platform}</Card.Text>
            <Card.Text style={{ margin: '0' }}>
              <img src="/person-icon.png" alt="Players Needed Icon" height={24} width={24} draggable="false" />
              <strong>
                {memberCount}/{postObj.needed_players} Players
              </strong>
            </Card.Text>
            <Card.Text style={{ margin: '0' }}>
              <strong>{postObj.mic_needed ? 'Mic Needed' : 'Mic Not Needed'}</strong>
            </Card.Text>
            <Card.Text style={{ margin: '0' }}>Region: {postObj.region}</Card.Text>
            {postObj.status ? <Card.Text style={{ margin: '0' }}>Status: Open</Card.Text> : <Card.Text style={{ margin: '0' }}>Status: Closed</Card.Text>}
          </div>
        </div>
      </div>
    </Link>
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
