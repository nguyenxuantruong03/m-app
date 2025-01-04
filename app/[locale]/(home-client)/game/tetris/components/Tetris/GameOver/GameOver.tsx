"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTetris } from "../../../hooks/useTetris";
import { GameOverContainer } from "./styles";
import axios from "axios";
import { useParams } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Leaderboard } from "@/types/type";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

interface GameOverProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setData: Dispatch<SetStateAction<Leaderboard[]>>;
}

const GameOver = ({ setLoading, setData }: GameOverProps): JSX.Element => {
  const t = useTranslations()
  const param = useParams();
  const user = useCurrentUser();
  const gameState = useTetris();
  const newTotalCoins = Math.floor(gameState.score / 300);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await axios.post(`/api/${param.storeId}/wheelSpin`, {
          userId: user?.id,
          coin: newTotalCoins,
        });
      } catch (error) {
        toast.error(t("toastError.somethingWentWrong"));
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
        toast.error(t("toastError.somethingWentWrong"));
      }
    };
    fetchData();
  }, [gameState.score, user?.id]);

  return (
    <GameOverContainer>
      <h1>{t("game.gameOver")}</h1>
      <h3>{t("game.score")}: {gameState.score}</h3>
      <span>
        {t("game.totalCoinReceived")}: <span>{newTotalCoins}</span>
      </span>
    </GameOverContainer>
  );
};

export default GameOver;
