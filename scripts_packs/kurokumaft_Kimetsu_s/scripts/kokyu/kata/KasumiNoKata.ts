import { ItemStack, Player, system, TicksPerSecond } from "@minecraft/server";
import { addRegimentalFilter, getLookPoints } from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { shooting } from "../../common/ShooterEvent";

export class KasumiNoKata extends KataComonClass {

    /**
     * 壱ノ型 垂天遠霞
     */
    ichiNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kasumi_kokyu1.value\"}]}");
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
        },6);

        let location = getLookPoints(player.getRotation(), player.location, 1.5)
        let filter = addRegimentalFilter(0, location, 2.5, player.id);
        this.kokyuApplyDamage(player, filter, 5, 2, itemStack);

    }
    /**
     * 弐ノ型 八重霞
     */
    niNoKata(player:Player, itemStack:ItemStack) {
        player.setProperty("kurokumaft:kokyu_use", false);
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kasumi_kokyu2.value\"}]}");

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
     * 参ノ型 霞散の飛沫
     */
    sanNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kasumi_kokyu3.value\"}]}");

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
     * 肆ノ型 移流斬り
     */
    shiNoKata(player:Player, itemStack:ItemStack) {
        player.setProperty("kurokumaft:kokyu_use", false);
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kasumi_kokyu4.value\"}]}");

        let location = getLookPoints(player.getRotation(), player.location, 0);
        let filter = addRegimentalFilter(1, location, 10, player.id);
        this.kokyuApplyDamage(player, filter, 5, 2, itemStack);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
        },10);

    }

    /**
     * 伍ノ型 霞雲の海
     */
    goNoKata(player:Player, itemStack:ItemStack) {
        player.setProperty("kurokumaft:kokyu_use", false);
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kasumi_kokyu5.value\"}]}");

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

    /**
     * 陸ノ型 月の霞消
     */
    rokuNoKata(player:Player, itemStack:ItemStack) {
        player.setProperty("kurokumaft:kokyu_use", false);
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kasumi_kokyu6.value\"}]}");

        let nowloc = player.location;
        let num = system.runInterval(() => {
            player.dimension.spawnParticle("kurokumaft:kaminari6_particle",nowloc);
        },1);

        let location = getLookPoints(player.getRotation(), player.location, 0);
        let filter = addRegimentalFilter(1, location, 15, player.id);
        this.kokyuApplyDamage(player, filter, 8, 4, itemStack);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },10);

    }

    /**
     * 漆ノ型 朧
     */
    shitiNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kasumi_kokyu7.value\"}]}");
        player.setProperty("kurokumaft:kokyu_use", false);
        player.setProperty("kurokumaft:kokyu_chage", 0);
        player.setDynamicProperty("kurokumaft:chage_type", undefined);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
        },20);

        let location = getLookPoints(player.getRotation(), player.location, 0)
        let filter = addRegimentalFilter(0, location, 30, player.id);

        let targets = player.dimension.getEntities(filter);
        if (targets.length > 0) {
            player.teleport(targets[0].location, {
                facingLocation: targets[0].location,
            });
   
        }

        filter = addRegimentalFilter(0, player.location, 6, player.id);
        this.kokyuApplyDamage(player, filter, 20, 6, itemStack);

    }

}
