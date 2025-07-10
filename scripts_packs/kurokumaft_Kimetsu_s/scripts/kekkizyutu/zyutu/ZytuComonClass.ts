import { EntityDamageCause, EntityQueryOptions, Entity, Player } from "@minecraft/server";
import { KataComonClass } from "../../kokyu/kata/KataComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export const ogreRankPoint = Object.freeze([
    {
        rank: "unusual",
        point: 1
    },
    {
        rank: "quarter",
        point: 2
    },
    {
        rank: "crescent",
        point: 4
    },
    {
        rank: "king",
        point: 6
    },
]);

export class ZytuComonClass extends KataComonClass {

    kokyuApplyDamage(entity:Entity, filter:EntityQueryOptions, enDamage:number, pDamage:number): void {

        entity.addTag(entity.id);
        const targets = entity.dimension.getEntities(filter);
        const ogre_rank = entity.getProperty("kurokumaft:ogre_rank");
        const point = ogreRankPoint.find(rank => rank.rank === ogre_rank);
        targets.forEach(en => {
            if (en !== undefined && en.isValid()) {
                if (en instanceof Player) {
                    if (this.gardCheck(en)) {
                        en.applyDamage(pDamage*(point !== undefined ? point.point : 1), {
                            cause: EntityDamageCause.entityAttack,
                            damagingEntity: entity
                        });
                    }
                } else {
                    en.applyDamage(enDamage*(point !== undefined ? point.point : 1), {
                        cause: EntityDamageCause.entityAttack,
                        damagingEntity: entity
                    });
                }
            }
        });
        entity.removeTag(entity.id);

    }

    kokyuApplyEffect(entity:Entity, filter:EntityQueryOptions, duration:number, damage:number, effect:MinecraftEffectTypes): void {

        entity.addTag(entity.id);
        const targets = entity.dimension.getEntities(filter);
        const ogre_rank = entity.getProperty("kurokumaft:ogre_rank");
        const point = ogreRankPoint.find(rank => rank.rank === ogre_rank);
        const damageNum = point !== undefined ? point.point : 1;
        targets.forEach(en => {
            if (en !== undefined && en.isValid()) {
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
