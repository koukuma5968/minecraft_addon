import { ItemStack, MolangVariableMap, Entity, system, TicksPerSecond, Player } from "@minecraft/server";
import { addRegimentalFilter, getDistanceLocation, getLookLocationDistance, getLookLocationDistancePitch, getRandomInRange} from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";
import { shooting } from "../../common/ShooterEvent";

export class KaminariNoKata extends KataComonClass {

    /**
     * 壱ノ型 霹靂一閃
     */
    ichiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu1.value"}]});
        }

        const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);

        const num = system.runInterval(() => {
            try {
                const filter = addRegimentalFilter(0, entity.location, 2.5, entity);
                this.kokyuApplyDamage(entity, filter, 3, 1, itemStack);
                entity.applyKnockback(distance.x,distance.z,6,0);
            } catch (error) {
                system.clearRun(num);
            }
        },1);

        system.runTimeout(() => {

            try {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            } finally {
                system.clearRun(num);
            }
        },6);

    }

    /**
     * 壱ノ型 霹靂一閃
     */
    ichiNoKataRen(entity:Entity, itemStack:ItemStack | undefined) {
        const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
        const num = system.runInterval(() => {
            try {
                const filter = addRegimentalFilter(0, entity.location, 2.5, entity);
                this.kokyuApplyDamage(entity, filter, 3, 1, itemStack);
                entity.applyKnockback(distance.x,distance.z,6,0);
            } catch (error) {
                system.clearRun(num);
            }
        },1);

        system.runTimeout(() => {
            entity.teleport(entity.location, {
                keepVelocity: false,
                rotation: {
                    x:0,
                    y:entity.getRotation().y + getRandomInRange(75, 115)
                }
            });
            system.clearRun(num);
        },6);

    }

    /**
     * 壱ノ型 霹靂一閃（六連）
     */
    ichiNoKataRoku(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu1.value"}]});
        }

        entity.setProperty("kurokumaft:kokyu_use", false);
        this.ichiNoKataRen(entity, itemStack);
        const num = system.runInterval(() => {
            this.ichiNoKataRen(entity, itemStack);
        }, 8);

        system.runTimeout(() => {
            try {
                entity.setProperty("kurokumaft:kokyu_particle", false);
                if (entity instanceof Player) {
                    entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu1_rengeki.value",with:["6"]}]});
                }
            } finally {
                system.clearRun(num);
            }
        },49);

    }

    /**
     * 壱ノ型 霹靂一閃（八連）
     */
    ichiNoKataHati(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu1.value"}]});
        }

        entity.setProperty("kurokumaft:kokyu_use", false);
        this.ichiNoKataRen(entity, itemStack);
        const num = system.runInterval(() => {
            this.ichiNoKataRen(entity, itemStack);
        }, 8);

        system.runTimeout(() => {
            try {
                entity.setProperty("kurokumaft:kokyu_particle", false);
                if (entity instanceof Player) {
                    entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu1_rengeki.value",with:["8"]}]});
                }
            } finally {
                system.clearRun(num);
            }
        },65);

    }


    /**
     * 壱ノ型 霹靂一閃 神速
     */
    ichiNoKataShinsoku(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu1_shinsoku.value"}]});
        }

        const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
        entity.applyKnockback(distance.x,distance.z,50,0);

        const num = system.runInterval(() => {
            try {
                const filter = addRegimentalFilter(0, entity.location, 3.5, entity);
                this.kokyuApplyDamage(entity, filter, 5, 2, itemStack);
            } catch (error) {
                system.clearRun(num);
            }
        },1);

        system.runTimeout(() => {
            try {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            } finally {
                system.clearRun(num);
            }
        },6);

    }

    /**
     * 弐ノ型 稲魂
     */
    niNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu2.value"}]});
        }

        const num = system.runInterval(() => {
            try {
                const distance = getLookLocationDistancePitch(entity.getRotation(), 1.5, 0);
                const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
                this.kokyuApplyDamage(entity, filter, 3, 1, itemStack);
            } catch (error) {
                system.clearRun(num);
            }
        },4);
        system.runTimeout(() => {
            try {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            } finally {
                system.clearRun(num);
            }
        },20);

    }

    /**
     * 参ノ型 聚蚊成雷
     */
    sanNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu3.value"}]});
        }

        const num = system.runInterval(() => {
            try {
                const filter = addRegimentalFilter(0, entity.location, 4, entity);
                this.kokyuApplyDamage(entity, filter, 3, 1, itemStack);
            } catch (error) {
                system.clearRun(num);
            }
        },2);

        const distance = getLookLocationDistance(entity.getRotation().y, 2, -2, 0);
        entity.applyKnockback(distance.x,distance.z,2,0);
        entity.teleport(entity.location, {
            keepVelocity: false,
            rotation: {
                x:0,
                y:entity.getRotation().y + 90
            }
        });

        const num2 = system.runInterval(() => {
            try {
                const distance = getLookLocationDistance(entity.getRotation().y, 2, -2, 0);
                entity.applyKnockback(distance.x,distance.z,2,0);
                entity.teleport(entity.location, {
                    keepVelocity: false,
                    rotation: {
                        x:0,
                        y:entity.getRotation().y - 90
                    }
                });
            } catch (error) {
                system.clearRun(num2);
            }
        }, 5);

        system.runTimeout(() => {

            try {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            } finally {
                system.clearRun(num);
                system.clearRun(num2);
            }
        },30);

    }

    /**
     * 肆ノ型 遠雷
     */
    shiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu4.value"}]});
        }
        entity.setProperty("kurokumaft:kokyu_use", false);

        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);
        const num = system.runInterval(() => {

            try {
                const distance = getLookLocationDistance(entity.getRotation().y, 8, 0, 0);
                const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 8, entity);
                this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);
        
                entity.dimension.spawnParticle("kurokumaft:kaminari4_particle",entity.location,molang);
            } catch (error) {
                system.clearRun(num);
            }
        },2);

        system.runTimeout(() => {

            try {
                entity.setProperty("kurokumaft:kokyu_particle", false);
            } finally {
                system.clearRun(num);
            }
        },20);

    }

    /**
     * 伍ノ型 熱界雷
     */
    goNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu5.value"}]});
        }

        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const num = system.runInterval(() => {
            try {
                entity.dimension.spawnParticle("kurokumaft:kaminari5_particle", entity.location, molang);
            } catch (error) {
                system.clearRun(num);
            }
        },1);

        let event = "kurokumaft:small_damage";
        if (kaikyuNum > 8) {
            event = "kurokumaft:lage_damage";
        } else if (kaikyuNum > 4) {
            event = "kurokumaft:middle_damage";
        }
        const dragon = shooting(entity, "kurokumaft:kaminari_dragon_small", 0, 3, event);

        system.runTimeout(() => {
            if (dragon.isValid()) {
                dragon.remove();
            }
        }, 2*TicksPerSecond);

        const filter = addRegimentalFilter(1, entity.location, 6, entity);
        this.kokyuApplyDamage(entity, filter, 5, 2, itemStack);

        system.runTimeout(() => {

            try {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            } finally {
                system.clearRun(num);
            }
        },10);

    }

    /**
     * 陸ノ型 電轟雷轟
     */
    rokuNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu6.value"}]});
        }

        const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
        entity.applyKnockback(distance.x,distance.z,0,0.8);

        entity.addEffect(MinecraftEffectTypes.SlowFalling, 1*TicksPerSecond,{
            amplifier: 1,
            showParticles: false
        });

        const nowloc = entity.location;
        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);
        const num = system.runInterval(() => {

            try {
                entity.dimension.spawnParticle("kurokumaft:kaminari6_particle",nowloc,molang);
            } catch (error) {
                system.clearRun(num);
            }
        },1);

        const filter = addRegimentalFilter(1, entity.location, 15, entity);
        this.kokyuApplyDamage(entity, filter, 8, 4, itemStack);

        system.runTimeout(() => {

            try {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            } finally {
                system.clearRun(num);
            }
        },10);

    }

    /**
     * 漆ノ型 火雷神
     */
    shitiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu7.value"}]});
        }

        const filter = addRegimentalFilter(1, entity.location, 30, entity);

        const targets = entity.dimension.getEntities(filter);
        if (targets.length > 0) {
            entity.teleport(targets[0].location, {
                facingLocation: targets[0].location,
            });
        }

        const filter2 = addRegimentalFilter(0, entity.location, 8, entity);
        this.kokyuApplyDamage(entity, filter2, 20, 8, itemStack);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },10);

    }

}
