import { ItemCustomComponent, ItemComponentHitEntityEvent, ItemStack, Entity, EquipmentSlot, ItemComponentUseOnEvent, Dimension, Vector3, Block, EntityDamageCause } from "@minecraft/server";
import { itemDurabilityDamage } from "../../../common/WeaponsItemDurabilityDamage";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";


/**
 * 青氷剣
 */
export class BuleSwordIce implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        const attackEntity = event.attackingEntity as Entity;
        const hitEntity = event.hitEntity as Entity;
        iceFreez(hitEntity);
    }

    // ブロック
    onUseOn(event:ItemComponentUseOnEvent) {
        const source = event.source as Entity;
        const block = event.block as Block;
        const itemStack = event.itemStack as ItemStack;
        setBlueIceBlock(source.dimension, block.location);
        itemDurabilityDamage(source, itemStack, EquipmentSlot.Mainhand);
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