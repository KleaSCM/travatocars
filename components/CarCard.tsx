import React from 'react';


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
  onLike: (id: number) => void;
  onDislike: (id: number) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onLike, onDislike }) => {
  return (
    <div className="car-card">
      <img src={car.imageUrl} alt={`${car.make} ${car.model}`} />
      <h3>{`${car.make} ${car.model}`}</h3>
      <p>Year: {car.year}</p>
      <p>Condition: {car.condition}</p>
      <div>
        <button onClick={() => onLike(car.id)}>Like</button>
        <button onClick={() => onDislike(car.id)}>Dislike</button>
      </div>
      <a href={car.link} target="_blank" rel="noopener noreferrer">View Details</a>
    </div>
  );
};

export default CarCard;
