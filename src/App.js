import React, { useState, useEffect, useMemo } from "react";
import MainRouteComponent from "./Components/MainRouteComponent";

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
//useEeffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("userData.json");
        const data = await response.json();
        setCustomers(data);
      } catch (e) {
        console.log(e, "error");
      } finally {
        setLoading(false); // Stop the loading state once data is fetched
      }
    };
    fetchData();
  }, []);
  const memoizedCustomers = useMemo(() => customers, [customers]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <MainRouteComponent customers={memoizedCustomers} />
      )}
    </>
  );
};

export default App;
