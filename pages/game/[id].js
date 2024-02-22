import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleGame } from '../../utils/data/gameData';

export default function GameDetails() {
  const router = useRouter();
  const [gameDetails, setGameDetails] = useState({});
  const { id } = router.query;

  useEffect(() => {
    getSingleGame(id).then(setGameDetails);
  }, []);

  console.warn(gameDetails);

  return (
    <>
      <head>
        <title>{gameDetails.name}</title>
      </head>
      <div>
        <h1>{gameDetails.name}</h1>
      </div>
    </>
  );
}
