import { EntityDamageCause, EntityQueryOptions, Entity, Player, EntityComponentTypes, EntityTypeFamilyComponent, world } from "@minecraft/server";
import { KataComonClass, ogreRankPoint } from "../../kokyu/kata/KataComonClass";
import { getLookLocationDistance } from "../../common/KimetuCommonUtil";

export class ZytuComonClass extends KataComonClass {

    zyutuApplyDamage(entity:Entity, filter:EntityQueryOptions, zyutuDamage:number): void {

        entity.addTag(entity.id);
        const targets = entity.dimension.getEntities(filter);
        const ogre_rank = entity.getProperty("kurokumaft:ogre_rank");
        const point = ogreRankPoint.find(rank => rank.rank === ogre_rank);

        const damage = entity.getProperty("kurokumaft:attack_level") as number;

        targets.forEach(en => {
            if (en !== undefined && en.isValid) {
                if (en instanceof Player) {
                    if (!this.gardCheck(en)) {
                        en.applyDamage((damage + zyutuDamage) * (point !== undefined ? point.point : 1) * 0.5, {
                            cause: EntityDamageCause.entityAttack,
                            damagingEntity: entity
                        });
                        const familyTypes = en.getComponent(EntityComponentTypes.TypeFamily) as EntityTypeFamilyComponent;

                        if (familyTypes.hasTypeFamily("ogre")) {
                            const distance = getLookLocationDistance(en.getRotation().y, -1.25, 0, 0.5);
                            en.applyKnockback({x:distance.x, z:distance.z}, 0.25);
                        }

                    }
                } else {
                    en.applyDamage((damage + zyutuDamage) * (point !== undefined ? point.point : 1), {
                        cause: EntityDamageCause.entityAttack,
                        damagingEntity: entity
                    });
                    const familyTypes = en.getComponent(EntityComponentTypes.TypeFamily) as EntityTypeFamilyComponent;

                    if (familyTypes.hasTypeFamily("ogre")) {
                        const distance = getLookLocationDistance(en.getRotation().y, -1.25, 0, 0.5);
                        en.applyKnockback({x:distance.x, z:distance.z}, 0.25);
                    }
                }
            }
        });
        entity.removeTag(entity.id);

    }

    kokyuApplyEffect(entity:Entity, filter:EntityQueryOptions, duration:number, damage:number, effect:string): void {

        entity.addTag(entity.id);
        const targets = entity.dimension.getEntities(filter);
        const ogre_rank = entity.getProperty("kurokumaft:ogre_rank");
        const point = ogreRankPoint.find(rank => rank.rank === ogre_rank);
        const damageNum = point !== undefined ? point.point : 1;
        targets.forEach(en => {
            if (en !== undefined && en.isValid) {
                if (en instanceof Player) {
                    if (this.gardCheck(en)) {
                        en.addEffect(effect, Math.round(duration*damageNum*0.25), {
                            amplifier: Math.round(damage*damageNum*0.25),
                            showParticles: true
                        });
                    }
                } else {
                    en.addEffect(effect, Math.round(duration*damageNum*0.75), {
                        amplifier: Math.round(damage*damageNum),
                        showParticles: true
                    });
                }
            }
        });
        entity.removeTag(entity.id);

    }

}
