import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'react-bootstrap/Image';
import { clientCredentials } from '../../utils/client';
import PostCards from '../../components/PostCard';
import { getSingleGame, getGameGroups } from '../../utils/data/gameData';

export default function GameDetails() {
  const router = useRouter();
  const [gameDetails, setGameDetails] = useState({});
  const [gameGroups, setGameGroups] = useState([]);
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getSingleGame(id).then(setGameDetails);
      getGameGroups(id).then(setGameGroups);
    }
  }, [id]);

  console.warn(gameDetails);
  console.warn(gameGroups);

  return (
    <>
      <title>{gameDetails.name}</title>
      <div className="text-center d-flex flex-column align-items-center">
        <h1>Searching Groups For {gameDetails.name || 'Game Details'}</h1>
        {gameDetails.cover_image && <Image src={`${clientCredentials.databaseURL}/${gameDetails.cover_image}`} alt={`Cover for ${gameDetails.name}`} style={{ width: '180px', height: '240px' }} draggable="false" />}
      </div>
      <div className="container mt-4 p-4 rounded">
        {gameGroups.length === 0 ? (
          <p className="text-center">No groups available</p>
        ) : (
          gameGroups.map((gamegroup) => (
            <div key={gamegroup.id} className="mb-4">
              <PostCards postObj={gamegroup} />
            </div>
          ))
        )}
      </div>
    </>
  );
}
