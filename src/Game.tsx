import { KeyboardControl } from "./Control/KeyboardControl";
import { PixiMain } from "./PixiMain";
import { Ship } from "./Ship/Ship";

function Game({ container }: { container: any }) {
  let pixiMain: PixiMain;
  pixiMain = new PixiMain(container);

  const ship = new Ship(pixiMain.pixi);
  const keyboardShip = new KeyboardControl(document);

  new Promise(async (resolve) => {
    await ship.setup();
    resolve(null);
  });
  pixiMain.addListenerToTick(() => {
    keyboardShip.move(ship.container);
    keyboardShip.rotate(ship.container);
  });
  return <></>;
}
export default Game;
