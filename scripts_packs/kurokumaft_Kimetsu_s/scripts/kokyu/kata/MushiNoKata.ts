import { ItemStack, Player, system } from "@minecraft/server";
import { addRegimentalFilter, getDistanceLocation, getForwardPosition, getLookLocationDistance} from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export class MushiNoKata extends KataComonClass {

    /**
     * 蝶ノ舞 戯れ
     */
    ichiNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate: "msg.kurokumaft:mushi_kokyu1.value"}]});

        const num = system.runInterval(() => {
            const filter = addRegimentalFilter(0, player.location, 3, player.id);
            this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
            this.kokyuApplyEffect(player, filter, 2, 1, MinecraftEffectTypes.Poison);
        },2);

        const distance = getLookLocationDistance(player.getRotation().y, 1, 0, 0.5);
        player.applyKnockback(distance.x,distance.z,10,0.4);
        player.dimension.spawnParticle("minecraft:cauldron_explosion_emitter", player.location);

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

        const point = getLookLocationDistance(player.getRotation().y, 1, 0, 0);
        player.applyKnockback(point.x,point.z,15,0.0);

        system.runTimeout(() => {
            player.dimension.spawnParticle("minecraft:cauldron_explosion_emitter",player.location);

            const filter = addRegimentalFilter(0, player.location, 3, player.id);
            this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
            this.kokyuApplyEffect(player, filter, 2, 1, MinecraftEffectTypes.Poison);
    
        },2);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },8);

    }

    /**
     * 蜻蛉ノ舞 複眼六角
     */
    sanNoKata(player:Player, itemStack:ItemStack) {

        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:mushi_kokyu3.value\"}]}");
        const num = system.runInterval(() => {
            const distance = getLookLocationDistance(player.getRotation().y, 2, 0, 0);
            const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 3.5, player.id);
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

        const distance = getLookLocationDistance(player.getRotation().y, 2, -2, 0);
        player.applyKnockback(distance.x,distance.z,10,0);
        player.dimension.spawnParticle("minecraft:cauldron_explosion_emitter", player.location);
        player.setProperty("kurokumaft:kokyu_attack", true);

        let side = 2;
        const num = system.runInterval(() => {
            const filter = addRegimentalFilter(0, player.location, 4, player.id);
            this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
            this.kokyuApplyEffect(player, filter, 2, 1, MinecraftEffectTypes.Poison);
 
            const distance = getLookLocationDistance(player.getRotation().y, 2, side, 0);
            player.applyKnockback(distance.x,distance.z,10,0);
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
