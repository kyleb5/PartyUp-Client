import React, { useState, useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { getGames } from '../utils/data/gameData';
import { clientCredentials } from '../utils/client';
import styles from '../styles/styles.module.css';

export default function ViewAllGames() {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleGames, setVisibleGames] = useState(14);

  useEffect(() => {
    getGames().then((gamesData) => {
      const sortedGames = gamesData.sort((a, b) => a.name.localeCompare(b.name));
      setGames(sortedGames);
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleShowMore = () => {
    setVisibleGames((prevVisibleGames) => prevVisibleGames + 14);
  };

  const filteredGames = games.filter((game) => game.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const gamesToShow = filteredGames.slice(0, visibleGames);

  return (
    <>
      <div className={styles.container}>
        <title>Searching For Game {searchTerm}</title>
        <h1>Viewing Games</h1>
        <input type="text" placeholder="Search games..." value={searchTerm} onChange={handleSearchChange} className={styles.searchInput} />
        <div className={styles.gamesContainer}>
          {gamesToShow.map((game) => (
            <div key={game.id} className={styles.gameItem}>
              <Link href={`/game/${game.id}`} passHref>
                <Image src={`${clientCredentials.databaseURL}/${game.cover_image}`} alt={`Cover for ${game.name}`} width={250} height={350} draggable="false" className={styles.gameImage} />
              </Link>
            </div>
          ))}
        </div>
        {filteredGames.length > visibleGames && (
          <div className={styles.showMoreButtonContainer}>
            <Button style={{ marginBottom: '25px', marginTop: '25px' }} className="btn btn-primary" onClick={handleShowMore} variant="danger">
              Show More
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
