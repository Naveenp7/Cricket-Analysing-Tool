
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Clock, BarChart2, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface TeamScore {
  name: string;
  score: number;
  wickets: number;
  overs: number;
}

interface MatchCardProps {
  matchType: string;
  teamA: TeamScore;
  teamB: TeamScore;
  venue: string;
  status: string;
  winProbability?: {
    teamA: number;
    teamB: number;
  };
  isLive?: boolean;
}

export function MatchCard({
  matchType,
  teamA,
  teamB,
  venue,
  status,
  winProbability,
  isLive = false,
}: MatchCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <div>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {matchType}
          </CardTitle>
          <p className="text-xs text-muted-foreground">{venue}</p>
        </div>
        <div className="flex items-center gap-2">
          {isLive && (
            <Badge variant="destructive" className="gap-1">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              LIVE
            </Badge>
          )}
          <Badge variant={status === "Completed" ? "secondary" : "outline"}>
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="font-bold">{teamA.name}</div>
            <div className="font-bold">
              {teamA.score}/{teamA.wickets} ({teamA.overs})
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="font-bold">{teamB.name}</div>
            <div className="font-bold">
              {teamB.score}/{teamB.wickets} ({teamB.overs})
            </div>
          </div>
        </div>
      </CardContent>
      {winProbability && (
        <CardFooter className="border-t pt-3 flex flex-col space-y-2">
          <div className="flex justify-between items-center w-full text-xs">
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span>Win Probability</span>
            </div>
            <div className="flex gap-2">
              <span className="text-cricket-blue">{teamA.name}: {winProbability.teamA}%</span>
              <span className="text-cricket-orange">{teamB.name}: {winProbability.teamB}%</span>
            </div>
          </div>
          <div className="relative w-full h-1">
            <Progress 
              value={winProbability.teamA} 
              className="h-1"
            />
            <div 
              className="absolute inset-0 bg-gradient-to-r from-cricket-blue to-cricket-purple h-1 rounded-full" 
              style={{ 
                width: `${winProbability.teamA}%`, 
                maxWidth: '100%' 
              }}
            />
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
