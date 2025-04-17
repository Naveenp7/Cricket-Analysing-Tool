
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { LiveScoreCard } from "@/components/match-tracker/LiveScoreCard";
import { MatchesSection } from "@/components/dashboard/MatchesSection";
import { PredictionSection } from "@/components/dashboard/PredictionSection";
import { StatsSection } from "@/components/dashboard/StatsSection";
import liveDataService, { LiveMatch, LiveScoreData } from "@/services/liveDataService";
import { toast } from "sonner";
import { Loader2, Trophy } from "lucide-react";

const Index = () => {
  const [liveScoreData, setLiveScoreData] = useState<LiveScoreData | null>(null);
  const [liveMatches, setLiveMatches] = useState<LiveMatch[]>([]);
  const [loadingScore, setLoadingScore] = useState<boolean>(true);
  const [syncActive, setSyncActive] = useState<boolean>(true);

  useEffect(() => {
    // Display initial toast
    toast.success("IPL 2025 live data syncing activated", {
      description: "Match data will refresh automatically",
    });

    // Subscribe to live score updates
    const scoreUnsubscribe = liveDataService.subscribeLiveScore((data) => {
      setLiveScoreData(data);
      setLoadingScore(false);
    });

    // Subscribe to live matches updates
    const matchesUnsubscribe = liveDataService.subscribeLiveMatches((matches) => {
      setLiveMatches(matches);
    });

    // Cleanup subscriptions on unmount
    return () => {
      scoreUnsubscribe();
      matchesUnsubscribe();
      liveDataService.cleanup();
    };
  }, []);

  // Function to toggle data syncing
  const toggleSync = () => {
    setSyncActive(!syncActive);
    
    if (!syncActive) {
      // Re-enable syncing
      liveDataService.startLiveScorePolling();
      liveDataService.startLiveMatchesPolling();
      toast.success("IPL 2025 live data syncing resumed");
    } else {
      // Pause syncing
      liveDataService.stopLiveScorePolling();
      liveDataService.stopLiveMatchesPolling();
      toast.info("IPL 2025 live data syncing paused");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Trophy className="h-6 w-6 mr-2 text-yellow-500" />
            <h1 className="text-2xl font-bold">IPL 2025 Live Tracker</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 
              ${syncActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
              onClick={toggleSync}
              role="button"
              title={syncActive ? "Click to pause live updates" : "Click to resume live updates"}
            >
              {syncActive ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                  Live Sync On
                </>
              ) : (
                <>
                  <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                  Live Sync Off
                </>
              )}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-12 gap-4 mb-6">
          <div className="col-span-12">
            {loadingScore ? (
              <div className="h-80 flex items-center justify-center bg-white rounded-md shadow">
                <Loader2 className="h-8 w-8 animate-spin text-cricket-green" />
                <span className="ml-2 text-muted-foreground">Loading IPL 2025 live score...</span>
              </div>
            ) : liveScoreData ? (
              <LiveScoreCard {...liveScoreData} />
            ) : (
              <div className="h-40 flex items-center justify-center bg-white rounded-md shadow">
                <p className="text-muted-foreground">No live IPL 2025 match data available</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-12 gap-4">
          <MatchesSection liveMatches={liveMatches} />
          <div className="col-span-12 md:col-span-4 space-y-4">
            <PredictionSection />
            <StatsSection />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
