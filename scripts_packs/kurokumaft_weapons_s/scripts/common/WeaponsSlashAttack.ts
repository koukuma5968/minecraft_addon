import { Entity, ItemStack, EntityDamageCause } from "@minecraft/server";
import { getLookPoints, getLookRotaionPoints } from "./WeaponsCommonUtil";

/**
 * 切り裂き攻撃
 * @param {Entity} attackEntity
 * @param {Entity} hitEntity
 * @param {number} damage
 */
export async function slashHit(attackEntity: Entity, hitEntity: Entity, damage:number) {
    const dim = attackEntity.dimension;
    const look = getLookPoints(attackEntity.getRotation(), attackEntity.location, 4.5);
    dim.spawnParticle("kurokumaft:slash_particle", look);
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
    const dim = attackEntity.dimension;
    const look = getLookPoints(attackEntity.getRotation(), attackEntity.location, 4.5);
    const rota = getLookRotaionPoints(attackEntity.getRotation(), 2.5, 0);
    dim.spawnParticle("kurokumaft:slash_particle", {x:look.x+rota.x, y:look.y,z:look.z+rota.z});
    dim.spawnParticle("kurokumaft:slash_particle", look);
    dim.spawnParticle("kurokumaft:slash_particle", {x:look.x-rota.x, y:look.y,z:look.z-rota.z});
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
