import React, { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://randomuser.me/api");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setData(result.results || []); // Ensuring data is an array, if falsy then set empty array to make data.map undefined while rendering
    } catch (error) {
      console.error("Error fetching data:", error); 
      // throw error;
    }

  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

  return (
    <div>
      {data.map((ele, index) => (
        <div key={index}>
          <div>Gender: {ele.gender}</div>
          <div>First Name: {ele.name.first}</div>
          <div>Last Name: {ele.name.last}</div>
        </div>
      ))}
    </div>
  );
};

export default App;


/* 
✅ Added a try-catch block for error handling.
✅ Always handle HTTP errors (if (!response.ok) throw new Error(...)).  / Always check response.ok to manually throw errors for non-successful HTTP status codes.
✅ Use try-catch with error logging (console.error(error)). 
✅ Used result.results || [] to prevent issues if results is undefined. || checks for falsy values (including 0, false, "", null, undefined).
✅ Wrapped map() items in a <div key={index}> instead of a fragment.
Notes:

✅ || checks for falsy values (including 0, false, "", null, undefined).
✅ ?? checks only for null or undefined, making it safer in some cases.
✅ ?. prevents accessing properties of undefined or null and avoids runtime errors.
✅ try-catch alone only catches network errors but not failed HTTP responses.
✅ Checking response.ok prevents using bad API responses like 404 or 500.
*/
