import { Entity, system, Player, EntityComponentTypes, EntityTameableComponent, EntityProjectileComponent } from "@minecraft/server";
import { ZytuComonClass } from "./ZytuComonClass";
import { getLookLocationDistancePitch, addOrgeFilter, getDistanceLocation, getLookLocationDistance, getRandomInRange, addRegimentalFilter } from "../../common/KimetuCommonUtil";
import { shooting } from "../../common/ShooterEvent";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export class Bunretu extends ZytuComonClass {

    /**
     * 超音波
     */
    ultrasonic(entity:Entity) {
        if (entity === undefined) {
            return;
        }
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_kyoumei1.value"}]});
        }

        const distance = getLookLocationDistancePitch(entity.getRotation(), 3, 0);
        const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 4, entity.id);
        this.kokyuApplyEffect(entity, filter, 10, 5, MinecraftEffectTypes.Nausea);

        const ultrasonic = shooting(entity, "kurokumaft:urogi_ultrasonic", 0, 3, undefined);
        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
            if (ultrasonic !== undefined && ultrasonic.id !== undefined) {
                ultrasonic.remove();
            }
        },10);

    }

    /**
     * 雷
     */
    ikazuti(entity:Entity) {
        if (entity === undefined) {
            return;
        }
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_ikazuti1.value"}]});
        }

        const num = system.runInterval(() => {

            const filter = addOrgeFilter(0, entity.location, 10, entity.id);
            this.kokyuApplyDamage(entity, filter, 2, 1);

            const distance = getLookLocationDistance(entity.getRotation().y, 0, getRandomInRange(-3, 3), 0);
            entity.dimension.spawnParticle("kurokumaft:ikazuti_particle", getDistanceLocation(entity.location, distance));

        },2);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },40);
    }

    /**
     * 激涙刺突
     */
    shitotu(entity:Entity) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_shitotu1.value"}]});
        }

        const num = system.runInterval(() => {
            const distance = getLookLocationDistancePitch(entity.getRotation(), 3, 0);
            const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 4, entity.id);
            this.kokyuApplyDamage(entity, filter, 3, 1);
        },2);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },11);

    }

    /**
     * 突風
     */
    toppu(entity:Entity) {
        if (entity === undefined) {
            return;
        }
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_toppu1.value"}]});
        }

        entity.addTag(entity.id);
        const distance = getLookLocationDistance(entity.getRotation().y, 4, 0, 0);
        const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 5, entity.id);
        entity.dimension.spawnParticle("minecraft:breeze_wind_explosion_emitter", getDistanceLocation(entity.location, distance));

        const targets = entity.dimension.getEntities(filter);
        targets.forEach(en => {
            en.applyKnockback(distance.x,distance.z,15,1);
        });
        entity.removeTag(entity.id);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },6);
    }

    /**
     * 石竜子
     */
    tokage(entity:Entity) {
        if (entity === undefined) {
            return;
        }
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
    }

    /**
     * 狂鳴雷殺
     */
    kyoumeiraisatu(entity:Entity) {
        if (entity === undefined) {
            return;
        }
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
            if (tokageR !== undefined && tokageR.isValid()) {
                const filterR = addOrgeFilter(0, tokageR.location, 10, entity.id);
                filterR.excludeFamilies?.push("tokage");
                this.kokyuApplyDamage(entity, filterR, 2, 1);

                const distanceR = getLookLocationDistance(tokageR.getRotation().y, 0, getRandomInRange(-3, 3), 0);
                entity.dimension.spawnParticle("kurokumaft:ikazuti_particle", getDistanceLocation(tokageR.location, distanceR));
            }

            if (tokageL !== undefined && tokageL.isValid()) {
                const distanceL = getLookLocationDistancePitch(tokageL.getRotation(), 3, 0);
                const filterL = addOrgeFilter(0, getDistanceLocation(tokageL.location, distanceL), 4, entity.id);
                filterL.excludeFamilies?.push("tokage");
                this.kokyuApplyEffect(entity, filterL, 10, 5, MinecraftEffectTypes.Nausea);

                const ultrasonic = shooting(tokageL, "kurokumaft:urogi_ultrasonic", 0, 3, undefined);
                system.runTimeout(() => {
                    if (ultrasonic !== undefined && ultrasonic.id !== undefined) {
                        ultrasonic.remove();
                    }
                },15);
            }
        }, 5);

        system.runTimeout(() => {
            if (tokageR !== undefined) {
                tokageR.remove();
            }
            if (tokageL !== undefined) {
                tokageL.remove();
            }
            system.clearRun(num);
        },60);
    }
    
    /**
     * 狂圧鳴波
     */
    kyouatumeiha(entity:Entity) {
        if (entity === undefined) {
            return;
        }
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_zouhakuten3.value"}]});
        }
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);

        const distance = getLookLocationDistancePitch(entity.getRotation(), 3, 0);
        const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 4, entity.id);

        const num = system.runInterval(() => {
            this.kokyuApplyDamage(entity, filter, 3, 1);
            this.kokyuApplyEffect(entity, filter, 10, 5, MinecraftEffectTypes.Nausea);
        }, 4);

        for (let i=-1; i<=1; i++) {
            const ultrasonic = this.sonic(entity, i);
            system.runTimeout(() => {
                if (ultrasonic !== undefined && ultrasonic.id !== undefined) {
                    ultrasonic.remove();
                }
            },10);
        }

        system.runTimeout(() => {
            system.clearRun(num);
        },20);

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
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_zouhakuten4.value"}]});
        }
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);

        this.gouzyu(entity);
    }

    private gouzyu(entity:Entity) {

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
            if (tokage !== undefined && tokage.isValid()) {
                const distance = getLookLocationDistance(tokage.getRotation().y, 3, 0, 0);
                tokage.applyKnockback(distance.x,distance.z,10,0);

                const filter = addOrgeFilter(0, tokage.location, 5, entity.id);
                filter.excludeFamilies?.push("tokage");
                this.kokyuApplyDamage(entity, filter, 3, 1);

            } else {
                system.clearRun(num);
            }
        }, 2);
        system.runTimeout(() => {
            system.clearRun(num);
            if (tokage !== undefined && tokage.isValid()) {
                tokage.remove();
            }
        },60);

    }
}
