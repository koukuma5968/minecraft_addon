import { ItemCustomComponent, ItemComponentHitEntityEvent, ItemStack, Entity, ItemComponentUseEvent, Player, EquipmentSlot, EntityHealthComponent, EntityComponentTypes, TicksPerSecond } from "@minecraft/server";
import { itemDurabilityDamage } from "../../../common/WeaponsItemDurabilityDamage";
import { getLookPoints, getRandomInRange, itemCoolDown } from "../../../common/WeaponsCommonUtil";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";


/**
 * 邪眼の剣
 */
export class EnderEyeSword implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        const attackEntity = event.attackingEntity as Entity;
        const hitEntity = event.hitEntity as Entity;
        evilTeleport(attackEntity, hitEntity);
    }

    onUse(event:ItemComponentUseEvent) {
        const source = event.source as Player;
        const itemStack = event.itemStack as ItemStack;
        evilEye(source);
        itemDurabilityDamage(source, itemStack, EquipmentSlot.Mainhand);
        itemCoolDown(source, itemStack);
    }
}

async function evilTeleport(attackEntity:Entity, hitEntity:Entity) {

    const look = getLookPoints(attackEntity.getRotation(), attackEntity.location, 6);

    const xraun = getRandomInRange(-5,5);
    const yraun = getRandomInRange(0,5);
    const zraun = getRandomInRange(-5,5);

    let tpLoca;
    while (true) {
        tpLoca = {x:look.x+xraun, y:look.y+yraun,z:look.z+zraun};
        if (hitEntity.tryTeleport(tpLoca, {
            checkForBlocks: true
        })) {
            break;
        }
    }
    hitEntity.teleport(tpLoca);
}

async function evilEye(player:Player) {

    const health = player.getComponent(EntityComponentTypes.Health) as EntityHealthComponent;
    const zan = health.currentValue/2;
    if (health.currentValue !== 1) {
        health.setCurrentValue(zan);
        player.addEffect(MinecraftEffectTypes.Hunger, 10*TicksPerSecond, {
            amplifier: 30-zan*5
        });
        player.addEffect(MinecraftEffectTypes.Speed, 30*TicksPerSecond, {
            amplifier: Math.ceil(zan/2)
        });
        player.addEffect(MinecraftEffectTypes.Strength, 30*TicksPerSecond, {
            amplifier: Math.ceil(zan/2)
        });
        player.addEffect(MinecraftEffectTypes.Resistance, 30*TicksPerSecond, {
            amplifier: Math.ceil(zan/2)
        });
    } else {
        player.dimension.spawnParticle("minecraft:death_explosion_emitter", player.location);
    }

}