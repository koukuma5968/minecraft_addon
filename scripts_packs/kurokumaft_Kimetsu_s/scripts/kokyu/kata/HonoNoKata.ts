import { EquipmentSlot, ItemStack, Player, system } from "@minecraft/server";
import { addRegimentalFilter, getDistanceLocation, getLookLocationDistance} from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { shooting } from "../../common/ShooterEvent";
import { ItemDurabilityDamage } from "../../common/KimetuItemDurabilityDamage";

export class HonoNoKata extends KataComonClass {

    /**
     * 壱ノ型 不知火
     */
    ichiNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hono_kokyu1.value"}]});

        player.setProperty("kurokumaft:kokyu_use", false);

        const distance = getLookLocationDistance(player.getRotation().y, 1, 0, 0);
        player.applyKnockback(distance.x,distance.z,20,0);

        const num = system.runInterval(() => {
            let filter = addRegimentalFilter(0, player.location, 3.5, player.id);
            this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
        },1);

        system.runTimeout(() => {
            player.setDynamicProperty("kurokumaft:chage_type", undefined);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },12);

    }

    /**
     * 弐ノ型 昇り炎天
     */
    niNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hono_kokyu2.value"}]});

        const distance = getLookLocationDistance(player.getRotation().y, 1.5, 0, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 3, player.id);
        this.kokyuApplyDamage(player, filter, 3, 1, itemStack);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },10);

    }

    /**
     * 参ノ型 気炎万象
     */
    sanNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hono_kokyu3.value"}]});

        const distance = getLookLocationDistance(player.getRotation().y, 1.5, 0, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 3, player.id);
        this.kokyuApplyDamage(player, filter, 3, 1, itemStack);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },10);

    }

    /**
     * 肆ノ型 盛炎のうねり
     */
    shiNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hono_kokyu4.value"}]});

        const distance = getLookLocationDistance(player.getRotation().y, 3, 0, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 4, player.id);
        this.kokyuApplyDamage(player, filter, 5, 2, itemStack);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },25);

    }

    /**
     * 伍ノ型 炎虎
     */
    goNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hono_kokyu5.value"}]});

        const dragon = shooting(player, "kurokumaft:hono_tiger", 0, 3, undefined);

        if (itemStack != undefined) {
            ItemDurabilityDamage(player, itemStack, EquipmentSlot.Mainhand);
        }

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
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
    kuNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hono_kokyu9.value"}]});
        player.setProperty("kurokumaft:kokyu_use", false);

        const distance = getLookLocationDistance(player.getRotation().y, 1, 0, 0);
        player.applyKnockback(distance.x,distance.z,50,0);

        const num = system.runInterval(() => {
            const filter = addRegimentalFilter(0, player.location, 3.5, player.id);
            this.kokyuApplyDamage(player, filter, 10, 3, itemStack);
        },1);

        system.runTimeout(() => {
            player.setDynamicProperty("kurokumaft:chage_type", undefined);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },12);
    }

}
