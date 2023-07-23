import { Bullet } from "./Bullet/Bullet";
import { PixiMain } from "./PixiMain";
import { Ship } from "./Ship/Ship";

function Game({ container }: { container: any }) {
  const pixiMain: PixiMain = new PixiMain(container);

  const ship = new Ship(document);
  const bullet = new Bullet();
  bullet.setup();

  new Promise(async (resolve) => {
    await ship.setup();
    pixiMain.addElementToMainScene(ship.container);
    resolve(null);
  });
  pixiMain.addListenerToTick(() => {
    ship.move();
    ship.rotate();
    ship.click(() => {
      pixiMain.addElementToMainScene(bullet.container);
      bullet.readyToMove(ship.container.angle);
    });
    bullet.move();
  });
  return <></>;
}
export default Game;
