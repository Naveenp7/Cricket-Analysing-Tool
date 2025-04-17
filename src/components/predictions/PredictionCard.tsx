
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import { TrendingUp, TrendingDown, LineChart, BarChart3, PieChart } from "lucide-react";

interface TeamPrediction {
  name: string;
  winProbability: number;
  keyFactor?: string;
}

interface PredictionCardProps {
  matchTitle: string;
  venue: string;
  teamA: TeamPrediction;
  teamB: TeamPrediction;
  predictedScore?: {
    battingTeam: string;
    minScore: number;
    maxScore: number;
    predictedWickets: number;
  };
}

export function PredictionCard({
  matchTitle,
  venue,
  teamA,
  teamB,
  predictedScore,
}: PredictionCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base flex items-center gap-1">
              <LineChart className="h-4 w-4 text-cricket-purple" />
              Match Prediction
            </CardTitle>
            <p className="text-xs text-muted-foreground">{matchTitle}</p>
            <p className="text-xs text-muted-foreground">{venue}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Win Probability</span>
            <div className="flex gap-4">
              <span className="flex items-center gap-1">
                <span className={teamA.winProbability > teamB.winProbability ? "text-cricket-green" : "text-muted-foreground"}>
                  {teamA.name}
                </span>
                <span className="font-medium">
                  {teamA.winProbability}%
                </span>
              </span>
              <span className="flex items-center gap-1">
                <span className={teamB.winProbability > teamA.winProbability ? "text-cricket-green" : "text-muted-foreground"}>
                  {teamB.name}
                </span>
                <span className="font-medium">
                  {teamB.winProbability}%
                </span>
              </span>
            </div>
          </div>
          <div className="relative w-full h-2">
            <Progress 
              value={teamA.winProbability} 
              className="h-2"
            />
            <div 
              className={`absolute inset-0 h-2 rounded-full ${
                teamA.winProbability > teamB.winProbability 
                  ? "bg-cricket-green" 
                  : "bg-cricket-purple"
              }`} 
              style={{ 
                width: `${teamA.winProbability}%`,
                maxWidth: '100%'
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className={`h-4 w-4 ${teamA.winProbability > teamB.winProbability ? "text-cricket-green" : "text-cricket-purple"}`} />
              <span className="font-medium">{teamA.name}</span>
            </div>
            <p className="text-xs text-muted-foreground">Key factor: {teamA.keyFactor || "Strong batting performance"}</p>
          </div>
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className={`h-4 w-4 ${teamB.winProbability > teamA.winProbability ? "text-cricket-green" : "text-cricket-purple"}`} />
              <span className="font-medium">{teamB.name}</span>
            </div>
            <p className="text-xs text-muted-foreground">Key factor: {teamB.keyFactor || "Home advantage"}</p>
          </div>
        </div>

        {predictedScore && (
          <>
            <Separator />
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-4 w-4 text-cricket-blue" />
                <span className="text-sm font-medium">Projected Score</span>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex justify-between text-sm">
                  <div>{predictedScore.battingTeam}</div>
                  <div className="font-medium">
                    {predictedScore.minScore} - {predictedScore.maxScore} / {predictedScore.predictedWickets}
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Based on current run rate, pitch conditions and historical data
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
