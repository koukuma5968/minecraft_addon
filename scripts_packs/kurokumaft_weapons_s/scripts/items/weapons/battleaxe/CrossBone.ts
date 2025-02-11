import { ItemCustomComponent, ItemStack, ItemComponentUseEvent, Player, EquipmentSlot } from "@minecraft/server";
import { itemDurabilityDamage } from "../../../common/WeaponsItemDurabilityDamage";
import { shooting } from "../../../common/WeaponsShooterPoints";


/**
 * クロスボーン
 */
export class CrossBone implements ItemCustomComponent {

    // チャージ完了
    onUse(event:ItemComponentUseEvent) {
        let source = event.source as Player;
        let itemStack = event.itemStack as ItemStack;
        crossBoneShot(source);
        itemDurabilityDamage(source, itemStack, EquipmentSlot.Mainhand);
    }
}

async function crossBoneShot(player:Player) {
    shooting(player, "kurokumaft:cross_bone", 0, 4, undefined);
}