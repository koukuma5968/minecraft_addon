import { ItemStack, MolangVariableMap, Entity, system, TicksPerSecond, Player } from "@minecraft/server";
import { addRegimentalFilter, getDistanceLocation, getLookLocationDistance, getLookLocationDistancePitch, getRandomInRange } from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";
import { ItemDurabilityDamage } from "../../common/KimetuItemDurabilityDamage";

export class KazeNoKata extends KataComonClass {

    /**
     * 壱ノ型 塵旋風・削ぎ
     */
    ichiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaze_kokyu1.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        entity.setProperty("kurokumaft:kokyu_use", false);

        const num = system.runInterval(() => {
            try {
                const distance = getLookLocationDistance(entity.getRotation().y, 4, 0, 0);
                entity.applyKnockback({x:distance.x,z:distance.z},0);

                const filter = addRegimentalFilter(0, entity.location, 3.5, entity);
                this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);
            } catch (error: any) {
                system.clearRun(num);
            }
        },1);

        system.waitTicks(12).then(() => {
            entity.setDynamicProperty("kurokumaft:chage_type", undefined);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

    }

    /**
     * 弐ノ型 爪々・科戸風
     */
    niNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaze_kokyu2.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }

        for (let i=-2; i<=2; i=i+2) {
            const distance = getLookLocationDistance(entity.getRotation().y, 2, i, 0.5);
            const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
            this.kokyuApplyDamage(entity, filter, 4, 1, itemStack);
    
            const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
            const molang = new MolangVariableMap();
            molang.setFloat("variable.kaikyu", kaikyuNum);
    
            entity.dimension.spawnParticle("kurokumaft:kaze2_particle", getDistanceLocation(entity.location, distance), molang);
        }

        system.waitTicks(10).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
        });

    }

    /**
     * 参ノ型 晴嵐風樹
     */
    sanNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaze_kokyu3.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }

        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const num = system.runInterval(() => {

            try {
                const distance = getLookLocationDistancePitch(entity.getRotation(), 1.5, 0);
                const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
                this.kokyuApplyDamage(entity, filter, 3, 1, itemStack);
                entity.dimension.spawnParticle("kurokumaft:kaze3_particle", getDistanceLocation(entity.location, distance), molang);
            } catch (error: any) {
                system.clearRun(num);
            }
        },2);

        system.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

    }

    /**
     * 肆ノ型 昇上砂塵嵐
     */
    shiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaze_kokyu4.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }

        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const num = system.runInterval(() => {

            try {
                const distance = getLookLocationDistance(entity.getRotation().y, 0, 0, 4);
                const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 5, entity);
                this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);

                entity.dimension.spawnParticle("kurokumaft:kaze4_particle", entity.location, molang);
                this.checkSazinReflection(entity);
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

    }

    private checkSazinReflection(entity: Entity): void {
        if (entity.isValid) {

            this.projectRefrect(entity, entity.location);

            entity.addTag(entity.id);
            const filter = addRegimentalFilter(0, entity.location, 5, entity);
            const targets = entity.dimension.getEntities(filter);
            targets.forEach(en => {
                const view = en.getViewDirection();
                const distance = getLookLocationDistance(entity.getRotation().y, 1, 1, 0);
                en.applyKnockback({x:-Math.round(distance.x-view.x),z:-Math.round(distance.z-view.z)},2.5);
            });
            entity.removeTag(entity.id);

        }
    };

    /**
     * 伍ノ型 木枯らし颪
     */
    goNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaze_kokyu5.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }

        const distance = getLookLocationDistance(entity.getRotation().y, 2, 0, 1);
        entity.applyKnockback({x:distance.x,z:distance.z},1);

        const num = system.runInterval(() => {

            try {
                const distance = getLookLocationDistance(entity.getRotation().y, 2.5, 0, -1.5);
                const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 5, entity);
                this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);
            } catch (error: any) {
                system.clearRun(num);
            }
        },2);

        system.waitTicks(10).then(() => {
            entity.addEffect(MinecraftEffectTypes.SlowFalling, 0.5*TicksPerSecond,{
                amplifier: 1,
                showParticles: false
            });
        }).catch((error: any) => {
        }).finally(() => {
        });

        system.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
            entity.addEffect(MinecraftEffectTypes.SlowFalling, 0.5*TicksPerSecond,{
                amplifier: 1,
                showParticles: false
            });
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

    }

    /**
     * 陸ノ型 黒風烟嵐
     */
    rokuNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaze_kokyu6.value"}]});
        }
        const distance = getLookLocationDistance(entity.getRotation().y, 1.5, 0, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
        this.kokyuApplyDamage(entity, filter, 3, 1, itemStack);

        system.waitTicks(8).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
        });

    }

    /**
     * 漆ノ型 勁風・天狗風
     */
    shitiNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaze_kokyu7.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        for (let i=0; i<=6; i++) {
            const side = getRandomInRange(-4, 4);
            const around = getRandomInRange(-4, 4);
            const distance = getLookLocationDistance(entity.getRotation().y, around, side, 0);
            entity.dimension.spawnParticle("kurokumaft:kaze7_particle",getDistanceLocation(entity.location, distance), molang);
        }

        const num = system.runInterval(() => {

            try {
                const filter = addRegimentalFilter(0, entity.location, 4.5, entity);
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
     * 捌ノ型 初烈風斬り
     */
    hachiNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaze_kokyu8.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        const num = system.runInterval(() => {

            try {
                const filter = addRegimentalFilter(0, entity.location, 4, entity);
                this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);
    
                const distance = getLookLocationDistance(entity.getRotation().y, 4, 0, 0);
                entity.applyKnockback({x:distance.x,z:distance.z},0);
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
     * 玖ノ型 韋駄天台風
     */
    kuNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaze_kokyu9.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        const distance = getLookLocationDistance(entity.getRotation().y, 0, 0, 1);
        entity.applyKnockback({x:distance.x,z:distance.z},1);

        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const num = system.runInterval(() => {
            try {
                const distance = getLookLocationDistance(entity.getRotation().y, 3, 0, -1);
                const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 5, entity);
                this.kokyuApplyDamage(entity, filter, 3, 1, itemStack);
                entity.dimension.spawnParticle("kurokumaft:kaze3_particle",getDistanceLocation(entity.location, distance), molang);
            } catch (error: any) {
                system.clearRun(num);
            }
        },2);

        entity.addEffect(MinecraftEffectTypes.SlowFalling, 2*TicksPerSecond,{
            amplifier: 1,
            showParticles: false
        });

        system.waitTicks(40).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });
    }

}
