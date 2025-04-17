
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, Legend } from 'recharts';
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

const Analysis = () => {
  // Sample data for run distribution by region (wagon wheel)
  const runDistributionData = [
    { name: "Fine Leg", value: 25 },
    { name: "Deep Square Leg", value: 18 },
    { name: "Deep Midwicket", value: 32 },
    { name: "Long On", value: 24 },
    { name: "Long Off", value: 15 },
    { name: "Extra Cover", value: 28 },
    { name: "Point", value: 20 },
    { name: "Third Man", value: 12 },
  ];

  // Sample data for wicket types
  const wicketTypesData = [
    { name: "Caught", value: 62 },
    { name: "Bowled", value: 18 },
    { name: "LBW", value: 12 },
    { name: "Run Out", value: 5 },
    { name: "Stumped", value: 3 },
  ];

  // Sample data for batting phase analysis
  const battingPhaseData = [
    { name: "Powerplay (1-6)", runs: 54, wickets: 1, runRate: 9.0 },
    { name: "Middle (7-15)", runs: 78, wickets: 2, runRate: 8.7 },
    { name: "Death (16-20)", runs: 55, wickets: 4, runRate: 11.0 },
  ];

  // Sample data for over-by-over run rate
  const overByOverData = [
    { over: 1, runRate: 6, avgRunRate: 7.2 },
    { over: 2, runRate: 12, avgRunRate: 7.5 },
    { over: 3, runRate: 8, avgRunRate: 7.8 },
    { over: 4, runRate: 7, avgRunRate: 8.0 },
    { over: 5, runRate: 9, avgRunRate: 8.2 },
    { over: 6, runRate: 10, avgRunRate: 8.3 },
    { over: 7, runRate: 4, avgRunRate: 8.0 },
    { over: 8, runRate: 7, avgRunRate: 7.9 },
    { over: 9, runRate: 9, avgRunRate: 8.1 },
    { over: 10, runRate: 11, avgRunRate: 8.3 },
    { over: 11, runRate: 8, avgRunRate: 8.4 },
    { over: 12, runRate: 6, avgRunRate: 8.2 },
    { over: 13, runRate: 9, avgRunRate: 8.3 },
    { over: 14, runRate: 10, avgRunRate: 8.5 },
    { over: 15, runRate: 12, avgRunRate: 8.7 },
    { over: 16, runRate: 14, avgRunRate: 9.0 },
    { over: 17, runRate: 11, avgRunRate: 9.2 },
    { over: 18, runRate: 16, avgRunRate: 9.5 },
    { over: 19, runRate: 18, avgRunRate: 9.8 },
    { over: 20, runRate: 15, avgRunRate: 10.0 },
  ];

  // Colors for charts
  const COLORS = ['#1E88E5', '#7E57C2', '#4CAF50', '#FF9800', '#F44336', '#00BCD4', '#795548', '#9E9E9E'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Match Analysis</h1>
          <div className="flex items-center gap-2">
            <Select defaultValue="current">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select Match" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current Match</SelectItem>
                <SelectItem value="ind-eng">India vs England</SelectItem>
                <SelectItem value="aus-sa">Australia vs South Africa</SelectItem>
              </SelectContent>
            </Select>
            <Button>Analyze</Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="batting">Batting Analysis</TabsTrigger>
            <TabsTrigger value="bowling">Bowling Analysis</TabsTrigger>
            <TabsTrigger value="comparison">Team Comparison</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Over-by-Over Run Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={overByOverData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis dataKey="over" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="runRate" 
                          name="Run Rate" 
                          stroke="#8884d8" 
                          fill="url(#colorRunRate)" 
                          activeDot={{ r: 6 }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="avgRunRate" 
                          name="Average" 
                          stroke="#82ca9d" 
                          fill="url(#colorAvg)" 
                          activeDot={{ r: 6 }}
                        />
                        <defs>
                          <linearGradient id="colorRunRate" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                          </linearGradient>
                          <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Batting Phase Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={battingPhaseData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" orientation="left" stroke="#1E88E5" />
                        <YAxis yAxisId="right" orientation="right" stroke="#FF9800" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="runs" name="Runs" fill="#1E88E5" />
                        <Bar yAxisId="right" dataKey="wickets" name="Wickets" fill="#FF9800" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Run Distribution (Wagon Wheel)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={runDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={90}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {runDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} runs`, 'Runs']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Wicket Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={wicketTypesData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={90}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {wicketTypesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} wickets`, 'Wickets']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="batting">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Batsman Filter</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Select Batsman</label>
                      <Select defaultValue="virat">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Batsman" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="virat">Virat Kohli</SelectItem>
                          <SelectItem value="rohit">Rohit Sharma</SelectItem>
                          <SelectItem value="hardik">Hardik Pandya</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Match Type</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Match Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Matches</SelectItem>
                          <SelectItem value="t20">T20 Only</SelectItem>
                          <SelectItem value="odi">ODI Only</SelectItem>
                          <SelectItem value="test">Test Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date Range</label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input type="date" placeholder="From" />
                        <Input type="date" placeholder="To" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm font-medium">Minimum Runs</label>
                        <span className="text-sm">50</span>
                      </div>
                      <Slider defaultValue={[50]} max={200} step={5} />
                    </div>
                    
                    <Button className="w-full">Apply Filters</Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="col-span-12 lg:col-span-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Virat Kohli - Batting Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">Select a batsman to view detailed analysis</p>
                    <Button>Generate Analysis</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="bowling">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Bowling Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Select a bowler or team to view detailed bowling performance analysis.</p>
                <Button>Generate Bowling Analysis</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="comparison">
            <Card>
              <CardHeader>
                <CardTitle>Team Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Compare team performance across different aspects of the game.</p>
                <div className="grid grid-cols-2 gap-4">
                  <Select defaultValue="india">
                    <SelectTrigger>
                      <SelectValue placeholder="Team 1" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="australia">Australia</SelectItem>
                      <SelectItem value="england">England</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select defaultValue="australia">
                    <SelectTrigger>
                      <SelectValue placeholder="Team 2" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="australia">Australia</SelectItem>
                      <SelectItem value="england">England</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="mt-4">Compare Teams</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Analysis;
