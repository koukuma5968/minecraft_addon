import { EntityComponentTypes, EntityDamageCause, EntityEquippableComponent, EntityProjectileComponent, EntityQueryOptions, EquipmentSlot, ItemStack, Player, Vector3, world } from "@minecraft/server";
import { ItemDurabilityDamage } from "../../common/KimetuItemDurabilityDamage";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";
import { addProjectionFilter } from "../../common/KimetuCommonUtil";

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

    kokyuApplyDamage(player:Player, filter:EntityQueryOptions, enDamage:number, pDamage:number, itemStack:ItemStack | undefined): void {

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
        if (itemStack != undefined) {
            ItemDurabilityDamage(player, itemStack, EquipmentSlot.Mainhand);
        }
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

    projectRefrect(player:Player, volume:Vector3): boolean {

        let hit = false;
        const projfilter = addProjectionFilter(0, volume, 4.5);

        const projectiles = player.dimension.getEntities(projfilter);
        projectiles.forEach(projectile => {
            projectile.clearVelocity();
            const projComp = projectile.getComponent(EntityComponentTypes.Projectile) as EntityProjectileComponent;
            if (projComp != undefined) {
                projComp.shoot(projectile.getViewDirection(), {
                    uncertainty: 0
                });
                hit = true;
            }
        });

        return hit;
    }
}
