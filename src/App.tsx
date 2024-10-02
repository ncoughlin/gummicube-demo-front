import "./App.css";

function App() {
  // URL of the API endpoint
  const url =
    "https://emzdc3lzy9.execute-api.us-east-1.amazonaws.com/dev/sample-data";

  // Function to get data from the API using fetch
  const getData = async () => {
    try {
      const response = await fetch(url);

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Data: ", data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Call the function to fetch data
  getData();

  return (
    <>
      <div>Gummicube + Ncoughlin</div>
    </>
  );
}

export default App;
