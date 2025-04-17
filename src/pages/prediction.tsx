
import { Header } from "@/components/layout/Header";
import { PredictionCard } from "@/components/predictions/PredictionCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

const Prediction = () => {
  // Sample win probability history
  const winProbabilityData = [
    { over: 1, teamA: 50, teamB: 50 },
    { over: 2, teamA: 45, teamB: 55 },
    { over: 3, teamA: 40, teamB: 60 },
    { over: 4, teamA: 42, teamB: 58 },
    { over: 5, teamA: 38, teamB: 62 },
    { over: 6, teamA: 35, teamB: 65 },
    { over: 7, teamA: 32, teamB: 68 },
    { over: 8, teamA: 30, teamB: 70 },
    { over: 9, teamA: 25, teamB: 75 },
    { over: 10, teamA: 30, teamB: 70 },
    { over: 11, teamA: 32, teamB: 68 },
    { over: 12, teamA: 35, teamB: 65 },
    { over: 13, teamA: 40, teamB: 60 },
    { over: 14, teamA: 45, teamB: 55 },
    { over: 15, teamA: 50, teamB: 50 },
    { over: 16, teamA: 55, teamB: 45 },
    { over: 17, teamA: 60, teamB: 40 },
    { over: 18, teamA: 65, teamB: 35 },
  ];

  // Sample score prediction data
  const scorePredictionData = [
    { over: 10, predicted: 85, actual: 82 },
    { over: 11, predicted: 94, actual: 91 },
    { over: 12, predicted: 103, actual: 99 },
    { over: 13, predicted: 113, actual: 110 },
    { over: 14, predicted: 124, actual: 118 },
    { over: 15, predicted: 137, actual: 131 },
    { over: 16, predicted: 150, actual: 142 },
    { over: 17, predicted: 164, actual: 156 },
    { over: 18, predicted: 179, actual: null },
    { over: 19, predicted: 195, actual: null },
    { over: 20, predicted: 212, actual: null },
  ];

  // Sample predictions
  const matchPredictions = [
    {
      matchTitle: "T20 World Cup 2023 - Semi-Final",
      venue: "Melbourne Cricket Ground",
      teamA: {
        name: "India",
        winProbability: 65,
        keyFactor: "Strong batting lineup",
      },
      teamB: {
        name: "England",
        winProbability: 35,
        keyFactor: "Effective spin bowlers",
      },
      predictedScore: {
        battingTeam: "England",
        minScore: 170,
        maxScore: 185,
        predictedWickets: 7,
      },
    },
    {
      matchTitle: "ODI Series - Match 3",
      venue: "Sydney Cricket Ground",
      teamA: {
        name: "Australia",
        winProbability: 55,
        keyFactor: "Home advantage",
      },
      teamB: {
        name: "South Africa",
        winProbability: 45,
        keyFactor: "Recent winning streak",
      },
      predictedScore: {
        battingTeam: "Australia",
        minScore: 280,
        maxScore: 310,
        predictedWickets: 6,
      },
    },
  ];

  // Key factors that influence predictions
  const keyFactors = [
    { factor: "Team Form", importance: "High", description: "Recent team performance in last 5 matches" },
    { factor: "Head-to-Head", importance: "Medium", description: "Historical match results between the two teams" },
    { factor: "Venue Statistics", importance: "High", description: "Team performance at the current venue" },
    { factor: "Toss Advantage", importance: "Medium", description: "Impact of winning the toss at this venue" },
    { factor: "Player Form", importance: "High", description: "Current form of key players in both teams" },
    { factor: "Weather Conditions", importance: "Medium", description: "Expected impact of weather on the match" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Match Predictions</h1>
          <div className="flex items-center gap-2">
            <Select defaultValue="t20">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="t20">T20</SelectItem>
                <SelectItem value="odi">ODI</SelectItem>
                <SelectItem value="test">Test</SelectItem>
              </SelectContent>
            </Select>
            <Button>Refresh Data</Button>
          </div>
        </div>
        
        <Tabs defaultValue="live">
          <TabsList className="mb-4">
            <TabsTrigger value="live">Live Predictions</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Matches</TabsTrigger>
            <TabsTrigger value="insights">Prediction Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="live">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="col-span-1 lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Live Win Probability</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={winProbabilityData}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                          <XAxis dataKey="over" label={{ value: 'Overs', position: 'bottom', offset: 0 }} />
                          <YAxis label={{ value: 'Win Probability (%)', angle: -90, position: 'left' }} />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="teamA" stroke="#1E88E5" name="India" strokeWidth={2} />
                          <Line type="monotone" dataKey="teamB" stroke="#7E57C2" name="England" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-cricket-green" />
                          <span className="font-medium">Key Moment</span>
                        </div>
                        <p className="text-sm">India's win probability increased by 20% after the 15th over due to two consecutive sixes.</p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingDown className="h-4 w-4 text-cricket-red" />
                          <span className="font-medium">Risk Factor</span>
                        </div>
                        <p className="text-sm">England's win probability may decrease further if they lose another wicket in the next 2 overs.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Score Projection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={scorePredictionData}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                          <XAxis dataKey="over" label={{ value: 'Overs', position: 'bottom', offset: 0 }} />
                          <YAxis label={{ value: 'Score', angle: -90, position: 'left' }} />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="predicted" stroke="#4CAF50" name="Predicted Score" strokeWidth={2} />
                          <Line type="monotone" dataKey="actual" stroke="#FF9800" name="Actual Score" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-cricket-orange" />
                        <span className="font-medium">Projection Accuracy</span>
                      </div>
                      <p className="text-sm">Current projection has 92% accuracy based on historical data and current match conditions. Projected final score: 179-195.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                {matchPredictions.map((prediction, index) => (
                  <PredictionCard key={index} {...prediction} />
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="upcoming">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {matchPredictions.map((prediction, index) => (
                <PredictionCard key={index} {...prediction} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="insights">
            <Card>
              <CardHeader>
                <CardTitle>Prediction Model Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Our prediction engine uses machine learning algorithms trained on historical cricket data to generate match predictions.</p>
                
                <h3 className="font-medium text-lg mb-2">Key Factors</h3>
                <div className="space-y-4">
                  {keyFactors.map((factor, index) => (
                    <div key={index} className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{factor.factor}</span>
                        <span className={`text-sm ${
                          factor.importance === 'High' ? 'text-cricket-green' : 
                          factor.importance === 'Medium' ? 'text-cricket-orange' : 
                          'text-cricket-red'
                        }`}>
                          Importance: {factor.importance}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{factor.description}</p>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-6" />
                
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-lg">Model Accuracy</h3>
                    <p className="text-sm text-muted-foreground">Based on last 100 predictions</p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-cricket-green">87%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Prediction;
