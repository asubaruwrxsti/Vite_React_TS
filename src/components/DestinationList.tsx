const DestinationList = () => {
  const destinations = [
    'Paris',
    'Tokyo',
    'New York',
    // Add more destinations
  ];

  return (
    <div>
      <h2>Popular Destinations</h2>
      <ul>
        {destinations.map((destination, index) => (
          <li key={index}>{destination}</li>
        ))}
      </ul>
    </div>
  );
};

export default DestinationList;
