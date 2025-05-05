import { ItemStack, MolangVariableMap, Player, system, TicksPerSecond } from "@minecraft/server";
import { addRegimentalFilter, getDistanceLocation, getLookLocationDistance, getRandomInRange } from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { shooting } from "../../common/ShooterEvent";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export class IwaNoKata extends KataComonClass {

    /**
     * 壱ノ型 蛇紋岩・双極
     */
    ichiNoKata(player:Player, itemStack:ItemStack) {

        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:iwa_kokyu1.value"}]});

        const ono = shooting(player, "kurokumaft:iwa_axe", 0, 3, undefined);
        const ball = shooting(player, "kurokumaft:iwa_iron_ball", 0, 3, undefined);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },10);

    }
    /**
     * 弐ノ型 天面砕き
     */
    niNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:iwa_kokyu2.value"}]});

        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        system.runTimeout(() => {
            const distance = getLookLocationDistance(player.getRotation().y, 4, 0, 0);
            const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 6, player.id);
            this.kokyuApplyDamage(player, filter, 4, 2, itemStack);

            player.dimension.spawnParticle("kurokumaft:iwa2_particle", getDistanceLocation(player.location, distance), molang);
        },6);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },10);

    }

    /**
     * 参ノ型 岩軀の膚
     */
    sanNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:iwa_kokyu3.value"}]});

        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const num = system.runInterval(() => {
            const filter = addRegimentalFilter(0, player.location, 6, player.id);
            this.kokyuApplyDamage(player, filter, 3, 1, itemStack);

            this.projectRefrect(player, player.location);

            player.dimension.spawnParticle("kurokumaft:iwa3_particle", player.location, molang);

        },2);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },30);

    }

    /**
     * 肆ノ型 流紋岩・速征
     */
    shiNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:iwa_kokyu4.value"}]});

        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const num = system.runInterval(() => {
            const filter = addRegimentalFilter(0, player.location, 4, player.id);
            this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
 
            const distance = getLookLocationDistance(player.getRotation().y, 2, 0, 0);
            player.applyKnockback(distance.x,distance.z,5,0);

            player.dimension.spawnParticle("kurokumaft:iwa3_particle", player.location, molang);
        },2);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },20);

    }

    /**
     * 伍ノ型 瓦輪刑部
     */
    goNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:iwa_kokyu5.value"}]});

        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const distance = getLookLocationDistance(player.getRotation().y, 1, 0, 1);
        player.applyKnockback(distance.x,distance.z,0,1);

        const num = system.runInterval(() => {
            const distance = getLookLocationDistance(player.getRotation().y, 0, 0, -5);
            const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 5, player.id);
            this.kokyuApplyDamage(player, filter, 2, 1, itemStack);

            const side = getRandomInRange(-5, 5);
            const around = getRandomInRange(-5, 5);
            const distance2 = getLookLocationDistance(player.getRotation().y, around, side, 0.5);
            player.dimension.spawnParticle("minecraft:cauldron_explosion_emitter", getDistanceLocation(player.location, distance2));
            player.dimension.spawnParticle("kurokumaft:iwa3_particle", getDistanceLocation(player.location, distance2), molang);
        },2);

        player.addEffect(MinecraftEffectTypes.SlowFalling, 2*TicksPerSecond,{
            amplifier: 1,
            showParticles: false
        });
        
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
            player.setProperty("kurokumaft:kokyu_use", false);
            system.clearRun(num);
        },40);

    }

}
