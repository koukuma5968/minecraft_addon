import { ItemStack, Entity, system, Player } from "@minecraft/server";
import { addRegimentalFilter, getDistanceLocation, getLookLocationDistance, getLookLocationDistancePitch } from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export class HebiNoKata extends KataComonClass {

    /**
     * 壱ノ型 委蛇斬り
     */
    ichiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hebi_kokyu1.value"}]});
        }
        const distancePitch = getLookLocationDistancePitch(entity.getRotation(), 3, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distancePitch), 4, entity);
        this.kokyuApplyDamage(entity, filter, 3, 2, itemStack);

        const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
        entity.applyKnockback(distance.x,distance.z,6,0);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },6);

    }
    /**
     * 弐ノ型 狭頭の毒牙
     */
    niNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hebi_kokyu2.value"}]});
        }
        const distancePitch = getLookLocationDistancePitch(entity.getRotation(), 0, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distancePitch), 3, entity);
        this.kokyuApplyDamage(entity, filter, 4, 2, itemStack);
        this.kokyuApplyEffect(entity, filter, 2, 1, MinecraftEffectTypes.Poison);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },6);

    }

    /**
     * 参ノ型 塒締め
     */
    sanNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hebi_kokyu3.value"}]});
        }
        const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);

        const num = system.runInterval(() => {
            try {
                const filter = addRegimentalFilter(0, entity.location, 6, entity);
                entity.applyKnockback(distance.x,distance.z,4,0);
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
     * 肆ノ型 頸蛇双生
     */
    shiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hebi_kokyu4.value"}]});
        }
        const num = system.runInterval(() => {
            try {
                const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
                entity.applyKnockback(distance.x,distance.z,3,0);

                const filter = addRegimentalFilter(1, entity.location, 4, entity);
                this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);
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
        },40);

    }

    /**
     * 伍ノ型 蜿蜿長蛇
     */
    goNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hebi_kokyu5.value"}]});
        }
        let side = 2;
        const num = system.runInterval(() => {
            try {
                const filter = addRegimentalFilter(0, entity.location, 4, entity);
                this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);
    
                const distance = getLookLocationDistance(entity.getRotation().y, 2, side, 0);
                entity.applyKnockback(distance.x,distance.z,3,0);
        
                side = -side;
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

}
