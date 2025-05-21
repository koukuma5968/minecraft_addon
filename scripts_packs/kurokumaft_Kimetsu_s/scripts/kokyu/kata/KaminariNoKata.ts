import { ItemStack, MolangVariableMap, Entity, system, TicksPerSecond, Player } from "@minecraft/server";
import { addRegimentalFilter, getDistanceLocation, getLookLocationDistance, getLookLocationDistancePitch} from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";
import { shooting } from "../../common/ShooterEvent";

export class KaminariNoKata extends KataComonClass {

    /**
     * 壱ノ型 霹靂一閃
     */
    ichiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu1.value"}]});
        }
        entity.setProperty("kurokumaft:kokyu_use", false);

        const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
        entity.applyKnockback(distance.x,distance.z,15,0);

        const num = system.runInterval(() => {
            const filter = addRegimentalFilter(0, entity.location, 2.5, entity.id);
            this.kokyuApplyDamage(entity, filter, 3, 1, itemStack);
        },1);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },6);

    }
    /**
     * 壱ノ型 霹靂一閃 連
     */
    ichiNoKataRen(entity:Entity, itemStack:ItemStack | undefined) {

        entity.setDynamicProperty("kurokumaft:attack_count", 0);
        entity.addEffect(MinecraftEffectTypes.Speed, 5*TicksPerSecond,{
            amplifier: 10,
            showParticles: false
        });

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_chage", 0);
            entity.setProperty("kurokumaft:kokyu_particle", false);
            entity.setDynamicProperty("kurokumaft:chage_type", undefined);
            const chage = entity.getDynamicProperty("kurokumaft:attack_count") as number;
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu1_rengeki.value",with:[chage.toString()]}]});
            }
        },5*TicksPerSecond);

    }
    /**
     * 壱ノ型 霹靂一閃 連撃
     */
    ichiAttack(entity:Entity, itemStack:ItemStack | undefined) {

        const distance = getLookLocationDistancePitch(entity.getRotation(), 1.5, 0);
        const filter = addRegimentalFilter(0, distance, 3, entity.id);
        this.kokyuApplyDamage(entity, filter, 5, 2, itemStack);

    }

    /**
     * 壱ノ型 霹靂一閃 神速
     */
    ichiNoKataShinsoku(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu1_shinsoku.value"}]});
        }
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_chage", 0);

        const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
        entity.applyKnockback(distance.x,distance.z,50,0);

        const num = system.runInterval(() => {
            const filter = addRegimentalFilter(0, entity.location, 3.5, entity.id);
            this.kokyuApplyDamage(entity, filter, 5, 2, itemStack);
        },1);

        system.runTimeout(() => {
            entity.setDynamicProperty("kurokumaft:chage_type", undefined);
            entity.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },12);

    }

    /**
     * 弐ノ型 稲魂
     */
    niNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu2.value"}]});
        }

        const num = system.runInterval(() => {
            const distance = getLookLocationDistancePitch(entity.getRotation(), 1.5, 0);
            const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity.id);
            this.kokyuApplyDamage(entity, filter, 3, 1, itemStack);
        },4);
        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },20);

    }

    /**
     * 参ノ型 聚蚊成雷
     */
    sanNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu3.value"}]});
        }

        const num = system.runInterval(() => {
            const filter = addRegimentalFilter(0, entity.location, 4, entity.id);
            this.kokyuApplyDamage(entity, filter, 3, 1, itemStack);
        },2);

        const distance = getLookLocationDistance(entity.getRotation().y, 2, -2, 0);
        entity.applyKnockback(distance.x,distance.z,2,0);
        entity.teleport(entity.location, {
            keepVelocity: false,
            rotation: {
                x:0,
                y:entity.getRotation().y + 90
            }
        });

        const num2 = system.runInterval(() => {
            const distance = getLookLocationDistance(entity.getRotation().y, 2, -2, 0);
            entity.applyKnockback(distance.x,distance.z,2,0);
            entity.teleport(entity.location, {
                keepVelocity: false,
                rotation: {
                    x:0,
                    y:entity.getRotation().y - 90
                }
            });
        }, 5);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
            system.clearRun(num2);
        },30);

    }

    /**
     * 肆ノ型 遠雷
     */
    shiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu4.value"}]});
        }
        entity.setProperty("kurokumaft:kokyu_use", false);

        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);
        const num = system.runInterval(() => {
            const distance = getLookLocationDistance(entity.getRotation().y, 8, 0, 0);
            const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 8, entity.id);
            this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);
    
            entity.dimension.spawnParticle("kurokumaft:kaminari4_particle",entity.location,molang);
        },2);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },20);

    }

    /**
     * 伍ノ型 熱界雷
     */
    goNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu5.value"}]});
        }

        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const num = system.runInterval(() => {
            entity.dimension.spawnParticle("kurokumaft:kaminari5_particle", entity.location, molang);
        },1);

        let event = "kurokumaft:small_damage";
        if (kaikyuNum > 8) {
            event = "kurokumaft:lage_damage";
        } else if (kaikyuNum > 4) {
            event = "kurokumaft:middle_damage";
        }
        const dragon = shooting(entity, "kurokumaft:kaminari_dragon_small", 0, 3, event);

        system.runTimeout(() => {
            if (dragon.isValid()) {
                dragon.remove();
            }
        }, 2*TicksPerSecond);

        const filter = addRegimentalFilter(1, entity.location, 6, entity.id);
        this.kokyuApplyDamage(entity, filter, 5, 2, itemStack);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },10);

    }

    /**
     * 陸ノ型 電轟雷轟
     */
    rokuNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu6.value"}]});
        }

        const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
        entity.applyKnockback(distance.x,distance.z,0,0.8);

        entity.addEffect(MinecraftEffectTypes.SlowFalling, 1*TicksPerSecond,{
            amplifier: 1,
            showParticles: false
        });

        const nowloc = entity.location;
        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);
        const num = system.runInterval(() => {
            entity.dimension.spawnParticle("kurokumaft:kaminari6_particle",nowloc,molang);
        },1);

        const filter = addRegimentalFilter(1, entity.location, 15, entity.id);
        this.kokyuApplyDamage(entity, filter, 8, 4, itemStack);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },10);

    }

    /**
     * 漆ノ型 火雷神
     */
    shitiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu7.value"}]});
        }
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_chage", 0);
        entity.setDynamicProperty("kurokumaft:chage_type", undefined);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },20);

        const filter = addRegimentalFilter(1, entity.location, 30, entity.id);

        const targets = entity.dimension.getEntities(filter);
        if (targets.length > 0) {
            entity.teleport(targets[0].location, {
                facingLocation: targets[0].location,
            });
        }

        const filter2 = addRegimentalFilter(0, entity.location, 8, entity.id);
        this.kokyuApplyDamage(entity, filter2, 20, 8, itemStack);

    }

}
