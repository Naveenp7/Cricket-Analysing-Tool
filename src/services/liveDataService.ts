import { toast } from "sonner";

export interface LiveMatch {
  matchType: string;
  teamA: TeamScore;
  teamB: TeamScore;
  venue: string;
  status: string;
  winProbability?: {
    teamA: number;
    teamB: number;
  };
  isLive: boolean;
}

export interface TeamScore {
  name: string;
  score: number;
  wickets: number;
  overs: number;
}

export interface LiveScoreData {
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

export interface MatchPrediction {
  matchTitle: string;
  venue: string;
  teamA: {
    name: string;
    winProbability: number;
    keyFactor: string;
  };
  teamB: {
    name: string;
    winProbability: number;
    keyFactor: string;
  };
  predictedScore: {
    battingTeam: string;
    minScore: number;
    maxScore: number;
    predictedWickets: number;
  };
}

const DEFAULT_POLLING_INTERVAL = 5000;

class LiveDataService {
  private pollingInterval: number = DEFAULT_POLLING_INTERVAL;
  private liveMatchesTimer: number | null = null;
  private liveScoreTimer: number | null = null;
  private predictionTimer: number | null = null;
  
  private listeners: {
    liveMatches: ((matches: LiveMatch[]) => void)[];
    liveScore: ((scoreData: LiveScoreData) => void)[];
    predictions: ((predictions: MatchPrediction[]) => void)[];
  } = {
    liveMatches: [],
    liveScore: [],
    predictions: [],
  };

  constructor() {
    console.log("LiveDataService initialized");
  }

  setPollingInterval(milliseconds: number): void {
    this.pollingInterval = milliseconds;
    console.log(`Polling interval set to ${milliseconds}ms`);
    
    this.restartActivePolling();
  }

  private restartActivePolling(): void {
    if (this.liveMatchesTimer) {
      this.stopLiveMatchesPolling();
      this.startLiveMatchesPolling();
    }
    
    if (this.liveScoreTimer) {
      this.stopLiveScorePolling();
      this.startLiveScorePolling();
    }
    
    if (this.predictionTimer) {
      this.stopPredictionPolling();
      this.startPredictionPolling();
    }
  }

  startLiveMatchesPolling(): void {
    if (this.liveMatchesTimer) {
      return;
    }

    this.fetchLiveMatches();
    
    this.liveMatchesTimer = window.setInterval(() => {
      this.fetchLiveMatches();
    }, this.pollingInterval);
    
    console.log("Started live matches polling");
  }

  stopLiveMatchesPolling(): void {
    if (this.liveMatchesTimer) {
      window.clearInterval(this.liveMatchesTimer);
      this.liveMatchesTimer = null;
      console.log("Stopped live matches polling");
    }
  }

  startLiveScorePolling(): void {
    if (this.liveScoreTimer) {
      return;
    }

    this.fetchLiveScore();
    
    this.liveScoreTimer = window.setInterval(() => {
      this.fetchLiveScore();
    }, this.pollingInterval);
    
    console.log("Started live score polling");
  }

  stopLiveScorePolling(): void {
    if (this.liveScoreTimer) {
      window.clearInterval(this.liveScoreTimer);
      this.liveScoreTimer = null;
      console.log("Stopped live score polling");
    }
  }

  startPredictionPolling(): void {
    if (this.predictionTimer) {
      return;
    }

    this.fetchPredictions();
    
    this.predictionTimer = window.setInterval(() => {
      this.fetchPredictions();
    }, this.pollingInterval * 2);
    
    console.log("Started prediction polling");
  }

  stopPredictionPolling(): void {
    if (this.predictionTimer) {
      window.clearInterval(this.predictionTimer);
      this.predictionTimer = null;
      console.log("Stopped prediction polling");
    }
  }

  subscribeLiveMatches(callback: (matches: LiveMatch[]) => void): () => void {
    this.listeners.liveMatches.push(callback);
    
    if (this.listeners.liveMatches.length === 1) {
      this.startLiveMatchesPolling();
    }
    
    return () => {
      this.listeners.liveMatches = this.listeners.liveMatches.filter(cb => cb !== callback);
      
      if (this.listeners.liveMatches.length === 0) {
        this.stopLiveMatchesPolling();
      }
    };
  }

  subscribeLiveScore(callback: (scoreData: LiveScoreData) => void): () => void {
    this.listeners.liveScore.push(callback);
    
    if (this.listeners.liveScore.length === 1) {
      this.startLiveScorePolling();
    }
    
    return () => {
      this.listeners.liveScore = this.listeners.liveScore.filter(cb => cb !== callback);
      
      if (this.listeners.liveScore.length === 0) {
        this.stopLiveScorePolling();
      }
    };
  }

  subscribePredictions(callback: (predictions: MatchPrediction[]) => void): () => void {
    this.listeners.predictions.push(callback);
    
    if (this.listeners.predictions.length === 1) {
      this.startPredictionPolling();
    }
    
    return () => {
      this.listeners.predictions = this.listeners.predictions.filter(cb => cb !== callback);
      
      if (this.listeners.predictions.length === 0) {
        this.stopPredictionPolling();
      }
    };
  }

  private async fetchLiveMatches(): Promise<void> {
    try {
      console.log("Fetching live matches data...");
      
      const mockLiveMatches: LiveMatch[] = this.getMockLiveMatches();
      
      this.listeners.liveMatches.forEach(callback => {
        callback(mockLiveMatches);
      });
    } catch (error) {
      console.error("Error fetching live matches:", error);
      toast.error("Failed to update live matches data");
    }
  }

  private async fetchLiveScore(): Promise<void> {
    try {
      console.log("Fetching live score data...");
      
      const mockLiveScore: LiveScoreData = this.getMockLiveScore();
      
      this.listeners.liveScore.forEach(callback => {
        callback(mockLiveScore);
      });
    } catch (error) {
      console.error("Error fetching live score:", error);
      toast.error("Failed to update live score data");
    }
  }

  private async fetchPredictions(): Promise<void> {
    try {
      console.log("Fetching prediction data...");
      
      const mockPredictions: MatchPrediction[] = this.getMockPredictions();
      
      this.listeners.predictions.forEach(callback => {
        callback(mockPredictions);
      });
    } catch (error) {
      console.error("Error fetching predictions:", error);
      toast.error("Failed to update prediction data");
    }
  }

  private getMockLiveMatches(): LiveMatch[] {
    const liveMatches: LiveMatch[] = [
      {
        matchType: "IPL 2025 - Match 24",
        teamA: { 
          name: "Mumbai Indians", 
          score: 167 + Math.floor(Math.random() * 3), 
          wickets: Math.random() > 0.9 ? 5 : 4,
          overs: Math.min(20, 17.2 + Math.random() * 0.4)
        },
        teamB: { name: "Chennai Super Kings", score: 132 + Math.floor(Math.random() * 4), wickets: 6, overs: Math.min(20, 16.4 + Math.random() * 0.2) },
        venue: "Wankhede Stadium, Mumbai",
        status: "In Progress",
        winProbability: { 
          teamA: 65 + Math.floor(Math.random() * 5) - 2,
          teamB: 35 + Math.floor(Math.random() * 5) - 2
        },
        isLive: true,
      },
      {
        matchType: "IPL 2025 - Match 25",
        teamA: { name: "Royal Challengers Bangalore", score: 198 + Math.floor(Math.random() * 3), wickets: 7, overs: 20 },
        teamB: { name: "Lucknow Super Giants", score: 87 + Math.floor(Math.random() * 3), wickets: 3, overs: Math.min(20, 9.5 + Math.random() * 0.3) },
        venue: "M. Chinnaswamy Stadium, Bangalore",
        status: "In Progress",
        winProbability: { 
          teamA: 75 + Math.floor(Math.random() * 3) - 1, 
          teamB: 25 + Math.floor(Math.random() * 3) - 1 
        },
        isLive: true,
      }
    ];

    liveMatches.forEach(match => {
      if (match.winProbability) {
        const total = match.winProbability.teamA + match.winProbability.teamB;
        match.winProbability.teamA = Math.round((match.winProbability.teamA / total) * 100);
        match.winProbability.teamB = 100 - match.winProbability.teamA;
      }
    });

    return liveMatches;
  }

  private getMockLiveScore(): LiveScoreData {
    const baseData: LiveScoreData = {
      battingTeam: "Mumbai Indians",
      bowlingTeam: "Chennai Super Kings",
      score: 167 + Math.floor(Math.random() * 4),
      wickets: 4,
      overs: Math.min(20, 17.2 + Math.random() * 0.2),
      runRate: 9.2 + (Math.random() * 0.4 - 0.2),
      requiredRunRate: null,
      target: null,
      batsmen: [
        {
          name: "Rohit Sharma",
          runs: 78 + Math.floor(Math.random() * 3),
          balls: 52 + Math.floor(Math.random() * 2),
          fours: 7,
          sixes: 3,
          strikeRate: 150.0 + (Math.random() * 2 - 1),
          isStriker: true,
        },
        {
          name: "Hardik Pandya",
          runs: 32 + Math.floor(Math.random() * 2),
          balls: 21 + Math.floor(Math.random() * 2),
          fours: 2,
          sixes: 2,
          strikeRate: 152.4 + (Math.random() * 2 - 1),
          isStriker: false,
        },
      ],
      bowlers: [
        {
          name: "Ravindra Jadeja",
          overs: Math.min(4, 3.2 + (Math.random() * 0.2)),
          maidens: 0,
          runs: 32 + Math.floor(Math.random() * 2),
          wickets: 2,
          economy: 9.6 + (Math.random() * 0.4 - 0.2),
        },
        {
          name: "Deepak Chahar",
          overs: 4,
          maidens: 0,
          runs: 42 + Math.floor(Math.random() * 2),
          wickets: Math.random() > 0.9 ? 2 : 1,
          economy: 10.5 + (Math.random() * 0.4 - 0.2),
        },
      ],
      lastSixBalls: this.getRandomLastBalls(),
      partnership: {
        runs: 64 + Math.floor(Math.random() * 3),
        balls: 38 + Math.floor(Math.random() * 2),
      },
    };

    baseData.batsmen.forEach(batsman => {
      batsman.strikeRate = parseFloat(((batsman.runs / batsman.balls) * 100).toFixed(1));
    });

    baseData.bowlers.forEach(bowler => {
      const oversFull = Math.floor(bowler.overs);
      const oversPart = bowler.overs - oversFull;
      const totalBalls = oversFull * 6 + Math.round(oversPart * 10);
      bowler.economy = parseFloat((bowler.runs / (totalBalls / 6)).toFixed(1));
    });

    return baseData;
  }

  private getRandomLastBalls(): LastBallInfo[] {
    const possibleBalls: LastBallInfo[] = [
      { runs: 1, description: "Single taken with a push to long-on" },
      { runs: 4, isBoundary: true, description: "Beautiful cover drive for FOUR!" },
      { runs: 0, description: "Dot ball, good length delivery" },
      { runs: 6, isSix: true, description: "MASSIVE SIX over long-on!" },
      { runs: 1, isExtra: true, extraType: "wd", extraRuns: 1, description: "Wide ball" },
      { runs: 0, isWicket: true, description: "BOWLED! Middle stump knocked back" },
      { runs: 2, description: "Two runs with a flick to deep square leg" },
      { runs: 0, description: "Played and missed outside off stump" },
      { runs: 1, isExtra: true, extraType: "nb", extraRuns: 1, description: "No ball, over stepped" },
      { runs: 3, description: "Three runs with a drive through covers" },
    ];
    
    const result: LastBallInfo[] = [];
    while (result.length < 6) {
      const randomIndex = Math.floor(Math.random() * possibleBalls.length);
      result.push(possibleBalls[randomIndex]);
    }
    
    return result;
  }

  private getMockPredictions(): MatchPrediction[] {
    const predictions: MatchPrediction[] = [
      {
        matchTitle: "IPL 2025 - Match 24",
        venue: "Wankhede Stadium, Mumbai",
        teamA: {
          name: "Mumbai Indians",
          winProbability: 65 + Math.floor(Math.random() * 5) - 2,
          keyFactor: "Strong batting lineup and home advantage",
        },
        teamB: {
          name: "Chennai Super Kings",
          winProbability: 35 + Math.floor(Math.random() * 5) - 2,
          keyFactor: "Experienced spin bowlers",
        },
        predictedScore: {
          battingTeam: "Mumbai Indians",
          minScore: 180 + Math.floor(Math.random() * 3) - 1,
          maxScore: 195 + Math.floor(Math.random() * 3) - 1,
          predictedWickets: 6,
        },
      },
    ];

    predictions.forEach(prediction => {
      const total = prediction.teamA.winProbability + prediction.teamB.winProbability;
      prediction.teamA.winProbability = Math.round((prediction.teamA.winProbability / total) * 100);
      prediction.teamB.winProbability = 100 - prediction.teamA.winProbability;
      
      if (prediction.predictedScore.minScore >= prediction.predictedScore.maxScore) {
        prediction.predictedScore.maxScore = prediction.predictedScore.minScore + 10;
      }
    });

    return predictions;
  }

  cleanup(): void {
    this.stopLiveMatchesPolling();
    this.stopLiveScorePolling();
    this.stopPredictionPolling();
    console.log("LiveDataService cleaned up");
  }
}

const liveDataService = new LiveDataService();

export default liveDataService;
