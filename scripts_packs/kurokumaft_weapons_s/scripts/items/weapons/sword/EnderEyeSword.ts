import { ItemCustomComponent, ItemComponentHitEntityEvent, ItemStack, Entity, ItemComponentUseEvent, Player, EquipmentSlot, EntityHealthComponent, EntityComponentTypes, TicksPerSecond } from "@minecraft/server";
import { itemDurabilityDamage } from "../../../common/ItemDurabilityDamage";
import { getLookPoints, getRandomInRange, itemCoolDown } from "../../../common/commonUtil";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";


/**
 * 邪眼の剣
 */
export class EnderEyeSword implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        let attackEntity = event.attackingEntity as Entity;
        let hitEntity = event.hitEntity as Entity;
        evilTeleport(attackEntity, hitEntity);
    }

    onUse(event:ItemComponentUseEvent) {
        let source = event.source as Player;
        let itemStack = event.itemStack as ItemStack;
        evilEye(source);
        itemDurabilityDamage(source, itemStack, EquipmentSlot.Mainhand);
        itemCoolDown(source, itemStack);
    }
}

async function evilTeleport(attackEntity:Entity, hitEntity:Entity) {

    let look = getLookPoints(attackEntity.getRotation(), attackEntity.location, 6);

    let xraun = getRandomInRange(-5,5);
    let yraun = getRandomInRange(0,5);
    let zraun = getRandomInRange(-5,5);

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

    let health = player.getComponent(EntityComponentTypes.Health) as EntityHealthComponent;
    let zan = health.currentValue/2;
    if (health.currentValue != 1) {
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