import { ItemCustomComponent, ItemComponentHitEntityEvent, Entity, EquipmentSlot, ItemComponentUseEvent, ItemStack, Player } from "@minecraft/server";
import { itemCoolDown } from "../../../common/commonUtil";
import { ItemDurabilityDamage } from "../../../common/ItemDurabilityDamage";
import { shooting } from "../../../common/ShooterPoints";
import { sweepHit } from "../../../common/SweepAttack";


/**
 * エンダードラゴンソード
 */
export class EnderDragonSword implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        let attackEntity = event.attackingEntity as Entity;
        let hitEntity = event.hitEntity as Entity;
        let itemStack = event.itemStack as ItemStack;
        sweepHit(attackEntity, hitEntity, 6);
    }

    onUse(event:ItemComponentUseEvent) {
        let source = event.source as Player;
        let itemStack = event.itemStack as ItemStack;
        dragonFireball(source);
        ItemDurabilityDamage(source, itemStack, EquipmentSlot.Mainhand, undefined);
        itemCoolDown(source, itemStack);
    }

}

async function dragonFireball(player:Player) {
    shooting(player, "kurokumaft:dragon_fireball_2", 0, 2, undefined);
}
