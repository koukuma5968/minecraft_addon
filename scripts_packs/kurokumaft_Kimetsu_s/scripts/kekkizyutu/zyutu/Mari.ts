import { Entity, system, TicksPerSecond, Player } from "@minecraft/server";
import { ZytuComonClass } from "./ZytuComonClass";
import { shooting } from "../../common/ShooterEvent";
import { getLookLocationDistance, getRandomInRange } from "../../common/KimetuCommonUtil";

export class Mari extends ZytuComonClass {

    /**
     * 毬
     */
    mari(entity:Entity) {

        try {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);

            const mari = shooting(entity, "kurokumaft:throw_susamaru_mari", 0, 3, undefined);

            system.waitTicks(2*TicksPerSecond).then(() => {
                if (mari.isValid) {
                    mari.remove();
                }
            }).catch((error: any) => {
            }).finally(() => {
            });
        } catch (error: any) {
        }
    }

    /**
     * 連投
     */
    mariRen(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_kouketunoya4.value"}]});
            }
            const num = system.runInterval(() => {
                try {
                    const mari = shooting(entity, "kurokumaft:throw_susamaru_mari", getRandomInRange(-2, 2), 3, undefined);
                } catch (error: any) {
                    console.error(error);
                    system.clearRun(num);
                }
            },5);

            system.waitTicks(60).then(() => {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            }).catch((error: any) => {
                console.error(error);
            }).finally(() => {
                system.clearRun(num);
            });

        } catch (error: any) {
            console.error(error);
        }
    }

}
