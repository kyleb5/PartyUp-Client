/* eslint-disable object-curly-newline */
import React, { useState, useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { clientCredentials } from '../utils/client';
import { useAuth } from '../utils/context/authContext';
import { getGames } from '../utils/data/gameData';
import { getGroups } from '../utils/data/groupData';
import PostCards from '../components/PostCard';

function Home() {
  const [games, setGames] = useState([]);
  const [groups, setGroups] = useState([]);
  const [visibleGroups, setVisibleGroups] = useState(5);
  const { user } = useAuth();

  useEffect(() => {
    getGames().then((gamesData) => {
      const shuffledGames = gamesData.sort(() => Math.random() - 0.5);
      setGames(shuffledGames);
    });
    getGroups().then((groupsData) => {
      const sortedGroups = groupsData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setGroups(sortedGroups);
    });
  }, []);

  const showMoreGroups = () => {
    setVisibleGroups((prevVisibleGroups) => prevVisibleGroups + 5);
  };

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
        <h1>Hello {user?.username}! </h1>

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
          <Link passHref href="/view-all-games">
            <Image src="/rightarrow.png" alt="Arrow" height={64} width={64} style={{ marginTop: '6rem', marginLeft: '1rem' }} />
          </Link>
        </div>
      </div>
      <div className="container mt-4 p-4 rounded">
        <h2>Created Groups</h2>
        {groups.slice(0, visibleGroups).map((group, index) => (
          <div key={group.id || index} style={{ margin: '10px', marginLeft: '0.5rem', marginRight: '0.5rem' }}>
            <div className="mb-4">
              <PostCards postObj={group} />
            </div>
          </div>
        ))}
        {groups.length > visibleGroups && (
          <div className="text-center">
            <Button className="btn btn-primary" onClick={showMoreGroups} variant="danger">
              Show More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
