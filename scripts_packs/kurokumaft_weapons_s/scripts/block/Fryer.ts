import { EntityComponentTypes,ItemStack,Block, Player, EntityEquippableComponent, EquipmentSlot, BlockCustomComponent, BlockComponentPlayerInteractEvent, BlockPermutation } from "@minecraft/server";
import { MinecraftItemTypes } from "@minecraft/vanilla-data";
import { subtractionItem } from "../common/WeaponsItemDurabilityDamage";

interface FlyItems {
    item: string,
    flyItem: string
};

const FlyItems = Object.freeze([
    {
        "item": MinecraftItemTypes.Chicken,
        "flyItem": "kurokumaft:fried_chicken"
    },
    {
        "item": MinecraftItemTypes.Porkchop,
        "flyItem": "kurokumaft:pork_cutlet"
    },
    {
        "item": MinecraftItemTypes.Potato,
        "flyItem": "kurokumaft:french_fries"
    }
]);

export class Fryer implements BlockCustomComponent {

    onPlayerInteract(event:BlockComponentPlayerInteractEvent) {
        const player = event.player as Player;
        const block = event.block as Block;
        const equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        const itemStack = equ.getEquipment(EquipmentSlot.Mainhand) as ItemStack;
        if (itemStack !== undefined) {
            if (block.matches("kurokumaft:fryer",{"kurokumaft:oil_type":"empty"})) {
                setOilType(equ, itemStack, block);
            } else {
                deepFlyEat(player, equ, itemStack, block);
            }
        }
    }
}

/**
 * オイルセット
 * @param {EntityEquippableComponent} equ
 * @param {ItemStack} item
 * @param {Block} block
 */
async function setOilType(equ: EntityEquippableComponent, item: ItemStack, block: Block) {

    if (item.typeId === "kurokumaft:olive_oil") {
        equ.setEquipment(EquipmentSlot.Mainhand, new ItemStack(MinecraftItemTypes.GlassBottle, 1));
        block.setPermutation(BlockPermutation.resolve(block.typeId, { "kurokumaft:oil_count" : 0, "kurokumaft:oil_type" : "olive"}));
    }

}

/**
 * 揚げ物
 * @param {Player} player
 * @param {EntityEquippableComponent} equ
 * @param {ItemStack} item
 * @param {Block} block
 */
async function deepFlyEat(player: Player, equ: EntityEquippableComponent, item: ItemStack, block: Block) {

    const states = block.permutation.getAllStates();
    const count =  states["kurokumaft:oil_count"] as number;
    if (count < 10) {
        if (block.matches("kurokumaft:fryer",{"kurokumaft:oil_type":"olive"})) {
            const flyItem = FlyItems.find(obj => obj.item == item.typeId) as FlyItems;
            if (flyItem != undefined) {
                const fried = new ItemStack(flyItem.flyItem, 1);
                if (item.amount == 1) {
                    equ.setEquipment(EquipmentSlot.Mainhand, fried);
                } else {
                    block.dimension.spawnItem(fried, {x:block.location.x+0.5,y:block.location.y,z:block.location.z+0.5});
                    subtractionItem(player, item, EquipmentSlot.Mainhand, 1);
                }
                block.setPermutation(BlockPermutation.resolve(block.typeId, { "kurokumaft:oil_count" : count+1, "kurokumaft:oil_type":"olive"}));
                if (count+1 === 10) {
                    block.setPermutation(BlockPermutation.resolve(block.typeId, { "kurokumaft:oil_count" : 10, "kurokumaft:oil_type" : "dirty"}));
                }
            }
        }
    } else {
        if (item.typeId === MinecraftItemTypes.GlassBottle) {
            equ.setEquipment(EquipmentSlot.Mainhand, new ItemStack("kurokumaft:dirty_oil", 1));
            block.setPermutation(BlockPermutation.resolve(block.typeId, { "kurokumaft:oil_count" : 0, "kurokumaft:oil_type" : "empty"}));
        }
    }

}
