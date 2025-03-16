"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertTriangle, Bell, Brain, Mail, MessageSquare } from "lucide-react";

export default function AlertsTab() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [textAlerts, setTextAlerts] = useState(true);
  const [stressThreshold, setStressThreshold] = useState([75]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Alert Settings</h2>
        <p className="text-slate-600">
          Configure when and how you receive weekly stress reports
        </p>
      </div>

      <Tabs defaultValue="settings" className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
          <TabsTrigger value="settings">Alert Settings</TabsTrigger>
          <TabsTrigger value="history">Alert History</TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-white border-slate-100">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-slate-900">
                      Notification Methods
                    </CardTitle>
                    <CardDescription>
                      How you{"'"}ll receive weekly reports
                    </CardDescription>
                  </div>
                  <Bell className="h-5 w-5 text-slate-600" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-slate-600" />
                    <Label htmlFor="email-alerts" className="text-slate-900">
                      Email Reports
                    </Label>
                  </div>
                  <Switch
                    id="email-alerts"
                    checked={emailAlerts}
                    onCheckedChange={setEmailAlerts}
                  />
                </div>

                {emailAlerts && (
                  <div className="pl-6 mt-2">
                    <Input
                      type="email"
                      placeholder="your-email@example.com"
                      className="border-slate-200"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4 text-slate-600" />
                    <Label htmlFor="text-alerts" className="text-slate-900">
                      Text Message Reports
                    </Label>
                  </div>
                  <Switch
                    id="text-alerts"
                    checked={textAlerts}
                    onCheckedChange={setTextAlerts}
                  />
                </div>

                {textAlerts && (
                  <div className="pl-6 mt-2">
                    <Input
                      type="tel"
                      placeholder="(123) 456-7890"
                      className="border-slate-200"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4 text-slate-600" />
                    <Label
                      htmlFor="app-notifications"
                      className="text-slate-900"
                    >
                      App Notifications
                    </Label>
                  </div>
                  <Switch id="app-notifications" defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-100">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-slate-900">
                      Alert Triggers
                    </CardTitle>
                    <CardDescription>
                      When you{"'"}ll receive check-in alerts
                    </CardDescription>
                  </div>
                  <AlertTriangle className="h-5 w-5 text-slate-600" />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label
                      htmlFor="stress-threshold"
                      className="text-slate-900"
                    >
                      Weekly Stress Threshold
                    </Label>
                    <span className="text-slate-900 font-medium">
                      {stressThreshold}%
                    </span>
                  </div>
                  <Slider
                    id="stress-threshold"
                    defaultValue={[75]}
                    max={100}
                    step={5}
                    value={stressThreshold}
                    onValueChange={setStressThreshold}
                    className="py-4"
                  />
                  <p className="text-xs text-slate-600">
                    You{"'"}ll be alerted when weekly average stress exceeds
                    this threshold
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Brain className="h-4 w-4 text-slate-600" />
                      <Label
                        htmlFor="boredom-alerts"
                        className="text-slate-900"
                      >
                        Boredom Pattern Alerts
                      </Label>
                    </div>
                    <Switch id="boredom-alerts" defaultChecked />
                  </div>

                  <div>
                    <Label
                      htmlFor="report-frequency"
                      className="text-slate-900 mb-2 block"
                    >
                      Report Frequency
                    </Label>
                    <Select defaultValue="weekly">
                      <SelectTrigger
                        id="report-frequency"
                        className="border-slate-200"
                      >
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="biweekly">Bi-Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-slate-600 hover:bg-slate-700">
                  Save Alert Settings
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card className="bg-white border-slate-100 mt-6">
            <CardHeader>
              <CardTitle className="text-slate-900">
                Weekly Summary Settings
              </CardTitle>
              <CardDescription>
                Configure your weekly EEG summary report
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Switch id="include-stress" defaultChecked />
                  <Label
                    htmlFor="include-stress"
                    className="ml-2 text-slate-900"
                  >
                    Include stress pattern analysis
                  </Label>
                </div>

                <div className="flex items-center">
                  <Switch id="include-focus" defaultChecked />
                  <Label
                    htmlFor="include-focus"
                    className="ml-2 text-slate-900"
                  >
                    Include focus duration metrics
                  </Label>
                </div>

                <div className="flex items-center">
                  <Switch id="include-brain" defaultChecked />
                  <Label
                    htmlFor="include-brain"
                    className="ml-2 text-slate-900"
                  >
                    Include brain wave activity charts
                  </Label>
                </div>

                <div className="flex items-center">
                  <Switch id="include-recommendations" defaultChecked />
                  <Label
                    htmlFor="include-recommendations"
                    className="ml-2 text-slate-900"
                  >
                    Include caregiving recommendations
                  </Label>
                </div>

                <div>
                  <Label
                    htmlFor="preferred-day"
                    className="text-slate-900 mb-2 block"
                  >
                    Preferred Report Day
                  </Label>
                  <Select defaultValue="friday">
                    <SelectTrigger
                      id="preferred-day"
                      className="border-slate-200"
                    >
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monday">Monday</SelectItem>
                      <SelectItem value="wednesday">Wednesday</SelectItem>
                      <SelectItem value="friday">Friday</SelectItem>
                      <SelectItem value="sunday">Sunday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="bg-white border-slate-100">
            <CardHeader>
              <CardTitle className="text-slate-900">Recent Alerts</CardTitle>
              <CardDescription>
                History of weekly reports and alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    date: "Last week",
                    type: "Weekly Report",
                    message: "Average stress level 42% - within normal range",
                    severity: "low",
                  },
                  {
                    date: "Two weeks ago",
                    type: "Stress Alert",
                    message:
                      "Stress pattern exceeded threshold (82%) - recommended check-in",
                    severity: "high",
                  },
                  {
                    date: "Three weeks ago",
                    type: "Weekly Report",
                    message: "Average stress level 35% - within normal range",
                    severity: "low",
                  },
                  {
                    date: "Mar 12",
                    type: "Boredom Alert",
                    message: "Extended periods of low engagement detected",
                    severity: "medium",
                  },
                  {
                    date: "Mar 5",
                    type: "Weekly Report",
                    message: "Average stress level 38% - within normal range",
                    severity: "low",
                  },
                ].map((alert, index) => (
                  <div
                    key={index}
                    className="flex items-start border-b border-slate-100 pb-4 last:border-0"
                  >
                    <div
                      className={`flex-shrink-0 w-3 h-3 mt-1.5 rounded-full ${
                        alert.severity === "high"
                          ? "bg-red-500"
                          : alert.severity === "medium"
                          ? "bg-orange-500"
                          : "bg-green-500"
                      }`}
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between">
                        <h4 className="text-sm font-medium text-slate-900">
                          {alert.type}
                        </h4>
                        <span className="text-xs text-slate-600">
                          {alert.date}
                        </span>
                      </div>
                      <p className="text-sm text-slate-800 mt-1">
                        {alert.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="border-slate-200">
                Export Alert History
              </Button>
              <Button variant="ghost" className="text-slate-600">
                View All Alerts
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
