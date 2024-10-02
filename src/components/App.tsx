import gummicubexncoughlin from "../assets/gummicube_x_ncoughlin.png";
import Spacer from "./Spacer";

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
      <div className="min-h-screen  flex flex-col items-center">
        <div className="w-full max-w-6xl flex flex-col items-center">
          <Spacer vertical={10} verticalMobile={2} />
          <img src={gummicubexncoughlin} className="max-w-xl"/>
          <Spacer vertical={10} verticalMobile={2} />
          <h1 className="text-3xl font-bold mb-4 text-center">
            Welcome to My Website
          </h1>
          <p className="text-gray-700 text-center mb-4">
            This is a simple single-page website built using Vite and
            TailwindCSS. The content is centered horizontally and arranged in a
            column.
          </p>
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 mx-auto">
            Click Me
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
