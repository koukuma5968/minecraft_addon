import { Entity, GameMode, Player, system, TicksPerSecond } from "@minecraft/server";
import { ZytuComonClass } from "./ZytuComonClass";
import { getLookLocationDistance, getRandomExcludingZero, getRandomInRange, playsound } from "../../common/KimetuCommonUtil";

export class Biwa extends ZytuComonClass {

    /**
     * 防
     */
    guard(entity:Entity) {
        if (entity === undefined) {
            return;
        }
        try {

            entity.addTag(entity.id + "biwa_guard");

            const entities = entity.dimension.getEntities({
                excludeTags: [entity.id + "biwa_guard"],
                excludeFamilies: ["nakime_fusuma", "inanimate"],
                excludeTypes: ["item"],
                location: entity.location,
                maxDistance: 12
            });

            entities.forEach(en => {
                if (en instanceof Player) {
                    if (en.getGameMode() !== GameMode.Spectator && en.getGameMode() !== GameMode.Creative) {
                        const rotation = en.getRotation();
                        const distance = getLookLocationDistance(rotation.y, 1, 0, 0);
                        const fusuma = en.dimension.spawnEntity("kurokumaft:nakime_fusuma", 
                            {x: en.location.x + distance.x, y: en.location.y, z: en.location.z + distance.z},
                            {initialRotation: rotation.y - 180}
                        );
                        system.runTimeout(() => {
                            fusuma.kill();
                        }, TicksPerSecond * 1);
                        en.applyKnockback({
                            x: -en.getViewDirection().x * 5,
                            z: -en.getViewDirection().z * 5
                        }, 0.65);
                        playsound(en, "kekkizyutu.biwa");
                    }
                } else {
                    const rotation = en.getRotation();
                    const distance = getLookLocationDistance(rotation.y, 1, 0, 0);
                    const fusuma = en.dimension.spawnEntity("kurokumaft:nakime_fusuma", 
                        {x: en.location.x + distance.x, y: en.location.y, z: en.location.z + distance.z},
                        {initialRotation: rotation.y - 180}
                    );
                    system.runTimeout(() => {
                        fusuma.kill();
                    }, TicksPerSecond * 1);
                    en.applyKnockback({
                        x: -en.getViewDirection().x * 5,
                        z: -en.getViewDirection().z * 5
                    }, 0.65);
                }

            });

            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
            entity.removeTag(entity.id + "biwa_guard");
            if (entity instanceof Player) {
                playsound(entity, "kekkizyutu.biwa");
            }

        } catch (error: any) {
        }

    }

    /**
     * 転
     */
    gate(entity:Entity) {
        if (entity === undefined) {
            return;
        }

        try {
            entity.addTag(entity.id + "biwa_gate");

            const entities = entity.dimension.getEntities({
                excludeTags: [entity.id + "biwa_gate"],
                excludeFamilies: ["nakime_fusuma", "inanimate"],
                excludeTypes: ["item"],
                location: entity.location,
                maxDistance: 12
            });

            entities.forEach(en => {
                const tpX = getRandomExcludingZero(-36, 36, 12, 100);
                const tpY = getRandomInRange(0, 36);
                const tpZ = getRandomExcludingZero(-36, 36, 12, 100);
                if (en instanceof Player) {
                    const fusuma = en.dimension.spawnEntity("kurokumaft:nakime_fusuma", en.location);
                    fusuma.setProperty("kurokumaft:mode", "gate");
                    system.runTimeout(() => {
                        fusuma.kill();
                    }, TicksPerSecond * 1);

                    if (en.getGameMode() !== GameMode.Spectator && en.getGameMode() !== GameMode.Creative) {
                        en.teleport({x: en.location.x + tpX, y: en.location.y + tpY, z: en.location.z + tpZ});
                        playsound(en, "kekkizyutu.biwa");
                    }
               } else {
                    const fusuma = en.dimension.spawnEntity("kurokumaft:nakime_fusuma", en.location);
                    system.runTimeout(() => {
                        fusuma.kill();
                    }, TicksPerSecond * 1);
                    fusuma.setProperty("kurokumaft:mode", "gate");
                    en.teleport({x: en.location.x + tpX, y: en.location.y + tpY, z: en.location.z + tpZ});
                }

            });

            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
            entity.removeTag(entity.id + "biwa_gate");
            if (entity instanceof Player) {
                playsound(entity, "kekkizyutu.biwa");
            }

        } catch (error: any) {
        }
    }

}
