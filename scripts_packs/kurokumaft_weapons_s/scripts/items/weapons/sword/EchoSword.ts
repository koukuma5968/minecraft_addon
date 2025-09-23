import { ItemCustomComponent, ItemComponentHitEntityEvent, ItemStack, Entity, Player, EquipmentSlot, ItemComponentCompleteUseEvent } from "@minecraft/server";
import { itemDurabilityDamage } from "../../../common/WeaponsItemDurabilityDamage";
import { shooting } from "../../../common/WeaponsShooterPoints";
import { sweepThreeHit } from "../../../common/WeaponsSweepAttack";


/**
 * 残響の剣
 */
export class EchoSword implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        const attackEntity = event.attackingEntity as Entity;
        const hitEntity = event.hitEntity as Entity;
        const itemStack = event.itemStack as ItemStack;
        sweepThreeHit(attackEntity, hitEntity, 2);
    }

    // チャージ完了
    onCompleteUse(event:ItemComponentCompleteUseEvent) {
        const source = event.source as Player;
        const itemStack = event.itemStack as ItemStack;
        sonicBullet(source);
        itemDurabilityDamage(source, itemStack, EquipmentSlot.Mainhand);
    }
}

async function sonicBullet(player:Player) {
    shooting(player, "kurokumaft:sonic_bullet", 0, 5, undefined);
    player.onScreenDisplay.setActionBar({translate:"mess.kurokumaft:echo_sword.sonic_bullet"});
}