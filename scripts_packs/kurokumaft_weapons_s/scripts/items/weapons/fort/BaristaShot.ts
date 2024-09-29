import { ItemCustomComponent, ItemStack, ItemComponentUseEvent, Player, EquipmentSlot, EntityComponentTypes, EntityRidingComponent } from "@minecraft/server";
import { subtractionItem } from "../../../common/ItemDurabilityDamage";
import { shooting } from "../../../common/ShooterPoints";
import { getLookRotaionPoints, itemCoolDown } from "../../../common/commonUtil";

/**
 * 戦車砲弾
 */
export class BaristaShot implements ItemCustomComponent {

    onUse(event:ItemComponentUseEvent) {
        let source = event.source as Player;
        let itemStack = event.itemStack as ItemStack;
        baristaArrow(source, itemStack);
    }
}

async function baristaArrow(player:Player, hammer:ItemStack) {

    let raid = player.getComponent(EntityComponentTypes.Riding) as EntityRidingComponent;
    if (raid && raid.entityRidingOn.typeId == "kurokumaft:barista") {
        let center = getLookRotaionPoints(player.getRotation(), 1.5, 0);
        shooting(player, "kurokumaft:barista_arrow<kurokumaft:center_arrow>", {x:center.x,y:1,z:center.z}, 3, undefined);
        let left = getLookRotaionPoints(player.getRotation(), 1.5, 1.5);
        shooting(player, "kurokumaft:barista_arrow<kurokumaft:left_arrow>", {x:left.x,y:0,z:left.z}, 3, undefined);
        let right = getLookRotaionPoints(player.getRotation(), 1.5, -1.5);
        shooting(player, "kurokumaft:barista_arrow<kurokumaft:right_arrow>", {x:right.x,y:0,z:right.z}, 3, undefined);

        subtractionItem(player, hammer, EquipmentSlot.Mainhand, 1);
        itemCoolDown(player, hammer);
    }

}
