import { ItemCustomComponent, ItemComponentHitEntityEvent, ItemStack, Entity, world, system, ItemComponentUseEvent, Player, GameMode, EquipmentSlot, ItemComponentTypes, ItemCooldownComponent, ItemComponentUseOnEvent, ItemComponentCompleteUseEvent, Dimension, Vector3, Block, BlockTypes, EntityDamageCause, EffectTypes, EntityComponent, EntityComponentTypes, EntityEquippableComponent, EntityInventoryComponent, Container, ItemEnchantableComponent, EnchantmentType, EnchantmentTypes, System, EntityTypeFamilyComponent, Enchantment } from "@minecraft/server";
import { ItemDurabilityDamage } from "../../../common/ItemDurabilityDamage";
import { shooting } from "../../../common/ShooterPoints";
import { getDirectionVector, getLookPoints, getLookRotaionPoints, itemCoolDown } from "../../../common/commonUtil";
import { MinecraftEnchantmentTypes } from "@minecraft/vanilla-data";

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
    let {xlocation, ylocation, zlocation} = getLookPoints(attackEntity.getRotation(), attackEntity.location, 4.5);
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
        dim.spawnParticle("kurokumaft:mobflame_firing", {x:xlocation!, y:ylocation!,z:zlocation!});
        en.applyDamage(6, {
            cause: EntityDamageCause.fire
        });
    });

    attackEntity.removeTag("blazeHit");
}
