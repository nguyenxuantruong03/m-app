"use client";
import { StyleSheetManager } from "styled-components";
import React from "react";
import styled, { keyframes } from "styled-components";
import { useGameContext } from "../context/GameContext";
import { useInterval } from "../hooks/useInterval";
import {
  GAME_STATUS,
  COLOR,
  Character,
  ARROW,
  DIRECTION,
  Direction,
  Position,
} from "@/types/type";

interface StyledPacmanProps {
  direction: Direction;
  $position: Position;
  isalive: string;
}

type PacmanMouthProps = {
  moving: string;
};

const Pacman = (props: Character) => {

  const {
    pacmanPosition: position,
    setPacmanPosition,
    gameStatus,
  } = useGameContext();
  const [direction, setDirection] = React.useState<Direction>(DIRECTION.RIGHT);
  const [color, setColor] = React.useState<string>(props.color);
  useInterval(move, 100);

  React.useEffect(() => {
    function rotate(keypressed: number) {
      switch (keypressed) {
        case ARROW.LEFT:
          setDirection(DIRECTION.LEFT);
          break;
        case ARROW.UP:
          setDirection(DIRECTION.UP);
          break;
        case ARROW.RIGHT:
          setDirection(DIRECTION.RIGHT);
          break;
        default:
          setDirection(DIRECTION.DOWN);
      }
    }

    function handleKeyDown(e: any) {
      const arrows = [ARROW.LEFT, ARROW.UP, ARROW.RIGHT, ARROW.DOWN];

      if (arrows.indexOf(e.keyCode) >= 0) {
        rotate(e.keyCode);
      }
    }

    document.addEventListener("keydown", handleKeyDown, false);
    document.addEventListener("restart-game", gameRestarted);

    return () => {
      document.removeEventListener("restart-game", gameRestarted);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function gameRestarted() {
    setColor(props.color);
  }

  function move() {
    if (gameStatus === GAME_STATUS.IN_PROGRESS) {
      const currentLeft = position.left;
      const currentTop = position.top;
      let newPosition: Position = { top: 0, left: 0 };
      switch (direction) {
        case DIRECTION.LEFT:
          newPosition = {
            top: currentTop,
            left: Math.max(currentLeft - props.velocity, 0),
          };
          break;
        case DIRECTION.UP:
          newPosition = {
            top: Math.max(currentTop - props.velocity, 0),
            left: currentLeft,
          };
          break;
        case DIRECTION.RIGHT:
          newPosition = {
            top: currentTop,
            left: Math.min(
              currentLeft + props.velocity,
              window.innerWidth - props.border - props.size
            ),
          };
          break;

        default:
          newPosition = {
            top: Math.min(
              currentTop + props.velocity,
              window.innerHeight -
                props.size -
                props.border -
                props.topScoreBoard
            ),
            left: currentLeft,
          };
      }
      setPacmanPosition(newPosition);
    }
    if (gameStatus === GAME_STATUS.LOST) {
      setColor(COLOR.PACMAN_DEAD);
    }
  }

  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== "position"}>
      <StyledPacman
        tabIndex={0}
        color={color}
        $position={position}
        direction={direction}
        isalive={gameStatus !== GAME_STATUS.LOST ? 'true' : 'false'}

      >
        <PacmanEye />
        <PacmanMouth moving={gameStatus === GAME_STATUS.IN_PROGRESS ?'true' :'false'} />
      </StyledPacman>
    </StyleSheetManager>
  );
};

const eat = keyframes`
  0% {
    clip-path: polygon(100% 74%, 44% 48%, 100% 21%);
  }
  25% {
    clip-path: polygon(100% 60%, 44% 48%, 100% 35%);
  }
  50% {
    clip-path: polygon(100% 50%, 44% 48%, 100% 60%);
  }
  75% {
    clip-path: polygon(100% 59%, 44% 48%, 100% 35%);
  }
  100% {
    clip-path: polygon(100% 74%, 44% 48%, 100% 21%);
  }
`;

const StyledPacman = styled.div<StyledPacmanProps>`
  width: 60px;
  height: 63px;
  position: absolute;
  top: ${(props) => props.$position.top}px;
  left: ${(props) => props.$position.left}px;
  transform: ${(props) => {
    switch (props.direction) {
      case DIRECTION.LEFT:
        return "rotateY(180deg)";
      case DIRECTION.UP:
        return "rotate(-90deg)";
      case DIRECTION.DOWN:
        return "rotate(90deg)";
      default:
        return "rotate(0deg)";
    }
  }};
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${(props) => (props.isalive ? colors.color2 : "white")};
  position: relative;
`;
const colors = {
  color1: "black",
  color2: "rgb(255, 233, 80)",
};
const PacmanEye = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  top: 10px;
  right: 26px;
  background: ${colors.color1};
`;

const PacmanMouth = styled.div<PacmanMouthProps>`
  animation-name: ${eat};
  animation-duration: 0.7s;
  animation-iteration-count: ${(props) =>
    props.moving ? "infinite" : "initial"};
  background: ${colors.color1};
  position: absolute;
  width: 100%;
  height: 100%;
  clip-path: polygon(100% 74%, 44% 48%, 100% 21%);
`;

export default Pacman;
