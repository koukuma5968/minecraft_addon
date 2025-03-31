import { EntityDamageCause, ItemStack, Player, system, TicksPerSecond, world } from "@minecraft/server";
import { addRegimentalFilter, getLookPoints, getLookRotaionPoints, weightChoice } from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";
import { shooting } from "../../common/ShooterEvent";

export class HebiNoKata extends KataComonClass {

    /**
     * 壱ノ型 委蛇斬り
     */
    ichiNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hebi_kokyu1.value\"}]}");
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
        },6);

        let location = getLookPoints(player.getRotation(), player.location, 1.5)
        let filter = addRegimentalFilter(0, location, 2.5, player.id);
        this.kokyuApplyDamage(player, filter, 5, 2, itemStack);

    }
    /**
     * 弐ノ型 狭頭の毒牙
     */
    niNoKata(player:Player, itemStack:ItemStack) {
        player.setProperty("kurokumaft:kokyu_use", false);
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hebi_kokyu2.value\"}]}");

        let num = system.runInterval(() => {
            let location = getLookPoints(player.getRotation(), player.location, 1.5)
            let filter = addRegimentalFilter(1, location, 3, player.id);
            this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
        },4);
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },20);

    }

    /**
     * 参ノ型 塒締め
     */
    sanNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hebi_kokyu3.value\"}]}");

        let num = system.runInterval(() => {
            let location = getLookPoints(player.getRotation(), player.location, 0);
            let filter = addRegimentalFilter(1, location, 6, player.id);
            this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
        },2);
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },30);

    }

    /**
     * 肆ノ型 頸蛇双生
     */
    shiNoKata(player:Player, itemStack:ItemStack) {
        player.setProperty("kurokumaft:kokyu_use", false);
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hebi_kokyu4.value\"}]}");

        let location = getLookPoints(player.getRotation(), player.location, 0);
        let filter = addRegimentalFilter(1, location, 10, player.id);
        this.kokyuApplyDamage(player, filter, 5, 2, itemStack);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
        },10);

    }

    /**
     * 伍ノ型 蜿蜿長蛇
     */
    goNoKata(player:Player, itemStack:ItemStack) {
        player.setProperty("kurokumaft:kokyu_use", false);
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hebi_kokyu5.value\"}]}");

        let nowloc = player.location;
        let num = system.runInterval(() => {
            player.dimension.spawnParticle("kurokumaft:kaminari5_particle",nowloc);
        },1);

        let dragon = shooting(player, "kurokumaft:kaminari_dragon", 0, 3, "small");
        system.runTimeout(() => {
            dragon.remove();
        }, 2*TicksPerSecond);

        let location = getLookPoints(player.getRotation(), player.location, 0);
        let filter = addRegimentalFilter(1, location, 6, player.id);
        this.kokyuApplyDamage(player, filter, 5, 2, itemStack);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },10);

    }

}
