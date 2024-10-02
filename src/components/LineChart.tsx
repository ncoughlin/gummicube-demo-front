import { useQuery } from "@tanstack/react-query";

const LineChart = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(
        "https://emzdc3lzy9.execute-api.us-east-1.amazonaws.com/dev/sample-data"
      ).then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return <div>{data}</div>;
};

export default LineChart;
