import { Vector3 } from "@minecraft/server";

export class BossMoverBase {
  protected angle = 0;
  protected position = {x:0,y:0,z:0};
  protected center = {x:0,y:0,z:0};
  protected speed = 0;

  constructor(center: Vector3, speed: number) {
    this.center = center;
    this.speed = speed;
  }

  setPotion(position: Vector3) :void {
    this.position = position;
  }

  moveCenter(deltaTime: number): Vector3 {
    const dx = this.center.x - this.position.x;
    const dy = this.center.y - this.position.y;
    const dz = this.center.z - this.position.z;

    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (distance === 0) return this.position;

    const moveDist = this.speed * deltaTime;

    if (moveDist >= distance) {
      this.position = { ...this.center }; // 終点に到達
    } else {
      const ratio = moveDist / distance;
      this.position.x += dx * ratio;
      this.position.y += dy * ratio;
      this.position.z += dz * ratio;
    }

    return this.position;
  }

  isComplete(): boolean {
    return this.position.x === this.center.x &&
           this.position.y === this.center.y &&
           this.position.z === this.center.z;
  }

}
