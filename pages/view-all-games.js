/* eslint-disable object-curly-newline */
import React, { useState, useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import Link from 'next/link';
import { getGames } from '../utils/data/gameData';
import { clientCredentials } from '../utils/client';

export default function ViewAllGames() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGames().then(setGames);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
      {games.map((game) => (
        <div key={game.id} style={{ cursor: 'pointer', margin: '10px', marginLeft: '0.5rem', marginRight: '0.5rem' }}>
          <Link href={`/game/${game.id}`} key={games.id} passHref>
            <Image src={`${clientCredentials.databaseURL}/${game.cover_image}`} alt={`Cover for ${game.name}`} width={250} height={350} draggable="false" />
          </Link>
        </div>
      ))}
    </div>
  );
}
