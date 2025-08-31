import { BlockVolume, Dimension, EntityComponentTypes, EntityDamageCause, EntityEquippableComponent, EntityProjectileComponent, 
    EntityQueryOptions, EquipmentSlot, ItemStack, ListBlockVolume, Entity, Vector3, world, Player, EntityTypeFamilyComponent } from "@minecraft/server";
import { addProjectionFilter, getDistanceLocation, getLookLocationDistance } from "../../common/KimetuCommonUtil";

export const ogreRankPoint = Object.freeze([
    {
        rank: "low",
        point: 1,
        damage: 3
    },
    {
        rank: "unusual",
        point: 2,
        damage: 2
    },
    {
        rank: "quarter",
        point: 4,
        damage: 1.5
    },
    {
        rank: "crescent",
        point: 6,
        damage: 1.0
    },
    {
        rank: "king",
        point: 8,
        damage: 0.75
    },
]);


export class KataComonClass {

    gardCheck(en: Player): boolean {

        const equ = en.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        const main = equ.getEquipment(EquipmentSlot.Mainhand);
        const off = equ.getEquipment(EquipmentSlot.Offhand);

        if (en.isSneaking && ((main !== undefined && main.typeId.indexOf("shield") !== -1) || (off !== undefined && off.typeId.indexOf("shield") !== -1))) {
            en.playSound("item.shield.block", {
                pitch: 1,
                volume: 2
            });
            return false;
        }
        if (en.isSneaking && (main !== undefined && main.typeId.indexOf("nichirintou") !== -1)) {
            en.playSound("break.iron", {
                pitch: 1,
                volume: 2
            });
            return false;
        }

        return true;
    }

    kokyuApplyDamage(entity:Entity, filter:EntityQueryOptions, enDamage:number, pDamage:number, itemStack:ItemStack | undefined): void {

        entity.addTag(entity.id);
        const targets = entity.dimension.getEntities(filter);

        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const damageNum = kaikyuNum === 0 ? 0.5 : kaikyuNum * 1.5;
        targets.forEach(en => {
            if (en !== undefined && en.isValid) {
                if (en instanceof Player) {
                    if (entity instanceof Player) {
                        const tags = en.getTags();
                        if (world.gameRules.pvp && tags.indexOf("hostility_player") !== -1) {
                            if (this.gardCheck(en)) {
                                en.applyDamage(pDamage*damageNum, {
                                    cause: EntityDamageCause.entityAttack,
                                    damagingEntity: entity
                                });
                            }
                        }
                    } else {
                        const familyTypes = en.getComponent(EntityComponentTypes.TypeFamily) as EntityTypeFamilyComponent;
                        const tags = entity.getTags();
                        if (tags.indexOf("hostility") !== -1) {
                            en.applyDamage(pDamage*damageNum * 0.5, {
                                cause: EntityDamageCause.entityAttack,
                                damagingEntity: entity
                            });
                        } else if (familyTypes !== undefined && familyTypes.hasTypeFamily("ogre")) {
                            const ogre_rank = entity.getProperty("kurokumaft:ogre_rank");
                            const point = ogreRankPoint.find(rank => rank.rank === ogre_rank);
                            en.applyDamage(pDamage*(damageNum+(point !== undefined ? point.damage : 5)), {
                                cause: EntityDamageCause.entityAttack,
                                damagingEntity: entity
                            });
                        }
                    }
                } else {
                    const damagerFamilyTypes = entity.getComponent(EntityComponentTypes.TypeFamily) as EntityTypeFamilyComponent;
                    if (damagerFamilyTypes !== undefined && damagerFamilyTypes.hasTypeFamily("ogre")) {
                        const ogre_rank = entity.getProperty("kurokumaft:ogre_rank");
                        const point = ogreRankPoint.find(rank => rank.rank === ogre_rank);
                        en.applyDamage(enDamage*(damageNum)*(point !== undefined ? point.point : 0.5), {
                            cause: EntityDamageCause.entityAttack,
                            damagingEntity: entity
                        });
                    } else {
                        const familyTypes = en.getComponent(EntityComponentTypes.TypeFamily) as EntityTypeFamilyComponent;
                        if (familyTypes !== undefined && familyTypes.hasTypeFamily("ogre")) {
                            const ogre_rank = en.getProperty("kurokumaft:ogre_rank");
                            const point = ogreRankPoint.find(rank => rank.rank === ogre_rank);
                            en.applyDamage(enDamage*(damageNum)*(point !== undefined ? point.damage : 5), {
                                cause: EntityDamageCause.entityAttack,
                                damagingEntity: entity
                            });
                        } else if (familyTypes !== undefined && familyTypes.hasTypeFamily("regimental_soldier")) {
                            const tags = en.getTags();
                            if (tags.indexOf("hostility") !== -1) {
                                en.applyDamage(enDamage*damageNum * 0.5, {
                                    cause: EntityDamageCause.entityAttack,
                                    damagingEntity: entity
                                });
                            }
                        } else {
                            en.applyDamage(enDamage*damageNum, {
                                cause: EntityDamageCause.entityAttack,
                                damagingEntity: entity
                            });
                        }
                    }
                }
            }
        });
        const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
        this.nitirintouFillBlock(
            entity.dimension,
            getDistanceLocation(entity.location, {x:distance.x-3,y:distance.y,z:distance.z-3}),
            getDistanceLocation(entity.location, {x:distance.x+3,y:distance.y+2,z:distance.z+3})
        );

        entity.removeTag(entity.id);

    }

    kokyuApplyKnockback(entity:Entity, filter:EntityQueryOptions, distance:Vector3, vNum:number): void {

        entity.addTag(entity.id);
        const targets = entity.dimension.getEntities(filter);
        targets.forEach(en => {
            en.applyKnockback({x:distance.x,z:distance.z},vNum);
        });
        entity.removeTag(entity.id);

    }

    kokyuApplyEffect(entity:Entity, filter:EntityQueryOptions, duration:number, damage:number, effect:string): void {

        entity.addTag(entity.id);
        const targets = entity.dimension.getEntities(filter);
        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const damageNum = kaikyuNum === 0 ? 0.5 : kaikyuNum;
        targets.forEach(en => {
            if (en !== undefined && en.isValid) {
                if (en instanceof Player) {
                    if (entity instanceof Player) {
                        const tags = en.getTags();
                        if (world.gameRules.pvp && tags.indexOf("hostility_player") !== -1) {
                            if (this.gardCheck(en)) {
                                en.addEffect(effect, Math.round(duration*damageNum*0.25), {
                                    amplifier: Math.round(damage*damageNum*0.25),
                                    showParticles: true
                                });
                            }
                        }
                    } else {
                        const familyTypes = en.getComponent(EntityComponentTypes.TypeFamily) as EntityTypeFamilyComponent;
                        const tags = entity.getTags();
                        if (tags.indexOf("hostility") !== -1) {
                            en.addEffect(effect, Math.round(duration*damageNum*0.25), {
                                amplifier: Math.round(damage*damageNum*0.25),
                                showParticles: true
                            });
                        } else if (familyTypes !== undefined && familyTypes.hasTypeFamily("ogre")) {
                            en.addEffect(effect, Math.round(duration*damageNum*1.5), {
                                amplifier: Math.round(damage*damageNum*1.5),
                                showParticles: true
                            });
                        }
                    }
                } else {
                    const damagerFamilyTypes = entity.getComponent(EntityComponentTypes.TypeFamily) as EntityTypeFamilyComponent;
                    if (damagerFamilyTypes !== undefined && damagerFamilyTypes.hasTypeFamily("ogre")) {
                        en.addEffect(effect, Math.round(duration*damageNum*1.25), {
                            amplifier: Math.round(damage*damageNum*1.25),
                            showParticles: true
                        });
                    } else {
                        const familyTypes = en.getComponent(EntityComponentTypes.TypeFamily) as EntityTypeFamilyComponent;
                        if (familyTypes !== undefined && familyTypes.hasTypeFamily("ogre")) {
                            en.addEffect(effect, Math.round(duration*damageNum*1.75), {
                                amplifier: Math.round(damage*damageNum*1.75),
                                showParticles: true
                            });
                        } else if (familyTypes !== undefined && familyTypes.hasTypeFamily("regimental_soldier")) {
                            const tags = en.getTags();
                            if (tags.indexOf("hostility") !== -1) {
                                en.addEffect(effect, Math.round(duration*damageNum*0.75), {
                                    amplifier: Math.round(damage*damageNum*0.75),
                                    showParticles: true
                                });
                            }
                        } else {
                            en.addEffect(effect, Math.round(duration*damageNum*0.75), {
                                amplifier: Math.round(damage*damageNum*0.75),
                                showParticles: true
                            });
                        }
                    }
                }
                if (en instanceof Player) {
                    if (this.gardCheck(en)) {
                    }
                } else {
                }
            }
        });
        entity.removeTag(entity.id);

    }

    projectRefrect(entity:Entity, volume:Vector3): boolean {

        let hit = false;
        const projfilter = addProjectionFilter(0, volume, 4.5);

        const projectiles = entity.dimension.getEntities(projfilter);
        projectiles.forEach(projectile => {
            projectile.clearVelocity();
            const projComp = projectile.getComponent(EntityComponentTypes.Projectile) as EntityProjectileComponent;
            if (projComp !== undefined) {
                projComp.shoot(projectile.getViewDirection(), {
                    uncertainty: 0
                });
                hit = true;
            }
        });

        return hit;
    }

    nitirintouFillBlock(dimension:Dimension, from:Vector3, to:Vector3) {

        const volume = new BlockVolume(from, to);
        dimension.fillBlocks(volume, "minecraft:air", {
            ignoreChunkBoundErrors: true,
            blockFilter: {
                includeTags: ['minecraft:is_sword_item_destructible']
            }
        }) as ListBlockVolume;
    
    };

}
