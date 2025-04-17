
import { useState } from "react";
import { MatchCard } from "../match-tracker/MatchCard";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { LiveMatch } from "@/services/liveDataService";
import { Loader2 } from "lucide-react";

interface MatchesSectionProps {
  liveMatches?: LiveMatch[];
}

export function MatchesSection({ liveMatches = [] }: MatchesSectionProps) {
  // Sample match data for upcoming and recent matches
  const upcomingMatches = [
    {
      matchType: "Test Series",
      teamA: { name: "New Zealand", score: 0, wickets: 0, overs: 0 },
      teamB: { name: "West Indies", score: 0, wickets: 0, overs: 0 },
      venue: "Basin Reserve, Wellington",
      status: "Starts in 2 days",
      isLive: false,
    },
    {
      matchType: "T20 Series",
      teamA: { name: "Pakistan", score: 0, wickets: 0, overs: 0 },
      teamB: { name: "Sri Lanka", score: 0, wickets: 0, overs: 0 },
      venue: "Gaddafi Stadium, Lahore",
      status: "Tomorrow",
      isLive: false,
    }
  ];

  const recentMatches = [
    {
      matchType: "ODI World Cup 2023",
      teamA: { name: "India", score: 352, wickets: 5, overs: 50 },
      teamB: { name: "Australia", score: 320, wickets: 10, overs: 48.2 },
      venue: "Wankhede Stadium, Mumbai",
      status: "Completed",
      isLive: false,
    },
    {
      matchType: "Test Match",
      teamA: { name: "England", score: 425, wickets: 10, overs: 112.5 },
      teamB: { name: "South Africa", score: 301, wickets: 10, overs: 98.3 },
      venue: "Lord's, London",
      status: "Completed",
      isLive: false,
    }
  ];

  return (
    <Card className="col-span-12 md:col-span-8">
      <CardHeader className="pb-2">
        <CardTitle>Matches</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="live">
          <TabsList className="mb-4">
            <TabsTrigger value="live">
              Live <span className="ml-1 bg-red-500 text-white w-5 h-5 rounded-full inline-flex items-center justify-center text-xs">{liveMatches.length}</span>
            </TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>
          <TabsContent value="live" className="space-y-4">
            {liveMatches.length > 0 ? (
              liveMatches.map((match, index) => (
                <MatchCard key={`live-${index}`} {...match} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin mb-2" />
                <p>Loading live matches...</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingMatches.map((match, index) => (
              <MatchCard key={`upcoming-${index}`} {...match} />
            ))}
          </TabsContent>
          <TabsContent value="recent" className="space-y-4">
            {recentMatches.map((match, index) => (
              <MatchCard key={`recent-${index}`} {...match} />
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
