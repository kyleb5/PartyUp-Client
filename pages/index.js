/* eslint-disable object-curly-newline */
import React, { useState, useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';
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
    <div
      className="text-center d-flex flex-column align-items-center"
      style={{
        height: '90vh',
        padding: '30px',
      }}
    >
      <title>Exploring Party Up</title>
      <h1>Hello {user.fbUser.displayName}! </h1>
      <p>Click the button below to logout!</p>

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Image src="plusicon.png" alt="Make a group" height={64} width={64} style={{ marginTop: '6rem', marginRight: '1rem' }} />
        {games.slice(0, 5).map((game) => (
          <div key={game.id} style={{ margin: '10px', marginLeft: '0.5rem', marginRight: '0.5rem' }}>
            <Link href={`/game/${game.id}`} passHref>
              <Image src={`http://127.0.0.1:8000${game.cover_image}`} alt={`Cover for ${game.name}`} style={{ width: '180px', height: '240px' }} draggable="false" />
            </Link>
          </div>
        ))}
        <Image src="/rightarrow.png" alt="Arrow" height={64} weidth={64} style={{ marginTop: '6rem', marginLeft: '1rem' }} />
      </div>

      <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default Home;
