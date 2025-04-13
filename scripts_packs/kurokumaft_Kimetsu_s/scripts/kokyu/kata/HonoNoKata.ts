import { EntityDamageCause, ItemStack, Player, system, TicksPerSecond, world } from "@minecraft/server";
import { addRegimentalFilter, getLookPoints, getLookRotaionPoints, weightChoice } from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";
import { shooting } from "../../common/ShooterEvent";

export class HonoNoKata extends KataComonClass {

    /**
     * 壱ノ型 不知火
     */
    ichiNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hono_kokyu1.value\"}]}");

        player.setProperty("kurokumaft:kokyu_use", false);

        let location = getLookRotaionPoints(player.getRotation(), 1, 0);
        player.applyKnockback(location.x,location.z,20,0);

        let num = system.runInterval(() => {
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
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hono_kokyu2.value\"}]}");


        let location = getLookPoints(player.getRotation(), player.location, 1.5)
        let filter = addRegimentalFilter(0, location, 3, player.id);
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
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hono_kokyu3.value\"}]}");

        let location = getLookPoints(player.getRotation(), player.location, 1.5);
        let filter = addRegimentalFilter(0, location, 3, player.id);
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
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hono_kokyu4.value\"}]}");

        let location = getLookPoints(player.getRotation(), player.location, 3);
        let filter = addRegimentalFilter(0, location, 4, player.id);
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
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hono_kokyu5.value\"}]}");

        const dragon = shooting(player, "kurokumaft:hono_tiger", 0, 3, undefined);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },10);

    }

    /**
     * 玖ノ型 煉獄
     */
    kuNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hono_kokyu9.value\"}]}");
        player.setProperty("kurokumaft:kokyu_use", false);

        let location = getLookRotaionPoints(player.getRotation(), 1, 0);
        player.applyKnockback(location.x,location.z,50,0);

        let num = system.runInterval(() => {
            let filter = addRegimentalFilter(0, player.location, 3.5, player.id);
            this.kokyuApplyDamage(player, filter, 10, 3, itemStack);
        },1);

        system.runTimeout(() => {
            player.setDynamicProperty("kurokumaft:chage_type", undefined);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },12);
    }

}
