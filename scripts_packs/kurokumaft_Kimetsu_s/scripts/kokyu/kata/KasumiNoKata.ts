import { ItemStack, MolangVariableMap, Entity, system, TicksPerSecond, Player } from "@minecraft/server";
import { addRegimentalFilter, getDistanceLocation, getLookLocationDistance, getLookLocationDistancePitch} from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export class KasumiNoKata extends KataComonClass {

    /**
     * 壱ノ型 垂天遠霞
     */
    ichiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kasumi_kokyu1.value"}]});
        }
        entity.setProperty("kurokumaft:kokyu_use", false);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },5);

        const distance1 = getLookLocationDistancePitch(entity.getRotation(), 1.5, 0);
        const filter1 = addRegimentalFilter(0, getDistanceLocation(entity.location, distance1), 3, entity.id);
        this.kokyuApplyDamage(entity, filter1, 4, 1, itemStack);

        const distance2 = getLookLocationDistancePitch(entity.getRotation(), 4.5, 0);
        const filter2 = addRegimentalFilter(0, getDistanceLocation(entity.location, distance2), 2, entity.id);
        this.kokyuApplyDamage(entity, filter2, 4, 1, itemStack);

    }
    /**
     * 弐ノ型 八重霞
     */
    niNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kasumi_kokyu2.value"}]});
        }

        const num = system.runInterval(() => {
            const filter = addRegimentalFilter(0, entity.location, 4, entity.id);
            this.kokyuApplyDamage(entity, filter, 3, 1, itemStack);
        },2);
        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },20);

    }

    /**
     * 参ノ型 霞散の飛沫
     */
    sanNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kasumi_kokyu3.value"}]});
        }
        entity.setProperty("kurokumaft:kokyu_use", false);

        const filter = addRegimentalFilter(0, entity.location, 6, entity.id);
        this.kokyuApplyDamage(entity, filter, 5, 2, itemStack);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },10);

    }

    /**
     * 肆ノ型 移流斬り
     */
    shiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kasumi_kokyu4.value"}]});
        }
        entity.setProperty("kurokumaft:kokyu_use", false);

        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const filter = addRegimentalFilter(0, entity.location, 2.5, entity.id);
        this.kokyuApplyDamage(entity, filter, 4, 1, itemStack);

        const num = system.runInterval(() => {
            entity.dimension.spawnParticle("kurokumaft:kasumi_fog_particle", entity.location, molang);
        },2);

        const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
        entity.applyKnockback(distance.x,distance.z,6,0);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },10);

    }

    /**
     * 伍ノ型 霞雲の海
     */
    goNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kasumi_kokyu5.value"}]});
        }

        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const num = system.runInterval(() => {
            const filter = addRegimentalFilter(0, entity.location, 3, entity.id);
            this.kokyuApplyDamage(entity, filter, 3, 1, itemStack);

            const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
            entity.applyKnockback(distance.x,distance.z,2,0);
            const pdistance = getLookLocationDistance(entity.getRotation().y, 2, 0, 0);
            entity.dimension.spawnParticle("kurokumaft:kasumi_fog_particle", getDistanceLocation(entity.location, pdistance), molang);
    
        },2);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },20);

    }

    /**
     * 陸ノ型 月の霞消
     */
    rokuNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kasumi_kokyu6.value"}]});
        }
        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const num = system.runInterval(() => {
            const distance = getLookLocationDistance(entity.getRotation().y, 1.5, 0, -0.5);
            const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 6, entity.id);
            this.kokyuApplyDamage(entity, filter, 4, 2, itemStack);

            entity.dimension.spawnParticle("kurokumaft:kasumi_fog_particle", getDistanceLocation(entity.location, distance), molang);

        },4);

        const distance = getLookLocationDistance(entity.getRotation().y, 1.5, 0, 1);
        entity.applyKnockback(distance.x,distance.z,5,0.6);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },20);

    }

    /**
     * 漆ノ型 朧
     */
    shitiNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity.getDynamicProperty("kurokumaft:chage_type") == undefined) {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kasumi_kokyu7.value"}]});
            }
            entity.setDynamicProperty("kurokumaft:chage_type", true);
            const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
            const molang = new MolangVariableMap();
            molang.setFloat("variable.kaikyu", kaikyuNum);

            entity.addEffect(MinecraftEffectTypes.Speed, 10*TicksPerSecond,{
                amplifier: 3,
                showParticles: false
            });

            entity.setProperty("kurokumaft:kokyu_chage", 1);
            entity.dimension.spawnParticle("kurokumaft:kasumi_fog_lage_particle",entity.location, molang);
            entity.addEffect(MinecraftEffectTypes.Invisibility, 20,{
                amplifier: 10,
                showParticles: false
            });
            const num = system.runInterval(() => {
                entity.dimension.spawnParticle("kurokumaft:kasumi_fog_lage_particle",entity.location, molang);
    
                if (entity.getProperty("kurokumaft:kokyu_chage") == 1) {
                    entity.setProperty("kurokumaft:kokyu_chage", 2);
                    entity.removeEffect(MinecraftEffectTypes.Invisibility);
                } else {
                    entity.setProperty("kurokumaft:kokyu_chage", 1);
                    entity.addEffect(MinecraftEffectTypes.Invisibility, 20,{
                        amplifier: 10,
                        showParticles: false
                    });
                }
            },20);
    
            system.runTimeout(() => {
                entity.setProperty("kurokumaft:kokyu_chage", 0);
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
                entity.setDynamicProperty("kurokumaft:chage_type", undefined);
                system.clearRun(num);
            },10*TicksPerSecond);
        }

    }

}
