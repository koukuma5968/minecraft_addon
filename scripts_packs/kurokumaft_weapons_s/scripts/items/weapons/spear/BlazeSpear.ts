import { ItemCustomComponent, ItemComponentHitEntityEvent, ItemStack, Entity, EntityDamageCause } from "@minecraft/server";
import { getLookPoints } from "../../../common/WeaponsCommonUtil";

/**
 * ブレイズスピア
 */
export class BlazeSpear implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        let attackEntity = event.attackingEntity as Entity;
        let hitEntity = event.hitEntity as Entity;
        let itemStack = event.itemStack as ItemStack;
        blazeHit(attackEntity, hitEntity, itemStack);
    }

}

async function blazeHit(attackEntity: Entity, hitEntity: Entity, itemStack: ItemStack) {
    attackEntity.addTag("blazeHit");
    let dim = attackEntity.dimension;
    let look = getLookPoints(attackEntity.getRotation(), attackEntity.location, 4.5);
    let targetEn = dim.getEntities({
        excludeTags: [
            "blazeHit"
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
        dim.spawnParticle("kurokumaft:mobflame_firing", look);
        en.applyDamage(6, {
            cause: EntityDamageCause.fire
        });
    });

    attackEntity.removeTag("blazeHit");
}
