/* eslint-disable object-curly-newline */
import React, { useState, useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import Link from 'next/link';
import { clientCredentials } from '../utils/client';
import { useAuth } from '../utils/context/authContext';
import { getGames } from '../utils/data/gameData';

function Home() {
  const [games, setGames] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getGames().then(setGames);
  }, []);

  console.warn(games);

  return (
    <div className="text-center d-flex flex-column align-items-center">
      <title>Exploring Party Up</title>

      <div
        style={{
          backgroundColor: 'black',
          width: '100%',
          paddingTop: '5rem',
          paddingBottom: '5rem',
        }}
      >
        <h1>Hello {user.fbUser.displayName}! </h1>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/group/new" passHref>
            <Image src="plusicon.png" alt="Make a group" height={64} width={64} style={{ marginTop: '6rem', marginRight: '1rem' }} />
          </Link>
          {games.slice(0, 5).map((game) => (
            <div key={game.id} style={{ margin: '10px', marginLeft: '0.5rem', marginRight: '0.5rem' }}>
              <Link href={`/game/${game.id}`} passHref>
                <Image src={`${clientCredentials.databaseURL}/${game.cover_image}`} alt={`Cover for ${game.name}`} style={{ width: '180px', height: '240px' }} draggable="false" />
              </Link>
            </div>
          ))}
          <Image src="/rightarrow.png" alt="Arrow" height={64} width={64} style={{ marginTop: '6rem', marginLeft: '1rem' }} />
        </div>
      </div>
    </div>
  );
}

export default Home;
