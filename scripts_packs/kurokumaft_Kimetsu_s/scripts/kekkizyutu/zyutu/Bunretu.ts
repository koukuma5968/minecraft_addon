import { Entity, system, Player, EntityComponentTypes, EntityTameableComponent, EntityProjectileComponent } from "@minecraft/server";
import { ZytuComonClass } from "./ZytuComonClass";
import { getLookLocationDistancePitch, addOrgeFilter, getDistanceLocation, getLookLocationDistance, getRandomInRange } from "../../common/KimetuCommonUtil";
import { shooting } from "../../common/ShooterEvent";

export class Bunretu extends ZytuComonClass {

    /**
     * 超音波
     */
    ultrasonic(entity:Entity) {
        if (entity === undefined) {
            return;
        }
        try {

            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_kyoumei1.value"}]});
            }

            const distance = getLookLocationDistancePitch(entity.getRotation(), 3, 0);
            const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 4, entity.id);
            this.kokyuApplyEffect(entity, filter, 10, 5, "minecraft:nausea");

            const ultrasonic = shooting(entity, "kurokumaft:urogi_ultrasonic", 0, 3, undefined);
            system.waitTicks(10).then(() => {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
                if (ultrasonic !== undefined && ultrasonic.id !== undefined) {
                    ultrasonic.remove();
                }
            }).catch((error: any) => {
            }).finally(() => {
            });
        } catch (error: any) {
        }

    }

    /**
     * 雷
     */
    ikazuti(entity:Entity) {
        if (entity === undefined) {
            return;
        }

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_ikazuti1.value"}]});
            }

            const num = system.runInterval(() => {

                try {
                    const filter = addOrgeFilter(0, entity.location, 10, entity.id);
                    this.kokyuApplyDamage(entity, filter, 2, 1);

                    const distance = getLookLocationDistance(entity.getRotation().y, 0, getRandomInRange(-3, 3), 0);
                    entity.dimension.spawnParticle("kurokumaft:ikazuti_particle", getDistanceLocation(entity.location, distance));
                } catch (error: any) {
                    system.clearRun(num);
                }

            },2);

            system.waitTicks(40).then(() => {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            }).catch((error: any) => {
            }).finally(() => {
                system.clearRun(num);
            });
        } catch (error: any) {
        }
    }

    /**
     * 激涙刺突
     */
    shitotu(entity:Entity) {

        if (entity === undefined) {
            return;            
        }

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_shitotu1.value"}]});
            }

            const num = system.runInterval(() => {
                try {
                    const distance = getLookLocationDistancePitch(entity.getRotation(), 3, 0);
                    const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 4, entity.id);
                    this.kokyuApplyDamage(entity, filter, 3, 1);
                } catch (error: any) {
                    system.clearRun(num);
                }
            },2);

            system.waitTicks(10).then(() => {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            }).catch((error: any) => {
            }).finally(() => {
                system.clearRun(num);
            });
        } catch (error: any) {
        }

    }

    /**
     * 突風
     */
    toppu(entity:Entity) {
        if (entity === undefined) {
            return;
        }

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_toppu1.value"}]});
            }

            entity.addTag(entity.id);
            const distance = getLookLocationDistance(entity.getRotation().y, 4, 0, 0);
            const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 5, entity.id);
            entity.dimension.spawnParticle("minecraft:breeze_wind_explosion_emitter", getDistanceLocation(entity.location, distance));

            const targets = entity.dimension.getEntities(filter);
            const knockback = getLookLocationDistance(entity.getRotation().y, 15, 0, 0);
            targets.forEach(en => {
                en.applyKnockback({x:knockback.x,z:knockback.z},1.5);
            });
            entity.removeTag(entity.id);

            system.waitTicks(6).then(() => {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            }).catch((error: any) => {
            }).finally(() => {
            });
        } catch (error: any) {
        }
    }

    /**
     * 石竜子
     */
    tokage(entity:Entity) {
        if (entity === undefined) {
            return;
        }

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_zouhakuten1.value"}]});
            }
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);

            const targets = entity.dimension.getEntities({
                families: [
                    "tokage"
                ],
                location: entity.location,
                maxDistance: 64
            });
            if (targets.length < 3) {
                const tokage = entity.dimension.spawnEntity("kurokumaft:tuti_dragon", entity.location);
                tokage.triggerEvent("kurokumaft:tokage");

                const tameable = tokage.getComponent(EntityComponentTypes.Tameable) as EntityTameableComponent;
                if (!tameable.isTamed) {
                    if (entity instanceof Player) {
                        tameable.tame(entity);
                    }
                }
            } else {
                if (entity instanceof Player) {
                    entity.onScreenDisplay.setActionBar({text:"召喚数上限超過"});
                }
            }
        } catch (error: any) {
        }
    }

    /**
     * 狂鳴雷殺
     */
    kyoumeiraisatu(entity:Entity) {
        if (entity === undefined) {
            return;
        }

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_zouhakuten2.value"}]});
            }
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);

            const distanceL = getLookLocationDistance(entity.getRotation().y, 4, -5, 0);
            const tokageL = entity.dimension.spawnEntity("kurokumaft:tuti_dragon", getDistanceLocation(entity.location, distanceL));
            tokageL.triggerEvent("kurokumaft:kyoumeiraisatu");

            const tameableL = tokageL.getComponent(EntityComponentTypes.Tameable) as EntityTameableComponent;
            if (!tameableL.isTamed) {
                if (entity instanceof Player) {
                    tameableL.tame(entity);
                }
            }

            const distanceR = getLookLocationDistance(entity.getRotation().y, 4, 5, 0);
            const tokageR = entity.dimension.spawnEntity("kurokumaft:tuti_dragon", getDistanceLocation(entity.location, distanceR));
            tokageR.triggerEvent("kurokumaft:kyoumeiraisatu");

            const tameableR = tokageR.getComponent(EntityComponentTypes.Tameable) as EntityTameableComponent;
            if (!tameableR.isTamed) {
                if (entity instanceof Player) {
                    tameableR.tame(entity);
                }
            }

            const num = system.runInterval(() => {
                try {

                    if (tokageR !== undefined && tokageR.isValid) {
                        const filterR = addOrgeFilter(0, tokageR.location, 10, entity.id);
                        filterR.excludeFamilies?.push("tokage");
                        this.kokyuApplyDamage(entity, filterR, 2, 1);

                        const distanceR = getLookLocationDistance(tokageR.getRotation().y, 0, getRandomInRange(-3, 3), 0);
                        entity.dimension.spawnParticle("kurokumaft:ikazuti_particle", getDistanceLocation(tokageR.location, distanceR));
                    }

                    if (tokageL !== undefined && tokageL.isValid) {
                        const distanceL = getLookLocationDistancePitch(tokageL.getRotation(), 3, 0);
                        const filterL = addOrgeFilter(0, getDistanceLocation(tokageL.location, distanceL), 4, entity.id);
                        filterL.excludeFamilies?.push("tokage");
                        this.kokyuApplyEffect(entity, filterL, 10, 5, "minecraft:nausea");

                        const ultrasonic = shooting(tokageL, "kurokumaft:urogi_ultrasonic", 0, 3, undefined);
                        system.runTimeout(() => {
                            if (ultrasonic !== undefined && ultrasonic.id !== undefined) {
                                ultrasonic.remove();
                            }
                        },15);
                    }
                } catch (error: any) {
                    system.clearRun(num);
                }
            }, 5);

            system.waitTicks(60).then(() => {
                if (tokageR !== undefined) {
                    tokageR.remove();
                }
                if (tokageL !== undefined) {
                    tokageL.remove();
                }
            }).catch((error: any) => {
            }).finally(() => {
                system.clearRun(num);
            });
        } catch (error: any) {
        }
    }
    
    /**
     * 狂圧鳴波
     */
    kyouatumeiha(entity:Entity) {
        if (entity === undefined) {
            return;
        }

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_zouhakuten3.value"}]});
            }
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);

            const distance = getLookLocationDistancePitch(entity.getRotation(), 3, 0);
            const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 4, entity.id);

            const num = system.runInterval(() => {
                try {
                    this.kokyuApplyDamage(entity, filter, 3, 1);
                    this.kokyuApplyEffect(entity, filter, 10, 5, "minecraft:nausea");
                } catch (error: any) {
                    system.clearRun(num);
                }
            }, 4);

            for (let i=-1; i<=1; i++) {
                const ultrasonic = this.sonic(entity, i);
                system.runTimeout(() => {
                    if (ultrasonic !== undefined && ultrasonic.id !== undefined) {
                        ultrasonic.remove();
                    }
                },10);
            }

            system.waitTicks(20).then(() => {
            }).catch((error: any) => {
            }).finally(() => {
                system.clearRun(num);
            });
        } catch (error: any) {
        }

    }

    private sonic(entity:Entity, side:number) : Entity {
        const distance = getLookLocationDistance(entity.getRotation().y, 1, side, 0.5);

        const bulet = entity.dimension.spawnEntity("kurokumaft:urogi_ultrasonic", getDistanceLocation(entity.location, distance));

        const projectile = bulet.getComponent(EntityComponentTypes.Projectile) as EntityProjectileComponent;
        projectile.owner = entity;
        projectile.shoot({
            x:distance.x * 2,
            y:distance.y * 0.5,
            z:distance.z * 2
        });

        return bulet;
    }

    /**
     * 無間業樹
     */
    mukengouzyu(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_zouhakuten4.value"}]});
            }
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);

            this.gouzyu(entity);
        } catch (error: any) {
        }
    }

    private gouzyu(entity:Entity) {

        try {
            const distance = getLookLocationDistance(entity.getRotation().y, 2, 0, 0);
            const tokage = entity.dimension.spawnEntity("kurokumaft:tuti_dragon", getDistanceLocation(entity.location, distance));
            tokage.triggerEvent("kurokumaft:mukengouzyu");
            tokage.teleport(tokage.location, {
                keepVelocity: false,
                rotation: {
                    x:0,
                    y:entity.getRotation().y
                }
            });

            const num = system.runInterval(() => {
                try {
                    if (tokage !== undefined && tokage.isValid) {
                        const distance = getLookLocationDistance(tokage.getRotation().y, 6, 0, 0);
                        tokage.applyKnockback({x:distance.x,z:distance.z},0);

                        const filter = addOrgeFilter(0, tokage.location, 5, entity.id);
                        filter.excludeFamilies?.push("tokage");
                        this.kokyuApplyDamage(entity, filter, 3, 1);

                    } else {
                        system.clearRun(num);
                    }
                } catch (error: any) {
                    system.clearRun(num);
                }
            }, 2);
            system.waitTicks(60).then(() => {
                if (tokage !== undefined && tokage.isValid) {
                    tokage.remove();
                }
            }).catch((error: any) => {
            }).finally(() => {
                system.clearRun(num);
            });
        } catch (error: any) {
        }

    }
}
