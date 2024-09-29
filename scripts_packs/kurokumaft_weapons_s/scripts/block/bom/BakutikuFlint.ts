import { BlockCustomComponent, Block, BlockComponentPlayerInteractEvent, Player, EntityComponentTypes, EquipmentSlot, EntityEquippableComponent, ItemStack, world, system } from "@minecraft/server";

/**
 * 爆竹着火
 */
export class BakutikuFlint implements BlockCustomComponent {

    onPlayerInteract(event:BlockComponentPlayerInteractEvent) {
        let player = event.player as Player;
        let equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        let itemStack = equ.getEquipment(EquipmentSlot.Mainhand) as ItemStack;
        if (itemStack != undefined && itemStack.typeId == "minecraft:flint_and_steel") {
            let block = event.block as Block;
            let flint = block.permutation.getState("kurokumaft:flint") as number;
            if (flint == 0) {
                block.setPermutation(block.permutation.withState("kurokumaft:flint", 1));
                let block_face = block.permutation.getState("minecraft:block_face") as string
                if (block_face == "up" || block_face == "down") {
                    block.dimension.spawnParticle("minecraft:basic_flame_particle", {x:block.location.x+0.5,y:block.location.y+0.5,z:block.location.z+0.5});
                } else {
                    block.dimension.spawnParticle("minecraft:basic_flame_particle", {x:block.location.x+0.5,y:block.location.y+1,z:block.location.z+0.5});
                }
            }
        }
    }
}

export function explodeBakutikuCancel(impactBLockList:Block[]): Block[] {
    let filterBlockList = impactBLockList.filter(block => {
        if (!block.matches("kurokumaft:bakutiku_block",{"kurokumaft:flint":0})) {
            return block;
        }
    });
    return filterBlockList;
}

export async function explodeBakutikuChain(impactBLockList:Block[]) {
    let filterBlockList = impactBLockList.filter(block => {
        if (block.matches("kurokumaft:bakutiku_block",{"kurokumaft:flint":0})) {
            return block;
        }
    });
    system.runTimeout(() => {
        filterBlockList.forEach(block => {
            block.setPermutation(block.permutation.withState("kurokumaft:flint", 1));
            let block_face = block.permutation.getState("minecraft:block_face") as string
            if (block_face == "up" || block_face == "down") {
                block.dimension.spawnParticle("minecraft:basic_flame_particle", {x:block.location.x+0.5,y:block.location.y+0.5,z:block.location.z+0.5});
            } else {
                block.dimension.spawnParticle("minecraft:basic_flame_particle", {x:block.location.x+0.5,y:block.location.y+1,z:block.location.z+0.5});
            }
        });
    },1);
}