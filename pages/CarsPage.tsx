import React, { useEffect, useState } from 'react';
import CarCard from '../components/CarCard';
import styles from '../styles/Cars.module.scss';

const CarsPage: React.FC = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [likedCars, setLikedCars] = useState<number[]>([]);
  const [dislikedCars, setDislikedCars] = useState<number[]>([]);
  const [currentCarIndex, setCurrentCarIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/cars');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setCars(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleLike = (id: number) => {
    setLikedCars((prev) => [...prev, id]);
    console.log(`Liked car with id: ${id}`);
    goToNextCar();
  };

  const handleDislike = (id: number) => {
    setDislikedCars((prev) => [...prev, id]);
    console.log(`Disliked car with id: ${id}`);
    goToNextCar();
  };

  const goToNextCar = () => {
    setCurrentCarIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className={styles.container}>
      <h1>Available Cars</h1>
      {loading && <p>Loading cars...</p>}
      {error && <p>Error: {error}</p>}
      {currentCarIndex < cars.length ? (
        <CarCard 
          car={cars[currentCarIndex]} 
          onLike={handleLike} 
          onDislike={handleDislike} 
        />
      ) : (
        <p>No more cars to display!</p>
      )}
    </div>
  );
};

export default CarsPage;
