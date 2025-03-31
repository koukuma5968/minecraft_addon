import { EntityDamageCause, ItemStack, Player, system, TicksPerSecond, world } from "@minecraft/server";
import { addRegimentalFilter, getLookPoints, getLookRotaionPoints, weightChoice } from "../../common/KimetuCommonUtil";
import { ZytuComonClass } from "./ZytuComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";
import { shooting } from "../../common/ShooterEvent";

export class Tigama extends ZytuComonClass {

    /**
     * 飛び血鎌
     */
    ichi(player:Player, itemStack:ItemStack) {
        player.setProperty("kurokumaft:kokyu_use", false);
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kekkizyutu_tigama1.value\"}]}");
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
        },6);

        let location = getLookPoints(player.getRotation(), player.location, 1.5)
        let filter = addRegimentalFilter(0, location, 2.5, player.id);
        this.kokyuApplyDamage(player, filter, 4, 2, itemStack);

    }

    /**
     * 跋扈跳梁
     */
    niNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kekkizyutu_tigama2.value\"}]}");
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },TicksPerSecond);
        // fornt
        let location = getLookPoints(player.getRotation(), player.location, 2.5);
        let filter = addRegimentalFilter(0, location, 2.5, player.id);
        this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
        // back
        location = getLookPoints(player.getRotation(), player.location, -2.5);
        filter = addRegimentalFilter(0, location, 2.5, player.id);
        this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
        // up
        location = getLookPoints(player.getRotation(), {x:player.location.x, y:player.location.y+2.5,z:player.location.z}, 0);
        filter = addRegimentalFilter(0, location, 2.5, player.id);
        this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
        // down
        location = getLookPoints(player.getRotation(), {x:player.location.x, y:player.location.y-2.5,z:player.location.z}, 0);
        filter = addRegimentalFilter(0, location, 2.5, player.id);
        this.kokyuApplyDamage(player, filter, 3, 1, itemStack);

    }

    /**
     * 円斬旋回・飛び血鎌
     */
    sanNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kekkizyutu_tigama3.value\"}]}");
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },30);

        // 左
        let left = getLookRotaionPoints(player.getRotation(), 1.5, -1.5);
        let lvolume = getLookPoints(player.getRotation(), {x:player.location.x+left.x, y:player.location.y,z:player.location.z+left.z}, 0);
        let lfilter = addRegimentalFilter(0, lvolume, 3, player.id);
        this.kokyuApplyDamage(player, lfilter, 2, 1, itemStack);
        system.runTimeout(() => {
            // 右
            let right = getLookRotaionPoints(player.getRotation(), 1.5, 1.5);
            let rvolume = getLookPoints(player.getRotation(), {x:player.location.x+right.x, y:player.location.y,z:player.location.z+right.z}, 0);
            let rfilter = addRegimentalFilter(0, rvolume, 3, player.id);
            this.kokyuApplyDamage(player, rfilter, 2, 1, itemStack);
        }, 10);
        system.runTimeout(() => {
            // 中央
            let cvolume = getLookPoints(player.getRotation(), player.location, 1.5);
            let cfilter = addRegimentalFilter(0, cvolume, 3, player.id);
            this.kokyuApplyDamage(player, cfilter, 2, 1, itemStack);
        }, 20);

    }

}
