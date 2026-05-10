import { Entity, system, TicksPerSecond, Player, world, EntityRideableComponent, EntityComponentTypes, EntityProjectileComponent } from "@minecraft/server";
import { ZytuComonClass } from "./ZytuComonClass";
import { shooting } from "../../common/ShooterEvent";
import { addOrgeFilter, getDistanceLocation, getLookLocationDistance } from "../../common/KimetuCommonUtil";

export class Kouketunoya extends ZytuComonClass {

    /**
     * 飛
     */
    hi(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_kouketunoya1.value"}]});
            }
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);

            const hi = shooting(entity, "kurokumaft:throw_kouketunoya_hi", 0, 3, undefined, 0);

            system.waitTicks(2*TicksPerSecond).then(() => {
                if (hi.isValid) {
                    hi.remove();
                }
            }).catch((error: any) => {
            }).finally(() => {
            });
        } catch (error: any) {
            console.debug(error);
        }
    }

    /**
     * 衝
     */
    show(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_kouketunoya2.value"}]});
            }
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);

            const ya = shooting(entity, "kurokumaft:throw_kouketunoya_show", 0, 3, undefined, 0);

            system.waitTicks(2*TicksPerSecond).then(() => {
                if (ya.isValid) {
                    ya.remove();
                }
            }).catch((error: any) => {
            }).finally(() => {
            });
        } catch (error: any) {
            console.debug(error);
        }
    }

    /**
     * 落
     */
    raku(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_kouketunoya3.value"}]});
            }
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);

            const ya = shooting(entity, "kurokumaft:throw_kouketunoya_raku", 0, 3, undefined, 0);

            system.waitTicks(2*TicksPerSecond).then(() => {
                if (ya.isValid) {
                    ya.remove();
                }
            }).catch((error: any) => {
            }).finally(() => {
            });
        } catch (error: any) {
            console.debug(error);
        }
    }

    /**
     * 撃
     */
    geki(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_kouketunoya4.value"}]});
            }
            let front = 8;
            let side = -3;
            const num = system.runInterval(() => {

                try {
            
                    const distance = getLookLocationDistance(entity.getRotation().y, front, side, 5);
                    const geki = entity.dimension.spawnEntity("kurokumaft:throw_kouketunoya_geki", getDistanceLocation(entity.location, distance));
                    const projectile = geki.getComponent(EntityComponentTypes.Projectile) as EntityProjectileComponent;
                    projectile.shoot({
                        x:0,
                        y:-2,
                        z:0
                    });

                    front=-(front+2);
                    side=-(side+2);
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

world.afterEvents.projectileHitEntity.subscribe(event => {
    const proj = event.projectile as Entity;
    if (proj.isValid) {
        const hitEntity = event.getEntityHit().entity;
        if (hitEntity !== undefined && hitEntity.isValid) {
            if (proj.typeId === "kurokumaft:throw_kouketunoya_show") {
                const rideable = proj.getComponent(EntityComponentTypes.Rideable) as EntityRideableComponent;
                rideable.addRider(hitEntity);
            } else if (proj.typeId === "kurokumaft:throw_kouketunoya_raku" && !proj.getProperty("kurokumaft:hit")) {
                const up = proj.dimension.spawnEntity("kurokumaft:throw_kouketunoya_raku", proj.location);
                up.setProperty("kurokumaft:hit", true);
                proj.remove();

                const rideable = up.getComponent(EntityComponentTypes.Rideable) as EntityRideableComponent;
                rideable.addRider(hitEntity);
                const projectile = up.getComponent(EntityComponentTypes.Projectile) as EntityProjectileComponent;
                projectile.shoot({
                    x:0,
                    y:2,
                    z:0
                });
                system.waitTicks(0.5*TicksPerSecond).then(() => {
                    rideable.getRiders().forEach(en => {
                        en.applyKnockback({x:0,z:0}, -5);
                    });
                    if (up.isValid) {
                        up.remove();
                    }
                }).catch((error: any) => {
                }).finally(() => {
                });
            } else if (proj.typeId === "kurokumaft:throw_kouketunoya_geki") {
                const option = {
                    allowUnderwater: true,
                    breaksBlocks: false,
                    causesFire: false,
                    source: proj
                };
                proj.dimension.createExplosion(proj.location, 2, option);
                proj.remove();
            }
        }
    }
})

world.afterEvents.projectileHitBlock.subscribe(event => {
    const proj = event.projectile as Entity;
    if (proj.isValid && proj.typeId.startsWith("kurokumaft:throw_kouketunoya")) {
        if (proj.typeId === "kurokumaft:throw_kouketunoya_geki") {
            const option = {
                allowUnderwater: true,
                breaksBlocks: false,
                causesFire: false,
                source: proj
            };
            proj.dimension.createExplosion(proj.location, 2, option);
        }
        proj.remove();
    }
})
