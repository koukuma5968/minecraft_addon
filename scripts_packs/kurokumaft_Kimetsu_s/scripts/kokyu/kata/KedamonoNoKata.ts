import { ItemStack, Player, system, TicksPerSecond } from "@minecraft/server";
import { addRegimentalFilter, getLookPoints, getLookRotaionPoints } from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export class KedamonoNoKata extends KataComonClass {

    /**
     * 壱ノ牙 穿ち抜き
     */
    ichiNoKata(player:Player, itemStack:ItemStack) {

        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kedamono_kokyu1.value\"}]}");
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },15);

        let volume = getLookPoints(player.getRotation(), player.location, 1.5);
        let filter = addRegimentalFilter(0, volume, 3, player.id);
        this.kokyuApplyDamage(player, filter, 4, 2, itemStack);

    }

    /**
     * 弐ノ牙 切り裂き
     */
    niNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kedamono_kokyu2.value\"}]}");
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },15);

        // 左
        let left = getLookRotaionPoints(player.getRotation(), 1.5, -0.5);
        let lvolume = getLookPoints(player.getRotation(), {x:player.location.x+left.x, y:player.location.y,z:player.location.z+left.z}, 0);
        let lfilter = addRegimentalFilter(0, lvolume, 3, player.id);
        this.kokyuApplyDamage(player, lfilter, 2, 1, itemStack);
        system.runTimeout(() => {
            // 右
            let right = getLookRotaionPoints(player.getRotation(), 1.5, 0.5);
            let rvolume = getLookPoints(player.getRotation(), {x:player.location.x+right.x, y:player.location.y,z:player.location.z+right.z}, 0);
            let rfilter = addRegimentalFilter(0, rvolume, 3, player.id);
            this.kokyuApplyDamage(player, rfilter, 2, 1, itemStack);
        }, 10);

    }

    /**
     * 参ノ牙 喰い裂き
     */
    sanNoKata(player:Player, itemStack:ItemStack) {
        
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kedamono_kokyu3.value\"}]}");
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },10);

        let volume = getLookPoints(player.getRotation(), player.location, 1.5);
        let filter = addRegimentalFilter(0, volume, 2.5, player.id);
        this.kokyuApplyDamage(player, filter, 4, 2, itemStack);

    }

    /**
     * 肆ノ牙 切細裂き
     */
    shiNoKata(player:Player, itemStack:ItemStack) {

        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kedamono_kokyu4.value\"}]}");

        let num = system.runInterval(() => {
            let location = getLookPoints(player.getRotation(), player.location, 1.5)
            let filter = addRegimentalFilter(0, location, 3, player.id);
            this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
        },4);
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },40);

    }

    /**
     * 伍ノ牙 狂い裂き
     */
    goNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kedamono_kokyu5.value\"}]}");

        let num = system.runInterval(() => {
            let location = getLookPoints(player.getRotation(), player.location, 0)
            let filter = addRegimentalFilter(0, location, 4, player.id);
            this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
        },4);
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },20);

    }

    /**
     * 陸ノ牙 乱杭咬み
     */
    rokuNoKata(player:Player, itemStack:ItemStack) {

        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kedamono_kokyu6.value\"}]}");

        let num = system.runInterval(() => {
            let location = getLookPoints(player.getRotation(), player.location, 1)
            let filter = addRegimentalFilter(0, location, 3.5, player.id);
            this.kokyuApplyDamage(player, filter, 4, 2, itemStack);
        },4);
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },40);

    }

    /**
     * 漆ノ型 空間識覚
     */
    shitiNoKata(player:Player, itemStack:ItemStack) {

        player.setProperty("kurokumaft:kokyu_use", false);
        player.setProperty("kurokumaft:kokyu_particle", false);

        if (player.getDynamicProperty("kurokumaft:chage_type") == undefined) {
            player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kedamono_kokyu7.value\"}]}");
            player.setDynamicProperty("kurokumaft:chage_type", true);

            player.addEffect(MinecraftEffectTypes.NightVision, 30*TicksPerSecond,{
                amplifier: 5,
                showParticles: false
            });
            const location = getLookPoints(player.getRotation(), player.location, 0);
            const filter = addRegimentalFilter(0, location, 16, player.id);
            const targets = player.dimension.getEntities(filter);

            const num = system.runInterval(() => {
                targets.forEach(en => {
                    en.dimension.spawnParticle("kurokumaft:kedamono7_particle", en.location);
                });
            },2);

            system.runTimeout(() => {
                player.setDynamicProperty("kurokumaft:chage_type", undefined);
            },10);

            system.runTimeout(() => {
                system.clearRun(num);
            },10*TicksPerSecond);
        }
    }

    /**
     * 捌ノ型 爆裂猛進
     */
    hachiNoKata(player:Player, itemStack:ItemStack) {

        player.setProperty("kurokumaft:kokyu_use", false);
        player.setProperty("kurokumaft:kokyu_particle", false);
        if (player.getDynamicProperty("kurokumaft:chage_type") == undefined) {
            player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kedamono_kokyu8.value\"}]}");
            player.setDynamicProperty("kurokumaft:chage_type", true);
            player.setProperty("kurokumaft:kokyu_chage", 10);
    
            player.addEffect(MinecraftEffectTypes.Speed, 10*TicksPerSecond,{
                amplifier: 5,
                showParticles: false
            });
            system.runTimeout(() => {
                player.setDynamicProperty("kurokumaft:chage_type", undefined);
                player.setProperty("kurokumaft:kokyu_chage", 0);
            },10*TicksPerSecond);
        }
    }

    /**
     * 玖ノ牙 伸・うねり裂き
     */
    kuNoKata(player:Player, itemStack:ItemStack) {

        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kedamono_kokyu9.value\"}]}");
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },10);

        const volume = getLookPoints(player.getRotation(), player.location, 3.5);
        const filter = addRegimentalFilter(0, volume, 6, player.id);
        this.kokyuApplyDamage(player, filter, 6, 3, itemStack);
    }

    /**
     * 拾ノ牙 円転旋牙
     */
    zyuNoKata(player:Player, itemStack:ItemStack) {

        if (player.getDynamicProperty("kurokumaft:chage_type") == undefined) {
            player.setDynamicProperty("kurokumaft:chage_type", true);
            player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kedamono_kokyu10.value\"}]}");

            const num = system.runInterval(() => {
                // 左
                let left = getLookRotaionPoints(player.getRotation(), 0.5, -1.5);
                let lvolume = getLookPoints(player.getRotation(), {x:player.location.x+left.x, y:player.location.y,z:player.location.z+left.z}, 0);
                let lfilter = addRegimentalFilter(0, lvolume, 4, player.id);
                this.kokyuApplyDamage(player, lfilter, 2, 1, itemStack);

                // 右
                let right = getLookRotaionPoints(player.getRotation(), 0.5, 1.5);
                let rvolume = getLookPoints(player.getRotation(), {x:player.location.x+right.x, y:player.location.y,z:player.location.z+right.z}, 0);
                let rfilter = addRegimentalFilter(0, rvolume, 4, player.id);
                this.kokyuApplyDamage(player, rfilter, 2, 1, itemStack);
            },4);

            system.runTimeout(() => {
                player.setProperty("kurokumaft:kokyu_use", false);
                player.setProperty("kurokumaft:kokyu_particle", false);
                player.setDynamicProperty("kurokumaft:chage_type", undefined);
                system.clearRun(num);
            },3*TicksPerSecond);
    
        }


    }

}
