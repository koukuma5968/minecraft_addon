import { ItemStack, Player, system } from "@minecraft/server";
import { addRegimentalFilter, getLookPoints, getLookRotaionPoints } from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export class MushiNoKata extends KataComonClass {

    /**
     * 蝶ノ舞 戯れ
     */
    ichiNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:mushi_kokyu1.value\"}]}");

        const num = system.runInterval(() => {
            let location = getLookPoints(player.getRotation(), player.location, 0)
            let filter = addRegimentalFilter(0, location, 3, player.id);
            this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
            this.kokyuApplyEffect(player, filter, 2, 1, MinecraftEffectTypes.Poison);
        },2);

        const point = getLookRotaionPoints(player.getRotation(), 1, 0);
        player.applyKnockback(point.x,point.z,10,0.4);
        player.dimension.spawnParticle("minecraft:cauldron_explosion_emitter",player.location);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },8);

    }

    /**
     * 蜂牙ノ舞 真靡き
     */
    niNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:mushi_kokyu2.value\"}]}");

        const location = getLookPoints(player.getRotation(), player.location, 0)
        let filter = addRegimentalFilter(1, location, 12, player.id);

        const point = getLookRotaionPoints(player.getRotation(), 1, 0);
        player.applyKnockback(point.x,point.z,15,0.0);
        player.dimension.spawnParticle("minecraft:cauldron_explosion_emitter",player.location);

        filter = addRegimentalFilter(0, player.location, 3, player.id);
        this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
        this.kokyuApplyEffect(player, filter, 2, 1, MinecraftEffectTypes.Poison);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },6);

    }

    /**
     * 蜻蛉ノ舞 複眼六角
     */
    sanNoKata(player:Player, itemStack:ItemStack) {

        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:mushi_kokyu3.value\"}]}");
        const num = system.runInterval(() => {
            const location = getLookPoints(player.getRotation(), player.location, 2);
            const filter = addRegimentalFilter(0, location, 3.5, player.id);
            this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
            this.kokyuApplyEffect(player, filter, 2, 1, MinecraftEffectTypes.Poison);
        },4);
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },16);

    }

    /**
     * 蜈蚣ノ舞 百蟲の呼吸
     */
    shiNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:mushi_kokyu4.value\"}]}");

        let point = getLookRotaionPoints(player.getRotation(), 2, -1.1);
        player.applyKnockback(point.x,point.z,3,0);
        player.dimension.spawnParticle("minecraft:cauldron_explosion_emitter",player.location);
        player.setProperty("kurokumaft:kokyu_attack", true);

        let side = 1.2;
        const num = system.runInterval(() => {
            let location = getLookPoints(player.getRotation(), player.location, 0)
            let filter = addRegimentalFilter(0, location, 4, player.id);
            this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
            this.kokyuApplyEffect(player, filter, 2, 1, MinecraftEffectTypes.Poison);
 
            point = getLookRotaionPoints(player.getRotation(), 2, side);
            player.applyKnockback(point.x,point.z,10,0);
            player.dimension.spawnParticle("minecraft:cauldron_explosion_emitter",player.location);

            side = -side;
        },4);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_attack", false);
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },40);

    }

}
