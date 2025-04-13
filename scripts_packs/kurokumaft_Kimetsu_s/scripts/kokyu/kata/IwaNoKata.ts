import { ItemStack, MolangVariableMap, Player, system, TicksPerSecond } from "@minecraft/server";
import { addRegimentalFilter, getLookPoints, getLookRotaionPoints, getRandomInRange } from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { shooting } from "../../common/ShooterEvent";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export class IwaNoKata extends KataComonClass {

    /**
     * 壱ノ型 蛇紋岩・双極
     */
    ichiNoKata(player:Player, itemStack:ItemStack) {

        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:iwa_kokyu1.value\"}]}");

        let ono = shooting(player, "kurokumaft:iwa_axe", 0, 3, undefined);
        let ball = shooting(player, "kurokumaft:iwa_iron_ball", 0, 3, undefined);

        player.setProperty("kurokumaft:kokyu_use", false);
        player.setProperty("kurokumaft:kokyu_particle", false);

    }
    /**
     * 弐ノ型 天面砕き
     */
    niNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:iwa_kokyu2.value\"}]}");

        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        system.runTimeout(() => {
            const location = getLookPoints(player.getRotation(), player.location, 4)
            const filter = addRegimentalFilter(0, location, 6, player.id);
            this.kokyuApplyDamage(player, filter, 4, 2, itemStack);

            player.dimension.spawnParticle("kurokumaft:iwa2_particle",location,molang);
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
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:iwa_kokyu3.value\"}]}");

        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const num = system.runInterval(() => {
            const location = getLookPoints(player.getRotation(), player.location, 0);
            const filter = addRegimentalFilter(0, location, 6, player.id);
            this.kokyuApplyDamage(player, filter, 3, 1, itemStack);

            const volume = getLookPoints(player.getRotation(), player.location, 0);
            this.projectRefrect(player, volume);

            player.dimension.spawnParticle("kurokumaft:iwa3_particle",location,molang);

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
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:iwa_kokyu4.value\"}]}");

        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const num = system.runInterval(() => {
            const location = getLookPoints(player.getRotation(), player.location, 0)
            const filter = addRegimentalFilter(0, location, 4, player.id);
            this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
 
            const point = getLookRotaionPoints(player.getRotation(), 2, 0);
            player.applyKnockback(point.x,point.z,5,0);

            player.dimension.spawnParticle("kurokumaft:iwa3_particle",location,molang);
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
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:iwa_kokyu5.value\"}]}");

        const loc = player.location;
        const rota = player.getRotation();
        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const point = getLookRotaionPoints(player.getRotation(), 0, 0);
        player.applyKnockback(point.x,point.z,0,1);

        const num = system.runInterval(() => {
            const location = getLookPoints(player.getRotation(), player.location, 0);
            const filter = addRegimentalFilter(0, {x:location.x,y:location.y-2,z:location.z}, 5, player.id);
            this.kokyuApplyDamage(player, filter, 2, 1, itemStack);

            const side = getRandomInRange(-5, 5);
            const around = getRandomInRange(-5, 5);
            const particlepoint = getLookRotaionPoints(rota, around, side);
            const particleVol = getLookPoints(rota, {x:loc.x+particlepoint.x, y:loc.y+0.5,z:loc.z+particlepoint.z}, 0);
            player.dimension.spawnParticle("minecraft:cauldron_explosion_emitter",particleVol);
            player.dimension.spawnParticle("kurokumaft:iwa3_particle",particleVol,molang);
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
