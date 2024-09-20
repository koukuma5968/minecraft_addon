import { Entity, ItemStack, EntityDamageCause } from "@minecraft/server";
import { getLookPoints, getLookRotaionPoints } from "./commonUtil";

/**
 * 切り裂き攻撃
 * @param {Entity} attackEntity
 * @param {Entity} hitEntity
 * @param {number} damage
 */
export async function slashHit(attackEntity: Entity, hitEntity: Entity, damage:number) {
    let dim = attackEntity.dimension;
    let {xlocation, ylocation, zlocation} = getLookPoints(attackEntity.getRotation(), attackEntity.location, 4.5);
    dim.spawnParticle("kurokumaft:slash_particle", {x:xlocation!, y:ylocation!,z:zlocation!});
    hitEntity.applyDamage(damage, {
        cause: EntityDamageCause.entityAttack
    });
}

/**
 * 切り裂き攻撃（三段）
 * @param {Entity} attackEntity
 * @param {Entity} hitEntity
 * @param {number} damage
 */
export async function slashThreeHit(attackEntity: Entity, hitEntity: Entity, damage:number) {
    let dim = attackEntity.dimension;
    let {xlocation, ylocation, zlocation} = getLookPoints(attackEntity.getRotation(), attackEntity.location, 4.5);
    let {rotax, rotaz} = getLookRotaionPoints(attackEntity.getRotation(), 2.5);
    dim.spawnParticle("kurokumaft:slash_particle", {x:xlocation!+rotax!, y:ylocation!,z:zlocation!+rotaz!});
    dim.spawnParticle("kurokumaft:slash_particle", {x:xlocation!, y:ylocation!,z:zlocation!});
    dim.spawnParticle("kurokumaft:slash_particle", {x:xlocation!-rotax!, y:ylocation!,z:zlocation!-rotaz!});
    hitEntity.applyDamage(damage, {
        cause: EntityDamageCause.entityAttack
    });
    hitEntity.applyDamage(damage, {
        cause: EntityDamageCause.entityAttack
    });
    hitEntity.applyDamage(damage, {
        cause: EntityDamageCause.entityAttack
    });

}
