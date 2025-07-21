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
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        const distance = getLookLocationDistancePitch(entity.getRotation(), 3, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
        this.kokyuApplyDamage(entity, filter, 4, 2, itemStack);

        system.waitTicks(6).then(() => {
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
        });
    }

    /**
     * 弐ノ型 水車
     */
    niNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:mizu_kokyu2.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
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

        system.waitTicks(5).then(() => {
            const point = getLookLocationDistance(entity.getRotation().y, 4, 0, 0);
            entity.applyKnockback({x:point.x,z:point.z},0.5);
        }).catch((error: any) => {
        }).finally(() => {
        });

        system.waitTicks(TicksPerSecond).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
        });

    }

    /**
     * 参ノ型 流流舞い
     */
    sanNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:mizu_kokyu3.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }

        const num = system.runInterval(() => {

            try {
                const point = getLookLocationDistance(entity.getRotation().y, 3, 0, 0);
                entity.applyKnockback({x:point.x,z:point.z},0);

                const distance = getLookLocationDistancePitch(entity.getRotation(), 1, 0);
                const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 4, entity);
                this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);

            } catch (error: any) {
                system.clearRun(num);
            }

        },6);

        system.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

    }

    /**
     * 肆ノ型 打ち潮
     */
    shiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:mizu_kokyu4.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        let side = -2;
        const num = system.runInterval(() => {

            try {
                const point = getLookLocationDistance(entity.getRotation().y, 3, 0, 0);
                entity.applyKnockback({x:point.x,z:point.z},0);

                const distance = getLookLocationDistancePitch(entity.getRotation(), 1.5, side);
                const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3.5, entity);

                entity.dimension.spawnParticle("kurokumaft:mizu2_particle",getDistanceLocation(entity.location, distance));
                this.kokyuApplyDamage(entity, filter, 3, 1, itemStack);
                side=-side

            } catch (error: any) {
                system.clearRun(num);
            }
        },8);

        system.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

    }

    /**
     * 伍ノ型 干天の慈雨
     */
    goNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:mizu_kokyu5.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
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
            try {
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

            } catch (error: any) {
            }
        });
        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);
        entity.dimension.spawnParticle("kurokumaft:mizu5_particle",entity.location,molang);
        entity.dimension.spawnParticle("kurokumaft:mizu5_particle",entity.location,molang);
        entity.removeTag(entity.id);

        system.waitTicks(4).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
        });


    }

    /**
     * 陸ノ型 ねじれ渦
     */
    rokuNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        entity.setProperty("kurokumaft:kokyu_use", false);

        if (!entity.getDynamicProperty("kurokumaft:mizuroku")) {
            entity.setDynamicProperty("kurokumaft:mizuroku", true);
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:mizu_kokyu6.value"}]});
                if (itemStack !== undefined) {
                    ItemDurabilityDamage(entity, itemStack);
                }
            }
            if (entity.isInWater) {
                const filter = addRegimentalFilter(0, entity.location, 5, entity);
                this.kokyuApplyDamage(entity, filter, 10, 4, itemStack);
            } else {
                const filter = addRegimentalFilter(0, entity.location, 3.5, entity);
                this.kokyuApplyDamage(entity, filter, 5, 2, itemStack);
            }
            const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 1);
            entity.applyKnockback({x:distance.x,z:distance.z},1.5);
            const num = system.runInterval(() => {

                try {
                    if (entity.isInWater) {
                        const filter = addRegimentalFilter(0, entity.location, 5, entity);
                        this.kokyuApplyDamage(entity, filter, 10, 4, itemStack);
                    } else {
                        const filter = addRegimentalFilter(0, entity.location, 3.5, entity);
                        this.kokyuApplyDamage(entity, filter, 5, 2, itemStack);
                    }
                } catch (error: any) {
                    system.clearRun(num);
                }
            },4);

            system.waitTicks(30).then(() => {
                entity.addEffect(MinecraftEffectTypes.SlowFalling, 2*TicksPerSecond,{
                    amplifier: 1,
                    showParticles: false
                });
            }).catch((error: any) => {
            });

            system.waitTicks(35).then(() => {
                entity.removeEffect(MinecraftEffectTypes.SlowFalling);
                entity.setProperty("kurokumaft:kokyu_particle", false);
                entity.setDynamicProperty("kurokumaft:mizuroku", false);
            }).catch((error: any) => {
            }).finally(() => {
                system.clearRun(num);
            });

        }
    }

    /**
     * 漆ノ型 雫波紋突き
     */
    shitiNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        entity.setProperty("kurokumaft:kokyu_use", false);
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:mizu_kokyu7.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        const distance = getLookLocationDistancePitch(entity.getRotation(), 3.5, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 2.5, entity);
        this.kokyuApplyDamage(entity, filter, 6, 3, itemStack);

        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        entity.dimension.spawnParticle("kurokumaft:mizu7_1_particle",getDistanceLocation(entity.location, distance),molang);
        entity.dimension.spawnParticle("kurokumaft:mizu7_2_particle",getDistanceLocation(entity.location, distance),molang);

        system.waitTicks(5).then(() => {
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
        });

    }

    /**
     * 捌ノ型 滝壺
     */
    hachiNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        entity.setProperty("kurokumaft:kokyu_use", false);
        if (!entity.getDynamicProperty("kurokumaft:mizuhati")) {

            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:mizu_kokyu8.value"}]});
                if (itemStack !== undefined) {
                    ItemDurabilityDamage(entity, itemStack);
                }
            }
            entity.setDynamicProperty("kurokumaft:mizuhati", true);

            const oLocate = entity.location;
            const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
            entity.applyKnockback({x:distance.x,z:distance.z},1.5);
            let parnum = 0;

            system.waitTicks(25).then(() => {
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
                    } catch (error: any) {
                        system.clearRun(parnum);
                    }
                },3);
            }).catch((error: any) => {
            }).finally(() => {
                system.clearRun(parnum);
            });

            system.waitTicks(30).then(() => {
                entity.addEffect(MinecraftEffectTypes.SlowFalling, 2*TicksPerSecond,{
                    amplifier: 1,
                    showParticles: false
                });
            }).catch((error: any) => {
            }).finally(() => {
            });
    
            system.waitTicks(40).then(() => {
                entity.removeEffect(MinecraftEffectTypes.SlowFalling);
                entity.setProperty("kurokumaft:kokyu_particle", false);
                entity.setDynamicProperty("kurokumaft:mizuhati", false);
            }).catch((error: any) => {
            }).finally(() => {
                if (parnum !== 0) {
                    system.clearRun(parnum);
                }
            });

        }
    }

    /**
     * 玖ノ型 水流飛沫・乱
     */
    kuNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity.getDynamicProperty("kurokumaft:chage_type") === undefined) {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:mizu_kokyu9.value"}]});
                if (itemStack !== undefined) {
                    ItemDurabilityDamage(entity, itemStack);
                }
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
            system.waitTicks(10*TicksPerSecond).then(() => {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
                entity.setDynamicProperty("kurokumaft:chage_type", undefined);
            }).catch((error: any) => {
            }).finally(() => {
            });
        }
    }

    /**
     * 拾ノ型 生生流転　発射
     */
    zyuNoKataShot(entity:Entity, itemStack:ItemStack | undefined) {

        const chage = entity.getProperty("kurokumaft:kokyu_chage") as number;
        entity.setProperty("kurokumaft:kokyu_use", false);
        if (chage === 4) {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:mizu_kokyu10.value"}]});
                if (itemStack !== undefined) {
                    ItemDurabilityDamage(entity, itemStack);
                }
            }
            entity.setProperty("kurokumaft:kokyu_chage", 10);
            system.waitTicks(10).then(() => {
                const dragon = shooting(entity, "kurokumaft:mizu_dragon", 0, 3, undefined);
                entity.setProperty("kurokumaft:kokyu_chage", 0);
                entity.setProperty("kurokumaft:kokyu_particle", false);
                system.waitTicks(15).then(() => {
                    if (dragon.isValid) {
                        dragon.remove();
                    }
                }).catch((error: any) => {
                }).finally(() => {
                });
            }).catch((error: any) => {
            }).finally(() => {
            });
        }

    }

    /**
     * 拾ノ型 生生流転
     */
    zyuNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (itemStack !== undefined) {
            ItemDurabilityDamage(entity, itemStack);
        }
        let chage = entity.getProperty("kurokumaft:kokyu_chage") as number;
        if (chage < 4) {
            entity.setProperty("kurokumaft:kokyu_particle", true);

            if (chage+1 < 4) {
                system.waitTicks(14).then(() => {
                    chage = entity.getProperty("kurokumaft:kokyu_chage") as number;
                    if (chage < 4) {
                        entity.setProperty("kurokumaft:kokyu_particle", false);
                    }
                }).catch((error: any) => {
                }).finally(() => {
                });
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
            } catch (error: any) {
                system.clearRun(num1);
            }
        }, 10);

        system.waitTicks(35).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_attack", false);
            entity.setProperty("kurokumaft:kokyu_chage", 10);
            system.waitTicks(10).then(() => {
                const dragon = shooting(entity, "kurokumaft:mizu_dragon", 0, 3, undefined);
                entity.setProperty("kurokumaft:kokyu_chage", 0);
                entity.setProperty("kurokumaft:kokyu_particle", false);
                system.waitTicks(2*TicksPerSecond).then(() => {
                    if (dragon.isValid) {
                        dragon.remove();
                    }
                }).catch((error: any) => {
                }).finally(() => {
                });
            }).catch((error: any) => {
            }).finally(() => {
            });
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num1);
        });

    }

    /**
     * 拾壱ノ型 凪
     */
    zyuichiNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity.getDynamicProperty("kurokumaft:chage_type") === undefined) {
            try {

                if (entity instanceof Player) {
                    entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:mizu_kokyu11.value"}]});
                    if (itemStack !== undefined) {
                        ItemDurabilityDamage(entity, itemStack);
                    }
                }
                entity.setDynamicProperty("kurokumaft:chage_type", true);

                this.nagiIntervalId = system.runInterval(() => {
                    try {
                        entity.setProperty("kurokumaft:kokyu_attack", false);
                        this.checkNagiReflection(entity, itemStack);
                    } catch (error: any) {
                        system.clearRun(this.nagiIntervalId);
                    }
                },2);

                const parnum = system.runInterval(() => {

                    try {
                        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
                        const molang = new MolangVariableMap();
                        molang.setFloat("variable.kaikyu", kaikyuNum);
                        entity.dimension.spawnParticle("kurokumaft:mizu11_particle",entity.location,molang);
                    } catch (error: any) {
                        system.clearRun(parnum);
                    }
                },TicksPerSecond);

                system.waitTicks(10*TicksPerSecond).then(() => {
                    entity.setProperty("kurokumaft:kokyu_attack", false);
                    entity.setProperty("kurokumaft:kokyu_use", false);
                    entity.setProperty("kurokumaft:kokyu_particle", false);
                    entity.setDynamicProperty("kurokumaft:chage_type", undefined);
                    system.clearRun(this.nagiIntervalId);
                    system.clearRun(parnum);
                }).catch((error: any) => {
                }).finally(() => {
                });
            } catch (error: any) {
                system.clearRun(this.nagiIntervalId);
            } finally {
            };

        }
    }

    private nagiIntervalId: number =0;
    private checkNagiReflection(entity: Entity, itemStack:ItemStack | undefined): void {
        if (entity.isValid) {

            if (this.projectRefrect(entity, entity.location)) {
                entity.setProperty("kurokumaft:kokyu_attack", true);
            }

            entity.addTag(entity.id);
            const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
            const filter = addRegimentalFilter(0, entity.location, 4.5, entity);
            const targets = entity.dimension.getEntities(filter);
            targets.forEach(en => {
                if (en !== undefined && en.isValid) {
                    const view = en.getViewDirection();
                    en.applyKnockback({x:-Math.round(view.x)*3,z:-Math.round(view.z)*3},3);
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
                }
            });
            entity.removeTag(entity.id);

        } else {
            system.clearRun(this.nagiIntervalId);
        }
    };

}
