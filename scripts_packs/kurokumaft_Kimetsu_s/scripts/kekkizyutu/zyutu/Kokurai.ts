import { MolangVariableMap, Entity, system, TicksPerSecond, Player } from "@minecraft/server";
import { addOrgeFilter, getDistanceLocation, getLookLocationDistance, getLookLocationDistancePitch} from "../../common/KimetuCommonUtil";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";
import { shooting } from "../../common/ShooterEvent";
import { ZytuComonClass } from "./ZytuComonClass";

export class Kokurai extends ZytuComonClass {

    /**
     * 弐ノ型 稲魂
     */
    niNoKata(entity:Entity) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu2.value"}]});
        }

        const num = system.runInterval(() => {
            try {
                const distance = getLookLocationDistancePitch(entity.getRotation(), 1.5, 0);
                const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 3, entity.id);
                this.kokyuApplyDamage(entity, filter, 3, 1);
            } catch (error: any) {
                system.clearRun(num);
            }
        },4);
        system.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

    }

    /**
     * 参ノ型 聚蚊成雷
     */
    sanNoKata(entity:Entity) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu3.value"}]});
        }

        const num = system.runInterval(() => {
            try {
                const filter = addOrgeFilter(0, entity.location, 4, entity.id);
                this.kokyuApplyDamage(entity, filter, 3, 1);
            } catch (error: any) {
                system.clearRun(num);
            }
        },2);

        const distance = getLookLocationDistance(entity.getRotation().y, 4, -4, 0);
        entity.applyKnockback({x:distance.x,z:distance.z},0);
        entity.teleport(entity.location, {
            keepVelocity: false,
            rotation: {
                x:0,
                y:entity.getRotation().y + 90
            }
        });

        const num2 = system.runInterval(() => {
            try {
                const distance = getLookLocationDistance(entity.getRotation().y, 4, -4, 0);
                entity.applyKnockback({x:distance.x,z:distance.z},0);
                entity.teleport(entity.location, {
                    keepVelocity: false,
                    rotation: {
                        x:0,
                        y:entity.getRotation().y - 90
                    }
                });
            } catch (error: any) {
                system.clearRun(num2);
            }
        }, 5);

        system.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
            system.clearRun(num2);
        });

    }

    /**
     * 肆ノ型 遠雷
     */
    shiNoKata(entity:Entity) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu4.value"}]});
        }
        entity.setProperty("kurokumaft:kokyu_use", false);

        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);
        const num = system.runInterval(() => {

            try {
                const distance = getLookLocationDistance(entity.getRotation().y, 8, 0, 0);
                const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 8, entity.id);
                this.kokyuApplyDamage(entity, filter, 2, 1);
        
                entity.dimension.spawnParticle("kurokumaft:kokurai4_particle",entity.location,molang);
            } catch (error: any) {
                system.clearRun(num);
            }
        },2);

        system.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

    }

    /**
     * 伍ノ型 熱界雷
     */
    goNoKata(entity:Entity) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu5.value"}]});
        }

        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const num = system.runInterval(() => {
            try {
                entity.dimension.spawnParticle("kurokumaft:kokurai5_particle", entity.location, molang);
            } catch (error: any) {
                system.clearRun(num);
            }
        },2);

        const filter = addOrgeFilter(1, entity.location, 6, entity.id);
        this.kokyuApplyDamage(entity, filter, 5, 2);

        system.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

        let event = "kurokumaft:small_damage";
        if (kaikyuNum > 8) {
            event = "kurokumaft:lage_damage";
        } else if (kaikyuNum > 4) {
            event = "kurokumaft:middle_damage";
        }
        const dragon = shooting(entity, "kurokumaft:kaminari_dragon_small", 0, 3, event);

        system.waitTicks(2*TicksPerSecond).then(() => {
            if (dragon.isValid) {
                dragon.remove();
            }
        }).catch((error: any) => {
        }).finally(() => {
        });

    }

    /**
     * 陸ノ型 電轟雷轟
     */
    rokuNoKata(entity:Entity) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu6.value"}]});
        }

        const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
        entity.applyKnockback({x:distance.x,z:distance.z},0.8);

        entity.addEffect(MinecraftEffectTypes.SlowFalling, 1*TicksPerSecond,{
            amplifier: 1,
            showParticles: false
        });

        const nowloc = entity.location;
        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);
        const num = system.runInterval(() => {

            try {
                entity.dimension.spawnParticle("kurokumaft:kokurai6_particle",nowloc,molang);
            } catch (error: any) {
                system.clearRun(num);
            }
        },1);

        const filter = addOrgeFilter(1, entity.location, 15, entity.id);
        this.kokyuApplyDamage(entity, filter, 8, 4);

        system.waitTicks(10).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

    }

}
