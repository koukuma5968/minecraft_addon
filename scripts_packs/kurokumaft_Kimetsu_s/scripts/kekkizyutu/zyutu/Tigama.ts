import { EntityComponentTypes, EntityDamageCause, EntityProjectileComponent, ItemStack, Entity, system, TicksPerSecond, Player } from "@minecraft/server";
import { addOrgeFilter, getDirectionVector, getDistanceLocation, getLookLocationDistance, getRandomInRange} from "../../common/KimetuCommonUtil";
import { ZytuComonClass } from "./ZytuComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export class Tigama extends ZytuComonClass {

    /**
     * 飛び血鎌
     */
    tobiTigama(entity:Entity) {
        if (entity == undefined) {
            return;
        }

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_tigama1.value"}]});
        }
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);

        for(let i=0; i<5; i++) {
            this.tigamaHorming(entity, i);
        }
    }

    /**
     * @param {Entity} entity
     */
    private async tigamaHorming(entity:Entity, i:number) {

        if (entity == undefined) {
            return;
        }

        const kama = this.tigamaShooting(entity);

        let targethoming = false;

        const serchNum = system.runInterval(() => {

            if (!targethoming) {

                kama.addTag(kama.id+i);
                const kamaKoc = kama.location;
                entity.addTag(entity.id);
                const targets = entity.dimension.getEntities({
                    excludeFamilies: [
                        "inanimate", "animal", "tigama"
                    ],
                    excludeTypes: [
                        "item"
                    ],
                    excludeTags: [
                        entity.id,
                        kama.id+i
                    ],
                    location: kamaKoc,
                    closest: 1,
                    maxDistance: 32
                });
                entity.removeTag(entity.id);
                if (targets.length > 0) {
                    targethoming=true;
                    targets[0].addTag("hitObiTarget:"+ kama.id+i);
                    const num = system.runInterval(() =>{

                        if (!kama.isValid()) {
                            system.clearRun(serchNum);
                            system.clearRun(num);
                            return;
                        }
                        const kamaKoc2 = kama.location;
                        const hittargets = entity.dimension.getEntities({
                            excludeFamilies: [
                                "inanimate", "animal", "tigama"
                            ],
                            excludeTypes: [
                                "item"
                            ],
                            tags: [
                                "hitObiTarget:"+ kama.id+i
                            ],
                            location: kamaKoc2,
                            closest: 1
                        });
                        if (hittargets.length > 0) {
                            const target = hittargets[0];
                            const targetLoc = getDirectionVector(kamaKoc2, target.location);
                            const tpLoc = {
                                x:kamaKoc2.x+targetLoc.x,
                                y:kamaKoc2.y+targetLoc.y+1,
                                z:kamaKoc2.z+targetLoc.z
                            }
                            kama.teleport(tpLoc, {
                                checkForBlocks: false,
                                keepVelocity: true
                            });
                            kama.applyImpulse(targetLoc);
                        } else {
                            if (kama.isValid()) {
                                system.clearRun(num);
                                kama.remove();
                            }
                        }
            
                    }, 3);
    
                }

            }
        },4);
        system.runTimeout(() => {
            if (kama.isValid()) {
                system.clearRun(serchNum);
                kama.remove();
            }
        }, 100);

    }

    /**
     * @param {Entity} entity
     */
    private tigamaShooting(entity:Entity) {

        const distance = getLookLocationDistance(entity.getRotation().y, 1, getRandomInRange(-5, 5), getRandomInRange(0, 2));

        const bulet = entity.dimension.spawnEntity("kurokumaft:tobi_tigama", getDistanceLocation(
            {
                x:entity.location.x,
                y:entity.location.y,
                z:entity.location.z
            },
            distance
        ));

        const projectile = bulet.getComponent(EntityComponentTypes.Projectile) as EntityProjectileComponent;
        projectile.owner = entity;

        const distance2 = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);

        projectile.shoot({
            x:distance2.x * 1,
            y:distance2.y * 1,
            z:distance2.z * 1
        });

        return bulet;
    }

    /**
     * 跋扈跳梁
     */
    bakkotyouryou(entity:Entity) {

        if (entity == undefined) {
            return;
        }
        if (entity.getDynamicProperty("kurokumaft:chage_type") == undefined) {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_tigama2.value"}]});
            }
            entity.setDynamicProperty("kurokumaft:chage_type", true);

            const parnum = system.runInterval(() => {

                entity.addTag(entity.id);
                const filter = addOrgeFilter(0, entity.location, 6, entity.id);
                const targets = entity.dimension.getEntities(filter);
                targets.forEach(en => {
                    if (en instanceof Player) {
                        if (this.gardCheck(en)) {
                            en.applyDamage(2, {
                                cause: EntityDamageCause.entityAttack,
                                damagingEntity: entity
                            });
                        }
                        en.addEffect(MinecraftEffectTypes.Poison, 5, {
                            showParticles: false,
                            amplifier: 2
                        });
                    } else {
                        en.applyDamage(3, {
                            cause: EntityDamageCause.entityAttack,
                            damagingEntity: entity
                        });
                        en.addEffect(MinecraftEffectTypes.Poison, 10, {
                            showParticles: false,
                            amplifier: 5
                        });
                    }
                });
                entity.removeTag(entity.id);
            },2);

            system.runTimeout(() => {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
                entity.setDynamicProperty("kurokumaft:chage_type", undefined);
                system.clearRun(parnum);
            },3*TicksPerSecond);
        }
    }

    /**
     * 円斬旋回・飛び血鎌
     */
    enzansenkai(entity:Entity) {
        if (entity == undefined) {
            return;
        }

        if (entity.getDynamicProperty("kurokumaft:chage_type") == undefined) {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_tigama3.value"}]});
            }
            entity.setDynamicProperty("kurokumaft:chage_type", true);

            const parnum = system.runInterval(() => {
                if (entity == undefined) {
                    return;
                }

                entity.addTag(entity.id);
                const filter = addOrgeFilter(0, entity.location, 10, entity.id);
                const targets = entity.dimension.getEntities(filter);
                targets.forEach(en => {
                    if (en != undefined) {
                        if (en instanceof Player) {
                            if (this.gardCheck(en)) {
                                en.applyDamage(2, {
                                    cause: EntityDamageCause.entityAttack,
                                    damagingEntity: entity
                                });
                            }
                        } else {
                            en.applyDamage(3, {
                                cause: EntityDamageCause.entityAttack,
                                damagingEntity: entity
                            });
                        }
                    }
                });
                entity.removeTag(entity.id);
            },2);

            system.runTimeout(() => {
                system.clearRun(parnum);
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
                this.enzanTigama(entity, -5);
                this.enzanTigama(entity, 0);
                this.enzanTigama(entity, 5);
                entity.setDynamicProperty("kurokumaft:chage_type", undefined);
            },40);

        }
    }

    enzanTigama(entity:Entity, side:number) {

        const distance = getLookLocationDistance(entity.getRotation().y, 1, side, getRandomInRange(0, 3));

        const bulet = entity.dimension.spawnEntity("kurokumaft:enzansenkai", getDistanceLocation(
            {
                x:entity.location.x,
                y:entity.location.y,
                z:entity.location.z
            },
            distance
        ));

        const projectile = bulet.getComponent(EntityComponentTypes.Projectile) as EntityProjectileComponent;
        projectile.owner = entity;
        const distance2 = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);

        projectile.shoot({
            x:distance2.x * 1,
            y:distance2.y * 1,
            z:distance2.z * 1
        });

        const num = system.runInterval(() => {
            entity.addTag(entity.id);
            const targets = entity.dimension.getEntities({
                excludeFamilies: [
                    "inanimate", "animal", "tigama"
                ],
                excludeTypes: [
                    "item"
                ],
                excludeTags: [
                    entity.id,
                    bulet.id+side
                ],
                location: bulet.location,
                maxDistance: 4
            });
            targets.forEach(en => {
                if (en != undefined) {
                    en.applyDamage(1, {
                        cause: EntityDamageCause.entityAttack,
                        damagingEntity: entity
                    });
                    en.addEffect(MinecraftEffectTypes.Poison, 10, {
                        showParticles: false,
                        amplifier: 5
                    });
                }
            });
            entity.removeTag(entity.id);
        }, 2);

        system.runTimeout(() => {
            if (bulet.isValid()) {
                bulet.remove();
                system.clearRun(num);
            }
        },30);

    }
}
