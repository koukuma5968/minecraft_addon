import { ItemCustomComponent, Player, ItemComponentConsumeEvent, EntityComponentTypes, EntityEquippableComponent, EquipmentSlot, ItemStack } from "@minecraft/server";

/**
 * 銅のバケツ
 */
export class CopperBucketMilk implements ItemCustomComponent {

    onConsume(event:ItemComponentConsumeEvent) {
        let player = event.source as Player;
        player.runCommand("/effect " + player.nameTag + " clear");

        let bucket = new ItemStack("kurokumaft:copper_bucket", 1);
        let equippable = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        equippable.setEquipment(EquipmentSlot.Mainhand, bucket);

    }
}
