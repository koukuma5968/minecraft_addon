import { ItemStack, Entity, system, Player } from "@minecraft/server";
import { addRegimentalFilter, getDistanceLocation, getLookLocationDistance} from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";
import { ItemDurabilityDamage } from "../../common/KimetuItemDurabilityDamage";

export class MushiNoKata extends KataComonClass {

    /**
     * 蝶ノ舞 戯れ
     */
    ichiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate: "msg.kurokumaft:mushi_kokyu1.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }

        const distance = getLookLocationDistance(entity.getRotation().y, 5, 0, 0.5);
        entity.applyKnockback({x:distance.x,z:distance.z},0.3);
        const num = system.runInterval(() => {

            try {
                const filter = addRegimentalFilter(0, entity.location, 3, entity);
                this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);
                this.kokyuApplyEffect(entity, filter, 2, 1, MinecraftEffectTypes.Poison);
            } catch (error: any) {
                system.clearRun(num);
            }
        },4);

        entity.dimension.spawnParticle("minecraft:cauldron_explosion_emitter", entity.location);

        system.waitTicks(12).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

        system.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
        });

    }

    /**
     * 蜂牙ノ舞 真靡き
     */
    niNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate: "msg.kurokumaft:mushi_kokyu2.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }

        const point = getLookLocationDistance(entity.getRotation().y, 10, 0, 0);
        entity.applyKnockback({x:point.x,z:point.z},0);

        system.waitTicks(2).then(() => {
            entity.dimension.spawnParticle("minecraft:cauldron_explosion_emitter",entity.location);

            const filter = addRegimentalFilter(0, entity.location, 3, entity);
            this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);
            this.kokyuApplyEffect(entity, filter, 2, 1, MinecraftEffectTypes.Poison);
        }).catch((error: any) => {
        }).finally(() => {
        });

        system.waitTicks(8).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
        });

    }

    /**
     * 蜻蛉ノ舞 複眼六角
     */
    sanNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate: "msg.kurokumaft:mushi_kokyu3.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        const num = system.runInterval(() => {

            try {
                const distance = getLookLocationDistance(entity.getRotation().y, 2, 0, 0);
                const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3.5, entity);
                this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);
                this.kokyuApplyEffect(entity, filter, 2, 1, MinecraftEffectTypes.Poison);
            } catch (error: any) {
                system.clearRun(num);
            }
        },4);
        system.waitTicks(16).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

    }

    /**
     * 蜈蚣ノ舞 百蟲の呼吸
     */
    shiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate: "msg.kurokumaft:mushi_kokyu4.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }

        const distance = getLookLocationDistance(entity.getRotation().y, 8, -8, 0);
        entity.applyKnockback({x:distance.x,z:distance.z},0);
        entity.dimension.spawnParticle("minecraft:cauldron_explosion_emitter", entity.location);
        entity.setProperty("kurokumaft:kokyu_attack", true);

        let side = 8;
        const num = system.runInterval(() => {

            try {
                const filter = addRegimentalFilter(0, entity.location, 4, entity);
                this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);
                this.kokyuApplyEffect(entity, filter, 2, 1, MinecraftEffectTypes.Poison);
    
                const distance = getLookLocationDistance(entity.getRotation().y, 8, side, 0);
                entity.applyKnockback({x:distance.x,z:distance.z},0);
                entity.dimension.spawnParticle("minecraft:cauldron_explosion_emitter",entity.location);

                side = -side;
            } catch (error: any) {
                system.clearRun(num);
            }
        },4);

        system.waitTicks(40).then(() => {
            entity.setProperty("kurokumaft:kokyu_attack", false);
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

    }

}
