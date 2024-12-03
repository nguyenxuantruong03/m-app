"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTetris } from "../../../hooks/useTetris";
import { GameOverContainer } from "./styles";
import axios from "axios";
import { useParams } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Leaderboard } from "@/types/type";
import {
  getToastError,
  translateTotalCoinsReceived,
} from "@/translate/translate-client";
import toast from "react-hot-toast";

interface GameOverProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setData: Dispatch<SetStateAction<Leaderboard[]>>;
}

const GameOver = ({ setLoading, setData }: GameOverProps): JSX.Element => {
  const param = useParams();
  const user = useCurrentUser();
  const gameState = useTetris();
  const newTotalCoins = Math.floor(gameState.score / 300);
  const [storedLanguage, setStoredLanguage] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're running on the client side
    if (typeof window !== "undefined") {
      const language = localStorage.getItem("language");
      setStoredLanguage(language);
    }
  }, []);

  //language
  const languageToUse =
    user?.id && user?.role !== "GUEST"
      ? user?.language
      : storedLanguage || "vi";

  const totalCoinReceivedMessage = translateTotalCoinsReceived(languageToUse);
  const toastErrorMessage = getToastError(languageToUse);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await axios.post(`/api/${param.storeId}/wheelSpin`, {
          userId: user?.id,
          coin: newTotalCoins,
        });
      } catch (error) {
        toast.error(toastErrorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.post(`/api/client/leaderboard`, {
          userId: user?.id,
          score: gameState.score,
        });
        const response = await axios.get(`/api/client/leaderboard`);
        setData(response.data);
      } catch (error) {
        toast.error(toastErrorMessage);
      }
    };
    fetchData();
  }, [gameState.score, user?.id]);

  return (
    <GameOverContainer>
      <h1>Game Over!</h1>
      <h3>Score: {gameState.score}</h3>
      <span>
        {totalCoinReceivedMessage} <span>{newTotalCoins}</span>
      </span>
    </GameOverContainer>
  );
};

export default GameOver;
