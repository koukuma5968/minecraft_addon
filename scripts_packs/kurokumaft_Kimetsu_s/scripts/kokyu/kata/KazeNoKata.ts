import { ItemStack, MolangVariableMap, Entity, system, TicksPerSecond, Player } from "@minecraft/server";
import { addRegimentalFilter, getDistanceLocation, getLookLocationDistance, getLookLocationDistancePitch, getRandomInRange } from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export class KazeNoKata extends KataComonClass {

    /**
     * 壱ノ型 塵旋風・削ぎ
     */
    ichiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaze_kokyu1.value"}]});
        }
        entity.setProperty("kurokumaft:kokyu_use", false);

        const num = system.runInterval(() => {
            try {
                const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
                entity.applyKnockback(distance.x,distance.z,4,0);

                const filter = addRegimentalFilter(0, entity.location, 3.5, entity);
                this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);
            } catch (error) {
                system.clearRun(num);
            }
        },1);

        system.runTimeout(() => {

            try {
                entity.setDynamicProperty("kurokumaft:chage_type", undefined);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            } catch (error) {
            } finally {
                system.clearRun(num);
            }
        },12);

    }

    /**
     * 弐ノ型 爪々・科戸風
     */
    niNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaze_kokyu2.value"}]});
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

        system.runTimeout(() => {
            try {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            } catch (error) {
            }
        },10);

    }

    /**
     * 参ノ型 晴嵐風樹
     */
    sanNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaze_kokyu3.value"}]});
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
            } catch (error) {
                system.clearRun(num);
            }
        },2);

        system.runTimeout(() => {

            try {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            } catch (error) {
            } finally {
                system.clearRun(num);
            }
        },30);

    }

    /**
     * 肆ノ型 昇上砂塵嵐
     */
    shiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaze_kokyu4.value"}]});
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
            } catch (error) {
                system.clearRun(num);
            }
        },2);

        system.runTimeout(() => {

            try {
                entity.setProperty("kurokumaft:kokyu_particle", false);
                entity.setProperty("kurokumaft:kokyu_use", false);
            } catch (error) {
            } finally {
                system.clearRun(this.sazinIntervalId);
                system.clearRun(num);
            }
        },40);

    }

    private sazinIntervalId: number =0;
    private checkSazinReflection(entity: Entity): void {
        if (entity.isValid()) {

            this.projectRefrect(entity, entity.location);

            entity.addTag(entity.id);
            const filter = addRegimentalFilter(0, entity.location, 5, entity);
            const targets = entity.dimension.getEntities(filter);
            targets.forEach(en => {
                const view = en.getViewDirection();
                en.applyKnockback(-Math.round(entity.location.x-view.x),-Math.round(entity.location.z-view.z),3,1);
            });
            entity.removeTag(entity.id);

        } else {
            system.clearRun(this.sazinIntervalId);
        }
    };

    /**
     * 伍ノ型 木枯らし颪
     */
    goNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaze_kokyu5.value"}]});
        }

        const distance = getLookLocationDistance(entity.getRotation().y, 0, 0, 1);
        entity.applyKnockback(distance.x,distance.z,0,1);

        const num = system.runInterval(() => {

            try {
                const distance = getLookLocationDistance(entity.getRotation().y, 2.5, 0, -1.5);
                const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 5, entity);
                this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);
            } catch (error) {
                system.clearRun(num);
            }
        },2);

        system.runTimeout(() => {

            try {
                entity.setProperty("kurokumaft:kokyu_particle", false);
                entity.setProperty("kurokumaft:kokyu_use", false);
            } catch (error) {
            } finally {
                system.clearRun(num);
            }
        },30);

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

        system.runTimeout(() => {
            try {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            } catch (error) {
            }
        },15);

    }

    /**
     * 漆ノ型 勁風・天狗風
     */
    shitiNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaze_kokyu7.value"}]});
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
            } catch (error) {
                system.clearRun(num);
            }
        },4);

        system.runTimeout(() => {

            try {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            } catch (error) {
            } finally {
                system.clearRun(num);
            }
        },20);

    }

    /**
     * 捌ノ型 初烈風斬り
     */
    hachiNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaze_kokyu8.value"}]});
        }
        const num = system.runInterval(() => {

            try {
                const filter = addRegimentalFilter(0, entity.location, 4, entity);
                this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);
    
                const distance = getLookLocationDistance(entity.getRotation().y, 2, 0, 0);
                entity.applyKnockback(distance.x,distance.z,8,0);
            } catch (error) {
                system.clearRun(num);
            }
        },4);

        system.runTimeout(() => {

            try {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            } catch (error) {
            } finally {
                system.clearRun(num);
            }
        },40);
    }

    /**
     * 玖ノ型 韋駄天台風
     */
    kuNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaze_kokyu9.value"}]});
        }
        const distance = getLookLocationDistance(entity.getRotation().y, 0, 0, 1);
        entity.applyKnockback(distance.x,distance.z,0,1);

        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const num = system.runInterval(() => {
            try {
                const distance = getLookLocationDistance(entity.getRotation().y, 3, 0, -1);
                const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 5, entity);
                this.kokyuApplyDamage(entity, filter, 3, 1, itemStack);
                entity.dimension.spawnParticle("kurokumaft:kaze3_particle",getDistanceLocation(entity.location, distance), molang);
            } catch (error) {
                system.clearRun(num);
            }
        },2);

        entity.addEffect(MinecraftEffectTypes.SlowFalling, 2*TicksPerSecond,{
            amplifier: 1,
            showParticles: false
        });

        system.runTimeout(() => {

            try {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            } catch (error) {
            } finally {
                system.clearRun(num);
            }
        },40);
    }

}
