import { Vector3 } from "@minecraft/server";
import { BossMoveMoverInterface } from "./BossActionInterface";
import { BossMoverBase } from "./BossMoverBase";

export class BossEllipticalMover extends BossMoverBase implements BossMoveMoverInterface {

  constructor(
    center: Vector3,
    private radiusX: number,
    private radiusZ: number,
    speed: number
  ) {
    super(center, speed);
  }

  updatePosition(deltaTime: number): Vector3 {
    this.angle += this.speed * deltaTime;

    const x = this.center.x + this.radiusX * Math.cos(this.angle);
    const z = this.center.z - this.radiusZ * Math.sin(this.angle);
    const y = this.center.y;

    return { x, y, z };
  }

}
