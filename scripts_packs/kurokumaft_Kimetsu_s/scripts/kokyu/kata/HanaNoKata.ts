import { ItemStack, MolangVariableMap, Entity, system, TicksPerSecond, Player } from "@minecraft/server";
import { addRegimentalFilter, getDistanceLocation, getLookLocationDistance, weightChoice} from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export class HanaNoKata extends KataComonClass {

    /**
     * 弐ノ型 御影梅
     */
    niNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hana_kokyu2.value"}]});
        }

        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);
        const num = system.runInterval(() => {
            const distance = getLookLocationDistance(entity.getRotation().y, 2, 0, 0);
            const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 2.5, entity.id);
            entity.dimension.spawnParticle("kurokumaft:hana_ni_particle", getDistanceLocation(entity.location, distance), molang);
            this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);
        },4);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_particle", false);
            entity.setProperty("kurokumaft:kokyu_use", false);
            system.clearRun(num);
        },20);

    }

    /**
     * 肆ノ型 紅花衣
     */
    shiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hana_kokyu4.value"}]});
        }
        const distance = getLookLocationDistance(entity.getRotation().y, 2, 0, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity.id);
        this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);
        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);
        entity.dimension.spawnParticle("kurokumaft:hana_shi_particle",getDistanceLocation(entity.location, distance),molang);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_particle", false);
            entity.setProperty("kurokumaft:kokyu_use", false);
        },20);

    }

    /**
     * 伍ノ型 徒の芍薬
     */
    goNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hana_kokyu5.value"}]});
        }
        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        let count = 1;
        const num = system.runInterval(() => {
            const distance = getLookLocationDistance(entity.getRotation().y, 2, 0, 0);
            const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 2.5, entity.id);
            this.kokyuApplyDamage(entity, filter, 4, 2, itemStack);
            if (count <= 9) {
                entity.dimension.spawnParticle("kurokumaft:hana_go_"+ count +"_particle",getDistanceLocation(entity.location, distance),molang);
                count++;
            }
        },2);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_particle", false);
            entity.setProperty("kurokumaft:kokyu_use", false);
            system.clearRun(num);
        },20);

    }

    /**
     * 陸ノ型 渦桃
     */
    rokuNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hana_kokyu6.value"}]});
        }
        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const distance = getLookLocationDistance(entity.getRotation().y, 1.5, 0, 1);
        entity.applyKnockback(distance.x,distance.z,5,0.6);

        const num = system.runInterval(() => {
            const distance = getLookLocationDistance(entity.getRotation().y, 1.5, 0, 0);
            const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity.id);
            this.kokyuApplyDamage(entity, filter, 3, 1, itemStack);
    
            entity.dimension.spawnParticle("kurokumaft:hana_roku_particle", getDistanceLocation(entity.location, distance), molang);
   
        },5);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_particle", false);
            entity.setProperty("kurokumaft:kokyu_use", false);
            system.clearRun(num);
        },10);

    }

    /**
     * 終ノ型 彼岸朱眼
     */
    shitiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);
        if (entity.getDynamicProperty("kurokumaft:chage_type") == undefined) {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hana_kokyu7.value"}]});
            }
            entity.setDynamicProperty("kurokumaft:chage_type", true);
    
            entity.addEffect(MinecraftEffectTypes.Speed, 200*TicksPerSecond,{
                amplifier: 5,
                showParticles: false
            });
            entity.addEffect(MinecraftEffectTypes.JumpBoost, 200*TicksPerSecond,{
                amplifier: 3,
                showParticles: false
            });
            entity.addEffect(MinecraftEffectTypes.NightVision, 200*TicksPerSecond,{
                amplifier: 10,
                showParticles: false
            });
            system.runTimeout(() => {
                entity.setDynamicProperty("kurokumaft:chage_type", undefined);

                entity.removeEffect(MinecraftEffectTypes.Speed);
                entity.removeEffect(MinecraftEffectTypes.JumpBoost);
                entity.removeEffect(MinecraftEffectTypes.NightVision);

                let higanLists = weightChoice([
                    { item: 'minor' , weight: 50 },
                    { item: 'serious' , weight: 35 },
                    { item: 'blindness' , weight: 15 },
                ]);

                let choice = higanLists.pick();
                switch (choice as string) {
                    case 'blindness': 
                        entity.addEffect(MinecraftEffectTypes.Blindness, 600*TicksPerSecond,{
                            amplifier: 3,
                            showParticles: false
                        });
                    case 'serious': 
                        entity.addEffect(MinecraftEffectTypes.Weakness, 10*TicksPerSecond,{
                            amplifier: 1,
                            showParticles: false
                        });
                    case 'minor': 
                        entity.addEffect(MinecraftEffectTypes.Slowness, 10*TicksPerSecond,{
                            amplifier: 1,
                            showParticles: false
                        });
                    break;
                }
            },180*TicksPerSecond);
        }

    }

}
