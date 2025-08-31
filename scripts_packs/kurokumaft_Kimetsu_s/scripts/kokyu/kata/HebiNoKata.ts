import { ItemStack, Entity, system, Player } from "@minecraft/server";
import { addRegimentalFilter, getDistanceLocation, getLookLocationDistance, getLookLocationDistancePitch } from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { ItemDurabilityDamage } from "../../common/KimetuItemDurabilityDamage";

export class HebiNoKata extends KataComonClass {

    /**
     * 壱ノ型 委蛇斬り
     */
    ichiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hebi_kokyu1.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        const distancePitch = getLookLocationDistancePitch(entity.getRotation(), 3, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distancePitch), 4, entity);
        this.kokyuApplyDamage(entity, filter, 3, 2, itemStack);

        const distance = getLookLocationDistance(entity.getRotation().y, 6, 0, 0);
        entity.applyKnockback({x:distance.x,z:distance.z},0);

        system.waitTicks(6).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
        });

    }
    /**
     * 弐ノ型 狭頭の毒牙
     */
    niNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hebi_kokyu2.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        const distancePitch = getLookLocationDistancePitch(entity.getRotation(), 0, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distancePitch), 3, entity);
        this.kokyuApplyDamage(entity, filter, 4, 2, itemStack);
        this.kokyuApplyEffect(entity, filter, 2, 1, "minecraft:poison");

        system.waitTicks(6).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
        });

    }

    /**
     * 参ノ型 塒締め
     */
    sanNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hebi_kokyu3.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        const distance = getLookLocationDistance(entity.getRotation().y, 3, 0, 0);

        const num = system.runInterval(() => {
            try {
                const filter = addRegimentalFilter(0, entity.location, 6, entity);
                entity.applyKnockback({x:distance.x,z:distance.z},0);
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
     * 肆ノ型 頸蛇双生
     */
    shiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hebi_kokyu4.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        const num = system.runInterval(() => {
            try {
                const distance = getLookLocationDistance(entity.getRotation().y, 3, 0, 0);
                entity.applyKnockback({x:distance.x,z:distance.z},0);

                const filter = addRegimentalFilter(1, entity.location, 4, entity);
                this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);
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

    /**
     * 伍ノ型 蜿蜿長蛇
     */
    goNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hebi_kokyu5.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        let side = 4;
        const num = system.runInterval(() => {
            try {
                const filter = addRegimentalFilter(0, entity.location, 4, entity);
                this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);
    
                const distance = getLookLocationDistance(entity.getRotation().y, 4, side, 0);
                entity.applyKnockback({x:distance.x,z:distance.z},0);
        
                side = -side;
            } catch (error: any) {
                system.clearRun(num);
            }
        },2);

        system.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

    }

}
