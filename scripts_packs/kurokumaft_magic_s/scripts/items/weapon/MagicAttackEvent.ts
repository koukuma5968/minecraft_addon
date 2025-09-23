import { EntityComponentTypes, EntityEquippableComponent, EquipmentSlot, ItemStack, Player, world } from "@minecraft/server";
import { StickWeaponMagic } from "./stick/StickWeaponMagic";
import { WandWeaponMagic } from "./wand/WandWeaponMagic";
import { RodWeaponMagic } from "./rod/RodWeaponMagic";

export class MagicAttackEvent {

    checkMagicAttack(player: Player) {

        const equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        const mainHand = equ.getEquipment(EquipmentSlot.Mainhand);

        if (mainHand !== undefined) {
            if(player.isSneaking) {
                if (mainHand.typeId.indexOf("_stick") !== -1) {
                    new StickWeaponMagic().attackSneak(player, mainHand);
                } else if (mainHand.typeId.indexOf("_wand") !== -1) {
                    new WandWeaponMagic().attackSneak(player, mainHand);
                } else if (mainHand.typeId.indexOf("_rod") !== -1) {
                    new RodWeaponMagic().attackSneak(player, mainHand);
                }
            } else {

            }
        }
    }
}

export interface ItemMagicCustomComponent {

    attackSneak(player: Player, itemStack:  ItemStack):void;
}