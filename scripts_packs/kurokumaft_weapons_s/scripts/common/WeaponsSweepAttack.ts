import { Entity, EntityDamageCause } from "@minecraft/server";
import { getLookPoints } from "./WeaponsCommonUtil";

/**
 * 範囲攻撃
 * @param {Entity} attackEntity
 * @param {Entity} hitEntity
 * @param {number} damage
 */
export async function sweepHit(attackEntity: Entity, hitEntity: Entity, damage:number) {
    attackEntity.addTag("sweepHit");
    const dim = attackEntity.dimension;
    const look = getLookPoints(attackEntity.getRotation(), attackEntity.location, 4.5);
    dim.spawnParticle("kurokumaft:sweep_particle", look);
    const targetEn = dim.getEntities({
        excludeTags: [
            "sweepHit"
        ],
        excludeFamilies: [
            "inanimate"
        ],
        excludeTypes: [
            "item"
        ],
        location: hitEntity.location,
        maxDistance: 1.75
    })

    targetEn.forEach(en => {
        en.applyDamage(damage, {
            cause: EntityDamageCause.ramAttack
        });
    });

    attackEntity.removeTag("sweepHit");
}

/**
 * 範囲攻撃（三段）
 * @param {Entity} attackEntity
 * @param {Entity} hitEntity
 * @param {number} damage
 */
export async function sweepThreeHit(attackEntity: Entity, hitEntity: Entity, damage:number) {
    attackEntity.addTag("sweepHit");
    const dim = attackEntity.dimension;
    const look = getLookPoints(attackEntity.getRotation(), attackEntity.location, 4.5);
    dim.spawnParticle("kurokumaft:sweep_particle", {x:look.x, y:look.y-0.5,z:look.z});
    dim.spawnParticle("kurokumaft:sweep_particle", look);
    dim.spawnParticle("kurokumaft:sweep_particle", {x:look.x, y:look.y+0.5,z:look.z});
    const targetEn = dim.getEntities({
        excludeTags: [
            "sweepHit"
        ],
        excludeFamilies: [
            "inanimate"
        ],
        excludeTypes: [
            "item"
        ],
        location: hitEntity.location,
        maxDistance: 1.75
    })

    targetEn.forEach(en => {
        en.applyDamage(damage, {
            cause: EntityDamageCause.ramAttack
        });
        en.applyDamage(damage, {
            cause: EntityDamageCause.ramAttack
        });
        en.applyDamage(damage, {
            cause: EntityDamageCause.ramAttack
        });
    });

    attackEntity.removeTag("sweepHit");
}
