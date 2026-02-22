import { Entity, system, TicksPerSecond, Player } from "@minecraft/server";
import { ZytuComonClass } from "./ZytuComonClass";
import { shooting } from "../../common/ShooterEvent";

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
}
