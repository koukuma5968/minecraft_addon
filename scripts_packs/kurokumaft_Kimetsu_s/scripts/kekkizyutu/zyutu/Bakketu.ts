import { EntityDamageCause, EntityQueryOptions, MolangVariableMap, Entity, system, Player, world } from "@minecraft/server";
import { ogreRankPoint, ZytuComonClass } from "./ZytuComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export class Bakketu extends ZytuComonClass {

    /**
     * 爆血
     */
    bakketu(entity:Entity) {
        if (entity === undefined) {
            return;
        }

        try {

            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_bakketu1.value"}]});
            }

            const dimension = entity.dimension;
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);

            const ogre_rank = entity.getProperty("kurokumaft:ogre_rank");
            const point = ogreRankPoint.find(rank => rank.rank === ogre_rank);

            const molang = new MolangVariableMap();
            molang.setFloat("variable.kaikyu", (point !== undefined ? point.point : 1));

            entity.addTag(entity.id);
            const healthFilterOption = {
                excludeFamilies: [
                    "inanimate", "ogre", "monster"
                ],
                excludeTypes: [
                    "item"
                ],
                excludeTags: [
                    entity.id
                ],
                location: entity.location,
                maxDistance: 10
            } as EntityQueryOptions;
            const targets1 = dimension.getEntities(healthFilterOption);

            const fireFilterOption = {
                excludeFamilies: [
                    "inanimate", "regimental_soldier", "villager", "animal"
                ],
                excludeTypes: [
                    "item"
                ],
                excludeTags: [
                    entity.id
                ],
                location: entity.location,
                maxDistance: 10
            } as EntityQueryOptions;
            const targets2 = dimension.getEntities(fireFilterOption);

            const num = system.runInterval(() => {
                try {
                    targets1.forEach(en => {
                        if (en !== undefined && en.isValid) {
                            dimension.spawnParticle("kurokumaft:bakketu",en.location, molang);
                        }
                    });
                    targets2.forEach(en => {
                        if (en !== undefined && en.isValid) {
                            dimension.spawnParticle("kurokumaft:bakketu",en.location, molang);
                        }
                    });
                } catch (error: any) {
                    system.clearRun(num);
                }
            },4);

            system.waitTicks(30).then(() => {
                const num2 = system.runInterval(() => {
                    try {
                        targets1.forEach(en => {
                            if (en !== undefined && en.isValid) {
                                dimension.spawnParticle("kurokumaft:bakketu_fire",en.location, molang);
                                en.addEffect(MinecraftEffectTypes.InstantHealth, 2, {
                                    amplifier: 2,
                                    showParticles: true
                                });
                            }
                        });

                        targets2.forEach(en => {
                            if (en !== undefined && en.isValid && entity.isValid) {
                                dimension.spawnParticle("kurokumaft:bakketu_fire",en.location, molang);
                                if (en instanceof Player) {
                                    if (this.gardCheck(en)) {
                                        en.applyDamage(2, {
                                            cause: EntityDamageCause.fire,
                                            damagingEntity: entity
                                        });
                                    }
                                } else {
                                    en.applyDamage(3, {
                                        cause: EntityDamageCause.fire,
                                        damagingEntity: entity
                                    });
                                }
                            }
                        });
                    } catch (error: any) {
                        system.clearRun(num2);
                    }
            
                },4);

                system.waitTicks(40).then(() => {
                }).catch((error: any) => {
                }).finally(() => {
                    system.clearRun(num2);
                });
            }).catch((error: any) => {
            }).finally(() => {
                system.clearRun(num);
            });

            entity.removeTag(entity.id);
        } catch (error: any) {
        }
    }

}
