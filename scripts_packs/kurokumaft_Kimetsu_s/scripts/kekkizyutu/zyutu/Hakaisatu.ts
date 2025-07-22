import { BlockVolume, EntityComponentTypes, EntityMovementComponent, ItemStack, MolangVariableMap, Entity, system, TicksPerSecond, Player } from "@minecraft/server";
import { ZytuComonClass } from "./ZytuComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";
import { shooting } from "../../common/ShooterEvent";
import { addOrgeFilter, getDistanceLocation, getLookLocationDistance, getLookLocationDistancePitch, getRandomInRange } from "../../common/KimetuCommonUtil";

export class Hakaisatu extends ZytuComonClass {

    /**
     * 破壊殺・羅針
     */
    rashin(entity:Entity) {
        if (entity === undefined) {
            return;
        }

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_hakai1.value"}]});
            }
            const move = entity.getComponent(EntityComponentTypes.Movement) as EntityMovementComponent;
            move.setCurrentValue(0.2);

            const molang = new MolangVariableMap();
            molang.setFloat("variable.rotaion", -entity.getRotation().y);
            entity.dimension.spawnParticle("kurokumaft:rashin", entity.location, molang);

            system.waitTicks(30).then(() => {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
                move.resetToDefaultValue();

                entity.addEffect(MinecraftEffectTypes.Speed, 10*TicksPerSecond,{
                    amplifier: 5,
                    showParticles: false
                });
                entity.addEffect(MinecraftEffectTypes.Strength, 10*TicksPerSecond,{
                    amplifier: 1,
                    showParticles: false
                });
            }).catch((error: any) => {
            }).finally(() => {
            });
        } catch (error: any) {
        }
    }

    /**
     * 破壊殺・空式
     */
    kushiki(entity:Entity) {
        if (entity === undefined) {
            return;
        }

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_hakai2.value"}]});
            }
            const kushiki = shooting(entity, "kurokumaft:kushiki", 0, 3, undefined);

            system.runTimeout(() => {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            },5);

            system.waitTicks(1*TicksPerSecond).then(() => {
                if (kushiki.isValid) {
                    kushiki.remove();
                }
            }).catch((error: any) => {
            }).finally(() => {
            });
        } catch (error: any) {
        }

    }

    /**
     * 破壊殺・乱式
     */
    ranshiki(entity:Entity) {
        if (entity === undefined) {
            return;
        }

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_hakai3.value"}]});
            }
            const num = system.runInterval(() => {

                try {
                    const distance = getLookLocationDistancePitch(entity.getRotation(), 5, 0);
                    const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 5, entity.id);
                    this.kokyuApplyDamage(entity, filter, 2, 1);

                    const distance2 = getLookLocationDistance(entity.getRotation().y, 5, getRandomInRange(-5, 5), getRandomInRange(0, 3));
                    entity.dimension.spawnParticle("kurokumaft:ranshiki", getDistanceLocation(entity.location, distance2));
                } catch (error: any) {
                    system.clearRun(num);
                }

            },2);

            system.waitTicks(40).then(() => {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            }).catch((error: any) => {
            }).finally(() => {
                system.clearRun(num);
            });

        } catch (error: any) {
        }
    }

    /**
     * 破壊殺・滅式
     */
    messhiki(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_hakai4.value"}]});
            }
            entity.setProperty("kurokumaft:kokyu_particle", false);
            entity.setProperty("kurokumaft:kokyu_use", false);
            const distance = getLookLocationDistance(entity.getRotation().y, 2, 0, 1);
            const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 3, entity.id);
            entity.dimension.spawnParticle("kurokumaft:meshiki", getDistanceLocation(entity.location, distance));
            this.kokyuApplyDamage(entity, filter, 6, 3);
        } catch (error: any) {
        }

    }

    /**
     * 破壊殺・脚式 冠先割
     */
    kamurosakiwari(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_hakai5.value"}]});
            }
            const distance = getLookLocationDistance(entity.getRotation().y, 2, 0, 2);
            const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 2.5, entity.id);
            entity.dimension.spawnParticle("kurokumaft:ranshiki", getDistanceLocation(entity.location, distance));
            this.kokyuApplyDamage(entity, filter, 6, 3);

            this.kokyuApplyKnockback(entity, filter, distance, 4);

            system.waitTicks(5).then(() => {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            }).catch((error: any) => {
            }).finally(() => {
            });
        } catch (error: any) {
        }
    }

    /**
     * 破壊殺・脚式 流閃群光
     */
    ryusengunkou(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_hakai6.value"}]});
            }
            const num = system.runInterval(() => {

                try {
                    const distance = getLookLocationDistancePitch(entity.getRotation(), 3, 0);
                    const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 3, entity.id);
                    this.kokyuApplyDamage(entity, filter, 2, 1);
                    this.kokyuApplyKnockback(entity, filter, distance, 0);

                    const distance2 = getLookLocationDistance(entity.getRotation().y, 5, getRandomInRange(-3, 3), getRandomInRange(0, 2));
                    entity.dimension.spawnParticle("kurokumaft:ryuseigunkou", getDistanceLocation(entity.location, distance2));
                } catch (error: any) {
                    system.clearRun(num);
                }

            },4);

            system.waitTicks(40).then(() => {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            }).catch((error: any) => {
            }).finally(() => {
                system.clearRun(num);
            });
        } catch (error: any) {
        }

    }

    /**
     * 破壊殺・脚式 飛遊星千輪
     */
    hiyuuseisenrin(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_hakai7.value"}]});
            }
            const num = system.runInterval(() => {

                try {
                    const distance = getLookLocationDistancePitch(entity.getRotation(), 3, 0);
                    const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 3, entity.id);
                    entity.dimension.spawnParticle("kurokumaft:ryuseigunkou", getDistanceLocation(entity.location, distance));
                    this.kokyuApplyDamage(entity, filter, 2, 1);
                    this.kokyuApplyKnockback(entity, filter, distance, 0.2);
                    entity.applyKnockback({x:distance.x,z:distance.z},0.3);
                } catch (error: any) {
                    system.clearRun(num);
                }
            },4);

            system.waitTicks(40).then(() => {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);

                system.waitTicks(5).then(() => {
                    entity.addEffect(MinecraftEffectTypes.SlowFalling, 1*TicksPerSecond,{
                        amplifier: 1,
                        showParticles: false
                    });
                }).catch((error: any) => {
                }).finally(() => {
                });
            }).catch((error: any) => {
            }).finally(() => {
                system.clearRun(num);
            });

        } catch (error: any) {
        }
    }

    /**
     * 破壊殺・砕式 万葉閃柳
     */
    manyousenyanagi(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_hakai8.value"}]});
            }
            const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
            entity.applyKnockback({x:distance.x,z:distance.z},1);

            system.waitTicks(20).then(() => {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
                const distance2 = getLookLocationDistance(entity.getRotation().y, 0, 0, -1);
                const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance2), 5, entity.id);
                this.kokyuApplyDamage(entity, filter, 2, 1);

                entity.dimension.spawnParticle("kurokumaft:manyousenyanagi", getDistanceLocation(entity.location, distance2));

                entity.dimension.createExplosion(entity.location, 3, {
                    source: entity,
                    breaksBlocks: true,
                    causesFire: false,
                    allowUnderwater: true
                });

                entity.addEffect(MinecraftEffectTypes.SlowFalling, 1*TicksPerSecond,{
                    amplifier: 1,
                    showParticles: false
                });
            }).catch((error: any) => {
            }).finally(() => {
            });
        } catch (error: any) {
        }
    }

    /**
     * 破壊殺・鬼芯八重芯
     */
    kishinyaenshin(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_hakai9.value"}]});
            }
            const num = system.runInterval(() => {

                try {
                    const distance = getLookLocationDistancePitch(entity.getRotation(), 3, 0);
                    const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 4, entity.id);
                    this.kokyuApplyDamage(entity, filter, 4, 2);

                    const distance2 = getLookLocationDistance(entity.getRotation().y, 3, getRandomInRange(-3, 3), getRandomInRange(0, 3));
                    entity.dimension.spawnParticle("kurokumaft:ryuseigunkou", getDistanceLocation(entity.location, distance2));
                } catch (error: any) {
                    system.clearRun(num);
                }

            },2);

            system.waitTicks(16).then(() => {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            }).catch((error: any) => {
            }).finally(() => {
                system.clearRun(num);
            });

        } catch (error: any) {
        }
    }

    /**
     * 終式・青銀乱残光
     */
    aoginranzankou(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_hakai10.value"}]});
            }
            const num = system.runInterval(() => {

                try {
                    const distance = getLookLocationDistancePitch(entity.getRotation(), 0, 0);
                    const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 10, entity.id);
                    entity.dimension.spawnParticle("kurokumaft:aoginranzankou", getDistanceLocation(entity.location, distance));
                    this.kokyuApplyDamage(entity, filter, 6, 3);
                } catch (error: any) {
                    system.clearRun(num);
                }
            },5);

            system.waitTicks(60).then(() => {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            }).catch((error: any) => {
            }).finally(() => {
                system.clearRun(num);
            });
        } catch (error: any) {
        }

    }

}
