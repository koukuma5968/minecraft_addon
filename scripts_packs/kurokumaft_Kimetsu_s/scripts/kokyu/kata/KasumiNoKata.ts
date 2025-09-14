import { ItemStack, MolangVariableMap, Entity, system, TicksPerSecond, Player } from "@minecraft/server";
import { addRegimentalFilter, getDistanceLocation, getLookLocationDistance, getLookLocationDistancePitch} from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { ItemDurabilityDamage } from "../../common/KimetuItemDurabilityDamage";

export class KasumiNoKata extends KataComonClass {

    /**
     * 壱ノ型 垂天遠霞
     */
    ichiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kasumi_kokyu1.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        entity.setProperty("kurokumaft:kokyu_use", false);

        const distance1 = getLookLocationDistancePitch(entity.getRotation(), 1.5, 0);
        const filter1 = addRegimentalFilter(0, getDistanceLocation(entity.location, distance1), 3, entity);
        this.kokyuApplyDamage(entity, filter1, 3);

        const distance2 = getLookLocationDistancePitch(entity.getRotation(), 4.5, 0);
        const filter2 = addRegimentalFilter(0, getDistanceLocation(entity.location, distance2), 2, entity);
        this.kokyuApplyDamage(entity, filter2, 3);

        system.waitTicks(5).then(() => {
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
        });

    }
    /**
     * 弐ノ型 八重霞
     */
    niNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kasumi_kokyu2.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }

        const num = system.runInterval(() => {
            try {
                if (entity === undefined) {
                    system.clearRun(num);
                    return;
                }

                const filter = addRegimentalFilter(0, entity.location, 4, entity);
                this.kokyuApplyDamage(entity, filter, 4);
            } catch (error: any) {
                system.clearRun(num);
            }
        },2);
        system.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

    }

    /**
     * 参ノ型 霞散の飛沫
     */
    sanNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kasumi_kokyu3.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        entity.setProperty("kurokumaft:kokyu_use", false);

        const filter = addRegimentalFilter(0, entity.location, 6, entity);
        this.kokyuApplyDamage(entity, filter, 5);

        system.waitTicks(10).then(() => {
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
        });

    }

    /**
     * 肆ノ型 移流斬り
     */
    shiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kasumi_kokyu4.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        entity.setProperty("kurokumaft:kokyu_use", false);

        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const filter = addRegimentalFilter(0, entity.location, 2.5, entity);
        this.kokyuApplyDamage(entity, filter, 5);
        entity.dimension.spawnParticle("kurokumaft:kasumi_fog_particle", entity.location, molang);

        const num = system.runInterval(() => {
            try {
                if (entity === undefined) {
                    system.clearRun(num);
                    return;
                }
                entity.dimension.spawnParticle("kurokumaft:kasumi_fog_particle", entity.location, molang);
            } catch (error: any) {
                system.clearRun(num);
            }
        },2);

        const distance = getLookLocationDistance(entity.getRotation().y, 10, 0, 0);
        entity.applyKnockback({x:distance.x,z:distance.z},0);

        system.waitTicks(10).then(() => {
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

    }

    /**
     * 伍ノ型 霞雲の海
     */
    goNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kasumi_kokyu5.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }

        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);
        const distance = getLookLocationDistance(entity.getRotation().y, 2, 0, 0);
        entity.applyKnockback({x:distance.x,z:distance.z},0.5);

        const num = system.runInterval(() => {
            try {
                if (entity === undefined) {
                    system.clearRun(num);
                    return;
                }

                const filter = addRegimentalFilter(0, entity.location, 3, entity);
                this.kokyuApplyDamage(entity, filter, 4);

                entity.applyKnockback({x:distance.x,z:distance.z},0);
                const pdistance = getLookLocationDistance(entity.getRotation().y, 2, 0, 0);
                entity.dimension.spawnParticle("kurokumaft:kasumi_fog_particle", getDistanceLocation(entity.location, pdistance), molang);
            } catch (error: any) {
                system.clearRun(num);
            }
    
        },2);

        system.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

    }

    /**
     * 陸ノ型 月の霞消
     */
    rokuNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kasumi_kokyu6.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const num = system.runInterval(() => {
            try {
                if (entity === undefined) {
                    system.clearRun(num);
                    return;
                }
                const distance = getLookLocationDistance(entity.getRotation().y, 1.5, 0, -0.5);
                const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 6, entity);
                this.kokyuApplyDamage(entity, filter, 3);

                entity.dimension.spawnParticle("kurokumaft:kasumi_fog_particle", getDistanceLocation(entity.location, distance), molang);

            } catch (error: any) {
                system.clearRun(num);
            }
        },4);

        const distance = getLookLocationDistance(entity.getRotation().y, 5, 0, 1);
        entity.applyKnockback({x:distance.x,z:distance.z},0.5);

        system.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

    }

    /**
     * 漆ノ型 朧
     */
    shitiNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity.getDynamicProperty("kurokumaft:chage_type") === undefined) {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kasumi_kokyu7.value"}]});
                if (itemStack !== undefined) {
                    ItemDurabilityDamage(entity, itemStack);
                }
            }
            entity.setDynamicProperty("kurokumaft:chage_type", true);
            const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
            const molang = new MolangVariableMap();
            molang.setFloat("variable.kaikyu", kaikyuNum);

            entity.addEffect("minecraft:speed", 10*TicksPerSecond,{
                amplifier: 3,
                showParticles: false
            });

            entity.setProperty("kurokumaft:kokyu_chage", 1);
            entity.dimension.spawnParticle("kurokumaft:kasumi_fog_lage_particle",entity.location, molang);
            entity.addEffect("minecraft:invisibility", 20,{
                amplifier: 10,
                showParticles: false
            });
            const num = system.runInterval(() => {
                try {
                    if (entity === undefined) {
                        system.clearRun(num);
                        return;
                    }
                    entity.dimension.spawnParticle("kurokumaft:kasumi_fog_lage_particle",entity.location, molang);
        
                    if (entity.getProperty("kurokumaft:kokyu_chage") === 1) {
                        entity.setProperty("kurokumaft:kokyu_chage", 2);
                        entity.removeEffect("minecraft:invisibility");
                    } else {
                        entity.setProperty("kurokumaft:kokyu_chage", 1);
                        entity.addEffect("minecraft:invisibility", 20,{
                            amplifier: 10,
                            showParticles: false
                        });
                    }
                } catch (error: any) {
                        system.clearRun(num);
                }
            },20);
    
            system.waitTicks(10*TicksPerSecond).then(() => {
                entity.setProperty("kurokumaft:kokyu_chage", 0);
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
                entity.setDynamicProperty("kurokumaft:chage_type", undefined);
            }).catch((error: any) => {
            }).finally(() => {
                system.clearRun(num);
            });
        }

    }

}
