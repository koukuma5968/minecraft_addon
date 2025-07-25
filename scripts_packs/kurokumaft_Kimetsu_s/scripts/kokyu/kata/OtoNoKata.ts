import { ExplosionOptions, ItemStack, MolangVariableMap, Entity, system, TicksPerSecond, Player } from "@minecraft/server";
import { addRegimentalFilter, getDistanceLocation, getForwardPosition, getLeftPosition, getLookLocationDistance, getRightPosition } from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";
import { ItemDurabilityDamage } from "../../common/KimetuItemDurabilityDamage";

export class OtoNoKata extends KataComonClass {

    /**
     * 壱ノ型 轟
     */
    ichiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate: "msg.kurokumaft:oto_kokyu1.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }

        const distance = getLookLocationDistance(entity.getRotation().y, 1.5, 0, 0.5);
        const disLocation = getDistanceLocation(entity.location, distance);
        const filter = addRegimentalFilter(0, disLocation, 3, entity);
        this.kokyuApplyDamage(entity, filter, 3, 1, itemStack);

        const option = {
            allowUnderwater: true,
            breaksBlocks: true,
            causesFire: false,
            source: entity
        };
        entity.dimension.createExplosion(disLocation, 1, option);

        system.waitTicks(5).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
        });

    }

    /**
     * 弐ノ型 薙ぎ払い
     */
    niNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (itemStack !== undefined) {
            ItemDurabilityDamage(entity, itemStack);
        }
        const option = {
            allowUnderwater: true,
            breaksBlocks: false,
            causesFire: false,
            source: entity
        };

        let side = -2;
        const num = system.runInterval(() => {

            try {
                const distance = getLookLocationDistance(entity.getRotation().y, 2, side, 0.5);
                const disLocation = getDistanceLocation(entity.location, distance);
                const filter = addRegimentalFilter(0, disLocation, 4, entity);
                this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);
                entity.dimension.createExplosion(disLocation, 1, option);
                side=side+2;
            } catch (error: any) {
                system.clearRun(num);
            }
        },5);

        system.waitTicks(16).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

    }

    /**
     * 参ノ型 突進突き
     */
    sanNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        entity.setProperty("kurokumaft:kokyu_use", false);
        if (itemStack !== undefined) {
            ItemDurabilityDamage(entity, itemStack);
        }

        const option = {
            allowUnderwater: true,
            breaksBlocks: false,
            causesFire: false,
            source: entity
        };

        const num = system.runInterval(() => {

            try {
                const distance = getLookLocationDistance(entity.getRotation().y, 4, 0, 0.5);
                entity.applyKnockback({x:distance.x,z:distance.z},0);

                const filter = addRegimentalFilter(0, entity.location, 3.5, entity);
                this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);
                const front = getForwardPosition(entity.location, entity.getRotation().y, 1);
                entity.dimension.createExplosion(front, 2, option);
            } catch (error: any) {
                system.clearRun(num);
            }
        },2);

        system.waitTicks(12).then(() => {
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

    }

    /**
     * 肆ノ型 鳴弦奏々
     */
    shiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate: "msg.kurokumaft:oto_kokyu4.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }

        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const option = {
            allowUnderwater: true,
            breaksBlocks: false,
            causesFire: false,
            source: entity
        };

        const num = system.runInterval(() => {

            try {
                const filter = addRegimentalFilter(0, entity.location, 5, entity);
                this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);
                this.checkSousouReflection(entity, option);
            } catch (error: any) {
                system.clearRun(num);
            }
        },2);

        system.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

    }
    private checkSousouReflection(entity: Entity, option: ExplosionOptions): void {

        if (entity.isValid) {

            this.projectRefrect(entity, entity.location);

            entity.addTag(entity.id);

            let distance = getLookLocationDistance(entity.getRotation().y, 2, 2, 0);
            let disLocation = getDistanceLocation(entity.location, distance);
            entity.dimension.createExplosion(disLocation, 2, option);

            distance = getLookLocationDistance(entity.getRotation().y, -2, 2, 0);
            disLocation = getDistanceLocation(entity.location, distance);
            entity.dimension.createExplosion(disLocation, 2, option);

            distance = getLookLocationDistance(entity.getRotation().y, 2, -2, 0);
            disLocation = getDistanceLocation(entity.location, distance);
            entity.dimension.createExplosion(disLocation, 2, option);

            distance = getLookLocationDistance(entity.getRotation().y, -2, -2, 0);
            disLocation = getDistanceLocation(entity.location, distance);
            entity.dimension.createExplosion(disLocation, 2, option);

            entity.removeTag(entity.id);

        }
    };

    /**
     * 伍ノ型 響斬無間
     */
    goNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity.getDynamicProperty("kurokumaft:chage_type") === undefined) {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate: "msg.kurokumaft:oto_kokyu5.value"}]});
                if (itemStack !== undefined) {
                    ItemDurabilityDamage(entity, itemStack);
                }
            }

            entity.setDynamicProperty("kurokumaft:chage_type", true);

            entity.addEffect(MinecraftEffectTypes.Speed, 3*TicksPerSecond,{
                amplifier: 5,
                showParticles: false
            });

            const option = {
                allowUnderwater: true,
                breaksBlocks: false,
                causesFire: false,
                source: entity
            };
    
            const num = system.runInterval(() => {

                try {
                    const distance = getLookLocationDistance(entity.getRotation().y, 4, 0, 0.5);
        
                    entity.applyKnockback({x:distance.x,z:distance.z},0);

                    const filter = addRegimentalFilter(0, entity.location, 3.5, entity);
                    this.kokyuApplyDamage(entity, filter, 2, 1, itemStack);

                    const right = getRightPosition(entity.location, entity.getRotation().y, 3);
                    entity.dimension.createExplosion(right, 2.5, option);
        
                    const left = getLeftPosition(entity.location, entity.getRotation().y, 3);
                    entity.dimension.createExplosion(left, 2.5, option);
                } catch (error: any) {
                    system.clearRun(num);
                }
            },2);
    
            system.waitTicks(3*TicksPerSecond).then(() => {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
                entity.setDynamicProperty("kurokumaft:chage_type", undefined);
            }).catch((error: any) => {
            }).finally(() => {
                system.clearRun(num);
            });
    
        }

    }

}
