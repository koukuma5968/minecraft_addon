import { ItemCustomComponent, ItemComponentHitEntityEvent, ItemStack, Entity, EntityDamageCause } from "@minecraft/server";
import { getLookPoints } from "../../../common/WeaponsCommonUtil";

/**
 * ミスリルスピアー
 */
export class MithrilSpear implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        let attackEntity = event.attackingEntity as Entity;
        let hitEntity = event.hitEntity as Entity;
        let itemStack = event.itemStack as ItemStack;
        mithrilHit(attackEntity, hitEntity, itemStack);
    }
}

async function mithrilHit(attackEntity: Entity, hitEntity: Entity, itemStack: ItemStack) {
    attackEntity.addTag("mithrilHit");
    let dim = attackEntity.dimension;
    let look = getLookPoints(attackEntity.getRotation(), attackEntity.location, 4.5);
    dim.spawnParticle("kurokumaft:sweep_particle", {x:look.x, y:look.y+0.5,z:look.z});
    dim.spawnParticle("kurokumaft:sweep_particle", {x:look.x, y:look.y+1,z:look.z});
    let targetEn = dim.getEntities({
        excludeTags: [
            "mithrilHit"
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
        if (!en.isValid()) {
            return;
        }
        en.applyDamage(5, {
            cause: EntityDamageCause.ramAttack
        });
        en.applyDamage(5, {
            cause: EntityDamageCause.ramAttack
        });
    });

    attackEntity.removeTag("mithrilHit");
}
