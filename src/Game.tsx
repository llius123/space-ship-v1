import { Bullet } from "./Bullet/Bullet";
import { PixiMain } from "./PixiMain";
import { Ship } from "./Ship/Ship";
import { useGameSystem } from "./useGameSystemV2";

function Game({ container }: { container: HTMLDivElement }) {
  // const { loading, addShip } = useGameSystem({ container, document });
  const { loading, gameSystem } = useGameSystem({ container, document })

  if (loading) {
    return <></>;
  }

  gameSystem?.loadShip()

  // addShip();

  // const pixiMain: PixiMain = new PixiMain(container);

  // const ship = new Ship(document);
  // const bullet = new Bullet(document);
  // bullet.setup();

  // new Promise(async (resolve) => {
  //   await ship.setup();
  //   pixiMain.addElementToMainScene(ship.container);
  //   resolve(null);
  // });
  // pixiMain.addListenerToTick(() => {
  //   ship.move();
  //   ship.rotate();
  //   ship.click(() => {
  //     pixiMain.addElementToMainScene(bullet.container);
  //     bullet.readyToMove(ship.container.angle, ship.container.position);
  //   });
  //   bullet.move();
  // });

  return <></>;
}
export default Game;
