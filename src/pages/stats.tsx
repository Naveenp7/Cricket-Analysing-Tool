
import { Header } from "@/components/layout/Header";
import { PlayerStatsCard } from "@/components/statistics/PlayerStatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Stats = () => {
  // Sample top batters data
  const topBattersData = [
    { name: "V Kohli", value: 12344, team: "India" },
    { name: "R Sharma", value: 10510, team: "India" },
    { name: "J Root", value: 10458, team: "England" },
    { name: "K Williamson", value: 9605, team: "New Zealand" },
    { name: "S Smith", value: 9278, team: "Australia" },
  ];
  
  // Sample top bowlers data
  const topBowlersData = [
    { name: "J Anderson", value: 685, team: "England" },
    { name: "R Ashwin", value: 582, team: "India" },
    { name: "N Lyon", value: 496, team: "Australia" },
    { name: "T Boult", value: 452, team: "New Zealand" },
    { name: "K Rabada", value: 419, team: "South Africa" },
  ];

  // Sample cricket format data for pie chart
  const formatData = [
    { name: "Test", value: 2438 },
    { name: "ODI", value: 4273 },
    { name: "T20I", value: 1853 },
  ];
  
  // Sample team performance data
  const teamPerformanceData = [
    { name: "India", wins: 157, losses: 68, draws: 12 },
    { name: "Australia", wins: 145, losses: 72, draws: 10 },
    { name: "England", wins: 139, losses: 78, draws: 15 },
    { name: "South Africa", wins: 132, losses: 82, draws: 8 },
    { name: "New Zealand", wins: 128, losses: 85, draws: 9 },
  ];

  // Sample for player cards
  const topPlayers = [
    {
      playerName: "Virat Kohli",
      playerRole: "Batsman",
      playerTeam: "India",
      stats: {
        batting: {
          matches: 254,
          innings: 245,
          runs: 12344,
          average: 57.68,
          strikeRate: 93.25,
          highest: 183,
          hundreds: 43,
          fifties: 64,
          fours: 1200,
          sixes: 145,
        },
        bowling: {
          matches: 254,
          innings: 50,
          wickets: 4,
          average: 164.25,
          economy: 6.22,
          bestFigures: "1/15",
          fiveWickets: 0,
        },
        recentForm: {
          lastFiveInnings: [82, 56, 0, 122, 45],
        },
      },
    },
    {
      playerName: "Jasprit Bumrah",
      playerRole: "Bowler",
      playerTeam: "India",
      stats: {
        batting: {
          matches: 128,
          innings: 45,
          runs: 156,
          average: 6.24,
          strikeRate: 62.15,
          highest: 16,
          hundreds: 0,
          fifties: 0,
          fours: 12,
          sixes: 5,
        },
        bowling: {
          matches: 128,
          innings: 126,
          wickets: 245,
          average: 21.85,
          economy: 4.22,
          bestFigures: "6/32",
          fiveWickets: 8,
        },
        recentForm: {
          lastFiveInnings: [3, 4, 0, 2, 5],
        },
      },
    },
  ];
  
  const COLORS = ['#1E88E5', '#7E57C2', '#4CAF50', '#FF9800', '#F44336'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Cricket Statistics</h1>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search player or team..." className="pl-8" />
          </div>
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="batting">Batting</TabsTrigger>
            <TabsTrigger value="bowling">Bowling</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="players">Players</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Run Scorers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={topBattersData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" width={80} />
                        <Tooltip formatter={(value) => [`${value} runs`, 'Runs']} />
                        <Bar dataKey="value" fill="#1E88E5">
                          {topBattersData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Top Wicket Takers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={topBowlersData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" width={80} />
                        <Tooltip formatter={(value) => [`${value} wickets`, 'Wickets']} />
                        <Bar dataKey="value" fill="#7E57C2">
                          {topBowlersData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Match Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={formatData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          dataKey="value"
                        >
                          {formatData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} matches`, 'Matches']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-1 md:col-span-2">
                <CardHeader>
                  <CardTitle>Team Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={teamPerformanceData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="wins" fill="#4CAF50" name="Wins" />
                        <Bar dataKey="losses" fill="#F44336" name="Losses" />
                        <Bar dataKey="draws" fill="#FFC107" name="Draws" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="players">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {topPlayers.map((player, index) => (
                <PlayerStatsCard key={index} {...player} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="batting">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Batting Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Select players or teams to view detailed batting statistics.</p>
                <Button>Load Batting Statistics</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="bowling">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Bowling Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Select players or teams to view detailed bowling statistics.</p>
                <Button>Load Bowling Statistics</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="teams">
            <Card>
              <CardHeader>
                <CardTitle>Team Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Select teams to compare their historical performance.</p>
                <Button>Compare Teams</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Stats;
