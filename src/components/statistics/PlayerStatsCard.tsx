
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { BarChart3, LineChart } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface PlayerStats {
  batting: {
    matches: number;
    innings: number;
    runs: number;
    average: number;
    strikeRate: number;
    highest: number;
    hundreds: number;
    fifties: number;
    fours: number;
    sixes: number;
  };
  bowling: {
    matches: number;
    innings: number;
    wickets: number;
    average: number;
    economy: number;
    bestFigures: string;
    fiveWickets: number;
  };
  recentForm: {
    lastFiveInnings: number[];
  };
}

interface PlayerStatsCardProps {
  playerName: string;
  playerRole: string;
  playerTeam: string;
  playerAvatar?: string;
  stats: PlayerStats;
}

export function PlayerStatsCard({
  playerName,
  playerRole,
  playerTeam,
  playerAvatar,
  stats
}: PlayerStatsCardProps) {
  // Generate batting data for chart
  const battingData = [
    { name: 'Matches', value: stats.batting.matches },
    { name: 'Runs', value: stats.batting.runs },
    { name: 'Average', value: stats.batting.average },
    { name: 'SR', value: stats.batting.strikeRate },
    { name: '100s', value: stats.batting.hundreds },
    { name: '50s', value: stats.batting.fifties },
  ];
  
  // Generate bowling data for chart
  const bowlingData = [
    { name: 'Matches', value: stats.bowling.matches },
    { name: 'Wickets', value: stats.bowling.wickets },
    { name: 'Average', value: stats.bowling.average },
    { name: 'Economy', value: stats.bowling.economy },
    { name: '5W', value: stats.bowling.fiveWickets },
  ];
  
  // Form data for line chart
  const formData = stats.recentForm.lastFiveInnings.map((runs, index) => ({
    inning: `Inning ${index + 1}`,
    runs: runs
  }));

  // Colors for charts
  const COLORS = ['#1E88E5', '#7E57C2', '#4CAF50', '#FF9800', '#F44336'];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="w-12 h-12">
          {playerAvatar ? (
            <AvatarImage src={playerAvatar} alt={playerName} />
          ) : (
            <AvatarFallback>{playerName.substring(0, 2).toUpperCase()}</AvatarFallback>
          )}
        </Avatar>
        <div>
          <CardTitle>{playerName}</CardTitle>
          <div className="flex gap-2 text-sm text-muted-foreground">
            <span>{playerRole}</span>
            <span>•</span>
            <span>{playerTeam}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="batting">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="batting">Batting</TabsTrigger>
            <TabsTrigger value="bowling">Bowling</TabsTrigger>
            <TabsTrigger value="form">Form</TabsTrigger>
          </TabsList>
          
          <TabsContent value="batting" className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Matches</span>
                  <span className="font-medium">{stats.batting.matches}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Innings</span>
                  <span className="font-medium">{stats.batting.innings}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Runs</span>
                  <span className="font-medium">{stats.batting.runs}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Average</span>
                  <span className="font-medium">{stats.batting.average}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Strike Rate</span>
                  <span className="font-medium">{stats.batting.strikeRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Highest</span>
                  <span className="font-medium">{stats.batting.highest}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">100s / 50s</span>
                  <span className="font-medium">{stats.batting.hundreds} / {stats.batting.fifties}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">4s / 6s</span>
                  <span className="font-medium">{stats.batting.fours} / {stats.batting.sixes}</span>
                </div>
              </div>
            </div>
            
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={battingData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#1E88E5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="bowling" className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Matches</span>
                  <span className="font-medium">{stats.bowling.matches}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Innings</span>
                  <span className="font-medium">{stats.bowling.innings}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Wickets</span>
                  <span className="font-medium">{stats.bowling.wickets}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Average</span>
                  <span className="font-medium">{stats.bowling.average}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Economy</span>
                  <span className="font-medium">{stats.bowling.economy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Best Figures</span>
                  <span className="font-medium">{stats.bowling.bestFigures}</span>
                </div>
              </div>
            </div>
            
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bowlingData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#7E57C2" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="form">
            <div className="h-52 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={formData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="inning" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="runs" fill="#4CAF50" radius={[4, 4, 0, 0]}>
                    {formData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-4 text-sm text-muted-foreground">
              Last 5 innings performance
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
