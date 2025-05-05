import { Entity, EntityComponentTypes, EntityEquippableComponent, EquipmentSlot, ItemStack, Player } from "@minecraft/server";

export class Pikumin {

    pikuminGrasp(target: Entity, player:Player) {
        const pikumin = target.typeId.split("_");
        const equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        switch(pikumin[0]) {
            case "red":
                equ.setEquipment(EquipmentSlot.Mainhand, new ItemStack("kurokumaft:red_pikmin_item", 1));
            break;
            case "blue":
                equ.setEquipment(EquipmentSlot.Mainhand, new ItemStack("kurokumaft:blue_pikmin_item", 1));
            break;
            case "yellow":
                equ.setEquipment(EquipmentSlot.Mainhand, new ItemStack("kurokumaft:yellow_pikmin_item", 1));
            break;
            case "purple":
                equ.setEquipment(EquipmentSlot.Mainhand, new ItemStack("kurokumaft:purple_pikmin_item", 1));
            case "white":
                equ.setEquipment(EquipmentSlot.Mainhand, new ItemStack("kurokumaft:white_pikmin_item", 1));
            break;
            case "rock":
                equ.setEquipment(EquipmentSlot.Mainhand, new ItemStack("kurokumaft:white_pikmin_item", 1));
            break;
            case "feather":
                equ.setEquipment(EquipmentSlot.Mainhand, new ItemStack("kurokumaft:feather_pikmin_item", 1));
            break;
        }
        target.remove();
    }
}