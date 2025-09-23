import { ItemCustomComponent, ItemStack, ItemComponentUseEvent, Player, EquipmentSlot, EntityComponentTypes, EntityRidingComponent } from "@minecraft/server";
import { subtractionItem } from "../../../common/WeaponsItemDurabilityDamage";
import { shooting } from "../../../common/WeaponsShooterPoints";
import { itemCoolDown } from "../../../common/WeaponsCommonUtil";

/**
 * 戦車砲弾
 */
export class BaristaShot implements ItemCustomComponent {

    onUse(event:ItemComponentUseEvent) {
        const source = event.source as Player;
        const itemStack = event.itemStack as ItemStack;
        baristaArrow(source, itemStack);
    }
}

async function baristaArrow(player:Player, hammer:ItemStack) {

    const raid = player.getComponent(EntityComponentTypes.Riding) as EntityRidingComponent;
    if (raid && raid.entityRidingOn.typeId === "kurokumaft:barista") {
        shooting(player, "kurokumaft:barista_arrow", 0, 3, "kurokumaft:center_arrow");
        shooting(player, "kurokumaft:barista_arrow", 0, 3, "kurokumaft:left_arrow");
        shooting(player, "kurokumaft:barista_arrow", 0, 3, "kurokumaft:right_arrow");

        subtractionItem(player, hammer, EquipmentSlot.Mainhand, 1);
        itemCoolDown(player, hammer);
    }

}
