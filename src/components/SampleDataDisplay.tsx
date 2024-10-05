import { useQuery } from "@tanstack/react-query";
import LineChart from "./LineChart";
import { Metric, DataPoint } from "./LineChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      accessor: (d: DataPoint) => Number(d.sales),
      color: "var(--text-primary)",
      backgroundColor: "var(--primary-semi-transparent)",
    },
    {
      key: "cost",
      label: "Cost",
      accessor: (d: DataPoint) => Number(d.cost),
      color: "var(--blue)",
      backgroundColor: "var(--blue-semi-transparent)",
    },
    {
      key: "clicks",
      label: "Clicks",
      accessor: (d: DataPoint) => Number(d.clicks),
      color: "var(--brown)",
      backgroundColor: "var(--brown-semi-transparent)",
    },
  ];

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Time-Series (Sample Data)</CardTitle>
          <CardDescription>
            The back-end infrastructure (API, Lambda and PostgreSQL Database)
            that serves this chart data was generated with Pulumi IAC framework.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LineChart data={data} metrics={linechartMetrics} />
        </CardContent>
      </Card>
    </div>
  );
};

export default SampleDataDisplay;
