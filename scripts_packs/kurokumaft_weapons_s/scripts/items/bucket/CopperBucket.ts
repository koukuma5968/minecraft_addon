import { ItemCustomComponent, ItemStack, Player, EquipmentSlot, ItemComponentUseOnEvent, Block, Container, Direction, EntityComponentTypes, EntityEquippableComponent, EntityInventoryComponent, world, ItemComponentHitEntityEvent, ItemComponentUseEvent, Entity, EntityTypeFamilyComponent } from "@minecraft/server";
import { MinecraftBlockTypes, MinecraftEntityTypes } from "@minecraft/vanilla-data";
import { getLookPoints } from "../../common/WeaponsCommonUtil";

/**
 * 銅のバケツ
 */
export class CopperBucket implements ItemCustomComponent {

    onUseOn(event:ItemComponentUseOnEvent) {
        let copper_bucket = event.itemStack as ItemStack;
        let player = event.source as Player;
        let block = event.block as Block;
        let blockFace = event.blockFace as Direction;
        let faceBlock;
        let blocLocation = block.location;
        if (block.typeId == MinecraftBlockTypes.Water || block.typeId == MinecraftBlockTypes.Lava) {
            faceBlock = block;
        } else if (Direction.Up == blockFace) {
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
        if (faceBlock == undefined) {
            return;
        }
        let equippable = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        let inventory = player.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
        if (faceBlock.typeId == MinecraftBlockTypes.Water && faceBlock.permutation.getState("liquid_depth") == 0) {
            let bucketWater = new ItemStack("kurokumaft:copper_bucket_water", 1);
    
            let remaining = copper_bucket.amount - 1;
            if (remaining <= 0) {
                equippable.setEquipment(EquipmentSlot.Mainhand, undefined);
                equippable.setEquipment(EquipmentSlot.Mainhand, bucketWater);
            } else {
                copper_bucket.amount -= 1;
                equippable.setEquipment(EquipmentSlot.Mainhand, copper_bucket);
                let container = inventory.container as Container;
                if (container.emptySlotsCount == 0) {
                    let point = getLookPoints(player.getRotation(),player.location,1);
                    player.dimension.spawnItem(bucketWater, point);
                } else {
                    container.addItem(bucketWater);
                }
            }
            faceBlock.dimension.setBlockType(faceBlock.location, MinecraftBlockTypes.Air);
        } else if (faceBlock.typeId == MinecraftBlockTypes.Lava && faceBlock.permutation.getState("liquid_depth") == 0) {
            let bucketLava = new ItemStack("kurokumaft:copper_bucket_lava", 1);
    
            let remaining = copper_bucket.amount - 1;
            if (remaining <= 0) {
                equippable.setEquipment(EquipmentSlot.Mainhand, undefined);
                equippable.setEquipment(EquipmentSlot.Mainhand, bucketLava);
            } else {
                copper_bucket.amount -= 1;
                equippable.setEquipment(EquipmentSlot.Mainhand, copper_bucket);
                let container = inventory.container as Container;
                if (container.emptySlotsCount == 0) {
                    let point = getLookPoints(player.getRotation(),player.location,1);
                    player.dimension.spawnItem(bucketLava, point);
                } else {
                    container.addItem(bucketLava);
                }
            }
            faceBlock.dimension.setBlockType(faceBlock.location, MinecraftBlockTypes.Air);
        }
    }

    onUse(event:ItemComponentUseEvent) {
        let source = event.source as Player;
        let itemStack = event.itemStack as ItemStack;

        let cow = source.dimension.getEntities({
            closest: 1,
            location: source.location,
            maxDistance: 3.5,
            type: MinecraftEntityTypes.Cow
        });
        if (cow != undefined && cow.length > 0) {
            let equippable = source.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
            let inventory = source.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
            let bucketMilk = new ItemStack("kurokumaft:copper_bucket_milk", 1);
    
            let remaining = itemStack.amount - 1;
            if (remaining <= 0) {
                equippable.setEquipment(EquipmentSlot.Mainhand, undefined);
                equippable.setEquipment(EquipmentSlot.Mainhand, bucketMilk);
            } else {
                itemStack.amount -= 1;
                equippable.setEquipment(EquipmentSlot.Mainhand, itemStack);
                let container = inventory.container as Container;
                if (container.emptySlotsCount == 0) {
                    let point = getLookPoints(source.getRotation(),source.location,1);
                    source.dimension.spawnItem(bucketMilk, point);
                } else {
                    container.addItem(bucketMilk);
                }
            }
    
        }
    }

}
