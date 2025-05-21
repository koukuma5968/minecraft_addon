import { EntityDamageCause, EntityQueryOptions, EquipmentSlot, ItemStack, MolangVariableMap, Entity, system, Player } from "@minecraft/server";
import { ZytuComonClass } from "./ZytuComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export class Bakketu extends ZytuComonClass {

    /**
     * 爆血
     */
    bakketu(entity:Entity) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_bakketu1.value"}]});
        }

        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);

        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        entity.addTag(entity.id);
        const healthFilterOption = {
            excludeFamilies: [
                "inanimate", "orge", "monster"
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
        const targets1 = entity.dimension.getEntities(healthFilterOption);

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
        const targets2 = entity.dimension.getEntities(fireFilterOption);

        const num = system.runInterval(() => {
            targets1.forEach(en => {
                entity.dimension.spawnParticle("kurokumaft:bakketu",en.location, molang);
            });
            targets2.forEach(en => {
                entity.dimension.spawnParticle("kurokumaft:bakketu",en.location, molang);
            });
        },4);

        system.runTimeout(() => {
            system.clearRun(num);
            const num2 = system.runInterval(() => {
                targets1.forEach(en => {
                    entity.dimension.spawnParticle("kurokumaft:bakketu_fire",en.location, molang);
                    en.addEffect(MinecraftEffectTypes.InstantHealth, 2, {
                        amplifier: 2,
                        showParticles: true
                    });
                });

                targets2.forEach(en => {
                    entity.dimension.spawnParticle("kurokumaft:bakketu_fire",en.location, molang);
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
                });
    
            },4);

            system.runTimeout(() => {
                system.clearRun(num2);
            },40);
        }, 30);

        entity.removeTag(entity.id);
    }

}
