import { useQuery } from "@tanstack/react-query";
import LineChart from "./LineChart";
import { Metric, DataPoint } from "./LineChart";

const SampleDataDisplay = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(
        "https://emzdc3lzy9.execute-api.us-east-1.amazonaws.com/dev/sample-data"
      ).then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  // expected metrics in report
  const linechartMetrics: Metric[] = [
    {
      key: "sales",
      label: "Sales",
      accessor: (d: DataPoint) => d.sales,
      color: "var(--text-primary)",
      backgroundColor: "var(--primary-semi-transparent)",
    },
    {
      key: "cost",
      label: "Cost",
      accessor: (d: DataPoint) => d.cost,
      color: "var(--blue)",
      backgroundColor: "var(--blue-semi-transparent)",
    },
  ];

  return (
    <div>
      <LineChart data={data} metrics={linechartMetrics} />
    </div>
  );
};

export default SampleDataDisplay;
