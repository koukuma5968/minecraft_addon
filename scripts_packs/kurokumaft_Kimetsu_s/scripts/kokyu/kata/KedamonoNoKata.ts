import { ItemStack, Entity, system, TicksPerSecond, Player } from "@minecraft/server";
import { addRegimentalFilter, getDistanceLocation, getLookLocationDistancePitch} from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export class KedamonoNoKata extends KataComonClass {

    /**
     * 壱ノ牙 穿ち抜き
     */
    ichiNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kedamono_kokyu1.value"}]});
        }
        const distance = getLookLocationDistancePitch(entity.getRotation(), 1.5, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
        this.kokyuApplyDamage(entity, filter, 4, 2, itemStack);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },15);

    }

    /**
     * 弐ノ牙 切り裂き
     */
    niNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kedamono_kokyu2.value"}]});
        }
        // 左
        const distance = getLookLocationDistancePitch(entity.getRotation(), 1.5, -0.5);
        const lfilter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
        this.kokyuApplyDamage(entity, lfilter, 2, 1, itemStack);
        system.runTimeout(() => {
            // 右
            const distance = getLookLocationDistancePitch(entity.getRotation(), 1.5, 0.5);
            const rfilter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
            this.kokyuApplyDamage(entity, rfilter, 2, 1, itemStack);
        }, 10);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },15);
    }

    /**
     * 参ノ牙 喰い裂き
     */
    sanNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kedamono_kokyu3.value"}]});
        }
        const distance = getLookLocationDistancePitch(entity.getRotation(), 1.5, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 2.5, entity);
        this.kokyuApplyDamage(entity, filter, 4, 2, itemStack);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },10);
    }

    /**
     * 肆ノ牙 切細裂き
     */
    shiNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kedamono_kokyu4.value"}]});
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
        },40);

    }

    /**
     * 伍ノ牙 狂い裂き
     */
    goNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kedamono_kokyu5.value"}]});
        }
        const num = system.runInterval(() => {

            try {
                const filter = addRegimentalFilter(0, entity.location, 4, entity);
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
     * 陸ノ牙 乱杭咬み
     */
    rokuNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kedamono_kokyu6.value"}]});
        }
        const num = system.runInterval(() => {

            try {
                const distance = getLookLocationDistancePitch(entity.getRotation(), 1, 0);
                const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3.5, entity);
                this.kokyuApplyDamage(entity, filter, 4, 2, itemStack);
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
        },40);

    }

    /**
     * 漆ノ型 空間識覚
     */
    shitiNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity.getDynamicProperty("kurokumaft:chage_type") === undefined) {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kedamono_kokyu7.value"}]});
            }
            entity.setProperty("kurokumaft:kokyu_chage", 10);
            entity.setDynamicProperty("kurokumaft:chage_type", true);

            entity.addEffect(MinecraftEffectTypes.NightVision, 30*TicksPerSecond,{
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
                } catch (error) {
                    system.clearRun(num);
                }
            },2);

            system.runTimeout(() => {
                entity.setDynamicProperty("kurokumaft:chage_type", undefined);
                entity.setProperty("kurokumaft:kokyu_chage", 0);
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            },10);

            system.runTimeout(() => {
                system.clearRun(num);
            },10*TicksPerSecond);
        }
    }

    /**
     * 捌ノ型 爆裂猛進
     */
    hachiNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity.getDynamicProperty("kurokumaft:chage_type") === undefined) {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kedamono_kokyu8.value"}]});
            }
            entity.setDynamicProperty("kurokumaft:chage_type", true);
            entity.setProperty("kurokumaft:kokyu_chage", 10);
    
            entity.addEffect(MinecraftEffectTypes.Speed, 10*TicksPerSecond,{
                amplifier: 5,
                showParticles: false
            });
            system.runTimeout(() => {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
                entity.setDynamicProperty("kurokumaft:chage_type", undefined);
                entity.setProperty("kurokumaft:kokyu_chage", 0);
            },10*TicksPerSecond);
        }
    }

    /**
     * 玖ノ牙 伸・うねり裂き
     */
    kuNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kedamono_kokyu9.value"}]});
        }
        const distance = getLookLocationDistancePitch(entity.getRotation(), 3.5, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 6, entity);
        this.kokyuApplyDamage(entity, filter, 6, 3, itemStack);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },10);
    }

    /**
     * 拾ノ牙 円転旋牙
     */
    zyuNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity.getDynamicProperty("kurokumaft:chage_type") === undefined) {
            entity.setDynamicProperty("kurokumaft:chage_type", true);
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kedamono_kokyu10.value"}]});
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
                } catch (error) {
                    system.clearRun(num);
                }
            },4);

            system.runTimeout(() => {

                try {
                    entity.setProperty("kurokumaft:kokyu_use", false);
                    entity.setProperty("kurokumaft:kokyu_particle", false);
                    entity.setDynamicProperty("kurokumaft:chage_type", undefined);
                } finally {
                    system.clearRun(num);
                }
            },3*TicksPerSecond);
    
        }

    }

}
