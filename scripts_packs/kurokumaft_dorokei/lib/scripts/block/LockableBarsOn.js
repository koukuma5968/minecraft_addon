import { BlockPermutation, EntityComponentTypes, EquipmentSlot, world, system, TicksPerSecond } from "@minecraft/server";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";
/**
 * 牢屋ブロック
 */
export class LockableBarsOn {
    onPlace(event, arg) {
        const param = arg.params;
        if (param.type === "lower") {
            const block = event.block;
            const dimension = event.dimension;
            const direction = block.permutation.getState("minecraft:cardinal_direction");
            dimension.setBlockPermutation({ x: block.location.x, y: block.location.y + 1, z: block.location.z }, BlockPermutation.resolve("kurokumaft:lockable_iron_bars_upper", {
                "minecraft:cardinal_direction": direction,
                "kurokumaft:lock": "locking"
            }));
        }
    }
    ;
    onPlayerBreak(event, arg) {
        const param = arg.params;
        const block = event.block;
        const dimension = event.dimension;
        if (param.type === "lower") {
            dimension.setBlockType({ x: block.location.x, y: block.location.y + 1, z: block.location.z }, MinecraftBlockTypes.Air);
        }
        else {
            dimension.setBlockType({ x: block.location.x, y: block.location.y - 1, z: block.location.z }, MinecraftBlockTypes.Air);
        }
    }
    ;
    onPlayerInteract(event, arg) {
        const player = event.player;
        const equ = player.getComponent(EntityComponentTypes.Equippable);
        if (equ !== undefined) {
            const main = equ.getEquipment(EquipmentSlot.Mainhand);
            if (main !== undefined) {
                if (main.typeId === "kurokumaft:prison_cell_key") {
                    const block = event.block;
                    const param = arg.params;
                    if (param.type === "upper") {
                        block.dimension.setBlockPermutation(block.location, BlockPermutation.resolve("kurokumaft:lockable_iron_bars_upper", {
                            "minecraft:cardinal_direction": block.permutation.getState("minecraft:cardinal_direction"),
                            "kurokumaft:lock": "open"
                        }));
                        block.dimension.setBlockPermutation({ x: block.location.x, y: block.location.y - 1, z: block.location.z }, BlockPermutation.resolve("kurokumaft:lockable_iron_bars_lower", {
                            "minecraft:cardinal_direction": block.permutation.getState("minecraft:cardinal_direction"),
                            "kurokumaft:lock": "open"
                        }));
                        system.waitTicks(10 * TicksPerSecond).then(() => {
                            block.dimension.setBlockPermutation(block.location, BlockPermutation.resolve("kurokumaft:lockable_iron_bars_upper", {
                                "minecraft:cardinal_direction": block.permutation.getState("minecraft:cardinal_direction"),
                                "kurokumaft:lock": "locking"
                            }));
                            block.dimension.setBlockPermutation({ x: block.location.x, y: block.location.y - 1, z: block.location.z }, BlockPermutation.resolve("kurokumaft:lockable_iron_bars_lower", {
                                "minecraft:cardinal_direction": block.permutation.getState("minecraft:cardinal_direction"),
                                "kurokumaft:lock": "locking"
                            }));
                        });
                    }
                    else {
                        block.dimension.setBlockPermutation({ x: block.location.x, y: block.location.y + 1, z: block.location.z }, BlockPermutation.resolve("kurokumaft:lockable_iron_bars_upper", {
                            "minecraft:cardinal_direction": block.permutation.getState("minecraft:cardinal_direction"),
                            "kurokumaft:lock": "open"
                        }));
                        block.dimension.setBlockPermutation(block.location, BlockPermutation.resolve("kurokumaft:lockable_iron_bars_lower", {
                            "minecraft:cardinal_direction": block.permutation.getState("minecraft:cardinal_direction"),
                            "kurokumaft:lock": "open"
                        }));
                        system.waitTicks(10 * TicksPerSecond).then(() => {
                            block.dimension.setBlockPermutation({ x: block.location.x, y: block.location.y + 1, z: block.location.z }, BlockPermutation.resolve("kurokumaft:lockable_iron_bars_upper", {
                                "minecraft:cardinal_direction": block.permutation.getState("minecraft:cardinal_direction"),
                                "kurokumaft:lock": "locking"
                            }));
                            block.dimension.setBlockPermutation(block.location, BlockPermutation.resolve("kurokumaft:lockable_iron_bars_lower", {
                                "minecraft:cardinal_direction": block.permutation.getState("minecraft:cardinal_direction"),
                                "kurokumaft:lock": "locking"
                            }));
                        });
                    }
                    equ.setEquipment(EquipmentSlot.Mainhand, undefined);
                    const players = world.getAllPlayers();
                    players.forEach(p => {
                        if (p.getDynamicProperty("ensure")) {
                            p.setDynamicProperty("ensure", undefined);
                        }
                    });
                }
            }
        }
    }
}
//# sourceMappingURL=LockableBarsOn.js.map