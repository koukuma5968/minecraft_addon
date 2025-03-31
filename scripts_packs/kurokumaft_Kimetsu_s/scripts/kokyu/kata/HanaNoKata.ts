import { ItemStack, MolangVariableMap, Player, system, TicksPerSecond } from "@minecraft/server";
import { addRegimentalFilter, getLookPoints, weightChoice } from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export class HanaNoKata extends KataComonClass {

    /**
     * 弐ノ型 御影梅
     */
    niNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hana_kokyu2.value\"}]}");

        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);
        let num = system.runInterval(() => {
            let location = getLookPoints(player.getRotation(), player.location, 2)
            let filter = addRegimentalFilter(0, location, 2.5, player.id);
            player.dimension.spawnParticle("kurokumaft:hana_ni_particle",location,molang);
            this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
        },4);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
            player.setProperty("kurokumaft:kokyu_use", false);
            system.clearRun(num);
        },20);

    }

    /**
     * 肆ノ型 紅花衣
     */
    shiNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hana_kokyu4.value\"}]}");

        let location = getLookPoints(player.getRotation(), player.location, 2);
        let filter = addRegimentalFilter(0, location, 3, player.id);
        this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);
        player.dimension.spawnParticle("kurokumaft:hana_shi_particle",location,molang);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
            player.setProperty("kurokumaft:kokyu_use", false);
        },20);

    }

    /**
     * 伍ノ型 徒の芍薬
     */
    goNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hana_kokyu5.value\"}]}");

        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        let count = 1;
        const num = system.runInterval(() => {
            let location = getLookPoints(player.getRotation(), player.location, 2)
            let filter = addRegimentalFilter(0, location, 2.5, player.id);
            this.kokyuApplyDamage(player, filter, 4, 2, itemStack);
            if (count <= 9) {
                player.dimension.spawnParticle("kurokumaft:hana_go_"+ count +"_particle",location,molang);
                count++;
            }
        },2);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
            player.setProperty("kurokumaft:kokyu_use", false);
            system.clearRun(num);
        },20);

    }

    /**
     * 陸ノ型 渦桃
     */
    rokuNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hana_kokyu6.value\"}]}");

        let location = getLookPoints(player.getRotation(), player.location, 1.5);
        let filter = addRegimentalFilter(0, location, 3, player.id);
        this.kokyuApplyDamage(player, filter, 3, 1, itemStack);

        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);
        player.dimension.spawnParticle("kurokumaft:hana_roku_particle",location,molang);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
            player.setProperty("kurokumaft:kokyu_use", false);
        },30);

    }

    /**
     * 終ノ型 彼岸朱眼
     */
    shitiNoKata(player:Player, itemStack:ItemStack) {
        player.setProperty("kurokumaft:kokyu_use", false);
        player.setProperty("kurokumaft:kokyu_particle", false);
        if (player.getDynamicProperty("kurokumaft:chage_type") == undefined) {
            player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hana_kokyu7.value\"}]}");
            player.setDynamicProperty("kurokumaft:chage_type", true);
    
            player.addEffect(MinecraftEffectTypes.Speed, 200*TicksPerSecond,{
                amplifier: 5,
                showParticles: false
            });
            player.addEffect(MinecraftEffectTypes.JumpBoost, 200*TicksPerSecond,{
                amplifier: 3,
                showParticles: false
            });
            player.addEffect(MinecraftEffectTypes.NightVision, 200*TicksPerSecond,{
                amplifier: 10,
                showParticles: false
            });
            system.runTimeout(() => {
                player.setDynamicProperty("kurokumaft:chage_type", undefined);

                player.removeEffect(MinecraftEffectTypes.Speed);
                player.removeEffect(MinecraftEffectTypes.JumpBoost);
                player.removeEffect(MinecraftEffectTypes.NightVision);

                let higanLists = weightChoice([
                    { item: 'minor' , weight: 50 },
                    { item: 'serious' , weight: 35 },
                    { item: 'blindness' , weight: 15 },
                ]);

                let choice = higanLists.pick();
                switch (choice as string) {
                    case 'blindness': 
                        player.addEffect(MinecraftEffectTypes.Blindness, 600*TicksPerSecond,{
                            amplifier: 3,
                            showParticles: false
                        });
                    case 'serious': 
                        player.addEffect(MinecraftEffectTypes.Weakness, 10*TicksPerSecond,{
                            amplifier: 1,
                            showParticles: false
                        });
                    case 'minor': 
                        player.addEffect(MinecraftEffectTypes.Slowness, 10*TicksPerSecond,{
                            amplifier: 1,
                            showParticles: false
                        });
                    break;
                }
            },180*TicksPerSecond);
        }

    }

}
