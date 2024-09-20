import { ItemCustomComponent, ItemComponentHitEntityEvent, ItemStack, Entity, world, ItemComponentUseEvent, Player, GameMode, EquipmentSlot, ItemComponentTypes, ItemCooldownComponent, ItemComponentUseOnEvent, ItemComponentCompleteUseEvent, Dimension, Vector3, Block, BlockTypes, EntityDamageCause } from "@minecraft/server";
import { ItemDurabilityDamage } from "../../../common/ItemDurabilityDamage";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";


/**
 * 青氷剣
 */
export class BuleSwordIce implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        let attackEntity = event.attackingEntity as Entity;
        let hitEntity = event.hitEntity as Entity;
        iceFreez(hitEntity);
    }

    // ブロック
    onUseOn(event:ItemComponentUseOnEvent) {
        let source = event.source as Entity;
        let block = event.block as Block;
        let itemStack = event.itemStack as ItemStack;
        setBlueIceBlock(source.dimension, block.location);
        ItemDurabilityDamage(source, itemStack, EquipmentSlot.Mainhand, undefined);
    }
}

async function iceFreez(hitEntity:Entity) {
    hitEntity.applyDamage(6, {
        cause: EntityDamageCause.freezing
    })
    hitEntity.dimension.setBlockType(hitEntity.location, MinecraftBlockTypes.Ice);
}

async function setBlueIceBlock(dimension:Dimension, location:Vector3) {
    dimension.setBlockType(location, MinecraftBlockTypes.BlueIce);
}