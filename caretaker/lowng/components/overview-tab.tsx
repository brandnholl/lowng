"use client";
import { Activity, Brain, Calendar1Icon, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StressLevelChart from "@/components/stress-level-chart";
import FocusMetricsChart from "@/components/focus-metrics-chart";
import { useEffect, useState } from "react";

export default function OverviewTab() {
  interface ReportData {
    boredom_percentage: number;
    labels: string[];
    stress_percentage: number;
  }

  const response = fetch("http://10.50.52.89:5020/get_report", {
    cache: "no-store",
  });
  const [data, setData] = useState<ReportData>({
    boredom_percentage: 0,
    labels: [],
    stress_percentage: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await (await response).json();
      setData(result);
    };
    fetchData();
  }, []);
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">
          Welcome back, Brandon
        </h2>
        <p className="text-slate-600">Here{"'"}s how Savir is doing today</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white border-slate-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Current Status
            </CardTitle>
            <Brain className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {data.labels && data.labels.length > 0
                ? data.labels[0]?.charAt(0).toUpperCase() +
                  data.labels[0]?.slice(1)
                : "Loading..."}
            </div>
            <p className="text-xs text-slate-600">Last updated: 1 minute ago</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Stress Level
            </CardTitle>
            <Brain className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                data.stress_percentage > 65 ? "text-red-600" : "text-green-600"
              }`}
            >
              {!isNaN(data.stress_percentage)
                ? `${Math.round(data.stress_percentage)}%`
                : "Loading..."}
            </div>
            <p className="text-xs text-slate-600">10% lower than yesterday</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Boredom Level
            </CardTitle>
            <Clock className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {!isNaN(data.boredom_percentage)
                ? `${Math.round(data.boredom_percentage)}%`
                : "Loading..."}
            </div>
            <p className="text-xs text-slate-600">Todays focused time</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Calendar Events
            </CardTitle>
            <Calendar1Icon className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">1</div>
            <p className="text-xs">Upcoming Events</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-white border-slate-100">
          <CardHeader>
            <CardTitle className="text-slate-900">
              Daily Stress Levels
            </CardTitle>
            <CardDescription>
              EEG stress percentages throughout the day
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <StressLevelChart />
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-100">
          <CardHeader>
            <CardTitle className="text-slate-900">Focus Metrics</CardTitle>
            <CardDescription>
              Cognitive engagement from EEG data
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <FocusMetricsChart />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border-slate-100">
        <CardHeader>
          <CardTitle className="text-slate-900">Notable Events</CardTitle>
          <CardDescription>Recent spikes in stress or boredom</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                time: "",
                event: 'Savir Proposed "Eat Dinner"',
                type: "boredom",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full mr-3 ${
                    item.type === "stress"
                      ? "bg-red-100"
                      : item.type === "boredom"
                      ? "bg-blue-100"
                      : "bg-green-100"
                  }`}
                >
                  {item.type === "stress" ? (
                    <Activity className={`h-5 w-5 text-red-600`} />
                  ) : item.type === "boredom" ? (
                    <Calendar1Icon className={`h-5 w-5 text-blue-600`} />
                  ) : (
                    <Brain className={`h-5 w-5 text-green-600`} />
                  )}
                </div>
                <div className="">
                  <p className="font-medium text-slate-900 flex items-center my-auto">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
