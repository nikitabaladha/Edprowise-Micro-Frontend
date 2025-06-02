import React, { useState, useEffect } from "react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const transformPerformanceData = (performance) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return performance.map((item) => ({
    name: monthNames[item.month - 1],
    schools: item.schools,
    sellers: item.sellers,
  }));
};

const DashboardPerformance = ({ performance, fetchPerformance }) => {
  const [barSize, setBarSize] = useState(15);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [years, setYears] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setBarSize(window.innerWidth < 768 ? 10 : 15);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const startYear = 2000;
    const yearArray = Array.from(
      { length: currentYear - startYear + 1 },
      (_, index) => startYear + index
    );
    setYears(yearArray);
  }, []);

  const handleYearChange = (event) => {
    const year = event.target.value;
    setSelectedYear(year);
    fetchPerformance(year);
  };

  const chartData = transformPerformanceData(performance);

  const maxValue = Math.max(
    ...chartData.map((item) => Math.max(item.schools, item.sellers))
  );

  const yAxisTicks = Array.from({ length: maxValue + 2 }, (_, i) => i);

  return (
    <>
      <div className="col-lg-8">
        <div className="card">
          <div className="card-body">
            <div className="">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="card-title">Performance</h4>
                <div>
                  <select
                    className="form-select form-select-sm"
                    value={selectedYear}
                    onChange={handleYearChange}
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div
                dir="ltr"
                id="dash-performance-chart"
                className="apex-charts"
                style={{ minHeight: 328 }}
              >
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={chartData} barGap={0} barCategoryGap={0}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={true}
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12, fontWeight: "bold" }}
                      //   interval={0}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fontWeight: "bold" }}
                      ticks={yAxisTicks}
                      tickFormatter={(value) => Math.round(value)}
                      domain={[0, maxValue]}
                      allowDecimals={false}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="schools"
                      fill="#F9B931"
                      barSize={barSize}
                      name="Schools"
                    />
                    <Bar
                      dataKey="students"
                      fill="#EF5F5F"
                      barSize={barSize}
                      name="Students"
                    />
                    <Bar
                      dataKey="sellers"
                      fill="#4ecac2"
                      barSize={barSize}
                      name="Sellers"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPerformance;
