import { EnchantmentSlot, Entity, EquipmentSlot, ItemStack, Player } from "@minecraft/server";
import { getRandomInRange } from "../common/PikuminCommonUtil";
import { subtractionItem } from "../common/PikuminItemDurabilityDamage";

export class OniyonBase {

    pikuminSpawn(target: Entity, itemStack: ItemStack, player:Player) {
        const oniyon = target.typeId.split(":")[1].split("_");
        const pellet = itemStack.typeId.split(":")[1].split("_");
        const location = target.location;
        switch(oniyon[0]) {
            case "red":
                if (pellet[0] == "red") {
                    target.dimension.spawnEntity("kurokumaft:red_pikmin", {x:location.x + getRandomInRange(-5, 5), y:location.y, z:location.z + getRandomInRange(-5, 5)}).triggerEvent("kurokumaft:oniyon_spawned");
                    target.dimension.spawnEntity("kurokumaft:red_pikmin", {x:location.x + getRandomInRange(-5, 5), y:location.y, z:location.z + getRandomInRange(-5, 5)}).triggerEvent("kurokumaft:oniyon_spawned");
                    target.dimension.spawnEntity("kurokumaft:red_pikmin", {x:location.x + getRandomInRange(-5, 5), y:location.y, z:location.z + getRandomInRange(-5, 5)}).triggerEvent("kurokumaft:oniyon_spawned");
                } else {
                    target.dimension.spawnEntity("kurokumaft:red_pikmin", {x:location.x + getRandomInRange(-5, 5), y:location.y, z:location.z + getRandomInRange(-5, 5)}).triggerEvent("kurokumaft:oniyon_spawned");
                }
            break;
            case "blue":
                if (pellet[0] == "blue") {
                    target.dimension.spawnEntity("kurokumaft:blue_pikmin", {x:location.x + getRandomInRange(-5, 5), y:location.y, z:location.z + getRandomInRange(-5, 5)}).triggerEvent("kurokumaft:oniyon_spawned");
                    target.dimension.spawnEntity("kurokumaft:blue_pikmin", {x:location.x + getRandomInRange(-5, 5), y:location.y, z:location.z + getRandomInRange(-5, 5)}).triggerEvent("kurokumaft:oniyon_spawned");
                    target.dimension.spawnEntity("kurokumaft:blue_pikmin", {x:location.x + getRandomInRange(-5, 5), y:location.y, z:location.z + getRandomInRange(-5, 5)}).triggerEvent("kurokumaft:oniyon_spawned");
                } else {
                    target.dimension.spawnEntity("kurokumaft:blue_pikmin", {x:location.x + getRandomInRange(-5, 5), y:location.y, z:location.z + getRandomInRange(-5, 5)}).triggerEvent("kurokumaft:oniyon_spawned");
                }
            break;
            case "yellow":
                if (pellet[0] == "yellow") {
                    target.dimension.spawnEntity("kurokumaft:yellow_pikmin", {x:location.x + getRandomInRange(-5, 5), y:location.y, z:location.z + getRandomInRange(-5, 5)}).triggerEvent("kurokumaft:oniyon_spawned");
                    target.dimension.spawnEntity("kurokumaft:yellow_pikmin", {x:location.x + getRandomInRange(-5, 5), y:location.y, z:location.z + getRandomInRange(-5, 5)}).triggerEvent("kurokumaft:oniyon_spawned");
                    target.dimension.spawnEntity("kurokumaft:yellow_pikmin", {x:location.x + getRandomInRange(-5, 5), y:location.y, z:location.z + getRandomInRange(-5, 5)}).triggerEvent("kurokumaft:oniyon_spawned");
                } else {
                    target.dimension.spawnEntity("kurokumaft:yellow_pikmin", {x:location.x + getRandomInRange(-5, 5), y:location.y, z:location.z + getRandomInRange(-5, 5)}).triggerEvent("kurokumaft:oniyon_spawned");
                }
            break;
            case "purple":
                if (pellet[0] == "purple") {
                    target.dimension.spawnEntity("kurokumaft:purple_pikmin", {x:location.x + getRandomInRange(-5, 5), y:location.y, z:location.z + getRandomInRange(-5, 5)}).triggerEvent("kurokumaft:oniyon_spawned");
                    target.dimension.spawnEntity("kurokumaft:purple_pikmin", {x:location.x + getRandomInRange(-5, 5), y:location.y, z:location.z + getRandomInRange(-5, 5)}).triggerEvent("kurokumaft:oniyon_spawned");
                    target.dimension.spawnEntity("kurokumaft:purple_pikmin", {x:location.x + getRandomInRange(-5, 5), y:location.y, z:location.z + getRandomInRange(-5, 5)}).triggerEvent("kurokumaft:oniyon_spawned");
                } else {
                    target.dimension.spawnEntity("kurokumaft:purple_pikmin", {x:location.x + getRandomInRange(-5, 5), y:location.y, z:location.z + getRandomInRange(-5, 5)}).triggerEvent("kurokumaft:oniyon_spawned");
                }
            break;
            case "white":
                if (pellet[0] == "white") {
                    target.dimension.spawnEntity("kurokumaft:white_pikmin", {x:location.x + getRandomInRange(-5, 5), y:location.y, z:location.z + getRandomInRange(-5, 5)}).triggerEvent("kurokumaft:oniyon_spawned");
                    target.dimension.spawnEntity("kurokumaft:white_pikmin", {x:location.x + getRandomInRange(-5, 5), y:location.y, z:location.z + getRandomInRange(-5, 5)}).triggerEvent("kurokumaft:oniyon_spawned");
                    target.dimension.spawnEntity("kurokumaft:white_pikmin", {x:location.x + getRandomInRange(-5, 5), y:location.y, z:location.z + getRandomInRange(-5, 5)}).triggerEvent("kurokumaft:oniyon_spawned");
                } else {
                    target.dimension.spawnEntity("kurokumaft:white_pikmin", {x:location.x + getRandomInRange(-5, 5), y:location.y, z:location.z + getRandomInRange(-5, 5)}).triggerEvent("kurokumaft:oniyon_spawned");
                }
            break;
            case "rock":
                if (pellet[0] == "rock") {
                    target.dimension.spawnEntity("kurokumaft:rock_pikmin", {x:location.x + getRandomInRange(-5, 5), y:location.y, z:location.z + getRandomInRange(-5, 5)}).triggerEvent("kurokumaft:oniyon_spawned");
                    target.dimension.spawnEntity("kurokumaft:rock_pikmin", {x:location.x + getRandomInRange(-5, 5), y:location.y, z:location.z + getRandomInRange(-5, 5)}).triggerEvent("kurokumaft:oniyon_spawned");
                    target.dimension.spawnEntity("kurokumaft:rock_pikmin", {x:location.x + getRandomInRange(-5, 5), y:location.y, z:location.z + getRandomInRange(-5, 5)}).triggerEvent("kurokumaft:oniyon_spawned");
                } else {
                    target.dimension.spawnEntity("kurokumaft:rock_pikmin", {x:location.x + getRandomInRange(-5, 5), y:location.y, z:location.z + getRandomInRange(-5, 5)}).triggerEvent("kurokumaft:oniyon_spawned");
                }
            break;
            case "feather":
                if (pellet[0] == "feather") {
                    target.dimension.spawnEntity("kurokumaft:feather_pikmin", {x:location.x + getRandomInRange(-5, 5), y:location.y, z:location.z + getRandomInRange(-5, 5)}).triggerEvent("kurokumaft:oniyon_spawned");
                    target.dimension.spawnEntity("kurokumaft:feather_pikmin", {x:location.x + getRandomInRange(-5, 5), y:location.y, z:location.z + getRandomInRange(-5, 5)}).triggerEvent("kurokumaft:oniyon_spawned");
                    target.dimension.spawnEntity("kurokumaft:feather_pikmin", {x:location.x + getRandomInRange(-5, 5), y:location.y, z:location.z + getRandomInRange(-5, 5)}).triggerEvent("kurokumaft:oniyon_spawned");
                } else {
                    target.dimension.spawnEntity("kurokumaft:feather_pikmin", {x:location.x + getRandomInRange(-5, 5), y:location.y, z:location.z + getRandomInRange(-5, 5)}).triggerEvent("kurokumaft:oniyon_spawned");
                }
            break;
        }
        subtractionItem(player, itemStack, EquipmentSlot.Mainhand, 1);
    }
}