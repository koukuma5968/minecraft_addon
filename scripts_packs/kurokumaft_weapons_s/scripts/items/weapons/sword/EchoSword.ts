import { ItemCustomComponent, ItemComponentHitEntityEvent, ItemStack, Entity, world, ItemComponentUseEvent, Player, GameMode, EquipmentSlot, ItemComponentTypes, ItemCooldownComponent, ItemComponentUseOnEvent, ItemComponentCompleteUseEvent, Dimension, Vector3, Block, BlockTypes, EntityDamageCause } from "@minecraft/server";
import { ItemDurabilityDamage } from "../../../common/ItemDurabilityDamage";
import { shooting } from "../../../common/ShooterPoints";
import { getLookPoints } from "../../../common/commonUtil";
import { sweepThreeHit } from "../../../common/SweepAttack";


/**
 * 残響の剣
 */
export class EchoSword implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        let attackEntity = event.attackingEntity as Entity;
        let hitEntity = event.hitEntity as Entity;
        let itemStack = event.itemStack as ItemStack;
        sweepThreeHit(attackEntity, hitEntity, 2);
    }

    // チャージ完了
    onCompleteUse(event:ItemComponentCompleteUseEvent) {
        let source = event.source as Player;
        let itemStack = event.itemStack as ItemStack;
        sonicBullet(source);
        ItemDurabilityDamage(source, itemStack, EquipmentSlot.Mainhand, undefined);
    }
}

async function sonicBullet(player:Player) {
    shooting(player, "kurokumaft:sonic_bullet", {x:0,y:0,z:0}, 5, undefined);
    player.runCommandAsync("/titleraw @s actionbar {\"rawtext\": [{\"translate\": \"mess.kurokumaft:echo_sword.sonic_bullet\"}]}");
}