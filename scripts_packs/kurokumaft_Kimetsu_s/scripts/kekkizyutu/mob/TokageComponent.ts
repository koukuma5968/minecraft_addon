import { Entity, system, TicksPerSecond } from "@minecraft/server";
import { KekkizyutuMobUseComponent } from "../KekkizyutuUseComponent";
import { Bunretu } from "../zyutu/Bunretu";

/**
 * 石竜子
 */
export class TokageComponent implements KekkizyutuMobUseComponent {

    entity: Entity;
    num: number;

    constructor(entity: Entity) {
        this.entity = entity;
        this.num = 0;
    }

    startMonitoring() {
        this.num = system.runInterval(() => {
            if (this.entity.isValid()) {
                this.useAttackZyutu();
            } else {
                system.clearRun(this.num);
            }
        }, 15*TicksPerSecond);
    }

    async useAttackZyutu(): Promise<void> {

        const bunretu = new Bunretu();
        bunretu.ultrasonic(this.entity);

    }

}
