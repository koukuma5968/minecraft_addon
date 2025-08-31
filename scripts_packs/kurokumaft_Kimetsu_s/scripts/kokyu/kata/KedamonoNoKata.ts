import { ItemStack, Entity, system, TicksPerSecond, Player } from "@minecraft/server";
import { addRegimentalFilter, getDistanceLocation, getLookLocationDistancePitch} from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { ItemDurabilityDamage } from "../../common/KimetuItemDurabilityDamage";

export class KedamonoNoKata extends KataComonClass {

    /**
     * 壱ノ牙 穿ち抜き
     */
    ichiNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kedamono_kokyu1.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        const distance = getLookLocationDistancePitch(entity.getRotation(), 1.5, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
        this.kokyuApplyDamage(entity, filter, 4, 2, itemStack);

        system.waitTicks(15).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
        });

    }

    /**
     * 弐ノ牙 切り裂き
     */
    niNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kedamono_kokyu2.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        // 左
        const distance = getLookLocationDistancePitch(entity.getRotation(), 1.5, -0.5);
        const lfilter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
        this.kokyuApplyDamage(entity, lfilter, 2, 1, itemStack);
        system.waitTicks(10).then(() => {
            // 右
            const distance = getLookLocationDistancePitch(entity.getRotation(), 1.5, 0.5);
            const rfilter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
            this.kokyuApplyDamage(entity, rfilter, 2, 1, itemStack);
        }).catch((error: any) => {
        }).finally(() => {
        });

        system.waitTicks(15).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
        });
    }

    /**
     * 参ノ牙 喰い裂き
     */
    sanNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kedamono_kokyu3.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        const distance = getLookLocationDistancePitch(entity.getRotation(), 1.5, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 2.5, entity);
        this.kokyuApplyDamage(entity, filter, 4, 2, itemStack);

        system.waitTicks(10).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
        });
    }

    /**
     * 肆ノ牙 切細裂き
     */
    shiNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kedamono_kokyu4.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        const num = system.runInterval(() => {

            try {
                const distance = getLookLocationDistancePitch(entity.getRotation(), 1.5, 0);
                const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
                this.kokyuApplyDamage(entity, filter, 3, 1, itemStack);
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

    }

    /**
     * 伍ノ牙 狂い裂き
     */
    goNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kedamono_kokyu5.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        const num = system.runInterval(() => {

            try {
                const filter = addRegimentalFilter(0, entity.location, 4, entity);
                this.kokyuApplyDamage(entity, filter, 3, 1, itemStack);
            } catch (error: any) {
                system.clearRun(num);
            }
        },4);
        system.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

    }

    /**
     * 陸ノ牙 乱杭咬み
     */
    rokuNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kedamono_kokyu6.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        const num = system.runInterval(() => {

            try {
                const distance = getLookLocationDistancePitch(entity.getRotation(), 1, 0);
                const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3.5, entity);
                this.kokyuApplyDamage(entity, filter, 4, 2, itemStack);
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

    }

    /**
     * 漆ノ型 空間識覚
     */
    shitiNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity.getDynamicProperty("kurokumaft:chage_type") === undefined) {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kedamono_kokyu7.value"}]});
                if (itemStack !== undefined) {
                    ItemDurabilityDamage(entity, itemStack);
                }
            }
            entity.setProperty("kurokumaft:kokyu_chage", 10);
            entity.setDynamicProperty("kurokumaft:chage_type", true);

            entity.addEffect("minecraft:night_vision", 30*TicksPerSecond,{
                amplifier: 5,
                showParticles: false
            });
            const filter = addRegimentalFilter(0, entity.location, 16, entity);
            const targets = entity.dimension.getEntities(filter);

            const num = system.runInterval(() => {

                try {
                    targets.forEach(en => {
                        en.dimension.spawnParticle("kurokumaft:kedamono7_particle", en.location);
                    });
                } catch (error: any) {
                    system.clearRun(num);
                }
            },2);

            system.waitTicks(10).then(() => {
                entity.setDynamicProperty("kurokumaft:chage_type", undefined);
                entity.setProperty("kurokumaft:kokyu_chage", 0);
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            }).catch((error: any) => {
            }).finally(() => {
                system.clearRun(num);
            });

            system.waitTicks(10*TicksPerSecond).then(() => {
                system.clearRun(num);
            }).catch((error: any) => {
            }).finally(() => {
            });
        }
    }

    /**
     * 捌ノ型 爆裂猛進
     */
    hachiNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity.getDynamicProperty("kurokumaft:chage_type") === undefined) {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kedamono_kokyu8.value"}]});
                if (itemStack !== undefined) {
                    ItemDurabilityDamage(entity, itemStack);
                }
            }
            entity.setDynamicProperty("kurokumaft:chage_type", true);
            entity.setProperty("kurokumaft:kokyu_chage", 10);
    
            entity.addEffect("minecraft:speed", 10*TicksPerSecond,{
                amplifier: 5,
                showParticles: false
            });
            system.waitTicks(10*TicksPerSecond).then(() => {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
                entity.setDynamicProperty("kurokumaft:chage_type", undefined);
                entity.setProperty("kurokumaft:kokyu_chage", 0);
            }).catch((error: any) => {
            }).finally(() => {
            });
        }
    }

    /**
     * 玖ノ牙 伸・うねり裂き
     */
    kuNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kedamono_kokyu9.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        const distance = getLookLocationDistancePitch(entity.getRotation(), 3.5, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 6, entity);
        this.kokyuApplyDamage(entity, filter, 6, 3, itemStack);

        system.waitTicks(10).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
        });
    }

    /**
     * 拾ノ牙 円転旋牙
     */
    zyuNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity.getDynamicProperty("kurokumaft:chage_type") === undefined) {
            entity.setDynamicProperty("kurokumaft:chage_type", true);
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kedamono_kokyu10.value"}]});
                if (itemStack !== undefined) {
                    ItemDurabilityDamage(entity, itemStack);
                }
            }
            const num = system.runInterval(() => {

                try {
                    // 左
                    const ldistance = getLookLocationDistancePitch(entity.getRotation(), 0.5, -1.5);
                    const lfilter = addRegimentalFilter(0, getDistanceLocation(entity.location, ldistance), 4, entity);
                    this.kokyuApplyDamage(entity, lfilter, 2, 1, itemStack);

                    // 右
                    const rdistance = getLookLocationDistancePitch(entity.getRotation(), 0.5, 1.5);
                    const rfilter = addRegimentalFilter(0, getDistanceLocation(entity.location, rdistance), 4, entity);
                    this.kokyuApplyDamage(entity, rfilter, 2, 1, itemStack);
                } catch (error: any) {
                    system.clearRun(num);
                }
            },4);

            system.waitTicks(3*TicksPerSecond).then(() => {
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
