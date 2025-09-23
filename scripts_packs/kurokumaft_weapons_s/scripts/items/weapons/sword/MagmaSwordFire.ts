import { ItemCustomComponent, ItemComponentHitEntityEvent, ItemStack, Entity, EquipmentSlot, ItemComponentUseOnEvent, Dimension, Vector3, Block } from "@minecraft/server";
import { itemDurabilityDamage } from "../../../common/WeaponsItemDurabilityDamage";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";


/**
 * マグマソード
 */
export class MagmaSwordFire implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        const attackEntity = event.attackingEntity as Entity;
        const hitEntity = event.hitEntity as Entity;
        magmaFire(attackEntity.dimension, hitEntity.location);
    }

    // ブロック
    onUseOn(event:ItemComponentUseOnEvent) {
        const source = event.source as Entity;
        const block = event.block as Block;
        const itemStack = event.itemStack as ItemStack;
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