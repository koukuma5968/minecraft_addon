import { ItemStack, Player, system, TicksPerSecond } from "@minecraft/server";
import { addRegimentalFilter, getLookPoints, getLookRotaionPoints } from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export class TukiNoKata extends KataComonClass {

    /**
     * 壱ノ型 闇月・宵の宮
     */
    ichiNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:tuki_kokyu1.value\"}]}");
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },6);

        let location = getLookPoints(player.getRotation(), player.location, 2.5);
        let filter = addRegimentalFilter(0, {x:location.x, y:location.y+0.5,z:location.z}, 3, player.id);
        this.kokyuApplyDamage(player, filter, 6, 3, itemStack);
    }

    /**
     * 弐ノ型 珠華ノ弄月
     */
    niNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:tuki_kokyu2.value\"}]}");
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },7);
        let location = getLookPoints(player.getRotation(), player.location, 2.5);
        let filter = addRegimentalFilter(0, {x:location.x, y:location.y+0.5,z:location.z}, 3, player.id);
        this.kokyuApplyDamage(player, filter, 6, 3, itemStack);
    }

    /**
     * 参ノ型 厭忌月・銷り
     */
    sanNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:tuki_kokyu3.value\"}]}");
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },25);

        // 左
        let left = getLookRotaionPoints(player.getRotation(), 1.5, -1.5);
        let lvolume = getLookPoints(player.getRotation(), {x:player.location.x+left.x, y:player.location.y+1,z:player.location.z+left.z}, 0);
        let lfilter = addRegimentalFilter(0, lvolume, 3, player.id);
        this.kokyuApplyDamage(player, lfilter, 3, 1, itemStack);

        system.runTimeout(() => {
            // 右
            let right = getLookRotaionPoints(player.getRotation(), 1.5, 1.5);
            let rvolume = getLookPoints(player.getRotation(), {x:player.location.x+right.x, y:player.location.y+1,z:player.location.z+right.z}, 0);
            let rfilter = addRegimentalFilter(0, rvolume, 3, player.id);
            this.kokyuApplyDamage(player, rfilter, 3, 1, itemStack);
        }, 15);

    }

    /**
     * 伍ノ型 月魄災渦
     */
    goNoKata(player:Player, itemStack:ItemStack) {

        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:tuki_kokyu5.value\"}]}");
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },15);

        let volume = getLookPoints(player.getRotation(), player.location, 3.5);
        let filter = addRegimentalFilter(0, volume, 2.5, player.id);
        this.kokyuApplyDamage(player, filter, 6, 3, itemStack);

    }

    /**
     * 陸ノ型 常夜孤月・無間
     */
    rokuNoKata(player:Player, itemStack:ItemStack) {

        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:tuki_kokyu6.value\"}]}");
        player.setDynamicProperty("kurokumaft:chage_type", true);
        player.setProperty("kurokumaft:kokyu_chage", 1);

        player.addEffect(MinecraftEffectTypes.Speed, 10*TicksPerSecond,{
            amplifier: 6,
            showParticles: false
        });
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_chage", 0);
            player.setProperty("kurokumaft:kokyu_particle", false);
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setDynamicProperty("kurokumaft:chage_type", undefined);
        },10*TicksPerSecond);
    }

    /**
     * 漆ノ型 厄鏡・月映え
     */
    shitiNoKata(player:Player, itemStack:ItemStack) {

        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:tuki_kokyu7.value\"}]}");
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },15);

        let volume = getLookPoints(player.getRotation(), player.location, 1.5);
        let filter = addRegimentalFilter(0, volume, 2.5, player.id);
        this.kokyuApplyDamage(player, filter, 6, 3, itemStack);
    }

    /**
     * 捌ノ型 月龍輪尾
     */
    hachiNoKata(player:Player, itemStack:ItemStack) {

        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:tuki_kokyu8.value\"}]}");
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },15);

        let volume = getLookPoints(player.getRotation(), player.location, 3.5);
        let filter = addRegimentalFilter(0, volume, 4, player.id);
        this.kokyuApplyDamage(player, filter, 6, 3, itemStack);
    }

    /**
     * 玖ノ型 降り月・連面
     */
    kuNoKata(player:Player, itemStack:ItemStack) {

        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:tuki_kokyu9.value\"}]}");
        let nowloc = player.location;
        let num = system.runInterval(() => {
            player.dimension.spawnParticle("kurokumaft:hi9_particle",nowloc);
        },1);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },20);

        let volume = getLookPoints(player.getRotation(), player.location, 1.5);
        let filter = addRegimentalFilter(0, volume, 2, player.id);
        this.kokyuApplyDamage(player, filter, 6, 3, itemStack);

        let uvolume = getLookPoints(player.getRotation(), {x:player.location.x, y:player.location.y+3,z:player.location.z}, 1.5);
        let ufilter = addRegimentalFilter(0, uvolume, 3, player.id);
        this.kokyuApplyDamage(player, ufilter, 6, 3, itemStack);
    }

    /**
     * 拾ノ型 穿面斬・蘿月
     */
    zyuNoKata(player:Player, itemStack:ItemStack) {

        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:tuki_kokyu10.value\"}]}");
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },15);
        // fornt
        let location = getLookPoints(player.getRotation(), player.location, 2.5);
        let filter = addRegimentalFilter(0, location, 2.5, player.id);
        this.kokyuApplyDamage(player, filter, 6, 3, itemStack);
        // back
        location = getLookPoints(player.getRotation(), player.location, -2.5);
        filter = addRegimentalFilter(0, location, 2.5, player.id);
        this.kokyuApplyDamage(player, filter, 6, 3, itemStack);
        // up
        location = getLookPoints(player.getRotation(), {x:player.location.x, y:player.location.y+2.5,z:player.location.z}, 0);
        filter = addRegimentalFilter(0, location, 2.5, player.id);
        this.kokyuApplyDamage(player, filter, 6, 3, itemStack);
        // down
        location = getLookPoints(player.getRotation(), {x:player.location.x, y:player.location.y-2.5,z:player.location.z}, 0);
        filter = addRegimentalFilter(0, location, 2.5, player.id);
        this.kokyuApplyDamage(player, filter, 6, 3, itemStack);

    }

    /**
     * 拾肆ノ型 兇変・天満繊月
     */
    zyushiNoKata(player:Player, itemStack:ItemStack) {

        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:yuki_kokyu14.value\"}]}");
        player.setDynamicProperty("kurokumaft:chage_type", true);
        player.setProperty("kurokumaft:kokyu_chage", 1);

        player.addEffect(MinecraftEffectTypes.Invisibility, 10*TicksPerSecond,{
            amplifier: 10,
            showParticles: false
        });
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_chage", 0);
            player.setProperty("kurokumaft:kokyu_particle", false);
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setDynamicProperty("kurokumaft:chage_type", undefined);
        },10*TicksPerSecond);

    }

    /**
     * 拾陸ノ型 月虹・片割れ月
     */
    zyurokuNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:tuki_kokyu16.value\"}]}");
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },10);

        let location = getLookPoints(player.getRotation(), player.location, 2.5);
        let filter = addRegimentalFilter(0, {x:location.x, y:location.y+0.5,z:location.z}, 3, player.id);
        this.kokyuApplyDamage(player, filter, 6, 3, itemStack);

        system.runTimeout(() => {
            this.kokyuApplyDamage(player, filter, 6, 3, itemStack);
        }, 10);

    }
    
}
