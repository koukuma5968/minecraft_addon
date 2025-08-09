import { ItemCustomComponent, ItemStack, Block, EquipmentSlot, ItemComponentHitEntityEvent, Entity, EntityDamageCause } from "@minecraft/server";
import { itemDurabilityDamage } from "../../common/WeaponsItemDurabilityDamage";
import { WeaponLogBlocks, WeaponStrippedLogBlocks, WeaponStrippedWoodBlocks, WeaponWoodBlocks } from "../../common/WeaponsConstants";

/**
 * ファイアブランド
 */
export class FireBrand implements ItemCustomComponent {

    onHitEntity(event:ItemComponentHitEntityEvent) {
        const attackingEntity = event.attackingEntity as Entity;
        const hitEntity = event.hitEntity as Entity;
        const itemStack = event.itemStack as ItemStack;
        mobflameFiring(hitEntity);
        itemDurabilityDamage(attackingEntity, itemStack, EquipmentSlot.Mainhand);
    }
}

async function mobflameFiring(hitEntity:Entity) {
    hitEntity.applyDamage(15, {
        cause: EntityDamageCause.fire
    });
    hitEntity.dimension.spawnParticle("kurokumaft:mobflame_firing", hitEntity.location);
}

export async function fireCharcoalBlock(attackingEntity:Entity, itemStack:ItemStack, block:Block) {

    if (WeaponLogBlocks.find(type => type == block.typeId) != undefined 
    || WeaponStrippedLogBlocks.find(type => type == block.typeId) != undefined 
    || WeaponWoodBlocks.find(type => type == block.typeId) != undefined
    || WeaponStrippedWoodBlocks.find(type => type == block.typeId) != undefined) {

        block.dimension.setBlockType(block.location, "kurokumaft:charcoal_block");
        block.dimension.spawnParticle("kurokumaft:mobflame_firing", {x:block.location.x+0.5,y:block.location.y,z:block.location.z+0.5});
        itemDurabilityDamage(attackingEntity, itemStack, EquipmentSlot.Mainhand);
    }
}