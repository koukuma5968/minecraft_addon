import { ItemStack, MolangVariableMap, Player, system, TicksPerSecond } from "@minecraft/server";
import { addRegimentalFilter, getDistanceLocation, getLookLocationDistance, getLookLocationDistancePitch} from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export class KasumiNoKata extends KataComonClass {

    /**
     * 壱ノ型 垂天遠霞
     */
    ichiNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kasumi_kokyu1.value"}]});
        player.setProperty("kurokumaft:kokyu_use", false);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
        },5);

        const distance1 = getLookLocationDistancePitch(player.getRotation(), 1.5, 0);
        const filter1 = addRegimentalFilter(0, getDistanceLocation(player.location, distance1), 3, player.id);
        this.kokyuApplyDamage(player, filter1, 4, 1, itemStack);

        const distance2 = getLookLocationDistancePitch(player.getRotation(), 4.5, 0);
        const filter2 = addRegimentalFilter(0, getDistanceLocation(player.location, distance2), 2, player.id);
        this.kokyuApplyDamage(player, filter2, 4, 1, itemStack);

    }
    /**
     * 弐ノ型 八重霞
     */
    niNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kasumi_kokyu2.value"}]});

        const num = system.runInterval(() => {
            const filter = addRegimentalFilter(0, player.location, 4, player.id);
            this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
        },2);
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },20);

    }

    /**
     * 参ノ型 霞散の飛沫
     */
    sanNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kasumi_kokyu3.value"}]});
        player.setProperty("kurokumaft:kokyu_use", false);

        const filter = addRegimentalFilter(0, player.location, 6, player.id);
        this.kokyuApplyDamage(player, filter, 5, 2, itemStack);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
        },10);

    }

    /**
     * 肆ノ型 移流斬り
     */
    shiNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kasumi_kokyu4.value"}]});
        player.setProperty("kurokumaft:kokyu_use", false);

        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const filter = addRegimentalFilter(0, player.location, 2.5, player.id);
        this.kokyuApplyDamage(player, filter, 4, 1, itemStack);

        const num = system.runInterval(() => {
            player.dimension.spawnParticle("kurokumaft:kasumi_fog_particle", player.location, molang);
        },2);

        const distance = getLookLocationDistance(player.getRotation().y, 1, 0, 0);
        player.applyKnockback(distance.x,distance.z,6,0);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },10);

    }

    /**
     * 伍ノ型 霞雲の海
     */
    goNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kasumi_kokyu5.value"}]});

        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const num = system.runInterval(() => {
            const filter = addRegimentalFilter(0, player.location, 3, player.id);
            this.kokyuApplyDamage(player, filter, 3, 1, itemStack);

            const distance = getLookLocationDistance(player.getRotation().y, 1, 0, 0);
            player.applyKnockback(distance.x,distance.z,2,0);
            const pdistance = getLookLocationDistance(player.getRotation().y, 2, 0, 0);
            player.dimension.spawnParticle("kurokumaft:kasumi_fog_particle", getDistanceLocation(player.location, pdistance), molang);
    
        },2);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },20);

    }

    /**
     * 陸ノ型 月の霞消
     */
    rokuNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kasumi_kokyu6.value"}]});

        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const num = system.runInterval(() => {
            const distance = getLookLocationDistance(player.getRotation().y, 1.5, 0, -0.5);
            const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 6, player.id);
            this.kokyuApplyDamage(player, filter, 4, 2, itemStack);

            player.dimension.spawnParticle("kurokumaft:kasumi_fog_particle", getDistanceLocation(player.location, distance), molang);

        },4);

        const distance = getLookLocationDistance(player.getRotation().y, 1.5, 0, 1);
        player.applyKnockback(distance.x,distance.z,5,0.6);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },20);

    }

    /**
     * 漆ノ型 朧
     */
    shitiNoKata(player:Player, itemStack:ItemStack) {

        if (player.getDynamicProperty("kurokumaft:chage_type") == undefined) {
            player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kasumi_kokyu7.value"}]});
            player.setDynamicProperty("kurokumaft:chage_type", true);
            const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
            const molang = new MolangVariableMap();
            molang.setFloat("variable.kaikyu", kaikyuNum);

            player.addEffect(MinecraftEffectTypes.Speed, 10*TicksPerSecond,{
                amplifier: 3,
                showParticles: false
            });

            player.setProperty("kurokumaft:kokyu_chage", 1);
            player.dimension.spawnParticle("kurokumaft:kasumi_fog_lage_particle",player.location, molang);
            player.addEffect(MinecraftEffectTypes.Invisibility, 20,{
                amplifier: 10,
                showParticles: false
            });
            const num = system.runInterval(() => {
                player.dimension.spawnParticle("kurokumaft:kasumi_fog_lage_particle",player.location, molang);
    
                if (player.getProperty("kurokumaft:kokyu_chage") == 1) {
                    player.setProperty("kurokumaft:kokyu_chage", 2);
                    player.removeEffect(MinecraftEffectTypes.Invisibility);
                } else {
                    player.setProperty("kurokumaft:kokyu_chage", 1);
                    player.addEffect(MinecraftEffectTypes.Invisibility, 20,{
                        amplifier: 10,
                        showParticles: false
                    });
                }
            },20);
    
            system.runTimeout(() => {
                player.setProperty("kurokumaft:kokyu_chage", 0);
                player.setProperty("kurokumaft:kokyu_use", false);
                player.setProperty("kurokumaft:kokyu_particle", false);
                player.setDynamicProperty("kurokumaft:chage_type", undefined);
                system.clearRun(num);
            },10*TicksPerSecond);
        }

    }

}
