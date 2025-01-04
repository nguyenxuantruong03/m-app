  "use client";
  import React, { useEffect, useState } from "react";
  import { useSound } from "use-sound";
  import Sound from "react-sound";

  import { useTetrisActions, useTetris } from "../../hooks/useTetris";
  import {
    Layout,
    Board,
    Center,
    RightSide,
    PlayButton,
    BoardContainer,
    StartGameContainer,
    RightSideContainer,
    BlueBackground,
  } from "./styles";
  import BoardCells from "./BoardCells/BoardCells";
  import InfoPanel from "./InfoPanel/InfoPanel";
  import GameOver from "./GameOver/GameOver";
  import { Leaderboard } from "@/types/type";
  import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

  let pressedKeys: { [key in string]: boolean } = {};
  let moveCooldown = false;
  let moveCooldownTimeout: NodeJS.Timeout;
  const INPUT_INTERVAL = 50;
  const MOVE_COOLDOWN = 200;

  const Tetris = (): JSX.Element => {
    const t = useTranslations()
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Leaderboard[]>([]);
    const [playMoveSFX] = useSound("/sfx/move.wav", { volume: 0.25 });
    const [playRotateSFX] = useSound("/sfx/rotate.wav", { volume: 0.25 });
    const [playPlaceSFX] = useSound("/sfx/place.wav", { volume: 0.25 });
    const [playHardDropSFX] = useSound("/sfx/hard-drop.wav", { volume: 0.25 });
    const [playLineClearSFX] = useSound("/sfx/clear.wav", { volume: 0.25 });
    const [playGameOverSFX] = useSound("/sfx/game-over.wav", { volume: 0.25 });
    const [playSRSTrickSFX] = useSound("/sfx/srs-trick.wav", { volume: 0.25 });
    const [playTetrisSFX] = useSound("/sfx/tetris.wav", { volume: 0.25 });

    const gameState = useTetris();
    const { rotate, move, start, fastDrop, hardDrop, registerCallback } =
      useTetrisActions();

    useEffect(() => {
      registerCallback("onMove", () => {
        playMoveSFX();
      });
      registerCallback("onRotate", () => {
        playRotateSFX();
      });
      registerCallback("onHardDrop", () => {
        playHardDropSFX();
      });
      registerCallback("onPlace", () => {
        playPlaceSFX();
      });
      registerCallback("onClear", () => {
        playLineClearSFX();
      });
      registerCallback("onGameOver", () => {
        playGameOverSFX();
      });
      registerCallback("onSRSTrick", () => {
        playSRSTrickSFX();
      });
      registerCallback("onTetris", () => {
        playTetrisSFX();
      });
    }, [
      registerCallback,
      playHardDropSFX,
      playMoveSFX,
      playRotateSFX,
      playLineClearSFX,
      playGameOverSFX,
      playSRSTrickSFX,
      playTetrisSFX,
      playPlaceSFX,
    ]);

    useEffect(() => {
      let interval = setInterval(() => {
        if (pressedKeys["ArrowLeft"] && !moveCooldown) move("left");
        if (pressedKeys["ArrowRight"] && !moveCooldown) move("right");
      }, INPUT_INTERVAL);
      return () => {
        clearInterval(interval);
      };
    }, [rotate, start, move, fastDrop, hardDrop]);

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        // Prevent the default behavior for arrow keys
        if (
          e.code === "ArrowLeft" ||
          e.code === "ArrowRight" ||
          e.code === "ArrowUp" ||
          e.code === "ArrowDown"
        ) {
          e.preventDefault();
        }

        if (e.code === "Enter" && !e.repeat) start();
        if (e.code === "ArrowLeft" && !e.repeat) {
          clearTimeout(moveCooldownTimeout);
          moveCooldown = true;
          moveCooldownTimeout = setTimeout(() => {
            moveCooldown = false;
          }, MOVE_COOLDOWN);
          move("left");
        }
        if (e.code === "ArrowRight" && !e.repeat) {
          clearTimeout(moveCooldownTimeout);
          moveCooldown = true;
          moveCooldownTimeout = setTimeout(() => {
            moveCooldown = false;
          }, MOVE_COOLDOWN);
          move("right");
        }
        if (e.code === "KeyZ" && !e.repeat) rotate("left");
        if (e.code === "KeyX" && !e.repeat) rotate("right");
        if (e.code === "ArrowDown") fastDrop(true);
        if (e.code === "ArrowUp" && !e.repeat) hardDrop();
        pressedKeys[e.code] = true;
      };

      const handleKeyUp = (e: KeyboardEvent) => {
        pressedKeys[e.code] = false;
        if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
          clearTimeout(moveCooldownTimeout);
          moveCooldown = false;
        }
        if (e.code === "ArrowDown") fastDrop(false);
      };

      document.addEventListener("keydown", handleKeyDown, false);
      document.addEventListener("keyup", handleKeyUp, false);

      return () => {
        document.removeEventListener("keydown", handleKeyDown, false);
        document.removeEventListener("keyup", handleKeyUp, false);
      };
    }, [rotate, start, move, fastDrop, hardDrop]);

    const handleStartClick = () => {
      start();
      window.scrollTo({ top: 15, behavior: "smooth" });
    };

    return (
      <Layout>
        <BoardContainer>
          <Board>
            {!gameState.started ? (
              <StartGameContainer>
                <BlueBackground />
                {gameState.gameOver && (
                  <GameOver setData={setData} setLoading={setLoading} />
                )}
                <Center>
                  {loading ? (
                    <PlayButton disabled={true}>
                      <span className="flex items-center space-x-1">{t("loading.loading")} <Loader2 className="animate-spin" /></span>
                    </PlayButton>
                  ) : (
                    <PlayButton disabled={false} onClick={handleStartClick}>
                      {gameState.gameOver ? "Play Again" : "Play"}
                    </PlayButton>
                  )}
                </Center>
              </StartGameContainer>
            ) : (
              <>
                <Sound
                  url="/sfx/BGM.mp3"
                  playStatus={"PLAYING"}
                  loop
                  volume={20}
                />
                <BoardCells />
              </>
            )}
          </Board>
        </BoardContainer>
        <RightSideContainer>
          <RightSide>
            <BlueBackground />
            <InfoPanel loading={loading} data={data} setData={setData}/>
          </RightSide>
        </RightSideContainer>
      </Layout>
    );
  };

  export default Tetris;
