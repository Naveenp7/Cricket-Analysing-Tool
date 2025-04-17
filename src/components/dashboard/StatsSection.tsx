
import { PlayerStatsCard } from "../statistics/PlayerStatsCard";

export function StatsSection() {
  // Sample player stats
  const playerStats = {
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
  };

  return <PlayerStatsCard {...playerStats} />;
}
