import { ItemCustomComponent, ItemComponentHitEntityEvent, ItemStack, Entity, world, ItemComponentUseEvent, Player, GameMode, EquipmentSlot, ItemComponentTypes, ItemCooldownComponent, ItemComponentUseOnEvent, ItemComponentCompleteUseEvent, Dimension, Vector3, Block, BlockTypes } from "@minecraft/server";
import { itemDurabilityDamage } from "../../../common/WeaponsItemDurabilityDamage";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";


/**
 * マグマソード
 */
export class MagmaSwordFire implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        let attackEntity = event.attackingEntity as Entity;
        let hitEntity = event.hitEntity as Entity;
        magmaFire(attackEntity.dimension, hitEntity.location);
    }

    // ブロック
    onUseOn(event:ItemComponentUseOnEvent) {
        let source = event.source as Entity;
        let block = event.block as Block;
        let itemStack = event.itemStack as ItemStack;
        setMagmaBlock(source.dimension, block.location);
        itemDurabilityDamage(source, itemStack, EquipmentSlot.Mainhand);
    }
}

async function magmaFire(dimension:Dimension, location:Vector3) {
    dimension.spawnEntity("kurokumaft:magma_sword_entity", location);
}

async function setMagmaBlock(dimension:Dimension, location:Vector3) {
    dimension.setBlockType(location, MinecraftBlockTypes.Magma);
}