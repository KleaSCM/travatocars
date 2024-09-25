import React, { useEffect, useState } from 'react';
import CarCard from '../components/CarCard';
import styles from '../styles/Cars.module.scss';
import axios from 'axios';

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
        const response = await axios.get('http://localhost:8080/api/cars');
        setCars(response.data);
      } catch (error: any) {
        setError(error.message);
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
