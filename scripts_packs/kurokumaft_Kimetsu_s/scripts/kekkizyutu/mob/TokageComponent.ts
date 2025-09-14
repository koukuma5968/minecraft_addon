import { Entity, system, TicksPerSecond } from "@minecraft/server";
import { KekkizyutuMobUseComponent } from "../KekkizyutuUseComponent";
import { Bunretu } from "../zyutu/Bunretu";

/**
 * 石竜子
 */
export class TokageComponent implements KekkizyutuMobUseComponent {

    startMonitoring(entity: Entity) {

        try {
            if (entity !== undefined && entity.isValid) {
                const nitirintou_equip = entity.getProperty("kurokumaft:nitirintou_equip") as boolean;
                if (nitirintou_equip) {
                    entity.setProperty("kurokumaft:kokyu_use", true);
                    entity.setProperty("kurokumaft:kokyu_particle", true);
                    this.useAttackZyutu(entity);
                }
            }
        } catch (error: any) {
        }
    }

    /**
     * @param {Entity} entity
     */
    hitAttackZyutu(entity: Entity): void {
    }

    async useAttackZyutu(entity: Entity): Promise<void> {

        try {
            const bunretu = new Bunretu();
            bunretu.ultrasonic(entity);
        } catch (error: any) {
        }

    }

}
