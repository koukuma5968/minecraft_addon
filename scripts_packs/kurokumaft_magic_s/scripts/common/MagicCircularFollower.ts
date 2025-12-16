import { Vector3 } from "@minecraft/server";

export class MagicCircularFollower {
  private angle = 0; // 現在の角度（ラジアン）
  private paused = false;

  /**
   * @param radius 回転半径
   * @param speed ラジアン/秒（正: 反時計回り、負: 時計回り）
   * @param height Y方向のオフセット（中心からの高さ）
   * @param initialAngle 初期角度(ラジアン)
   */
  constructor(
    public radius = 5,
    public speed = Math.PI, // 180deg/sec default
    public height = 1,
    initialAngle = 0
  ){
    this.angle = initialAngle;
  }

  // フレームごとに呼ぶ。center はキャラクターの現在位置（追従）
  update(center: Vector3, deltaTimeSec: number): Vector3 {
    if (!this.paused) this.angle += this.speed * deltaTimeSec;

    // 角度を適度に丸めてオーバーフロー防止
    if (this.angle > Math.PI * 2 || this.angle < -Math.PI * 2) {
      this.angle = this.angle % (Math.PI * 2);
    }

    const x = center.x + this.radius * Math.cos(this.angle);
    const y = center.y + this.height;
    const z = center.z + this.radius * Math.sin(this.angle);

    return { x, y, z };
  }

  setRadius(r: number) { this.radius = r; }
  setSpeed(radPerSec: number) { this.speed = radPerSec; }
  pause() { this.paused = true; }
  resume() { this.paused = false; }
  setAngle(rad: number) { this.angle = rad; }
}
