// components
import Spacer from "./Spacer";
import SampleDataDisplay from "./SampleDataDisplay";
// images
import gummicubexncoughlin from "@/assets/gummicube_x_ncoughlin.png";

function App() {
  return (
    <div id="main-wrapper" className="min-h-screen  flex flex-col items-center">
      <div className="w-full max-w-6xl flex flex-col items-center">
        <Spacer vertical={10} verticalMobile={2} />
        <img src={gummicubexncoughlin} className="max-w-sm" />
        <Spacer vertical={6} verticalMobile={2} />
        <div className="max-w-4xl">
          <h2>Devops Sample</h2>
          <p className=" text-xl">
            This simple application is intended to demonstrate a basic
            proficiency with the devops technologies in the Gummicube stack.
          </p>
        </div>
        <Spacer vertical={6} verticalMobile={2} />
        <SampleDataDisplay />
        <Spacer vertical={6} verticalMobile={2} />
        <div className="max-w-4xl">
          <h3>Back-End: Pulumi + AWS</h3>
          <p className=" text-xl">
            The data that populates the chart above is being served from a
            back-end created entirely with <strong>Pulumi</strong>. It includes
            an <strong>API Gateway</strong>, <strong>Lambda</strong> and{" "}
            <strong>RDS PostgreSQL</strong> database.
          </p>
          <p className=" text-xl">
            The source code for this back-end is in the Code Sandbox below.
          </p>
        </div>

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
        <Spacer vertical={6} verticalMobile={2} />
        <div className="max-w-4xl">
          <h3>Front-End: Docker + GitLab Pipeline</h3>
          <p className=" text-xl">
            The Front-End you are currently viewing is a{" "}
            <strong>Dockerized Vite/React/TypeScript </strong> application that
            is automatically built and deployed using a{" "}
            <strong>GitLab Pipeline</strong>.
          </p>
          <p className=" text-xl">
            The source code for this front-end is in the Code Sandbox below.
          </p>
        </div>
        <Spacer vertical={6} verticalMobile={2} />
        <iframe
          src="https://codesandbox.io/p/github/ncoughlin/gummicube-demo-front/main?import=true&embed=1&file=%2F.gitlab-ci.yml"
          style={{
            width: "100%",
            height: "800px",
            border: 0,
            borderRadius: "4px",
            overflow: "hidden",
          }}
          title="ncoughlin/gummicube-demo-front/main"
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        ></iframe>
        <Spacer vertical={6} verticalMobile={2} />
        <div className="max-w-4xl">
          <h3>Notes</h3>
          <p className=" text-xl">
            Here is a list of the notes I generated while working on this.
          </p>
          <ul>
            <li>
              <a
                className="font-medium text-primary underline underline-offset-4"
                href="https://ncoughlin.com/posts/pulumi-iac-basics"
                target="_blank"
              >
                {`Ncoughlin > Pulumi Basics`}
              </a>
            </li>
            <li>
              <a
                className="font-medium text-primary underline underline-offset-4"
                href="https://ncoughlin.com/posts/pulumi-lambda"
                target="_blank"
              >
                {`Ncoughlin > Pulumi Lambda`}
              </a>
            </li>
            <li>
              <a
                className="font-medium text-primary underline underline-offset-4"
                href="https://ncoughlin.com/posts/pulumi-api-gateway"
                target="_blank"
              >
                {`Ncoughlin > Pulumi API Gateway`}
              </a>
            </li>
            <li>
              <a
                className="font-medium text-primary underline underline-offset-4"
                href="https://ncoughlin.com/posts/pulumi-rds"
                target="_blank"
              >
                {`Ncoughlin > Pulumi RDS`}
              </a>
            </li>
            <li>
              <a
                className="font-medium text-primary underline underline-offset-4"
                href="https://ncoughlin.com/posts/pulumi-s3-bucket"
                target="_blank"
              >
                {`Ncoughlin > Pulumi S3 Buckets`}
              </a>
            </li>
            <li>
              <a
                className="font-medium text-primary underline underline-offset-4"
                href="https://ncoughlin.com/posts/aws-rds-basics"
                target="_blank"
              >
                {`Ncoughlin > AWS RDS Basics`}
              </a>
            </li>
            <li>
              <a
                className="font-medium text-primary underline underline-offset-4"
                href="https://ncoughlin.com/posts/postgressql-basics"
                target="_blank"
              >
                {`Ncoughlin > PostgreSQL Basics`}
              </a>
            </li>
            <li>
              <a
                className="font-medium text-primary underline underline-offset-4"
                href="https://ncoughlin.com/posts/gitlab"
                target="_blank"
              >
                {`Ncoughlin > GitLab`}
              </a>
            </li>
          </ul>
        </div>
        <Spacer vertical={20} verticalMobile={4} />
      </div>
    </div>
  );
}

export default App;
