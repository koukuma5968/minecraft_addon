import { ItemStack, MolangVariableMap, Entity, system, TicksPerSecond, Player } from "@minecraft/server";
import { addRegimentalFilter, getDistanceLocation, getLookLocationDistance, getRandomInRange } from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { shooting } from "../../common/ShooterEvent";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export class IwaNoKata extends KataComonClass {

    /**
     * 壱ノ型 蛇紋岩・双極
     */
    ichiNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:iwa_kokyu1.value"}]});
        }
        const ono = shooting(entity, "kurokumaft:iwa_axe", 0, 3, undefined);
        const ball = shooting(entity, "kurokumaft:iwa_iron_ball", 0, 3, undefined);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },10);

    }
    /**
     * 弐ノ型 天面砕き
     */
    niNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:iwa_kokyu2.value"}]});
        }
        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        system.runTimeout(() => {
            const distance = getLookLocationDistance(entity.getRotation().y, 4, 0, 0);
            const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 6, entity);
            this.kokyuApplyDamage(entity, filter, 4, 2, itemStack);

            entity.dimension.spawnParticle("kurokumaft:iwa2_particle", getDistanceLocation(entity.location, distance), molang);
        },6);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },10);

    }

    /**
     * 参ノ型 岩軀の膚
     */
    sanNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:iwa_kokyu3.value"}]});
        }
        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const num = system.runInterval(() => {

            try {
                const filter = addRegimentalFilter(0, entity.location, 6, entity);
                this.kokyuApplyDamage(entity, filter, 3, 1, itemStack);

                this.projectRefrect(entity, entity.location);

                entity.dimension.spawnParticle("kurokumaft:iwa3_particle", entity.location, molang);
            } catch (error) {
                system.clearRun(num);
            }

        },2);

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
     * 肆ノ型 流紋岩・速征
     */
    shiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:iwa_kokyu4.value"}]});
        }
        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const num = system.runInterval(() => {
            try {
                const filter = addRegimentalFilter(0, entity.location, 4, entity);
                this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);
    
                const distance = getLookLocationDistance(entity.getRotation().y, 2, 0, 0);
                entity.applyKnockback(distance.x,distance.z,5,0);

                entity.dimension.spawnParticle("kurokumaft:iwa3_particle", entity.location, molang);
            } catch (error) {
                system.clearRun(num);
            }
        },2);

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
     * 伍ノ型 瓦輪刑部
     */
    goNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:iwa_kokyu5.value"}]});
        }
        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 1);
        entity.applyKnockback(distance.x,distance.z,0,1);

        const num = system.runInterval(() => {
            try {
                const distance = getLookLocationDistance(entity.getRotation().y, 0, 0, -5);
                const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 5, entity);
                this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);

                const side = getRandomInRange(-5, 5);
                const around = getRandomInRange(-5, 5);
                const distance2 = getLookLocationDistance(entity.getRotation().y, around, side, 0.5);
                entity.dimension.spawnParticle("minecraft:cauldron_explosion_emitter", getDistanceLocation(entity.location, distance2));
                entity.dimension.spawnParticle("kurokumaft:iwa3_particle", getDistanceLocation(entity.location, distance2), molang);
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
                entity.setProperty("kurokumaft:kokyu_particle", false);
                entity.setProperty("kurokumaft:kokyu_use", false);
            } finally {
                system.clearRun(num);
            }
        },40);

    }

}
