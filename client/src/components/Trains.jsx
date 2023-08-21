import { useEffect, useState } from "react";

const Trains = ({ token }) => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const fetchTrains = async () => {
      const result = await fetch("/api/trains", {
        headers: {
          "Authorization" : `Bearer ${token}`
        }
      });
      const data = await result.json();
      setTrains(data);
    };
    fetchTrains();
  }, []);

  const formatTrain = (train) => {
    return (
      <>
        <div key={`Train_${train.id}`}>
          <h2>Train {train.id}</h2>
          <ul>
            <li>{train.color}</li>
            <li>{train.fuelType}</li>
            <li>Year: {train.year}</li>
            <li>Range: {train.range}</li>
          </ul>
        </div>
      </>
    );
  };

  return (
    <>
      {trains.map((t) => formatTrain(t))}
    </>
  );
};

export default Trains;
