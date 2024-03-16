/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'react-bootstrap/Image';
import gravatar from 'gravatar';
import { getSingleUser } from '../../utils/data/userData';

export default function UsersProfile() {
  const [userData, setUserData] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleUser(id).then(setUserData);
  }, [id]);

  const gravatarUrl = gravatar.url(userData?.email_address, { s: '200', d: 'identicon', r: 'pg' });
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '40vh' }}>
        <title>Party Up | User Profile</title>
        <Image src={gravatarUrl} alt="Gravatar" roundedCircle height={100} width={100} style={{ marginTop: '15px' }} />
        <h2 style={{ marginBottom: '40px' }}>{userData?.username}</h2>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ marginBottom: '10px', textAlign: 'center' }}>
            <Image src="/discord.png" height={32} width={40} />
            <div>{userData.account_discord || 'Discord Username Not Provided'}</div>
          </div>
          <div style={{ marginBottom: '10px', textAlign: 'center' }}>
            <Image src="/playstation.png" height={32} width={40} />
            <div>{userData.account_playstation || 'PlayStation Username Not Provided'}</div>
          </div>
          <div style={{ marginBottom: '10px', textAlign: 'center' }}>
            <Image src="/xbox.png" height={32} width={37} />
            <div>{userData.account_xbox || 'Xbox Username Not Provided'}</div>
          </div>
          <div style={{ marginBottom: '10px', textAlign: 'center' }}>
            <Image src="/steam.png" height={32} width={40} />
            <div>{userData.account_steam || 'Steam Username Not Provided'}</div>
          </div>
        </div>
      </div>
    </>
  );
}
