import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import { fetchCoinHistory } from "../../api";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../../atoms";

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
  const isDark = useRecoilValue(isDarkAtom);
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
            theme: { mode: isDark ? "dark" : "light" },
            chart: {
              background: "transparent",
            },
            grid: {
              borderColor: isDark ? "white" : "black",
              strokeDashArray: 4,
            },
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
              axisBorder: {
                color: isDark ? "white" : "black",
              },
              axisTicks: {
                color: isDark ? "white" : "black",
              },
            },
          }}
        />
      )}
    </>
  );
}

export default Chart;
