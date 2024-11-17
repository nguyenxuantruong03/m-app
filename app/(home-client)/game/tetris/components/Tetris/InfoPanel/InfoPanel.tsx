import React, { Dispatch, SetStateAction } from "react";
import { useTetris } from "../../../hooks/useTetris";
import {
  Key,
  Center,
  Content,
  ControlRow,
  ControlsContainer,
  InfoPanelContainer,
} from "./styles";
import ActiveGame from "../../../components/Tetris/InfoPanel/ActiveGame/ActiveGame";
import Leaderboard from "../../../components/Tetris/InfoPanel/Leaderboard/Leaderboard";
import { Leaderboard as LeaderboardType } from "@/types/type";

interface InfoPanelProps{
  data: LeaderboardType[]
  setData: Dispatch<SetStateAction<LeaderboardType[]>>
  loading: boolean;
}

const InfoPanel = ({data, setData, loading}:InfoPanelProps): JSX.Element => {
  const gameState = useTetris();

  return (
    <InfoPanelContainer>
      <Content>{gameState.started ? <ActiveGame /> : <Leaderboard data={data} setData={setData} loading={loading}/>}</Content>
      <ControlsContainer>
        <h2>Điều khiển</h2>
        <ControlRow>
          <h4>Thay đổi hướng :</h4>
          <Center>
            <Key>Z</Key>
            <Key>X</Key>
          </Center>
        </ControlRow>
        <ControlRow>
          <h4>Di chuyển</h4>
          <Center>
            <Key>←</Key>
            <Key>→</Key>
          </Center>
        </ControlRow>
        <ControlRow>
          <h4>Thả nhanh</h4>
          <Key>↓</Key>
        </ControlRow>
        <ControlRow>
          <h4>Xuống nhanh</h4>
          <Key>↑</Key>
        </ControlRow>
      </ControlsContainer>
    </InfoPanelContainer>
  );
};

export default InfoPanel;
