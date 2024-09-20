import { ItemCustomComponent, ItemStack, Block, EquipmentSlot, ItemComponentHitEntityEvent, Entity, EntityDamageCause } from "@minecraft/server";
import { ItemDurabilityDamage } from "../../common/ItemDurabilityDamage";
import { LogBlocks, StrippedLogBlocks, StrippedWoodBlocks, WoodBlocks } from "../../common/Constants";

/**
 * ファイアブランド
 */
export class FireBrand implements ItemCustomComponent {

    onHitEntity(event:ItemComponentHitEntityEvent) {
        let attackingEntity = event.attackingEntity as Entity;
        let hitEntity = event.hitEntity as Entity;
        let itemStack = event.itemStack as ItemStack;
        mobflameFiring(hitEntity);
        ItemDurabilityDamage(attackingEntity, itemStack, EquipmentSlot.Mainhand, undefined);
    }
}

async function mobflameFiring(hitEntity:Entity) {
    hitEntity.applyDamage(15, {
        cause: EntityDamageCause.fire
    });
    hitEntity.dimension.spawnParticle("kurokumaft:mobflame_firing", hitEntity.location);
}

export async function fireCharcoalBlock(attackingEntity:Entity, itemStack:ItemStack, block:Block) {

    if (LogBlocks.find(type => type == block.typeId) != undefined 
    || StrippedLogBlocks.find(type => type == block.typeId) != undefined 
    || WoodBlocks.find(type => type == block.typeId) != undefined
    || StrippedWoodBlocks.find(type => type == block.typeId) != undefined) {

        block.dimension.setBlockType(block.location, "kurokumaft:charcoal_block");
        block.dimension.spawnParticle("kurokumaft:mobflame_firing", {x:block.location.x+0.5,y:block.location.y,z:block.location.z+0.5});
        ItemDurabilityDamage(attackingEntity, itemStack, EquipmentSlot.Mainhand, undefined);
    }
}