import { ItemStack, MolangVariableMap, Entity, system, TicksPerSecond, Player } from "@minecraft/server";
import { addRegimentalFilter, getDistanceLocation, getLookLocationDistance, weightChoice} from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { ItemDurabilityDamage } from "../../common/KimetuItemDurabilityDamage";

export class HanaNoKata extends KataComonClass {

    /**
     * 弐ノ型 御影梅
     */
    niNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hana_kokyu2.value"}]});
                if (itemStack !== undefined) {
                    ItemDurabilityDamage(entity, itemStack);
                }
            }

            const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
            const molang = new MolangVariableMap();
            molang.setFloat("variable.kaikyu", kaikyuNum);
            const num = system.runInterval(() => {
                try {
                    const distance = getLookLocationDistance(entity.getRotation().y, 2, 0, 0);
                    const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 2.5, entity);
                    entity.dimension.spawnParticle("kurokumaft:hana_ni_particle", getDistanceLocation(entity.location, distance), molang);
                    this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);
                } catch (error: any) {
                    system.clearRun(num);
                }
            },4);
            system.waitTicks(TicksPerSecond).then(() => {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            }).catch((error: any) => {
            }).finally(() => {
                system.clearRun(num);
            });
        } catch (error: any) {
        } finally {
        }

    }

    /**
     * 肆ノ型 紅花衣
     */
    shiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hana_kokyu4.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        const distance = getLookLocationDistance(entity.getRotation().y, 2, 0, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
        this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);
        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);
        entity.dimension.spawnParticle("kurokumaft:hana_shi_particle",getDistanceLocation(entity.location, distance),molang);

        system.waitTicks(TicksPerSecond).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
        });

    }

    /**
     * 伍ノ型 徒の芍薬
     */
    goNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hana_kokyu5.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        let count = 1;
        const num = system.runInterval(() => {
            try {
                const distance = getLookLocationDistance(entity.getRotation().y, 2, 0, 0);
                const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 2.5, entity);
                this.kokyuApplyDamage(entity, filter, 4, 2, itemStack);
                if (count <= 9) {
                    entity.dimension.spawnParticle("kurokumaft:hana_go_"+ count +"_particle",getDistanceLocation(entity.location, distance),molang);
                    count++;
                }
            } catch (error: any) {
                system.clearRun(num);
            }
        },2);

        system.waitTicks(TicksPerSecond).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

    }

    /**
     * 陸ノ型 渦桃
     */
    rokuNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hana_kokyu6.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const distanceK = getLookLocationDistance(entity.getRotation().y, 3, 0, 1);
        entity.applyKnockback({x:distanceK.x,z:distanceK.z},0.5);

        const num = system.runInterval(() => {
            try {
                entity.applyKnockback({x:distanceK.x,z:distanceK.z},0);
                const distance = getLookLocationDistance(entity.getRotation().y, 1.5, 0, 0);
                const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
                this.kokyuApplyDamage(entity, filter, 3, 1, itemStack);
        
                entity.dimension.spawnParticle("kurokumaft:hana_roku_particle", getDistanceLocation(entity.location, distance), molang);
            } catch (error: any) {
                system.clearRun(num);
            }
        },3);

        system.waitTicks(10).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });
    }

    private higanLists = weightChoice([
        { item: 'minor' , weight: 50 },
        { item: 'serious' , weight: 35 },
        { item: 'blindness' , weight: 15 },
    ]);

    /**
     * 終ノ型 彼岸朱眼
     */
    shitiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
        if (entity.getDynamicProperty("kurokumaft:chage_type") === undefined) {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hana_kokyu7.value"}]});
                if (itemStack !== undefined) {
                    ItemDurabilityDamage(entity, itemStack);
                }
            }
            entity.setDynamicProperty("kurokumaft:chage_type", true);
    
            entity.addEffect("minecraft:speed", 200*TicksPerSecond,{
                amplifier: 5,
                showParticles: false
            });
            entity.addEffect("minecraft:jump_boost", 200*TicksPerSecond,{
                amplifier: 3,
                showParticles: false
            });
            entity.addEffect("minecraft:night_vision", 200*TicksPerSecond,{
                amplifier: 10,
                showParticles: false
            });
            system.waitTicks(180*TicksPerSecond).then(() => {
                entity.setDynamicProperty("kurokumaft:chage_type", undefined);

                entity.removeEffect("minecraft:speed");
                entity.removeEffect("minecraft:jump_boost");
                entity.removeEffect("minecraft:night_vision");

                const choice = this.higanLists.pick();
                switch (choice as string) {
                    case 'blindness': 
                        entity.addEffect("minecraft:blindness", 600*TicksPerSecond,{
                            amplifier: 3,
                            showParticles: false
                        });
                    case 'serious': 
                        entity.addEffect("minecraft:weakness", 10*TicksPerSecond,{
                            amplifier: 1,
                            showParticles: false
                        });
                    case 'minor': 
                        entity.addEffect("minecraft:slowness", 10*TicksPerSecond,{
                            amplifier: 1,
                            showParticles: false
                        });
                    break;
                }
            }).catch((error: any) => {
            }).finally(() => {
            });
        }

    }

}
