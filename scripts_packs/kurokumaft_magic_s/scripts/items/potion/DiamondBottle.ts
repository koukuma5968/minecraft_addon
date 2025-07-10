import { Block, Container, Direction, EntityComponentTypes, EntityEquippableComponent, EntityInventoryComponent, EquipmentSlot, ItemComponentUseOnEvent, ItemCustomComponent, ItemStack, Player, world } from "@minecraft/server";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";
import { getLookPoints } from "../../common/MagicCommonUtil";

/**
 * ダイヤモンドの瓶
 */
export class DiamondBottle implements ItemCustomComponent {

    onUseOn(event:ItemComponentUseOnEvent) {
        const bottle = event.itemStack as ItemStack;
        const player = event.source as Player;
        const block = event.block as Block;
        if (block.typeId != MinecraftBlockTypes.Water) {
            const blockFace = event.blockFace as Direction;
            let faceBlock;
            const blocLocation = block.location;
            if (Direction.Up == blockFace) {
                faceBlock = player.dimension.getBlock({x:blocLocation.x,y:blocLocation.y+1,z:blocLocation.z}) as Block;
            } else if (Direction.Down == blockFace) {
                faceBlock = player.dimension.getBlock({x:blocLocation.x,y:blocLocation.y-1,z:blocLocation.z}) as Block;
            } else if (Direction.East == blockFace) {
                faceBlock = player.dimension.getBlock({x:blocLocation.x+1,y:blocLocation.y,z:blocLocation.z}) as Block;
            } else if (Direction.West == blockFace) {
                faceBlock = player.dimension.getBlock({x:blocLocation.x-1,y:blocLocation.y,z:blocLocation.z}) as Block;
            } else if (Direction.North == blockFace) {
                faceBlock = player.dimension.getBlock({x:blocLocation.x,y:blocLocation.y,z:blocLocation.z-1}) as Block;
            } else if (Direction.South == blockFace) {
                faceBlock = player.dimension.getBlock({x:blocLocation.x,y:blocLocation.y,z:blocLocation.z+1}) as Block;
            }
            if (faceBlock == undefined || faceBlock.typeId != MinecraftBlockTypes.Water) {
                return;
            }
        }

        const equippable = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        const inventory = player.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
        const waterBottle = new ItemStack("kurokumaft:diamond_bottle_water", 1);

        const remaining = bottle.amount - 1;
        if (remaining <= 0) {
            equippable.setEquipment(EquipmentSlot.Mainhand, undefined);
            equippable.setEquipment(EquipmentSlot.Mainhand, waterBottle);
        } else {
            bottle.amount -= 1;
            equippable.setEquipment(EquipmentSlot.Mainhand, bottle);
            const container = inventory.container as Container;
            if (container.emptySlotsCount == 0) {
                const point = getLookPoints(player.getRotation(),player.location,1);
                player.dimension.spawnItem(waterBottle, point);
            } else {
                container.addItem(waterBottle);
            }
        
        }
    }

}