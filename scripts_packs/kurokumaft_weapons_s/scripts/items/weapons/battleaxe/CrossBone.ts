import { ItemCustomComponent, ItemStack, ItemComponentUseEvent, Player, EquipmentSlot } from "@minecraft/server";
import { ItemDurabilityDamage } from "../../../common/ItemDurabilityDamage";
import { shooting } from "../../../common/ShooterPoints";


/**
 * クロスボーン
 */
export class CrossBone implements ItemCustomComponent {

    // チャージ完了
    onUse(event:ItemComponentUseEvent) {
        let source = event.source as Player;
        let itemStack = event.itemStack as ItemStack;
        crossBoneShot(source);
        ItemDurabilityDamage(source, itemStack, EquipmentSlot.Mainhand, undefined);
    }
}

async function crossBoneShot(player:Player) {
    shooting(player, "kurokumaft:cross_bone", 0, 4, undefined);
}