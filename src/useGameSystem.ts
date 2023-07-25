import { useEffect, useState } from "react";
import { GameSystem } from "./GameSystem";
import * as PIXI from "pixi.js";

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
    setGameSystem(gameSystem);
    setLoading(false);
  }, []);

  const addShip = (): void => {
    addShipToGame();
    addShipMovement();
  };

  const addShipToGame = (): void => {
    gameSystem?.addShipToGame();
  };

  const addShipMovement = (): void => {
    gameSystem?.addElementToTick(gameSystem?.ship.move);
  };

  return { loading, addShip };
};
