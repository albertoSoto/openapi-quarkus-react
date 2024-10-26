import  { useEffect, useState } from 'react';
import { FruitResourceApi, Fruit } from "@react-app/shared-api";

const FruitList = () => {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFruits = async () => {
      try {
        const api = new FruitResourceApi();
        const response = await api.fruitsGet();
        setFruits(Array.from(response.data));
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch fruits');
        setLoading(false);
      }
    };

    fetchFruits();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Fruit List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {fruits.map((fruit, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-2">{fruit.name}</h3>
            <p className="text-gray-600">{fruit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FruitList;
