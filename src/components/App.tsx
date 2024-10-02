// components
import Spacer from "./Spacer";
import SampleDataDisplay from "./SampleDataDisplay";
// images
import gummicubexncoughlin from "../assets/gummicube_x_ncoughlin.png";

function App() {
  return (
    <div className="min-h-screen  flex flex-col items-center">
      <div className="w-full max-w-6xl flex flex-col items-center">
        <Spacer vertical={10} verticalMobile={2} />
        <img src={gummicubexncoughlin} className="max-w-sm" />
        <Spacer vertical={6} verticalMobile={2} />
        <div className="max-w-4xl">
          <p className=" text-xl">
            This page is intended to demonstrate a basic proficiency with the
            <strong> Pulumi </strong>infrastructure as code framework. The data
            that populates the chart below is being served from a back-end
            created entirely with Pulumi. It includes an API Gateway, Lambda and
            RDS PostgreSQL database.
          </p>
          <p className=" text-xl">
            The source code for the project can be found in the Code Sandbox
            below.
          </p>
        </div>
        <Spacer vertical={6} verticalMobile={2} />
        <SampleDataDisplay />
        <Spacer vertical={6} verticalMobile={2} />
        {/* code sandbox */}
        <iframe
          src="https://codesandbox.io/p/github/ncoughlin/gummicube-demo/main?import=true&embed=1&file=%2Fsrc%2Findex.ts"
          style={{
            width: "100%",
            height: "800px",
            border: 0,
            borderRadius: "4px",
            overflow: "hidden",
          }}
          title="ncoughlin/gummicube-demo/main"
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        ></iframe>
        <Spacer vertical={20} verticalMobile={4} />
      </div>
    </div>
  );
}

export default App;
