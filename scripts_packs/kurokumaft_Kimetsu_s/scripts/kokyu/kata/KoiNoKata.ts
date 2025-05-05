import { ItemStack, MolangVariableMap, Player, system, TicksPerSecond } from "@minecraft/server";
import { addRegimentalFilter, getDistanceLocation, getLookLocationDistance} from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export class KoiNoKata extends KataComonClass {

    /**
     * 壱ノ型 初恋のわななき
     */
    ichiNoKata(player:Player, itemStack:ItemStack) {
        player.setProperty("kurokumaft:kokyu_use", false);
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:koi_kokyu1.value"}]});

        const distance = getLookLocationDistance(player.getRotation().y, 1, 0, 0);
        player.applyKnockback(distance.x,distance.z,30,0);

        const num = system.runInterval(() => {
            const filter = addRegimentalFilter(0, player.location, 5, player.id);
            this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
        },2);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },10);

    }

    /**
     * 弐ノ型 懊悩巡る恋
     */
    niNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:koi_kokyu2.value"}]});

        const num = system.runInterval(() => {
            const filter = addRegimentalFilter(0, player.location, 6, player.id);
            this.kokyuApplyDamage(player, filter, 4, 2, itemStack);
        },4);

        const distance = getLookLocationDistance(player.getRotation().y, 1, 0, 0);
        player.applyKnockback(distance.x,distance.z,10,1);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
            player.addEffect(MinecraftEffectTypes.SlowFalling, 2*TicksPerSecond,{
                amplifier: 1,
                showParticles: false
            });
        },20);

    }

    /**
     * 参ノ型 恋猫しぐれ
     */
    sanNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:koi_kokyu3.value"}]});

        const distance = getLookLocationDistance(player.getRotation().y, 2, -2, 0);
        player.applyKnockback(distance.x,distance.z,10,0.4);

        player.dimension.spawnParticle("minecraft:cauldron_explosion_emitter",player.location);
        player.setProperty("kurokumaft:kokyu_attack", true);

        let side = 5;
        const num = system.runInterval(() => {
            const filter = addRegimentalFilter(0, player.location, 4, player.id);
            this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
 
            const distance = getLookLocationDistance(player.getRotation().y, 2, side, 0);
            player.applyKnockback(distance.x,distance.z,10,0.4);
            player.dimension.spawnParticle("minecraft:cauldron_explosion_emitter",player.location);

            side = -side;
        },10);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_attack", false);
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },60);

    }

    /**
     * 伍ノ型 揺らめく恋情・乱れ爪
     */
    goNoKata(player:Player, itemStack:ItemStack) {

        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:koi_kokyu5.value"}]});

        const distance = getLookLocationDistance(player.getRotation().y, 1, 0, 0);
        player.applyKnockback(distance.x,distance.z,0,1.0);

        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            const distance = getLookLocationDistance(player.getRotation().y, 0, 0, -2);
            const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 6, player.id);

            const parnum = system.runInterval(() => {
                this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
            },1);
            player.addEffect(MinecraftEffectTypes.SlowFalling, 1*TicksPerSecond,{
                amplifier: 1,
                showParticles: false
            });

            system.runTimeout(() => {
                player.setProperty("kurokumaft:kokyu_particle", false);
                system.clearRun(parnum);
                player.removeEffect(MinecraftEffectTypes.SlowFalling);
                system.runTimeout(() => {
                    player.addEffect(MinecraftEffectTypes.SlowFalling, 1*TicksPerSecond,{
                        amplifier: 1,
                        showParticles: false
                    });
                },5);
            },10);
        },10);

    }

    /**
     * 陸ノ型 猫足恋風
     */
    rokuNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:koi_kokyu6.value"}]});

        const distance = getLookLocationDistance(player.getRotation().y, 1, 0, 0);
        player.applyKnockback(distance.x,distance.z,5,1);

        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);

            const distance = getLookLocationDistance(player.getRotation().y, 0, 0, -1.0);
            const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 6, player.id);

            const parnum = system.runInterval(() => {
                this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
            },1);

            system.runTimeout(() => {
                player.setProperty("kurokumaft:kokyu_particle", false);
                system.clearRun(parnum);
                player.addEffect(MinecraftEffectTypes.SlowFalling, 1*TicksPerSecond,{
                    amplifier: 1,
                    showParticles: false
                });
    
            },10);

        },10);

    }

}
