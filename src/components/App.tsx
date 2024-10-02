

// components
import Spacer from "./Spacer";
import LineChart from "./LineChart";
// images
import gummicubexncoughlin from "../assets/gummicube_x_ncoughlin.png";



function App() {
  return (
   
      <div className="min-h-screen  flex flex-col items-center">
        <div className="w-full max-w-6xl flex flex-col items-center">
          <Spacer vertical={10} verticalMobile={2} />
          <img src={gummicubexncoughlin} className="max-w-xl" />
          <Spacer vertical={6} verticalMobile={2} />
          <p className="max-w-2xl">
            Dave,
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <Spacer vertical={6} verticalMobile={2} />
          {/* <LineChart /> */}
        </div>
      </div>
    
  );
}

export default App;
