import { ItemCustomComponent, ItemComponentHitEntityEvent, ItemStack, Entity, ItemComponentUseEvent, Player, EquipmentSlot } from "@minecraft/server";
import { itemDurabilityDamage } from "../../../common/WeaponsItemDurabilityDamage";
import { shooting } from "../../../common/WeaponsShooterPoints";
import { itemCoolDown } from "../../../common/WeaponsCommonUtil";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";
import { sweepThreeHit } from "../../../common/WeaponsSweepAttack";


/**
 * 呪いの剣
 */
export class WitherSword implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        const attackEntity = event.attackingEntity as Entity;
        const hitEntity = event.hitEntity as Entity;
        const itemStack = event.itemStack as ItemStack;
        sweepThreeHit(attackEntity, hitEntity, 3);
        witherSwordEffect(attackEntity, hitEntity);
    }

    // チャージ完了
    onUse(event:ItemComponentUseEvent) {
        const source = event.source as Player;
        const itemStack = event.itemStack as ItemStack;
        witherSkull(source);
        itemDurabilityDamage(source, itemStack, EquipmentSlot.Mainhand);
        itemCoolDown(source, itemStack);
    }
}

async function witherSwordEffect(attackEntity:Entity, hitEntity:Entity) {
    attackEntity.addTag("witherSword");
    const dim = attackEntity.dimension;

    const targetEn = dim.getEntities({
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
    shooting(player, "kurokumaft:wither_skull_dangerous_2", 0, 0.5, "kurokumaft:blast_1");
    shooting(player, "kurokumaft:wither_skull_dangerous_2", 0, 0.5, "kurokumaft:blast_2");
    shooting(player, "kurokumaft:wither_skull_dangerous_2", 0, 0.5, "kurokumaft:blast_3");
}