import { Entity, EntityDamageCause, GameMode, Player, system, TicksPerSecond } from "@minecraft/server";
import { ZytuComonClass } from "./ZytuComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export class Wakuti extends ZytuComonClass {

    /**
     * 視覚夢幻の香
     */
    shikakumugennokou(entity:Entity) {
        if (entity === undefined) {
            return;
        }
        try {
            
            entity.addTag(entity.id + "wakuti_kou");

            const entities = entity.dimension.getEntities({
                excludeTags: [entity.id + "wakuti_kou"],
                excludeFamilies: ["inanimate"],
                excludeTypes: ["item"],
                location: entity.location,
                maxDistance: 12
            });

            entity.dimension.spawnParticle("kurokumaft:wakuti_fog", entity.location);
            entities.forEach(en => {
                if (en instanceof Player) {
                    if (en.getGameMode() !== GameMode.Spectator && en.getGameMode() !== GameMode.Creative) {
                        en.addEffect(MinecraftEffectTypes.Blindness, 120*TicksPerSecond, { amplifier: 5 });
                    }
                } else {
                    en.addEffect(MinecraftEffectTypes.Blindness, 120*TicksPerSecond, { amplifier: 5 });
                }

            });

            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
            entity.removeTag(entity.id + "wakuti_kou");

        } catch (error: any) {
        }

    }

    /**
     * 芳霞呪縛の香
     */
    houkazyubakunokou(entity:Entity) {
        if (entity === undefined) {
            return;
        }
        try {
            
            entity.addTag(entity.id + "wakuti_kou");

            const entities = entity.dimension.getEntities({
                excludeTags: [entity.id + "wakuti_kou"],
                excludeFamilies: ["inanimate"],
                excludeTypes: ["item"],
                location: entity.location,
                maxDistance: 12
            });

            entity.dimension.spawnParticle("kurokumaft:wakuti_fog", entity.location);
            entities.forEach(en => {
                if (en instanceof Player) {
                    if (en.getGameMode() !== GameMode.Spectator && en.getGameMode() !== GameMode.Creative) {
                        en.addEffect(MinecraftEffectTypes.Slowness, 120*TicksPerSecond, { amplifier: 2 });
                        en.addEffect(MinecraftEffectTypes.Weakness, 120*TicksPerSecond, { amplifier: 5 });
                    }
                } else {
                    en.addEffect(MinecraftEffectTypes.Slowness, 120*TicksPerSecond, { amplifier: 2 });
                    en.addEffect(MinecraftEffectTypes.Weakness, 120*TicksPerSecond, { amplifier: 5 });
                }

            });

            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
            entity.removeTag(entity.id + "wakuti_kou");

        } catch (error: any) {
        }

    }

    /**
     * 白夢幻惑の香
     */
    hakumugenwakunokou(entity:Entity) {
        if (entity === undefined) {
            return;
        }
        try {
            
            entity.addTag(entity.id + "wakuti_kou");

            const entities = entity.dimension.getEntities({
                excludeTags: [entity.id + "wakuti_kou"],
                excludeFamilies: ["inanimate"],
                excludeTypes: ["item"],
                location: entity.location,
                maxDistance: 12
            });

            entity.addTag("exclusion_target");
            entity.dimension.spawnParticle("kurokumaft:wakuti_fog", entity.location);
            entities.forEach(en => {
                if (en instanceof Player) {
                    if (en.getGameMode() !== GameMode.Spectator && en.getGameMode() !== GameMode.Creative) {
                        en.addEffect(MinecraftEffectTypes.Nausea, 100*TicksPerSecond, { amplifier: 2 });
                    }
                } else {
                    en.addTag("confusion_target");
                }

            });

            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
            entity.removeTag(entity.id + "wakuti_kou");
            system.waitTicks(10*TicksPerSecond).then(() => {
                entity.removeTag("exclusion_target");
            }).catch((error: any) => {
            });

        } catch (error: any) {
        }

    }

    /**
     * 飢餓蝕命の香
     */
    kigasyokumeinokou(entity:Entity) {
        if (entity === undefined) {
            return;
        }
        try {
            
            entity.addTag(entity.id + "wakuti_kou");

            const entities = entity.dimension.getEntities({
                excludeTags: [entity.id + "wakuti_kou"],
                excludeFamilies: ["inanimate"],
                excludeTypes: ["item"],
                location: entity.location,
                maxDistance: 12
            });

            entity.dimension.spawnParticle("kurokumaft:wakuti_fog", entity.location);
            entities.forEach(en => {
                if (en instanceof Player) {
                    if (en.getGameMode() !== GameMode.Spectator && en.getGameMode() !== GameMode.Creative) {
                        en.addEffect(MinecraftEffectTypes.Hunger, 120*TicksPerSecond, { amplifier: 15 });
                        en.addEffect(MinecraftEffectTypes.MiningFatigue, 120*TicksPerSecond, { amplifier: 15 });
                    }
                } else {
                    const endTick = system.currentTick*TicksPerSecond*6;
                    const num = system.runInterval(() => {
                        if (!en.isValid) {
                            system.clearRun(num);
                            return;
                        }
                        if (endTick <= system.currentTick) {
                            system.clearRun(num);
                            return;
                        }
                        en.applyDamage(10, {
                            cause: EntityDamageCause.starve
                        });
                    }, 4);
                    en.addEffect(MinecraftEffectTypes.MiningFatigue, 120*TicksPerSecond, { amplifier: 15 });
                }

            });

            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
            entity.removeTag(entity.id + "wakuti_kou");

        } catch (error: any) {
        }

    }

    /**
     * 紫樹腐毒の香
     */
    shizyufudokunokou(entity:Entity) {
        if (entity === undefined) {
            return;
        }
        try {
            
            entity.addTag(entity.id + "wakuti_kou");

            const entities = entity.dimension.getEntities({
                excludeTags: [entity.id + "wakuti_kou"],
                excludeFamilies: ["inanimate"],
                excludeTypes: ["item"],
                location: entity.location,
                maxDistance: 12
            });

            entity.dimension.spawnParticle("kurokumaft:wakuti_fog", entity.location);
            entities.forEach(en => {
                if (en instanceof Player) {
                    if (en.getGameMode() !== GameMode.Spectator && en.getGameMode() !== GameMode.Creative) {
                        en.addEffect(MinecraftEffectTypes.FatalPoison, 120*TicksPerSecond, { amplifier: 10 });
                    }
                } else {
                    en.addTag("fuzi_poison");
                }

            });

            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
            entity.removeTag(entity.id + "wakuti_kou");

        } catch (error: any) {
        }

    }

}
