import { BlockVolume, Entity, system, TicksPerSecond, Player } from "@minecraft/server";
import { ZytuComonClass } from "./ZytuComonClass";
import { addOrgeFilter } from "../../common/KimetuCommonUtil";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";
import { shooting } from "../../common/ShooterEvent";

export class Koushi extends ZytuComonClass {

    /**
     * 刻糸牢
     */
    kokushirou(entity:Entity) {
        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_ito1.value"}]});
            }
            entity.setProperty("kurokumaft:kokyu_use", false);

            const filter = addOrgeFilter(0, entity.location, 8, entity.id);
            entity.addTag(entity.id);
            const targets = entity.dimension.getEntities(filter);
            entity.removeTag(entity.id);
            targets.forEach(en => {
                const volume = new BlockVolume({x:en.location.x-1,y:en.location.y,z:en.location.z-1}, {x:en.location.x+1,y:en.location.y+1,z:en.location.z+1});
                en.dimension.fillBlocks(volume, MinecraftBlockTypes.Web);
            });

            this.kokyuApplyDamage(entity, filter, 3, 1);

            system.waitTicks(20).then(() => {
                entity.setProperty("kurokumaft:kokyu_particle", false);
            }).catch((error: any) => {
            }).finally(() => {
            });

        } catch (error: any) {
        }
    }

    /**
     * 刻糸輪転
     */
    kokushirinten(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_ito2.value"}]});
            }
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);

            const ito = shooting(entity, "kurokumaft:kokushirinten", 0, 3, undefined);

            system.waitTicks(2*TicksPerSecond).then(() => {
                if (ito.isValid) {
                    ito.remove();
                }
            }).catch((error: any) => {
            }).finally(() => {
            });
        } catch (error: any) {
        }
    }

    /**
     * 殺目篭
     */
    ayamekago(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_ito3.value"}]});
            }
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);

            const filter = addOrgeFilter(1, entity.location, 10, entity.id);
            entity.addTag(entity.id);
            const targets = entity.dimension.getEntities(filter);
            entity.removeTag(entity.id);

            if (targets.length > 0) {
                const ayamekago = targets[0].dimension.spawnEntity("kurokumaft:ayamekago", targets[0].location);

                const num = system.runInterval(() => {
                    try {
                        if (ayamekago !== undefined && ayamekago.isValid) {
                            if (targets[0] !== undefined && targets[0].isValid) {
                                targets[0].teleport(ayamekago.location);
                                if (entity !== undefined) {
                                    this.kokyuApplyDamage(entity, filter, 2, 1);
                                }
                            } else {
                                system.clearRun(num);
                                ayamekago.remove();
                            }
                        }
                    } catch (error: any) {
                        system.clearRun(num);
                    }
                }, 2);
        
                system.waitTicks(40).then(() => {
                    if (ayamekago !== undefined && ayamekago.isValid) {
                        ayamekago.remove();
                    }
                }).catch((error: any) => {
                }).finally(() => {
                    system.clearRun(num);
                });
            }
        } catch (error: any) {
        }
    }

}
