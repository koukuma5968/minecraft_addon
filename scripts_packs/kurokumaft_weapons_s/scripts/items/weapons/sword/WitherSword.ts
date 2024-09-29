import { ItemCustomComponent, ItemComponentHitEntityEvent, ItemStack, Entity, world, ItemComponentUseEvent, Player, GameMode, EquipmentSlot, ItemComponentTypes, ItemCooldownComponent, ItemComponentUseOnEvent, ItemComponentCompleteUseEvent, Dimension, Vector3, Block, BlockTypes, EntityDamageCause, EffectTypes } from "@minecraft/server";
import { ItemDurabilityDamage } from "../../../common/ItemDurabilityDamage";
import { shooting } from "../../../common/ShooterPoints";
import { getLookPoints, getLookRotaionPoints, itemCoolDown } from "../../../common/commonUtil";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";
import { sweepThreeHit } from "../../../common/SweepAttack";


/**
 * 呪いの剣
 */
export class WitherSword implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        let attackEntity = event.attackingEntity as Entity;
        let hitEntity = event.hitEntity as Entity;
        let itemStack = event.itemStack as ItemStack;
        sweepThreeHit(attackEntity, hitEntity, 3);
        witherSwordEffect(attackEntity, hitEntity);
    }

    // チャージ完了
    onUse(event:ItemComponentUseEvent) {
        let source = event.source as Player;
        let itemStack = event.itemStack as ItemStack;
        witherSkull(source);
        ItemDurabilityDamage(source, itemStack, EquipmentSlot.Mainhand, undefined);
        itemCoolDown(source, itemStack);
    }
}

async function witherSwordEffect(attackEntity:Entity, hitEntity:Entity) {
    attackEntity.addTag("witherSword");
    let dim = attackEntity.dimension;

    let targetEn = dim.getEntities({
        excludeTags: [
            "witherSword"
        ],
        excludeFamilies: [
            "inanimate"
        ],
        excludeTypes: [
            "item"
        ],
        location: hitEntity.location,
        maxDistance: 1.75
    })

    targetEn.forEach(en => {
        en.addEffect(MinecraftEffectTypes.Wither, 10, {
            amplifier: 3
        })
    });

    attackEntity.removeTag("witherSword");
}

async function witherSkull(player:Player) {
    let center = getLookRotaionPoints(player.getRotation(), 1.5, 0);
    shooting(player, "kurokumaft:wither_skull_dangerous_2<kurokumaft:blast_1>", {x:center.x,y:1,z:center.z}, 0.5, undefined);
    let left = getLookRotaionPoints(player.getRotation(), 1.5, 1.5);
    shooting(player, "kurokumaft:wither_skull_dangerous_2<kurokumaft:blast_2>", {x:left.x,y:0,z:left.z}, 0.5, undefined);
    let right = getLookRotaionPoints(player.getRotation(), 1.5, -1.5);
    shooting(player, "kurokumaft:wither_skull_dangerous_2<kurokumaft:blast_3>", {x:right.x,y:0,z:right.z}, 0.5, undefined);
}