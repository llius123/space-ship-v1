import { useEffect, useState } from "react";
import * as PIXI from "pixi.js";
import { GameSystem } from "./GameSystem";
import { UIHelp } from "./UIHelp/UIHelp";

export const useGameSystem = ({
  container,
  document,
}: {
  container: HTMLDivElement;
  document: Document;
}) => {
  const [loading, setLoading] = useState(true);
  const [gameSystem, setGameSystem] = useState<GameSystem>();


  useEffect(() => {
    const gameSystem = new GameSystem(container, document);

    gameSystem.loadUIHelp()
    gameSystem.loadAssets().then(() => {
      setLoading(false);
      setGameSystem(gameSystem);
    })
  }, []);

  return { loading, gameSystem };
};
