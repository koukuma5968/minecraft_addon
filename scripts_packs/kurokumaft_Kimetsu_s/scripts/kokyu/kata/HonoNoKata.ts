import { EquipmentSlot, ItemStack, Entity, system, Player } from "@minecraft/server";
import { addRegimentalFilter, getDistanceLocation, getLookLocationDistance} from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { shooting } from "../../common/ShooterEvent";
import { ItemDurabilityDamage } from "../../common/KimetuItemDurabilityDamage";

export class HonoNoKata extends KataComonClass {

    /**
     * 壱ノ型 不知火
     */
    ichiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hono_kokyu1.value"}]});
        }
        entity.setProperty("kurokumaft:kokyu_use", false);

        const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
        entity.applyKnockback(distance.x,distance.z,20,0);

        const num = system.runInterval(() => {
            try {
                let filter = addRegimentalFilter(0, entity.location, 3.5, entity);
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
     * 弐ノ型 昇り炎天
     */
    niNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hono_kokyu2.value"}]});
        }
        const distance = getLookLocationDistance(entity.getRotation().y, 1.5, 0, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
        this.kokyuApplyDamage(entity, filter, 3, 1, itemStack);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },10);

    }

    /**
     * 参ノ型 気炎万象
     */
    sanNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hono_kokyu3.value"}]});
        }
        const distance = getLookLocationDistance(entity.getRotation().y, 1.5, 0, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
        this.kokyuApplyDamage(entity, filter, 3, 1, itemStack);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },10);

    }

    /**
     * 肆ノ型 盛炎のうねり
     */
    shiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hono_kokyu4.value"}]});
        }
        const distance = getLookLocationDistance(entity.getRotation().y, 3, 0, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 4, entity);
        this.kokyuApplyDamage(entity, filter, 5, 2, itemStack);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },25);

    }

    /**
     * 伍ノ型 炎虎
     */
    goNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hono_kokyu5.value"}]});
        }
        const dragon = shooting(entity, "kurokumaft:hono_tiger", 0, 3, undefined);

        if (itemStack != undefined) {
            ItemDurabilityDamage(entity, itemStack, EquipmentSlot.Mainhand);
        }

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },10);

        system.runTimeout(() => {
            if (dragon.isValid()) {
                dragon.remove();
            }
        },20);

    }

    /**
     * 玖ノ型 煉獄
     */
    kuNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hono_kokyu9.value"}]});
        }
        entity.setProperty("kurokumaft:kokyu_use", false);

        const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
        entity.applyKnockback(distance.x,distance.z,50,0);

        const num = system.runInterval(() => {
            try {
                const filter = addRegimentalFilter(0, entity.location, 3.5, entity);
                this.kokyuApplyDamage(entity, filter, 10, 3, itemStack);
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

}
