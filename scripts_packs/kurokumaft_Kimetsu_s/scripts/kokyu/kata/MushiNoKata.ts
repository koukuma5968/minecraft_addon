import { ItemStack, Entity, system, Player } from "@minecraft/server";
import { addRegimentalFilter, getDistanceLocation, getForwardPosition, getLookLocationDistance} from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export class MushiNoKata extends KataComonClass {

    /**
     * 蝶ノ舞 戯れ
     */
    ichiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate: "msg.kurokumaft:mushi_kokyu1.value"}]});
        }

        const num = system.runInterval(() => {
            const filter = addRegimentalFilter(0, entity.location, 3, entity.id);
            this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);
            this.kokyuApplyEffect(entity, filter, 2, 1, MinecraftEffectTypes.Poison);
        },2);

        const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0.5);
        entity.applyKnockback(distance.x,distance.z,10,0.4);
        entity.dimension.spawnParticle("minecraft:cauldron_explosion_emitter", entity.location);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },8);

    }

    /**
     * 蜂牙ノ舞 真靡き
     */
    niNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate: "msg.kurokumaft:mushi_kokyu2.value"}]});
        }

        const point = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
        entity.applyKnockback(point.x,point.z,15,0.0);

        system.runTimeout(() => {
            entity.dimension.spawnParticle("minecraft:cauldron_explosion_emitter",entity.location);

            const filter = addRegimentalFilter(0, entity.location, 3, entity.id);
            this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);
            this.kokyuApplyEffect(entity, filter, 2, 1, MinecraftEffectTypes.Poison);
    
        },2);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },8);

    }

    /**
     * 蜻蛉ノ舞 複眼六角
     */
    sanNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate: "msg.kurokumaft:mushi_kokyu3.value"}]});
        }
        const num = system.runInterval(() => {
            const distance = getLookLocationDistance(entity.getRotation().y, 2, 0, 0);
            const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3.5, entity.id);
            this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);
            this.kokyuApplyEffect(entity, filter, 2, 1, MinecraftEffectTypes.Poison);
        },4);
        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },16);

    }

    /**
     * 蜈蚣ノ舞 百蟲の呼吸
     */
    shiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate: "msg.kurokumaft:mushi_kokyu4.value"}]});
        }

        const distance = getLookLocationDistance(entity.getRotation().y, 2, -2, 0);
        entity.applyKnockback(distance.x,distance.z,10,0);
        entity.dimension.spawnParticle("minecraft:cauldron_explosion_emitter", entity.location);
        entity.setProperty("kurokumaft:kokyu_attack", true);

        let side = 2;
        const num = system.runInterval(() => {
            const filter = addRegimentalFilter(0, entity.location, 4, entity.id);
            this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);
            this.kokyuApplyEffect(entity, filter, 2, 1, MinecraftEffectTypes.Poison);
 
            const distance = getLookLocationDistance(entity.getRotation().y, 2, side, 0);
            entity.applyKnockback(distance.x,distance.z,10,0);
            entity.dimension.spawnParticle("minecraft:cauldron_explosion_emitter",entity.location);

            side = -side;
        },4);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_attack", false);
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },40);

    }

}
