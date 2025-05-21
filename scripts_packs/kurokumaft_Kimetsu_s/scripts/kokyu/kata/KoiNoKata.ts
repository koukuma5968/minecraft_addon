import { ItemStack, MolangVariableMap, Entity, system, TicksPerSecond, Player } from "@minecraft/server";
import { addRegimentalFilter, getDistanceLocation, getLookLocationDistance} from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export class KoiNoKata extends KataComonClass {

    /**
     * 壱ノ型 初恋のわななき
     */
    ichiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        entity.setProperty("kurokumaft:kokyu_use", false);
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:koi_kokyu1.value"}]});
        }
        const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
        entity.applyKnockback(distance.x,distance.z,30,0);

        const num = system.runInterval(() => {
            const filter = addRegimentalFilter(0, entity.location, 5, entity.id);
            this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);
        },2);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },10);

    }

    /**
     * 弐ノ型 懊悩巡る恋
     */
    niNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:koi_kokyu2.value"}]});
        }
        const num = system.runInterval(() => {
            const filter = addRegimentalFilter(0, entity.location, 6, entity.id);
            this.kokyuApplyDamage(entity, filter, 4, 2, itemStack);
        },4);

        const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
        entity.applyKnockback(distance.x,distance.z,10,1);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
            entity.addEffect(MinecraftEffectTypes.SlowFalling, 2*TicksPerSecond,{
                amplifier: 1,
                showParticles: false
            });
        },20);

    }

    /**
     * 参ノ型 恋猫しぐれ
     */
    sanNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:koi_kokyu3.value"}]});
        }
        const distance = getLookLocationDistance(entity.getRotation().y, 2, -2, 0);
        entity.applyKnockback(distance.x,distance.z,10,0.4);

        entity.dimension.spawnParticle("minecraft:cauldron_explosion_emitter",entity.location);
        entity.setProperty("kurokumaft:kokyu_attack", true);

        let side = 5;
        const num = system.runInterval(() => {
            const filter = addRegimentalFilter(0, entity.location, 4, entity.id);
            this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);
 
            const distance = getLookLocationDistance(entity.getRotation().y, 2, side, 0);
            entity.applyKnockback(distance.x,distance.z,10,0.4);
            entity.dimension.spawnParticle("minecraft:cauldron_explosion_emitter",entity.location);

            side = -side;
        },10);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_attack", false);
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },60);

    }

    /**
     * 伍ノ型 揺らめく恋情・乱れ爪
     */
    goNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:koi_kokyu5.value"}]});
        }
        const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
        entity.applyKnockback(distance.x,distance.z,0,1.0);

        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            const distance = getLookLocationDistance(entity.getRotation().y, 0, 0, -2);
            const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 6, entity.id);

            const parnum = system.runInterval(() => {
                this.kokyuApplyDamage(entity, filter, 3, 1, itemStack);
            },1);
            entity.addEffect(MinecraftEffectTypes.SlowFalling, 1*TicksPerSecond,{
                amplifier: 1,
                showParticles: false
            });

            system.runTimeout(() => {
                entity.setProperty("kurokumaft:kokyu_particle", false);
                system.clearRun(parnum);
                entity.removeEffect(MinecraftEffectTypes.SlowFalling);
                system.runTimeout(() => {
                    entity.addEffect(MinecraftEffectTypes.SlowFalling, 1*TicksPerSecond,{
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
    rokuNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:koi_kokyu6.value"}]});
        }
        const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
        entity.applyKnockback(distance.x,distance.z,5,1);

        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);

            const distance = getLookLocationDistance(entity.getRotation().y, 0, 0, -1.0);
            const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 6, entity.id);

            const parnum = system.runInterval(() => {
                this.kokyuApplyDamage(entity, filter, 3, 1, itemStack);
            },1);

            system.runTimeout(() => {
                entity.setProperty("kurokumaft:kokyu_particle", false);
                system.clearRun(parnum);
                entity.addEffect(MinecraftEffectTypes.SlowFalling, 1*TicksPerSecond,{
                    amplifier: 1,
                    showParticles: false
                });
    
            },10);

        },10);

    }

}
