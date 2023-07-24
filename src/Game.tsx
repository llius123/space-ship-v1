import { Bullet } from "./Bullet/Bullet";
import { PixiMain } from "./PixiMain";
import { Ship } from "./Ship/Ship";

function Game({ container }: { container: any }) {
  const pixiMain: PixiMain = new PixiMain(container);

  const ship = new Ship(document);
  const bullet = new Bullet(document);
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
      bullet.readyToMove(ship.container.angle, ship.container.position);
    });
    bullet.move();
  });

  return <></>;
}
export default Game;
