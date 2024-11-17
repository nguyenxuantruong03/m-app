import Link from "next/link";
import { useTetris } from "../../../../hooks/useTetris";
import {
  LeaderboardContainer,
  ScoresContainer,
  ScoreRow,
  LoadingText,
} from "./styles";
import { Leaderboard as LeaderboardType } from "@/types/type";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const medals = {
  0: "🥇",
  1: "🥈",
  2: "🥉",
} as { [key in number]: string };

interface LeaderboardProps {
  data: LeaderboardType[];
  setData: Dispatch<SetStateAction<LeaderboardType[]>>;
  loading: boolean;
}

const Leaderboard = ({
  data,
  setData,
  loading,
}: LeaderboardProps): JSX.Element => {
  const gameState = useTetris();
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingLeaderboard(true);
        const response = await axios.get(`/api/client/leaderboard`);
        setData(response.data);
      } catch (error) {
        console.error("Error saving leaderboard:", error);
      } finally {
        setLoadingLeaderboard(false);
      }
    };
    fetchData();
  }, []);

  return (
    <LeaderboardContainer>
      <h2>Leaderboard</h2>
      <ScoresContainer>
        {loading || loadingLeaderboard ? (
          <LoadingText>
            <Loader2 className="animate-spin" />
            Please wait...
          </LoadingText>
        ) : (
          <>
            {data.map((score: LeaderboardType, index) => (
              <ScoreRow
                isHighlighted={score.id === gameState.scoreId}
                key={score.id}
              >
                <Link href={`/user/${score?.user?.nameuser}`}>
                  {medals[index] && `${medals[index]} `}
                  {score.user.name} - {score.user.nameuser}
                </Link>
                <div>{score.score}</div>
              </ScoreRow>
            ))}
          </>
        )}
      </ScoresContainer>
    </LeaderboardContainer>
  );
};

export default Leaderboard;
