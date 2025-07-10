import { Vector3 } from "@minecraft/server";
import { BossMoveMoverInterface } from "./BossActionInterface";
import { BossMoverBase } from "./BossMoverBase";

export class BossCircularMover extends BossMoverBase implements BossMoveMoverInterface {

  constructor(
    center: Vector3,
    private radius: number,
    speed: number // ラジアン/秒
  ) {
    super(center, speed);
  }

  updatePosition(deltaTime: number): Vector3 {
    this.angle += this.speed * deltaTime;

    const x = this.center.x + this.radius * Math.cos(this.angle);
    const z = this.center.z + this.radius * Math.sin(this.angle);
    const y = this.center.y;

    return { x, y, z };
  }
}
