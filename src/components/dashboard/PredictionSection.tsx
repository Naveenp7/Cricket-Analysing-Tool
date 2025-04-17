
import { useEffect, useState } from "react";
import { PredictionCard } from "../predictions/PredictionCard";
import { Card, CardHeader, CardTitle } from "../ui/card";
import liveDataService, { MatchPrediction } from "@/services/liveDataService";
import { Loader2, TrophyIcon } from "lucide-react";

export function PredictionSection() {
  const [matchPrediction, setMatchPrediction] = useState<MatchPrediction | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    
    // Subscribe to prediction updates
    const unsubscribe = liveDataService.subscribePredictions((predictions) => {
      if (predictions.length > 0) {
        setMatchPrediction(predictions[0]);
        setLoading(false);
      }
    });
    
    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <TrophyIcon className="h-5 w-5 mr-2 text-yellow-500" />
            <span>IPL 2025 Match Prediction</span>
          </div>
          {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
        </CardTitle>
      </CardHeader>
      {matchPrediction ? (
        <PredictionCard {...matchPrediction} />
      ) : (
        <div className="p-4 flex justify-center items-center h-40 text-muted-foreground">
          {loading ? "Loading IPL prediction..." : "No prediction available for today's match"}
        </div>
      )}
    </Card>
  );
}
