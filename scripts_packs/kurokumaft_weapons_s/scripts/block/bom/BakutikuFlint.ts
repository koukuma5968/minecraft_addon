import { BlockCustomComponent, Block, BlockComponentPlayerInteractEvent, Player, EntityComponentTypes, EquipmentSlot, EntityEquippableComponent, ItemStack, world, system, BlockPermutation } from "@minecraft/server";

/**
 * 爆竹着火
 */
export class BakutikuFlint implements BlockCustomComponent {

    onPlayerInteract(event:BlockComponentPlayerInteractEvent) {
        const player = event.player as Player;
        const equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        const itemStack = equ.getEquipment(EquipmentSlot.Mainhand) as ItemStack;
        if (itemStack != undefined && itemStack.typeId == "minecraft:flint_and_steel") {
            const block = event.block as Block;
            if (block.permutation.matches(block.typeId, {"kurokumaft:flint":1})) {
                block.setPermutation(BlockPermutation.resolve(block.typeId, { "kurokumaft:flint" : 1}));
                const block_face = block.permutation.getState("minecraft:block_face") as string
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
    const filterBlockList = impactBLockList.filter(block => {
        if (!block.matches("kurokumaft:bakutiku_block",{"kurokumaft:flint":0})) {
            return block;
        }
    });
    return filterBlockList;
}

export async function explodeBakutikuChain(impactBLockList:Block[]) {
    const filterBlockList = impactBLockList.filter(block => {
        if (block.matches("kurokumaft:bakutiku_block",{"kurokumaft:flint":0})) {
            return block;
        }
    });
    system.runTimeout(() => {
        filterBlockList.forEach(block => {
            block.setPermutation(BlockPermutation.resolve(block.typeId, { "kurokumaft:flint" : 1}));
            const block_face = block.permutation.getState("minecraft:block_face") as string
            if (block_face == "up" || block_face == "down") {
                block.dimension.spawnParticle("minecraft:basic_flame_particle", {x:block.location.x+0.5,y:block.location.y+0.5,z:block.location.z+0.5});
            } else {
                block.dimension.spawnParticle("minecraft:basic_flame_particle", {x:block.location.x+0.5,y:block.location.y+1,z:block.location.z+0.5});
            }
        });
    },1);
}