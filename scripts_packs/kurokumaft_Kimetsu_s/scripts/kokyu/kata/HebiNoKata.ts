import { ItemStack, Player, system } from "@minecraft/server";
import { addRegimentalFilter, getLookPoints, getLookRotaionPoints } from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export class HebiNoKata extends KataComonClass {

    /**
     * 壱ノ型 委蛇斬り
     */
    ichiNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hebi_kokyu1.value\"}]}");

        const point = getLookRotaionPoints(player.getRotation(), 1, 0);
        player.applyKnockback(point.x,point.z,6,0);

        const location = getLookPoints(player.getRotation(), player.location, 1.5)
        const filter = addRegimentalFilter(0, location, 3, player.id);
        this.kokyuApplyDamage(player, filter, 3, 2, itemStack);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },6);

    }
    /**
     * 弐ノ型 狭頭の毒牙
     */
    niNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hebi_kokyu2.value\"}]}");

        const location = getLookPoints(player.getRotation(), player.location, 0)
        const filter = addRegimentalFilter(0, location, 3, player.id);
        this.kokyuApplyDamage(player, filter, 4, 2, itemStack);
        this.kokyuApplyEffect(player, filter, 2, 1, MinecraftEffectTypes.Poison);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },6);

    }

    /**
     * 参ノ型 塒締め
     */
    sanNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hebi_kokyu3.value\"}]}");

        const point = getLookRotaionPoints(player.getRotation(), 1, 0);
        player.applyKnockback(point.x,point.z,30,0);

        const num = system.runInterval(() => {
            const location = getLookPoints(player.getRotation(), player.location, 0);
            const filter = addRegimentalFilter(0, location, 6, player.id);
            this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
        },4);
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },20);

    }

    /**
     * 肆ノ型 頸蛇双生
     */
    shiNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hebi_kokyu4.value\"}]}");

        const num = system.runInterval(() => {
            const point = getLookRotaionPoints(player.getRotation(), 1, 0);
            player.applyKnockback(point.x,point.z,3,0);

            const location = getLookPoints(player.getRotation(), player.location, 0);
            const filter = addRegimentalFilter(1, location, 4, player.id);
            this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
        },2);
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },40);

    }

    /**
     * 伍ノ型 蜿蜿長蛇
     */
    goNoKata(player:Player, itemStack:ItemStack) {

        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hebi_kokyu5.value\"}]}");

        let side = 2;
        const num = system.runInterval(() => {
            const location = getLookPoints(player.getRotation(), player.location, 0)
            const filter = addRegimentalFilter(0, location, 4, player.id);
            this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
 
            const point = getLookRotaionPoints(player.getRotation(), 2, side);
            player.applyKnockback(point.x,point.z,3,0);
    
            side = -side;
        },2);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },20);

    }

}
