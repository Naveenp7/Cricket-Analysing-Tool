
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { ArrowUp, Circle, Clock } from "lucide-react";

interface BatsmanStats {
  name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  isStriker?: boolean;
}

interface BowlerStats {
  name: string;
  overs: number;
  maidens: number;
  runs: number;
  wickets: number;
  economy: number;
}

interface LastBallInfo {
  runs?: number;
  isWicket?: boolean;
  isBoundary?: boolean;
  isSix?: boolean;
  isExtra?: boolean;
  extraType?: string;
  extraRuns?: number;
  description?: string;
}

interface LiveScoreCardProps {
  battingTeam: string;
  bowlingTeam: string;
  score: number;
  wickets: number;
  overs: number;
  runRate: number;
  requiredRunRate?: number;
  target?: number;
  batsmen: BatsmanStats[];
  bowlers: BowlerStats[];
  lastSixBalls?: LastBallInfo[];
  partnership?: {
    runs: number;
    balls: number;
  };
}

export function LiveScoreCard({
  battingTeam,
  bowlingTeam,
  score,
  wickets,
  overs,
  runRate,
  requiredRunRate,
  target,
  batsmen,
  bowlers,
  lastSixBalls = [],
  partnership,
}: LiveScoreCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2 bg-cricket-green text-white">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Circle className="h-3 w-3 fill-red-500 animate-pulse" />
              {battingTeam}
            </CardTitle>
            <p className="text-sm opacity-90">{bowlingTeam} bowling</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{score}/{wickets}</div>
            <div className="text-sm opacity-90">{overs} overs</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Batsmen section */}
          <div>
            <h3 className="font-medium mb-2 text-sm">Batsmen</h3>
            <div className="space-y-2">
              <div className="grid grid-cols-12 text-xs text-muted-foreground">
                <div className="col-span-4">Batter</div>
                <div className="col-span-2 text-right">R</div>
                <div className="col-span-2 text-right">B</div>
                <div className="col-span-1 text-right">4s</div>
                <div className="col-span-1 text-right">6s</div>
                <div className="col-span-2 text-right">SR</div>
              </div>
              
              {batsmen.map((batsman, index) => (
                <div key={index} className="grid grid-cols-12 text-sm">
                  <div className="col-span-4 flex items-center">
                    {batsman.isStriker && (
                      <ArrowUp className="h-3 w-3 mr-1 inline" />
                    )}
                    {batsman.name}
                  </div>
                  <div className="col-span-2 text-right font-medium">{batsman.runs}</div>
                  <div className="col-span-2 text-right text-muted-foreground">{batsman.balls}</div>
                  <div className="col-span-1 text-right text-muted-foreground">{batsman.fours}</div>
                  <div className="col-span-1 text-right text-muted-foreground">{batsman.sixes}</div>
                  <div className="col-span-2 text-right">{batsman.strikeRate}</div>
                </div>
              ))}
            </div>

            {partnership && (
              <div className="mt-4 text-sm">
                <span className="font-medium">Partnership:</span> {partnership.runs} runs ({partnership.balls} balls)
              </div>
            )}
          </div>

          {/* Bowlers section */}
          <div>
            <h3 className="font-medium mb-2 text-sm">Bowlers</h3>
            <div className="space-y-2">
              <div className="grid grid-cols-12 text-xs text-muted-foreground">
                <div className="col-span-4">Bowler</div>
                <div className="col-span-2 text-right">O</div>
                <div className="col-span-1 text-right">M</div>
                <div className="col-span-2 text-right">R</div>
                <div className="col-span-1 text-right">W</div>
                <div className="col-span-2 text-right">ECO</div>
              </div>
              
              {bowlers.map((bowler, index) => (
                <div key={index} className="grid grid-cols-12 text-sm">
                  <div className="col-span-4">{bowler.name}</div>
                  <div className="col-span-2 text-right">{bowler.overs}</div>
                  <div className="col-span-1 text-right">{bowler.maidens}</div>
                  <div className="col-span-2 text-right">{bowler.runs}</div>
                  <div className="col-span-1 text-right font-medium">{bowler.wickets}</div>
                  <div className="col-span-2 text-right">{bowler.economy}</div>
                </div>
              ))}
            </div>

            {/* Target info */}
            {target && (
              <div className="mt-4 p-2 bg-muted rounded-md text-sm">
                <div className="flex justify-between">
                  <span>Target</span>
                  <span className="font-medium">{target}</span>
                </div>
                <div className="flex justify-between">
                  <span>Required</span>
                  <span className="font-medium">{target - score} runs ({(50 - Math.floor(overs)) * 6 - (overs % 1) * 10} balls)</span>
                </div>
                <div className="flex justify-between">
                  <span>RR</span>
                  <span className="font-medium">{runRate.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Required RR</span>
                  <span className="font-medium">{requiredRunRate?.toFixed(2) || 0}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Last few balls */}
        {lastSixBalls && lastSixBalls.length > 0 && (
          <div className="mt-4">
            <h3 className="font-medium mb-2 text-sm">Last balls</h3>
            <div className="flex space-x-2">
              {lastSixBalls.map((ball, index) => {
                let bgColor = "bg-gray-100";
                let textColor = "text-gray-700";
                
                if (ball.isWicket) {
                  bgColor = "bg-cricket-red";
                  textColor = "text-white";
                } else if (ball.isSix) {
                  bgColor = "bg-cricket-purple";
                  textColor = "text-white";
                } else if (ball.isBoundary) {
                  bgColor = "bg-cricket-blue";
                  textColor = "text-white";
                } else if (ball.isExtra) {
                  bgColor = "bg-cricket-yellow";
                  textColor = "text-gray-700";
                }

                return (
                  <div
                    key={index}
                    className={`w-8 h-8 flex items-center justify-center rounded-full ${bgColor} ${textColor}`}
                    title={ball.description || ''}
                  >
                    {ball.isWicket ? 'W' : ball.runs}
                    {ball.isExtra && <sup className="text-[8px]">{ball.extraType}</sup>}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
