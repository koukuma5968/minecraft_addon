import { ItemStack, MolangVariableMap, Entity, system, TicksPerSecond, Player, world } from "@minecraft/server";
import { addRegimentalFilter, getDistanceLocation, getLookLocationDistance, getLookLocationDistancePitch} from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export class HiNoKata extends KataComonClass {

    /**
     * 壱ノ型 円舞
     */
    ichiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu1.value"}]});
        }
        const distance = getLookLocationDistance(entity.getRotation().y, 2.5, 0, 0.5);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
        this.kokyuApplyDamage(entity, filter, 4, 1, itemStack);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
        },2);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },10);

    }

    /**
     * 壱ノ型 円舞一閃
     */
    ichiNoKataIssen(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu1_issen.value"}]});
        }
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_chage", 0);

        const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
        entity.applyKnockback(distance.x,distance.z,30,0);

        const num = system.runInterval(() => {
            try {
                const filter = addRegimentalFilter(0, entity.location, 3.5, entity);
                this.kokyuApplyDamage(entity, filter, 3, 1, itemStack);
            } catch (error) {
                system.clearRun(num);
            }
        },1);

        system.runTimeout(() => {

            try {
                entity.setDynamicProperty("kurokumaft:chage_type", undefined);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            } finally {
                system.clearRun(num);
            }
        },12);

    }

    /**
     * 弐ノ型 碧羅の天
     */
    niNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu2.value"}]});
        }
        const distance = getLookLocationDistance(entity.getRotation().y, 2.5, 0, 0.5);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
        this.kokyuApplyDamage(entity, filter, 6, 2, itemStack);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },7);

    }

    /**
     * 参ノ型 烈日紅鏡
     */
    sanNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu3.value"}]});
        }
        // 左
        const ldistance = getLookLocationDistance(entity.getRotation().y, 1.5, -1.5, 1);
        const lfilter = addRegimentalFilter(0, getDistanceLocation(entity.location, ldistance), 3, entity);
        this.kokyuApplyDamage(entity, lfilter, 3, 1, itemStack);

        system.runTimeout(() => {
            // 右
            const rdistance = getLookLocationDistance(entity.getRotation().y, 1.5, 1.5, 1);
            const rfilter = addRegimentalFilter(0, getDistanceLocation(entity.location, rdistance), 3, entity);
            this.kokyuApplyDamage(entity, rfilter, 3, 1, itemStack);
        }, 15);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },25);
    }

    /**
     * 肆ノ型 灼骨炎陽
     */
    shiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu4.value"}]});
        }
        let z = 0;
        const num = system.runInterval(() => {
            try {
                const distance = getLookLocationDistance(entity.getRotation().y, z, 0, 0.5);
                const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
                this.kokyuApplyDamage(entity, filter, 6, 2, itemStack);
                z++;
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
        },30);

     }

    /**
     * 伍ノ型 陽華突
     */
    goNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu5.value"}]});
        }
        entity.setProperty("kurokumaft:kokyu_use", false);

        const distance = getLookLocationDistancePitch(entity.getRotation(), 3.5, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3.5, entity);
        this.kokyuApplyDamage(entity, filter, 6, 2, itemStack);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },5);

    }

    /**
     * 陸ノ型 日暈の龍 頭舞い
     */
    rokuNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu6.value"}]});
        }
        entity.setDynamicProperty("kurokumaft:chage_type", true);
        entity.setProperty("kurokumaft:kokyu_chage", 1);

        entity.addEffect(MinecraftEffectTypes.Speed, 5*TicksPerSecond,{
            amplifier: 6,
            showParticles: false
        });

        entity.setProperty("kurokumaft:kokyu_attack", true);
        let side = 2;
        const num = system.runInterval(() => {
            try {
                const filter = addRegimentalFilter(0, entity.location, 4, entity);
                this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);
    
                const distance = getLookLocationDistance(entity.getRotation().y, 2, side, 0);
                entity.applyKnockback(distance.x,distance.z,5,0);

                side = -side;
            } catch (error) {
                system.clearRun(num);
            }
        },4);

        system.runTimeout(() => {

            try {
                entity.setProperty("kurokumaft:kokyu_attack", false);
                entity.setProperty("kurokumaft:kokyu_chage", 0);
                entity.setProperty("kurokumaft:kokyu_particle", false);
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setDynamicProperty("kurokumaft:chage_type", undefined);
            } finally {
                system.clearRun(num);
            }
        },5*TicksPerSecond);
    }

    /**
     * 漆ノ型 斜陽転身
     */
    shitiNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu7.value"}]});
        }
        const distance = getLookLocationDistance(entity.getRotation().y, -3, 0, 1);
        entity.applyKnockback(distance.x,distance.z,1,0.6);

        const distance2 = getLookLocationDistance(entity.getRotation().y, 3, 0, -1);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance2), 4, entity);
        this.kokyuApplyDamage(entity, filter, 6, 3, itemStack);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },15);

    }

    /**
     * 捌ノ型 飛輪陽炎
     */
    hachiNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu8.value"}]});
        }
        const distance = getLookLocationDistance(entity.getRotation().y, 3.5, 0, 0.5);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 4, entity);
        this.kokyuApplyDamage(entity, filter, 6, 3, itemStack);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },15);
    }

    /**
     * 玖ノ型 輝輝恩光
     */
    kuNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu9.value"}]});
        }
        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const num = system.runInterval(() => {
            try {
                entity.dimension.spawnParticle("kurokumaft:hi9_particle", entity.location, molang);
            } catch (error) {
                system.clearRun(num);
            }
        },1);

        const distance = getLookLocationDistance(entity.getRotation().y, 1.5, 0, 0.5);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 2, entity);
        this.kokyuApplyDamage(entity, filter, 6, 3, itemStack);

        const udistance = getLookLocationDistance(entity.getRotation().y, 1.5, 0, 3);
        const ufilter = addRegimentalFilter(0, getDistanceLocation(entity.location, udistance), 3, entity);
        this.kokyuApplyDamage(entity, ufilter, 6, 3, itemStack);

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
     * 拾ノ型 火車
     */
    zyuNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu10.value"}]});
        }
        // fornt
        const fdistance = getLookLocationDistance(entity.getRotation().y, 2.5, 0, 0);
        const ffilter = addRegimentalFilter(0, getDistanceLocation(entity.location, fdistance), 2.5, entity);
        this.kokyuApplyDamage(entity, ffilter, 6, 3, itemStack);
        // back
        const bdistance = getLookLocationDistance(entity.getRotation().y, -2.5, 0, 0);
        const bfilter = addRegimentalFilter(0, getDistanceLocation(entity.location, bdistance), 2.5, entity);
        this.kokyuApplyDamage(entity, bfilter, 6, 3, itemStack);
        // up
        const udistance = getLookLocationDistance(entity.getRotation().y, 0, 0, 2.5);
        const ufilter = addRegimentalFilter(0, getDistanceLocation(entity.location, udistance), 2.5, entity);
        this.kokyuApplyDamage(entity, ufilter, 6, 3, itemStack);
        // down
        const ddistance = getLookLocationDistance(entity.getRotation().y, 0, 0, -2.5);
        const dfilter = addRegimentalFilter(0, getDistanceLocation(entity.location, ddistance), 2.5, entity);
        this.kokyuApplyDamage(entity, dfilter, 6, 3, itemStack);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },15);
    }

    /**
     * 拾壱ノ型 幻日虹
     */
    zyuichiNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity.getDynamicProperty("kurokumaft:chage_type") === undefined) {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu11.value"}]});
            }
            entity.setDynamicProperty("kurokumaft:chage_type", true);

            entity.triggerEvent("kurokumaft:add_damage_clear");

            this.gennitiIntervalId = system.runInterval(() => {
                try {
                    this.checkGennitiMove(entity, itemStack);
                } catch (error) {
                    system.clearRun(this.gennitiIntervalId);
                }
            },2);

            const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
            const molang = new MolangVariableMap();
            molang.setFloat("variable.kaikyu", kaikyuNum);
    
            const num = system.runInterval(() => {
                try {
                    entity.dimension.spawnParticle("kurokumaft:hi_heat_haze_particle", entity.location, molang);
                } catch (error) {
                    system.clearRun(num);
                }
            },1);
    
            system.runTimeout(() => {

                try {
                    entity.setProperty("kurokumaft:kokyu_attack", false);
                    entity.setProperty("kurokumaft:kokyu_use", false);
                    entity.setProperty("kurokumaft:kokyu_particle", false);
                    entity.setDynamicProperty("kurokumaft:chage_type", undefined);
                    entity.triggerEvent("kurokumaft:remove_damage_clear");
                } finally {
                    system.clearRun(this.gennitiIntervalId);
                    system.clearRun(num);
                }

            },10*TicksPerSecond);
        }
    }

    private gennitiIntervalId: number =0;
    private checkGennitiMove(entity: Entity, itemStack:ItemStack | undefined): void {
        if (entity.isValid()) {
            const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
            const molang = new MolangVariableMap();
            molang.setFloat("variable.kaikyu", kaikyuNum);

            if (this.projectRefrect(entity, entity.location)) {
                entity.dimension.spawnParticle("kurokumaft:hi11_particle",entity.location,molang);
            }

            entity.addTag(entity.id);
            const filter = addRegimentalFilter(1, entity.location, 2.5, entity);
            const targets = entity.dimension.getEntities(filter);
            targets.forEach(en => {
                entity.dimension.spawnParticle("kurokumaft:hi11_particle",entity.location,molang);
            });
            entity.removeTag(entity.id);

        } else {
            system.clearRun(this.gennitiIntervalId);
        }
    };

    /**
     * 拾弐ノ型 炎舞
     */
    zyuniNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu12.value"}]});
        }
        const distance = getLookLocationDistance(entity.getRotation().y, 2.5, 0, 0.5);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
        this.kokyuApplyDamage(entity, filter, 6, 3, itemStack);

        system.runTimeout(() => {
            this.kokyuApplyDamage(entity, filter, 6, 3, itemStack);
        }, 10);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },10);
    }
    
}
