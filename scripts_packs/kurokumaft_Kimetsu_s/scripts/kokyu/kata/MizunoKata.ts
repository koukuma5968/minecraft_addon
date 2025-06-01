import { EntityDamageCause, EquipmentSlot, ItemStack, MolangVariableMap, Entity, system, TicksPerSecond, Player } from "@minecraft/server";
import { addRegimentalFilter, getDistanceLocation, getLookLocationDistance, getLookLocationDistancePitch, weightChoice } from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";
import { shooting } from "../../common/ShooterEvent";
import { ItemDurabilityDamage } from "../../common/KimetuItemDurabilityDamage";

export class MizuNoKata extends KataComonClass {

    /**
     * 壱ノ型 水面切り
     */
    ichiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        entity.setProperty("kurokumaft:kokyu_use", false);
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:mizu_kokyu1.value"}]});
        }
        const distance = getLookLocationDistancePitch(entity.getRotation(), 3, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
        this.kokyuApplyDamage(entity, filter, 4, 2, itemStack);
        this.nitirintouFillBlock(
            entity.dimension,
            getDistanceLocation(entity.location, {x:distance.x-3,y:distance.y,z:distance.z-3}),
            getDistanceLocation(entity.location, {x:distance.x+3,y:distance.y+2,z:distance.z+3})
        );

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },6);
    }

    /**
     * 弐ノ型 水車
     */
    niNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:mizu_kokyu2.value"}]});
        }
        // fornt
        const fdistance = getLookLocationDistance(entity.getRotation().y, 2.5, 0, 0);
        const ffilter = addRegimentalFilter(0, getDistanceLocation(entity.location, fdistance), 2.5, entity);
        this.kokyuApplyDamage(entity, ffilter, 3, 1, itemStack);
        // back
        const bdistance = getLookLocationDistance(entity.getRotation().y, -2.5, 0, 0);
        const bfilter = addRegimentalFilter(0, getDistanceLocation(entity.location, bdistance), 2.5, entity);
        this.kokyuApplyDamage(entity, bfilter, 3, 1, itemStack);
        // up
        const udistance = getLookLocationDistance(entity.getRotation().y, 0, 0, 2.5);
        const ufilter = addRegimentalFilter(0, getDistanceLocation(entity.location, udistance), 2.5, entity);
        this.kokyuApplyDamage(entity, ufilter, 3, 1, itemStack);
        // down
        const ddistance = getLookLocationDistance(entity.getRotation().y, 0, 0, -2.5);
        const dfilter = addRegimentalFilter(0, getDistanceLocation(entity.location, ddistance), 2.5, entity);
        this.kokyuApplyDamage(entity, dfilter, 3, 1, itemStack);

        this.nitirintouFillBlock(
            entity.dimension,
            getDistanceLocation(entity.location, {x:entity.location.x-2,y:entity.location.y-2,z:entity.location.z-2}),
            getDistanceLocation(entity.location, {x:entity.location.x+2,y:entity.location.y+4,z:entity.location.z+2})
        );

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },TicksPerSecond);
    }

    /**
     * 参ノ型 流流舞い
     */
    sanNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:mizu_kokyu3.value"}]});
        }

        const num = system.runInterval(() => {

            try {
                const point = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
                entity.applyKnockback(point.x,point.z,2,0);

                const distance = getLookLocationDistancePitch(entity.getRotation(), 1, 0);
                const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 4, entity);
                this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);
            } catch (error) {
                system.clearRun(num);
            }

        },6);

        system.runTimeout(() => {

            try {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            } finally {
                system.clearRun(num);
            }
        },30);

    }

    /**
     * 肆ノ型 打ち潮
     */
    shiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:mizu_kokyu4.value"}]});
        }
        let side = -2;
        const num = system.runInterval(() => {

            try {
                const distance = getLookLocationDistancePitch(entity.getRotation(), 1.5, side);
                const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3.5, entity);

                entity.dimension.spawnParticle("kurokumaft:mizu2_particle",getDistanceLocation(entity.location, distance));
                this.kokyuApplyDamage(entity, filter, 3, 1, itemStack);
                side=-side
            } catch (error) {
                system.clearRun(num);
            }
        },8);

        system.runTimeout(() => {

            try {
                entity.setProperty("kurokumaft:kokyu_particle", false);
                entity.setProperty("kurokumaft:kokyu_use", false);
            } finally {
                system.clearRun(num);
            }
        },30);

    }

    /**
     * 伍ノ型 干天の慈雨
     */
    goNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:mizu_kokyu5.value"}]});
        }
        const goKataLists = weightChoice([
            { item: 'small' , weight: 55 },
            { item: 'lage' , weight: 40 },
            { item: 'kill' , weight: 5 },
        ]);

        entity.addTag(entity.id);
        const distance = getLookLocationDistancePitch(entity.getRotation(), 1.5, 0);
        const filter = addRegimentalFilter(1, getDistanceLocation(entity.location, distance), 3, entity);

        const targets = entity.dimension.getEntities(filter);
        targets.forEach(en => {
            const choice = goKataLists.pick();
            switch (choice as string) {
                case 'small': 
                    if (en instanceof Player) {
                        if (this.gardCheck(en)) {
                            en.applyDamage(2, {
                                cause: EntityDamageCause.entityAttack,
                                damagingEntity: entity
                            });
                        }
                    } else {
                        en.applyDamage(3, {
                            cause: EntityDamageCause.entityAttack,
                            damagingEntity: entity
                        });
                    }
       
                    break;
                case 'lage': 
                    if (en instanceof Player) {
                        if (this.gardCheck(en)) {
                            en.applyDamage(3, {
                                cause: EntityDamageCause.entityAttack,
                                damagingEntity: entity
                            });
                        }
                    } else {
                        en.applyDamage(8, {
                            cause: EntityDamageCause.entityAttack,
                            damagingEntity: entity
                        });
                    }

                    break;
                case 'kill': 
                    en.kill();
                    break;
            }
    
        });
        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);
        entity.dimension.spawnParticle("kurokumaft:mizu5_particle",entity.location,molang);
        entity.dimension.spawnParticle("kurokumaft:mizu5_particle",entity.location,molang);
        entity.removeTag(entity.id);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_particle", false);
            entity.setProperty("kurokumaft:kokyu_use", false);
        },4);


    }

    /**
     * 陸ノ型 ねじれ渦
     */
    rokuNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        entity.setProperty("kurokumaft:kokyu_use", false);
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:mizu_kokyu6.value"}]});
        }
        if (entity.isInWater) {
            const filter = addRegimentalFilter(0, entity.location, 5, entity);
            this.kokyuApplyDamage(entity, filter, 10, 4, itemStack);
        } else {
            const filter = addRegimentalFilter(0, entity.location, 3.5, entity);
            this.kokyuApplyDamage(entity, filter, 5, 2, itemStack);
        }
        const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 1);
        entity.applyKnockback(distance.x,distance.z,0,1);
        const num = system.runInterval(() => {

            try {
                if (entity.isInWater) {
                    const filter = addRegimentalFilter(0, entity.location, 5, entity);
                    this.kokyuApplyDamage(entity, filter, 10, 4, itemStack);
                } else {
                    const filter = addRegimentalFilter(0, entity.location, 3.5, entity);
                    this.kokyuApplyDamage(entity, filter, 5, 2, itemStack);
                }
            } catch (error) {
                system.clearRun(num);
            }
        },4);

        system.runTimeout(() => {
            entity.addEffect(MinecraftEffectTypes.SlowFalling, 2*TicksPerSecond,{
                amplifier: 1,
                showParticles: false
            });
        },20);

        system.runTimeout(() => {

            try {
                entity.removeEffect(MinecraftEffectTypes.SlowFalling);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            } finally {
                system.clearRun(num);
            }
        },25);

    }

    /**
     * 漆ノ型 雫波紋突き
     */
    shitiNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        entity.setProperty("kurokumaft:kokyu_use", false);
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:mizu_kokyu7.value"}]});
        }
        const distance = getLookLocationDistancePitch(entity.getRotation(), 3.5, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 2.5, entity);
        this.kokyuApplyDamage(entity, filter, 6, 3, itemStack);

        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        entity.dimension.spawnParticle("kurokumaft:mizu7_1_particle",getDistanceLocation(entity.location, distance),molang);
        entity.dimension.spawnParticle("kurokumaft:mizu7_2_particle",getDistanceLocation(entity.location, distance),molang);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },5);

    }

    /**
     * 捌ノ型 滝壺
     */
    hachiNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        entity.setProperty("kurokumaft:kokyu_use", false);
        if (!entity.getDynamicProperty("kurokumaft:mizuhati")) {

             if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:mizu_kokyu8.value"}]});
            }
            entity.setDynamicProperty("kurokumaft:mizuhati", true);

            const oLocate = entity.location;
            const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
            entity.applyKnockback(distance.x,distance.z,0,1.5);
            let parnum = 0;

            system.runTimeout(() => {
                entity.setProperty("kurokumaft:kokyu_particle", false);
                const filter = addRegimentalFilter(0, oLocate, 6, entity);

                const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
                const molang = new MolangVariableMap();
                molang.setFloat("variable.kaikyu", kaikyuNum);
                parnum = system.runInterval(() => {

                    try {
                        entity.dimension.spawnParticle("kurokumaft:mizu8_particle",{x:oLocate.x, y:oLocate.y+0.5,z:oLocate.z}, molang);
                        entity.dimension.spawnParticle("kurokumaft:mizu_pillar_particle",{x:entity.location.x+1, y:entity.location.y-0.5,z:entity.location.z+1}, molang);
                        entity.dimension.spawnParticle("kurokumaft:mizu_pillar_particle",{x:entity.location.x+1, y:entity.location.y-0.5,z:entity.location.z-1}, molang);
                        entity.dimension.spawnParticle("kurokumaft:mizu_pillar_particle",{x:entity.location.x-1, y:entity.location.y-0.5,z:entity.location.z+1}, molang);
                        entity.dimension.spawnParticle("kurokumaft:mizu_pillar_particle",{x:entity.location.x-1, y:entity.location.y-0.5,z:entity.location.z-1}, molang);
                        this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);
                    } catch (error) {
                        system.clearRun(parnum);
                    }
                },3);
    
            },25);

            system.runTimeout(() => {
                entity.addEffect(MinecraftEffectTypes.SlowFalling, 2*TicksPerSecond,{
                    amplifier: 1,
                    showParticles: false
                });
            },30);
    
            system.runTimeout(() => {

                try {
                    entity.removeEffect(MinecraftEffectTypes.SlowFalling);
                    entity.setDynamicProperty("kurokumaft:mizuhati", false);
                } finally {
                    system.clearRun(parnum);
                }
            },40);

        }
    }

    /**
     * 玖ノ型 水流飛沫・乱
     */
    kuNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity.getDynamicProperty("kurokumaft:chage_type") == undefined) {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:mizu_kokyu9.value"}]});
            }
            entity.setDynamicProperty("kurokumaft:chage_type", true);

            entity.addEffect(MinecraftEffectTypes.Speed, 10*TicksPerSecond,{
                amplifier: 5,
                showParticles: false
            });
            entity.addEffect(MinecraftEffectTypes.JumpBoost, 10*TicksPerSecond,{
                amplifier: 3,
                showParticles: false
            });
            system.runTimeout(() => {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
                entity.setDynamicProperty("kurokumaft:chage_type", undefined);
            },10*TicksPerSecond);
        }
    }

    /**
     * 拾ノ型 生生流転　発射
     */
    zyuNoKataShot(entity:Entity, itemStack:ItemStack | undefined) {

        const chage = entity.getProperty("kurokumaft:kokyu_chage") as number;
        entity.setProperty("kurokumaft:kokyu_use", false);
        if (chage == 4) {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:mizu_kokyu10.value"}]});
            }
            entity.setProperty("kurokumaft:kokyu_chage", 10);
            system.runTimeout(() => {
                const dragon = shooting(entity, "kurokumaft:mizu_dragon", 0, 3, undefined);
                entity.setProperty("kurokumaft:kokyu_chage", 0);
                entity.setProperty("kurokumaft:kokyu_particle", false);
                system.runTimeout(() => {
                    if (dragon.isValid()) {
                        dragon.remove();
                    }
                }, 2*TicksPerSecond);
            },10);
        }

    }

    /**
     * 拾ノ型 生生流転
     */
    zyuNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        let chage = entity.getProperty("kurokumaft:kokyu_chage") as number;
        if (chage < 4) {
            entity.setProperty("kurokumaft:kokyu_particle", true);

            if (chage+1 < 4) {
                system.runTimeout(() => {
                    chage = entity.getProperty("kurokumaft:kokyu_chage") as number;
                    if (chage < 4) {
                        entity.setProperty("kurokumaft:kokyu_particle", false);
                    }
                },14);
            }
            entity.setProperty("kurokumaft:kokyu_chage", chage+1);
        }
        const filter = addRegimentalFilter(0, entity.location, 4.5, entity);
        this.kokyuApplyDamage(entity, filter, 6, 3, itemStack);
    }

        /**
     * 拾ノ型 生生流転
     */
    zyuNoKataMob(entity:Entity, itemStack:ItemStack | undefined) {

        entity.setProperty("kurokumaft:kokyu_particle", true);
        entity.setProperty("kurokumaft:kokyu_attack", true);
        const filter = addRegimentalFilter(0, entity.location, 4.5, entity);
        this.kokyuApplyDamage(entity, filter, 4, 2, itemStack);
        const num1 = system.runInterval(() => {
            try {
                const filter = addRegimentalFilter(0, entity.location, 4.5, entity);
                this.kokyuApplyDamage(entity, filter, 4, 2, itemStack);
            } catch (error) {
                system.clearRun(num1);
            }
        }, 10);

        system.runTimeout(() => {
            try {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_attack", false);
                entity.setProperty("kurokumaft:kokyu_chage", 10);
                system.runTimeout(() => {
                    const dragon = shooting(entity, "kurokumaft:mizu_dragon", 0, 3, undefined);
                    entity.setProperty("kurokumaft:kokyu_chage", 0);
                    entity.setProperty("kurokumaft:kokyu_particle", false);
                    system.runTimeout(() => {
                        if (dragon.isValid()) {
                            dragon.remove();
                        }
                    }, 2*TicksPerSecond);
                },10);
            } finally {
                system.clearRun(num1);
            }
        }, 35);

    }

    /**
     * 拾壱ノ型 凪
     */
    zyuichiNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity.getDynamicProperty("kurokumaft:chage_type") == undefined) {
            try {

                if (entity instanceof Player) {
                    entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:mizu_kokyu11.value"}]});
                }
                entity.setDynamicProperty("kurokumaft:chage_type", true);

                this.nagiIntervalId = system.runInterval(() => {
                    try {
                        entity.setProperty("kurokumaft:kokyu_attack", false);
                        this.checkNagiReflection(entity, itemStack);
                    } catch (error) {
                        system.clearRun(this.nagiIntervalId);
                    }
                },2);

                const parnum = system.runInterval(() => {

                    try {
                        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
                        const molang = new MolangVariableMap();
                        molang.setFloat("variable.kaikyu", kaikyuNum);
                        entity.dimension.spawnParticle("kurokumaft:mizu11_particle",entity.location,molang);
                    } catch (error) {
                        system.clearRun(parnum);
                    }
                },TicksPerSecond);

                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kokyu_attack", false);
                    entity.setProperty("kurokumaft:kokyu_use", false);
                    entity.setProperty("kurokumaft:kokyu_particle", false);
                    entity.setDynamicProperty("kurokumaft:chage_type", undefined);
                    system.clearRun(this.nagiIntervalId);
                    system.clearRun(parnum);
                },10*TicksPerSecond);
            } catch (error) {
                system.clearRun(this.nagiIntervalId);
            };

        }
    }

    private nagiIntervalId: number =0;
    private checkNagiReflection(entity: Entity, itemStack:ItemStack | undefined): void {
        if (entity.isValid()) {

            if (this.projectRefrect(entity, entity.location)) {
                entity.setProperty("kurokumaft:kokyu_attack", true);
            }

            entity.addTag(entity.id);
            const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
            const filter = addRegimentalFilter(0, entity.location, 4.5, entity);
            const targets = entity.dimension.getEntities(filter);
            targets.forEach(en => {
                if (en != undefined && en.isValid()) {
                    const view = en.getViewDirection();
                    en.applyKnockback(-Math.round(view.x)*3,-Math.round(view.z)*3,3,0);
                    if (en instanceof Player) {
                        if (this.gardCheck(en)) {
                            en.applyDamage(2*kaikyuNum, {
                                cause: EntityDamageCause.entityAttack,
                                damagingEntity: entity
                            });
                        }
                    } else {
                        en.applyDamage(6*kaikyuNum, {
                            cause: EntityDamageCause.entityAttack,
                            damagingEntity: entity
                        });
                    }
                    entity.setProperty("kurokumaft:kokyu_attack", true);
                    if (itemStack != undefined) {
                        ItemDurabilityDamage(entity, itemStack, EquipmentSlot.Mainhand);
                    }
                }
            });
            entity.removeTag(entity.id);

        } else {
            system.clearRun(this.nagiIntervalId);
        }
    };

}
