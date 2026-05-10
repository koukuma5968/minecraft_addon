import { Entity, EntityComponentTypes, EntityProjectileComponent, system, TicksPerSecond } from "@minecraft/server";
import { ZytuComonClass } from "./ZytuComonClass";
import { shooting } from "../../common/ShooterEvent";
import { getDistanceLocation, getLookLocationDistance, getRandomInRange, getRandomRange } from "../../common/KimetuCommonUtil";

export class Mari extends ZytuComonClass {

    /**
     * 毬
     */
    mari(entity:Entity) {

        try {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);

            const mari = shooting(entity, "kurokumaft:throw_susamaru_mari", 0, 3, undefined, 0);

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
            const num = system.runInterval(() => {
                try {
                    this.rentou(entity, getRandomRange(-1,1, 2), getRandomRange(0,1, 2));
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

    /**
     * 連打
     * @param {Entity} entity
     */
    private rentou(entity:Entity, side:number, top:number) {
    
        const distance = getLookLocationDistance(entity.getRotation().y, 1, side, top);
        const bulet = entity.dimension.spawnEntity("kurokumaft:throw_susamaru_mari", getDistanceLocation(
            {
                x:entity.location.x,
                y:entity.location.y + 0.5,
                z:entity.location.z
            },
            distance
        ));
    
        const projectile = bulet.getComponent(EntityComponentTypes.Projectile) as EntityProjectileComponent;
        projectile.owner = entity;
        const shotdistance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
        projectile.shoot({
            x:shotdistance.x,
            y:0,
            z:shotdistance.z
        });

        system.waitTicks(20).then(() => {
            bulet.remove();
        }).catch((error: any) => {
        }).finally(() => {
        });

    }

}
