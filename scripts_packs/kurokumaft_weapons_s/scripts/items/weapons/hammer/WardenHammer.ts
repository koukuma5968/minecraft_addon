import { ItemCustomComponent, ItemComponentHitEntityEvent, ItemStack, Entity, ItemComponentUseEvent, Player, EntityDamageCause, world } from "@minecraft/server";
import { getLookPoints } from "../../../common/WeaponsCommonUtil";
import { shooting } from "../../../common/WeaponsShooterPoints";

/**
 * ウォーデンハンマー
 */
export class WardenHammer implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        let attackEntity = event.attackingEntity as Entity;
        let hitEntity = event.hitEntity as Entity;
        let itemStack = event.itemStack as ItemStack;

        hammerHit(attackEntity, hitEntity);
    }
}

async function hammerHit(attackEntity:Entity, hitEntity: Entity) {

    let loock = getLookPoints(attackEntity.getRotation(), attackEntity.location, 4.5);
    attackEntity.dimension.spawnParticle("kurokumaft:shock_particle", loock); 

    hitEntity.applyDamage(5, {
        cause: EntityDamageCause.entityAttack
    });
    shooting(attackEntity as Player, "kurokumaft:sonic_bullet", 0, 5, undefined);

}

export async function waveWardenHammer(attackEntity:Entity, hammer: Entity) {

    if (hammer.typeId != "kurokumaft:thrown_warden_hammer") {
        return;
    }

    hammer.dimension.spawnParticle("kurokumaft:warden_shock", hammer.location); 

    let hitEntitys = hammer.dimension.getEntities({
        excludeFamilies: [
            "inanimate",
            "player",
        ],
        excludeTypes: [
            "item"
        ],
        excludeTags: [
            "throwHammer"
        ],
        location: hammer.location,
        closest: 5
    }) as Entity[];

    hitEntitys.forEach(en => {
        en.applyDamage(5, {
            cause: EntityDamageCause.magic
        })
    })
}