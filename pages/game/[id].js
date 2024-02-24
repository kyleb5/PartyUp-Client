import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'react-bootstrap/Image';
import { clientCredentials } from '../../utils/client';
import { getSingleGame, getGameGroups } from '../../utils/data/gameData';

export default function GameDetails() {
  const router = useRouter();
  const [gameDetails, setGameDetails] = useState({});
  const [gameGroups, setGameGroups] = useState({});
  const { id } = router.query;

  useEffect(() => {
    getSingleGame(id).then(setGameDetails);
    getGameGroups(id).then(setGameGroups);
  }, [id]);

  console.warn(gameDetails);

  console.warn(gameGroups);

  return (
    <>
      <head>
        <title>{gameDetails.name}</title>
      </head>
      <div className="text-center d-flex flex-column align-items-center">
        <h1>Searching Groups For {gameDetails.name}</h1>
        <Image src={`${clientCredentials.databaseURL}/${gameDetails.cover_image}`} alt={`Cover for ${gameDetails.name}`} style={{ width: '180px', height: '240px' }} draggable="false" />
      </div>
    </>
  );
}
