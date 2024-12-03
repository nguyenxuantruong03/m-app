"use client";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LineChart } from "@/components/chart/lineChart";
import { ComposedChart } from "@/components/chart/composedChart";
import { BarChart } from "@/components/chart/barchart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PieChart from "./piechart";
import RadialChart from "./radialchart";
import FunnelChart from "./funnel";
import axios from "axios";
import { DateRange } from "react-day-picker";
import { DatePickerWithRangeChart } from "./date-picker-range-chart";
import TreeMap from "./treemap";
import RadarChart from "./radar";
import toast from "react-hot-toast";
import {
  getToastError,
  translateChartData,
  translateChartTypes,
  translateChooseChart,
} from "@/translate/translate-client";

interface ChartProps {
  storeId: string;
  languageToUse: string;
}

const Chart = ({ storeId, languageToUse }: ChartProps) => {
  const [selectedBasicChart, setSelectedBasicChart] =
    useState<string>("barchart");
  const [selectedAdvancedChart, setSelectedAdvancedChart] =
    useState<string>("pie");

  const [loadingBarChart, setLoadingBarChart] = useState(false);
  const [loadingComposed, setLoadingComposed] = useState(false);
  const [loadingLine, setLoadingLine] = useState(false);
  const [loadingTreeMap, setLoadingTreeMap] = useState(false);
  const [loadingPie, setLoadingPie] = useState(false);
  const [loadingRadial, setLoadingRadial] = useState(false);
  const [loadingFunnel, setLoadingFunnel] = useState(false);
  const [loadingRadar, setLoadingRadar] = useState(false);

  const [barChartData, setBarChartData] = useState<any>();
  const [composedChartData, setComposedChartData] = useState<any>();
  const [lineChartData, setLineChartData] = useState<any>();
  const [treemapData, setTreemapData] = useState<any>();
  const [pieChartData, setPieChartData] = useState<any>();
  const [radialChartData, setRadialChartData] = useState<any>();
  const [funnelChartData, setFunnelChartData] = useState<any>();
  const [radarChartData, setRadarChartData] = useState<any>();

  const [dateRangeBarchart, setDateRangeBarchart] = useState<
    DateRange | undefined
  >(undefined);
  const [dateRangeComposed, setDateRangeComposed] = useState<
    DateRange | undefined
  >(undefined);
  const [dateRangeLine, setDateRangeLine] = useState<DateRange | undefined>(
    undefined
  );
  const [dateRangeTreemap, setDateRangeTreemap] = useState<
    DateRange | undefined
  >(undefined);
  const [dateRangePie, setDateRangePie] = useState<DateRange | undefined>(
    undefined
  );
  const [dateRangeRadial, setDateRangeRadial] = useState<DateRange | undefined>(
    undefined
  );
  const [dateRangeFunnel, setDateRangeFunnel] = useState<DateRange | undefined>(
    undefined
  );
  const [dateRangeRadar, setDateRangeRadar] = useState<DateRange | undefined>(
    undefined
  );

  //languages
  const toastErrorMessage = getToastError(languageToUse);
  const chartDataMessage = translateChartData(languageToUse);
  const chooseChartMessage = translateChooseChart(languageToUse);
  const chartTypesMessage = translateChartTypes(languageToUse);

  useEffect(() => {
    if (selectedBasicChart === "barchart") {
      const fetchBarChartData = async () => {
        try {
          setLoadingBarChart(true);
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/chart/barchart`,
            {
              storeId: storeId,
              dateRange: dateRangeBarchart,
            }
          );
          setBarChartData(response.data);
        } catch (error) {
          toast.error(toastErrorMessage);
        } finally {
          setLoadingBarChart(false);
        }
      };
      fetchBarChartData();
    }
  }, [storeId, dateRangeBarchart, selectedBasicChart]);

  useEffect(() => {
    if (selectedBasicChart === "composed") {
      const fetchComposedData = async () => {
        try {
          setLoadingComposed(true);
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/chart/composed`,
            {
              storeId: storeId,
              dateRange: dateRangeComposed,
            }
          );
          setComposedChartData(response.data);
        } catch (error) {
          toast.error(toastErrorMessage);
        } finally {
          setLoadingComposed(false);
        }
      };
      fetchComposedData();
    }
  }, [storeId, dateRangeComposed, selectedBasicChart]);

  // Fetch data for line chart
  useEffect(() => {
    if (selectedBasicChart === "line") {
      const fetchLineChartData = async () => {
        try {
          setLoadingLine(true);
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/chart/line`,
            {
              storeId: storeId,
              dateRange: dateRangeLine,
            }
          );
          setLineChartData(response.data);
        } catch (error) {
          toast.error(toastErrorMessage);
        } finally {
          setLoadingLine(false);
        }
      };
      fetchLineChartData();
    }
  }, [storeId, dateRangeLine, selectedBasicChart]);

  // Fetch data for treemap
  useEffect(() => {
    if (selectedBasicChart === "treemap") {
      const fetchTreeMapData = async () => {
        try {
          setLoadingTreeMap(true);
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/chart/treemap`,
            {
              dateRange: dateRangeTreemap,
            }
          );
          setTreemapData(response.data);
        } catch (error) {
          toast.error(toastErrorMessage);
        } finally {
          setLoadingTreeMap(false);
        }
      };
      fetchTreeMapData();
    }
  }, [dateRangeTreemap, selectedBasicChart]);

  // Fetch data for pie chart
  useEffect(() => {
    if (selectedAdvancedChart === "pie") {
      const fetchPieChartData = async () => {
        try {
          setLoadingPie(true);
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/chart/pie`,
            {
              storeId: storeId,
              dateRange: dateRangePie,
            }
          );
          setPieChartData(response.data);
        } catch (error) {
          toast.error(toastErrorMessage);
        } finally {
          setLoadingPie(false);
        }
      };
      fetchPieChartData();
    }
  }, [storeId, dateRangePie, selectedAdvancedChart]);

  // Fetch data for radial chart
  useEffect(() => {
    if (selectedAdvancedChart === "radial") {
      const fetchRadialChartData = async () => {
        try {
          setLoadingRadial(true);
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/chart/radial`,
            {
              storeId: storeId,
              dateRange: dateRangeRadial,
            }
          );
          setRadialChartData(response.data);
        } catch (error) {
          toast.error(toastErrorMessage);
        } finally {
          setLoadingRadial(false);
        }
      };
      fetchRadialChartData();
    }
  }, [storeId, dateRangeRadial, selectedAdvancedChart]);

  // Fetch data for funnel chart
  useEffect(() => {
    if (selectedAdvancedChart === "funnel") {
      const fetchFunnelChartData = async () => {
        try {
          setLoadingFunnel(true);
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/chart/funnel`,
            {
              dateRange: dateRangeFunnel,
            }
          );
          setFunnelChartData(response.data);
        } catch (error) {
          toast.error(toastErrorMessage);
        } finally {
          setLoadingFunnel(false);
        }
      };
      fetchFunnelChartData();
    }
  }, [dateRangeFunnel, selectedAdvancedChart]);

  // Fetch data for radar chart
  useEffect(() => {
    if (selectedAdvancedChart === "radar") {
      const fetchRadarChartData = async () => {
        try {
          setLoadingRadar(true);
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/chart/radar`,
            {
              dateRange: dateRangeRadar,
            }
          );
          setRadarChartData(response.data);
        } catch (error) {
          toast.error(toastErrorMessage);
        } finally {
          setLoadingRadar(false);
        }
      };
      fetchRadarChartData();
    }
  }, [dateRangeRadar, selectedAdvancedChart]);

  return (
    <div className="flex flex-col space-y-6">
      {/* Flexbox container */}
      <div className="flex flex-wrap justify-between space-x-2 lg:space-y-0 lg:space-x-6">
        {/* Left column for basic charts */}
        <div className="flex-1 min-w-[300px]">
          <div className="flex flex-wrap xl:flex-nowrap gap-2">
            <Select
              onValueChange={(value) => setSelectedBasicChart(value)}
              defaultValue="barchart"
            >
              <SelectTrigger className="md:w-[300px]">
                <SelectValue placeholder={chooseChartMessage} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="barchart">
                  {chartDataMessage.name1}
                </SelectItem>
                <SelectItem value="composed">
                  {chartDataMessage.name2}
                </SelectItem>
                <SelectItem value="line">{chartDataMessage.name3}</SelectItem>
                <SelectItem value="treemap">
                  {chartDataMessage.name4}
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Conditional rendering of DatePickerWithRangeChart */}
            {selectedBasicChart === "barchart" && (
              <DatePickerWithRangeChart
                onDateChange={setDateRangeBarchart}
                data={barChartData} // Dữ liệu cho barchart
                loading={loadingBarChart}
              />
            )}

            {selectedBasicChart === "composed" && (
              <DatePickerWithRangeChart
                onDateChange={setDateRangeComposed}
                data={composedChartData} // Dữ liệu cho line chart
                loading={loadingComposed}
              />
            )}
            {selectedBasicChart === "line" && (
              <DatePickerWithRangeChart
                onDateChange={setDateRangeLine}
                data={lineChartData} // Dữ liệu cho line chart
                loading={loadingLine}
              />
            )}
            {selectedBasicChart === "treemap" && (
              <DatePickerWithRangeChart
                onDateChange={setDateRangeTreemap}
                treeMapData={treemapData} // Dữ liệu cho treemap
                loading={loadingTreeMap}
              />
            )}
          </div>

          {/* Render selected basic chart */}
          {selectedBasicChart === "barchart" && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>{chartDataMessage.name1}</CardTitle>
              </CardHeader>
              <CardContent className="p-2 xl:p-6">
                <BarChart
                  data={barChartData}
                  loading={loadingBarChart}
                  languageToUse={languageToUse}
                />
              </CardContent>
            </Card>
          )}

          {selectedBasicChart === "composed" && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>{chartDataMessage.name2}</CardTitle>
              </CardHeader>
              <CardContent className="p-2 xl:p-6">
                <ComposedChart
                  data={composedChartData}
                  loading={loadingComposed}
                  languageToUse={languageToUse}
                />
              </CardContent>
            </Card>
          )}

          {selectedBasicChart === "line" && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>{chartDataMessage.name3}</CardTitle>
              </CardHeader>
              <CardContent className="p-2 xl:p-6">
                <LineChart
                  data={lineChartData}
                  loading={loadingLine}
                  languageToUse={languageToUse}
                />
              </CardContent>
            </Card>
          )}

          {selectedBasicChart === "treemap" && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>{chartDataMessage.name4}</CardTitle>
              </CardHeader>
              <CardContent className="p-2 xl:p-6">
                <TreeMap
                  data={treemapData}
                  loading={loadingTreeMap}
                  languageToUse={languageToUse}
                />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right column for advanced charts */}
        <div className="flex-1 min-w-[300px]">
          <div className="flex flex-wrap xl:flex-nowrap gap-2">
            <Select
              onValueChange={(value) => setSelectedAdvancedChart(value)}
              defaultValue="pie"
            >
              <SelectTrigger className="md:w-[300px]">
                <SelectValue placeholder={chooseChartMessage} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pie">{chartTypesMessage.name1}</SelectItem>
                <SelectItem value="radial">
                  {chartTypesMessage.name2}
                </SelectItem>
                <SelectItem value="funnel">
                  {chartTypesMessage.name3}
                </SelectItem>
                <SelectItem value="radar">{chartTypesMessage.name4}</SelectItem>
              </SelectContent>
            </Select>

            {/* Conditional rendering of DatePickerWithRangeChart for advanced charts */}
            {selectedAdvancedChart === "pie" && (
              <DatePickerWithRangeChart
                onDateChange={setDateRangePie}
                data={pieChartData} // Dữ liệu cho pie chart
                loading={loadingPie}
              />
            )}

            {selectedAdvancedChart === "radial" && (
              <DatePickerWithRangeChart
                onDateChange={setDateRangeRadial}
                data={radialChartData} // Dữ liệu cho radial chart
                loading={loadingRadial}
              />
            )}

            {selectedAdvancedChart === "funnel" && (
              <DatePickerWithRangeChart
                onDateChange={setDateRangeFunnel}
                data={funnelChartData} // Dữ liệu cho funnel chart
                loading={loadingFunnel}
              />
            )}

            {selectedAdvancedChart === "radar" && (
              <DatePickerWithRangeChart
                onDateChange={setDateRangeRadar}
                radarData={radarChartData} // Dữ liệu cho funnel chart
                loading={loadingRadar}
              />
            )}
          </div>

          {/* Render selected advanced chart */}
          {selectedAdvancedChart === "pie" && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>{chartTypesMessage.name1}</CardTitle>
              </CardHeader>
              <CardContent className="p-2 xl:p-6">
                <PieChart
                  pieChartData={pieChartData}
                  loading={loadingPie}
                  languageToUse={languageToUse}
                />
              </CardContent>
            </Card>
          )}

          {selectedAdvancedChart === "radial" && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>{chartTypesMessage.name2}</CardTitle>
              </CardHeader>
              <CardContent className="p-2 xl:p-6">
                <RadialChart
                  radialChartData={radialChartData}
                  loading={loadingRadial}
                  languageToUse={languageToUse}
                />
              </CardContent>
            </Card>
          )}

          {selectedAdvancedChart === "funnel" && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>{chartTypesMessage.name3}</CardTitle>
              </CardHeader>
              <CardContent className="p-2 xl:p-6">
                <FunnelChart
                  funnelChartData={funnelChartData}
                  loading={loadingFunnel}
                  languageToUse={languageToUse}
                />
              </CardContent>
            </Card>
          )}

          {selectedAdvancedChart === "radar" && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>{chartTypesMessage.name4}</CardTitle>
              </CardHeader>
              <CardContent className="p-2 xl:p-6">
                <RadarChart
                  radarChartData={radarChartData}
                  loading={loadingRadar}
                  languageToUse={languageToUse}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chart;
