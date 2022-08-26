import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ReactApexChart from "react-apexcharts";
import Price from "./Price";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart() {
  const coinId = useOutletContext<ChartProps>();

  const { isLoading, data } = useQuery<IHistorical[]>("ohlcv", () =>
    fetchCoinHistory(`${coinId}`)
  );

  return (
    <>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ReactApexChart
          type="line"
          series={[
            {
              name: "price",
              data: data?.map((price) => parseInt(price.close)) as number[],
            },
          ]}
          options={{
            theme: { mode: "dark" },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
            xaxis: {
              type: "datetime",
              categories: data?.map((date) =>
                new Date(date.time_close * 1000).toLocaleDateString("en-US")
              ),
            },
          }}
        />
      )}
    </>
  );
}

export default Chart;
