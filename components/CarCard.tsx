import React from 'react';
import styles from '../styles/CarCard.module.scss';

interface CarCardProps {
  car: {
    id: number;
    make: string;
    model: string;
    year: number;
    condition: string;
    modified: boolean;
    registered: boolean;
    serviceHistory: boolean;
    imageUrl: string;  
    link: string;
  };
  onLike: (id: number) => void;       // Function to like the car
  onDislike: (id: number) => void;    // Function to dislike the car
}

const CarCard: React.FC<CarCardProps> = ({ car, onLike, onDislike }) => {
  return (
    <div className={styles.card}>
      <img src={car.imageUrl} alt={`${car.make} ${car.model}`} className={styles.image} />
      <h3 className={styles.title}>{`${car.make} ${car.model}`}</h3> 
      <p><strong>Year:</strong> {car.year}</p>
      <p><strong>Condition:</strong> {car.condition}</p>
      <p><strong>Registered:</strong> {car.registered ? 'Yes' : 'No'}</p>
      <p><strong>Modified:</strong> {car.modified ? 'Yes' : 'No'}</p>
      <p><strong>Service History:</strong> {car.serviceHistory ? 'Yes' : 'No'}</p>
      <div className={styles.buttonContainer}>
        <button className={styles.likeButton} onClick={() => onLike(car.id)}>Like</button>
        <button className={styles.dislikeButton} onClick={() => onDislike(car.id)}>Dislike</button>
      </div>
      <a href={car.link} target="_blank" rel="noopener noreferrer" className={styles.link}>View Details</a>
    </div>
  );
};

export default CarCard;
