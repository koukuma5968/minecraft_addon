import { EffectTypes, EntityComponentTypes, EntityDamageCause, EntityEquippableComponent, EntityQueryOptions, EquipmentSlot, ItemStack, Player, world } from "@minecraft/server";
import { ItemDurabilityDamage } from "../../common/KimetuItemDurabilityDamage";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export class KataComonClass {

    gardCheck(en: Player): boolean {

        let equ = en.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        let main = equ.getEquipment(EquipmentSlot.Mainhand);
        let off = equ.getEquipment(EquipmentSlot.Offhand);

        if (en.isSneaking && ((main != undefined && main.typeId.indexOf("shield") != -1) || (off != undefined && off.typeId.indexOf("shield") != -1))) {
            world.playSound("item.shield.block", en.location, {
                pitch: 1,
                volume: 2
            });
            return false;
        }
        return true;
    }

    kokyuApplyDamage(player:Player, filter:EntityQueryOptions, enDamage:number, pDamage:number, itemStack:ItemStack): void {

        player.addTag(player.id);
        const targets = player.dimension.getEntities(filter);
        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        targets.forEach(en => {
            if (en instanceof Player) {
                if (this.gardCheck(en)) {
                    en.applyDamage(pDamage*kaikyuNum, {
                        cause: EntityDamageCause.entityAttack,
                        damagingEntity: player
                    });
                }
            } else {
                en.applyDamage(enDamage*kaikyuNum, {
                    cause: EntityDamageCause.entityAttack,
                    damagingEntity: player
                });
            }
        });
        ItemDurabilityDamage(player, itemStack, EquipmentSlot.Mainhand);
        player.removeTag(player.id);

    }

    kokyuApplyEffect(player:Player, filter:EntityQueryOptions, duration:number, damage:number, effect:MinecraftEffectTypes): void {

        player.addTag(player.id);
        const targets = player.dimension.getEntities(filter);
        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        targets.forEach(en => {
            if (en instanceof Player) {
                if (this.gardCheck(en)) {
                    en.addEffect(effect, Math.round(duration*kaikyuNum*0.25), {
                        amplifier: Math.round(damage*kaikyuNum*0.25),
                        showParticles: true
                    });
                }
            } else {
                en.addEffect(effect, Math.round(duration*kaikyuNum*0.75), {
                    amplifier: Math.round(damage*kaikyuNum),
                    showParticles: true
                });
            }
        });
        player.removeTag(player.id);

    }

}
