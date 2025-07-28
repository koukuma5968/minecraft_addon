import { ItemStack, MolangVariableMap, Entity, system, TicksPerSecond, Player } from "@minecraft/server";
import { addRegimentalFilter, getDistanceLocation, getLookLocationDistance, getRandomInRange} from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";
import { ItemDurabilityDamage } from "../../common/KimetuItemDurabilityDamage";

export class KoiNoKata extends KataComonClass {

    /**
     * 壱ノ型 初恋のわななき
     */
    ichiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        entity.setProperty("kurokumaft:kokyu_use", false);
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:koi_kokyu1.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }

        const num = system.runInterval(() => {

            try {
                const distance = getLookLocationDistance(entity.getRotation().y, 4, 0, 0);
                entity.applyKnockback({x:distance.x,z:distance.z},0);
                const filter = addRegimentalFilter(0, entity.location, 8, entity);
                this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);
            } catch (error: any) {
                system.clearRun(num);
            }
        },2);

        system.waitTicks(10).then(() => {
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

    }

    /**
     * 弐ノ型 懊悩巡る恋
     */
    niNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:koi_kokyu2.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        try {
            const filter = addRegimentalFilter(0, entity.location, 8, entity);
            this.kokyuApplyDamage(entity, filter, 4, 2, itemStack);
            const distance = getLookLocationDistance(entity.getRotation().y, 4, 0, 0);
            entity.applyKnockback({x:distance.x,z:distance.z},0.75);

        } catch (error: any) {
        }

        system.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
            entity.addEffect(MinecraftEffectTypes.SlowFalling, 1*TicksPerSecond,{
                amplifier: 1,
                showParticles: false
            });
        }).catch((error: any) => {
        }).finally(() => {
        });
    }

    /**
     * 参ノ型 恋猫しぐれ
     */
    sanNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:koi_kokyu3.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        const distance = getLookLocationDistance(entity.getRotation().y, 3, -5, 0);
        entity.applyKnockback({x:distance.x,z:distance.z},0.3);

        entity.dimension.spawnParticle("minecraft:cauldron_explosion_emitter",entity.location);
        entity.setProperty("kurokumaft:kokyu_attack", true);

        let side = 5;
        const num = system.runInterval(() => {

            try {
                const filter = addRegimentalFilter(0, entity.location, 8, entity);
                this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);
    
                const distance = getLookLocationDistance(entity.getRotation().y, 3, side, 0);
                entity.applyKnockback({x:distance.x,z:distance.z},0.3);
                entity.dimension.spawnParticle("minecraft:cauldron_explosion_emitter",entity.location);

                side = -side;
            } catch (error: any) {
                system.clearRun(num);
            }
        },10);

        system.waitTicks(60).then(() => {
            entity.setProperty("kurokumaft:kokyu_attack", false);
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

    }

    /**
     * 伍ノ型 揺らめく恋情・乱れ爪
     */
    goNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:koi_kokyu5.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        const distance = getLookLocationDistance(entity.getRotation().y, 4, 0, 0);
        entity.applyKnockback({x:distance.x,z:distance.z},1.0);

        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        system.waitTicks(10).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            const distance = getLookLocationDistance(entity.getRotation().y, 0, 0, -1);
            const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 8, entity);

            const parnum = system.runInterval(() => {

                try {
                    this.kokyuApplyDamage(entity, filter, 3, 1, itemStack);
                } catch (error: any) {
                    system.clearRun(parnum);
                }

            },1);
            entity.addEffect(MinecraftEffectTypes.SlowFalling, 1*TicksPerSecond,{
                amplifier: 1,
                showParticles: false
            });

            system.waitTicks(10).then(() => {
                try {
                    entity.setProperty("kurokumaft:kokyu_particle", false);
                    entity.removeEffect(MinecraftEffectTypes.SlowFalling);
                    system.runTimeout(() => {
                        entity.addEffect(MinecraftEffectTypes.SlowFalling, 1*TicksPerSecond,{
                            amplifier: 1,
                            showParticles: false
                        });
                    },5);
                } finally {
                    system.clearRun(parnum);
                }
            }).catch((error: any) => {
            }).finally(() => {
            });
        }).catch((error: any) => {
        }).finally(() => {
        });

    }

    /**
     * 陸ノ型 猫足恋風
     */
    rokuNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:koi_kokyu6.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        const distance = getLookLocationDistance(entity.getRotation().y, -3, 0, 0);
        entity.applyKnockback({x:distance.x,z:distance.z},1);

        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        system.waitTicks(10).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);

            const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, -1.0);
            const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 8, entity);

            const parnum = system.runInterval(() => {

                try {
                    this.kokyuApplyDamage(entity, filter, 3, 1, itemStack);
                } catch (error: any) {
                    system.clearRun(parnum);
                }
            },1);

            system.waitTicks(10).then(() => {
                entity.setProperty("kurokumaft:kokyu_particle", false);
                entity.addEffect(MinecraftEffectTypes.SlowFalling, 1*TicksPerSecond,{
                    amplifier: 1,
                    showParticles: false
                });
            }).catch((error: any) => {
            }).finally(() => {
                system.clearRun(parnum);
            });

        }).catch((error: any) => {
        }).finally(() => {
        });

    }

}
