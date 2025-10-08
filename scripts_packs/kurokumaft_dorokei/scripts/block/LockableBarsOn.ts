import { BlockCustomComponent, BlockComponentPlayerInteractEvent, Block, Player, BlockPermutation, BlockComponentOnPlaceEvent, CustomComponentParameters, BlockComponentPlayerBreakEvent, EntityComponentTypes, EquipmentSlot, world, system, TicksPerSecond } from "@minecraft/server";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";

type LockableBarParam = {
    "type": string
}

/**
 * 牢屋ブロック
 */
export class LockableBarsOn implements BlockCustomComponent {

    onPlace(event: BlockComponentOnPlaceEvent, arg: CustomComponentParameters) {
        const param = arg.params as LockableBarParam;
        if (param.type === "lower") {
            const block = event.block;
            const dimension = event.dimension;
            const direction = block.permutation.getState("minecraft:cardinal_direction") as string;
            dimension.setBlockPermutation(
                {x:block.location.x, y:block.location.y+1, z:block.location.z},
                BlockPermutation.resolve("kurokumaft:lockable_iron_bars_upper", 
                    {
                        "minecraft:cardinal_direction":direction,
                        "kurokumaft:lock":"locking"
                    }
                ));
        }
    };

    onPlayerBreak(event: BlockComponentPlayerBreakEvent, arg: CustomComponentParameters) {
        const param = arg.params as LockableBarParam;
        const block = event.block;
        const dimension = event.dimension;
        if (param.type === "lower") {
            dimension.setBlockType(
                {x:block.location.x, y:block.location.y+1, z:block.location.z},
                MinecraftBlockTypes.Air);
        } else {
            dimension.setBlockType(
                {x:block.location.x, y:block.location.y-1, z:block.location.z},
                MinecraftBlockTypes.Air);
        }
    };

    onPlayerInteract(event:BlockComponentPlayerInteractEvent, arg: CustomComponentParameters) {
        const player = event.player as Player;
        const equ = player.getComponent(EntityComponentTypes.Equippable);
        if (equ !== undefined) {
            const main = equ.getEquipment(EquipmentSlot.Mainhand);
            if (main !== undefined) {
                if (main.typeId === "kurokumaft:prison_cell_key") {
                    const block = event.block as Block;
                    const param = arg.params as LockableBarParam;
                    if (param.type === "upper") {
                        block.dimension.setBlockPermutation(block.location, BlockPermutation.resolve("kurokumaft:lockable_iron_bars_upper", {
                            "minecraft:cardinal_direction":block.permutation.getState("minecraft:cardinal_direction") as string,
                            "kurokumaft:lock":"open"
                        }));
                        block.dimension.setBlockPermutation({x:block.location.x, y:block.location.y-1, z:block.location.z},
                            BlockPermutation.resolve("kurokumaft:lockable_iron_bars_lower", {
                            "minecraft:cardinal_direction":block.permutation.getState("minecraft:cardinal_direction") as string,
                            "kurokumaft:lock":"open"
                        }));
                        system.waitTicks(10*TicksPerSecond).then(() => {
                            block.dimension.setBlockPermutation(block.location, BlockPermutation.resolve("kurokumaft:lockable_iron_bars_upper", {
                                "minecraft:cardinal_direction":block.permutation.getState("minecraft:cardinal_direction") as string,
                                "kurokumaft:lock":"locking"
                            }));
                            block.dimension.setBlockPermutation({x:block.location.x, y:block.location.y-1, z:block.location.z},
                                BlockPermutation.resolve("kurokumaft:lockable_iron_bars_lower", {
                                "minecraft:cardinal_direction":block.permutation.getState("minecraft:cardinal_direction") as string,
                                "kurokumaft:lock":"locking"
                            }));
                        });
                    } else {
                        block.dimension.setBlockPermutation({x:block.location.x, y:block.location.y+1, z:block.location.z},
                            BlockPermutation.resolve("kurokumaft:lockable_iron_bars_upper", {
                            "minecraft:cardinal_direction":block.permutation.getState("minecraft:cardinal_direction") as string,
                            "kurokumaft:lock":"open"
                        }));
                        block.dimension.setBlockPermutation(block.location,
                            BlockPermutation.resolve("kurokumaft:lockable_iron_bars_lower", {
                            "minecraft:cardinal_direction":block.permutation.getState("minecraft:cardinal_direction") as string,
                            "kurokumaft:lock":"open"
                        }));
                        system.waitTicks(10*TicksPerSecond).then(() => {
                            block.dimension.setBlockPermutation({x:block.location.x, y:block.location.y+1, z:block.location.z},
                                BlockPermutation.resolve("kurokumaft:lockable_iron_bars_upper", {
                                "minecraft:cardinal_direction":block.permutation.getState("minecraft:cardinal_direction") as string,
                                "kurokumaft:lock":"locking"
                            }));
                            block.dimension.setBlockPermutation(block.location,
                                BlockPermutation.resolve("kurokumaft:lockable_iron_bars_lower", {
                                "minecraft:cardinal_direction":block.permutation.getState("minecraft:cardinal_direction") as string,
                                "kurokumaft:lock":"locking"
                            }));
                        });
                    }
                    equ.setEquipment(EquipmentSlot.Mainhand, undefined);
                    const players = world.getAllPlayers();
                    players.forEach(p => {
                        if (p.getDynamicProperty("ensure")) {
                            p.setDynamicProperty("ensure", undefined);
                        }
                    })
                }
            }
        }
    }

}

