import { ItemCustomComponent, ItemStack, ItemComponentUseEvent, Player, EquipmentSlot, EntityComponentTypes, EntityRidingComponent } from "@minecraft/server";
import { subtractionItem } from "../../../common/ItemDurabilityDamage";
import { shooting } from "../../../common/ShooterPoints";
import { itemCoolDown } from "../../../common/commonUtil";

/**
 * 戦車砲弾
 */
export class ShellShot implements ItemCustomComponent {

    onUse(event:ItemComponentUseEvent) {
        let source = event.source as Player;
        let itemStack = event.itemStack as ItemStack;
        shotShell(source, itemStack);
    }
}

async function shotShell(player:Player, hammer:ItemStack) {

    let raid = player.getComponent(EntityComponentTypes.Riding) as EntityRidingComponent;
    if (raid && raid.entityRidingOn.typeId == "kurokumaft:tank") {
        shooting(player, "kurokumaft:shell_entity", {x:0,y:-1,z:0}, 3, undefined);
        subtractionItem(player, hammer, EquipmentSlot.Mainhand, 1);
        itemCoolDown(player, hammer);
    }

}
