import { ItemCustomComponent, ItemStack, world, ItemComponentUseEvent, Player, ItemComponentCompleteUseEvent, EntityComponentTypes, EntityInventoryComponent, Container, EquipmentSlot, EntityEquippableComponent, ItemComponentTypes, ItemEnchantableComponent } from "@minecraft/server";


/**
 * 日輪刀
 */
export class Nichirintou implements ItemCustomComponent {

    // 右クリック
    onUse(event:ItemComponentUseEvent) {
        let player = event.source as Player;
        player.setDynamicProperty("kokyu", true);
    }

}

