import { ItemStack, MolangVariableMap, Player, system, TicksPerSecond, world } from "@minecraft/server";
import { addRegimentalFilter, getLookPoints, getLookRotaionPoints } from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export class HiNoKata extends KataComonClass {

    /**
     * 壱ノ型 円舞
     */
    ichiNoKata(player:Player, itemStack:ItemStack) {
        player.setProperty("kurokumaft:kokyu_use", false);
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hi_kokyu1.value\"}]}");
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
        },6);

        let location = getLookPoints(player.getRotation(), player.location, 2.5);
        let filter = addRegimentalFilter(0, {x:location.x, y:location.y+0.5,z:location.z}, 3, player.id);
        this.kokyuApplyDamage(player, filter, 6, 3, itemStack);
    }

    /**
     * 壱ノ型 円舞一閃
     */
    ichiNoKataIssen(player:Player, itemStack:ItemStack) {

        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hi_kokyu1_issen.value\"}]}");
        player.setProperty("kurokumaft:kokyu_use", false);
        player.setProperty("kurokumaft:kokyu_chage", 0);

        let location = getLookRotaionPoints(player.getRotation(), 1, 0);
        player.applyKnockback(location.x,location.z,30,0);

        let num = system.runInterval(() => {
            let filter = addRegimentalFilter(0, player.location, 3.5, player.id);
            this.kokyuApplyDamage(player, filter, 5, 2, itemStack);
        },1);

        system.runTimeout(() => {
            player.setDynamicProperty("kurokumaft:chage_type", undefined);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },12);

    }

    /**
     * 弐ノ型 碧羅の天
     */
    niNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hi_kokyu2.value\"}]}");
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },7);
        let location = getLookPoints(player.getRotation(), player.location, 2.5);
        let filter = addRegimentalFilter(0, {x:location.x, y:location.y+0.5,z:location.z}, 3, player.id);
        this.kokyuApplyDamage(player, filter, 6, 3, itemStack);
    }

    /**
     * 参ノ型 烈日紅鏡
     */
    sanNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hi_kokyu3.value\"}]}");
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
     * 肆ノ型 灼骨炎陽
     */
    shiNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hi_kokyu4.value\"}]}");

        let z = 0;
        let num = system.runInterval(() => {
            let location = getLookPoints(player.getRotation(), player.location, z);
            let filter = addRegimentalFilter(0, {x:location.x, y:location.y+0.5,z:location.z}, 3, player.id);
            this.kokyuApplyDamage(player, filter, 6, 3, itemStack);
            z++;
        },4);
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },30);

     }

    /**
     * 伍ノ型 陽華突
     */
    goNoKata(player:Player, itemStack:ItemStack) {

        player.setProperty("kurokumaft:kokyu_use", false);
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hi_kokyu5.value\"}]}");
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
        },5);

        let volume = getLookPoints(player.getRotation(), player.location, 3.5);
        let filter = addRegimentalFilter(0, volume, 2.5, player.id);
        this.kokyuApplyDamage(player, filter, 6, 3, itemStack);

    }

    /**
     * 陸ノ型 日暈の龍 頭舞い
     */
    rokuNoKata(player:Player, itemStack:ItemStack) {

        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hi_kokyu6.value\"}]}");
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
     * 陸ノ型 日暈の龍 頭舞い
     */
    rokuNoKataAttack(player:Player, itemStack:ItemStack) {

        if (player.getProperty("kurokumaft:kokyu_chage") == 1) {
            let volume = getLookPoints(player.getRotation(), player.location, 0);
            let filter = addRegimentalFilter(0, volume, 4.5, player.id);
            this.kokyuApplyDamage(player, filter, 6, 3, itemStack);
        }
    }

    /**
     * 漆ノ型 斜陽転身
     */
    shitiNoKata(player:Player, itemStack:ItemStack) {

        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hi_kokyu7.value\"}]}");
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },15);

        let volume = getLookPoints(player.getRotation(), player.location, 1.5);
        let filter = addRegimentalFilter(0, volume, 2.5, player.id);
        this.kokyuApplyDamage(player, filter, 6, 3, itemStack);
    }

    /**
     * 捌ノ型 飛輪陽炎
     */
    hachiNoKata(player:Player, itemStack:ItemStack) {

        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hi_kokyu8.value\"}]}");
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },15);

        let volume = getLookPoints(player.getRotation(), player.location, 3.5);
        let filter = addRegimentalFilter(0, volume, 4, player.id);
        this.kokyuApplyDamage(player, filter, 6, 3, itemStack);
    }

    /**
     * 玖ノ型 輝輝恩光
     */
    kuNoKata(player:Player, itemStack:ItemStack) {

        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hi_kokyu9.value\"}]}");
        let nowloc = player.location;
        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);
        let num = system.runInterval(() => {
            player.dimension.spawnParticle("kurokumaft:hi9_particle",nowloc,molang);
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
     * 拾ノ型 火車
     */
    zyuNoKata(player:Player, itemStack:ItemStack) {

        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hi_kokyu10.value\"}]}");
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
     * 拾壱ノ型 幻日虹
     */
    zyuichiNoKata(player:Player, itemStack:ItemStack) {

        player.setProperty("kurokumaft:kokyu_use", false);
        if (player.getDynamicProperty("kurokumaft:chage_type") == undefined) {
            player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hi_kokyu11.value\"}]}");
            player.setDynamicProperty("kurokumaft:chage_type", true);
            player.setProperty("kurokumaft:kokyu_chage", 10);
    
            player.addEffect(MinecraftEffectTypes.Invisibility, 10*TicksPerSecond,{
                amplifier: 10,
                showParticles: false
            });
            system.runTimeout(() => {
                player.setProperty("kurokumaft:kokyu_chage", 0);
                player.setProperty("kurokumaft:kokyu_particle", false);
                player.setDynamicProperty("kurokumaft:chage_type", undefined);
            },10*TicksPerSecond);
        }

    }

    /**
     * 拾弐ノ型 炎舞
     */
    zyuniNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hi_kokyu12.value\"}]}");
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
