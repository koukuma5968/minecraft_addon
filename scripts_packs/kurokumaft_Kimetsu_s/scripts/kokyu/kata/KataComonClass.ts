import { BlockVolume, Dimension, EntityComponentTypes, EntityDamageCause, EntityEquippableComponent, EntityProjectileComponent, EntityQueryOptions, EquipmentSlot, ItemStack, ListBlockVolume, Entity, Vector3, world, Player, EntityTypeFamilyComponent } from "@minecraft/server";
import { ItemDurabilityDamage } from "../../common/KimetuItemDurabilityDamage";
import { MinecraftBlockTypes, MinecraftEffectTypes } from "@minecraft/vanilla-data";
import { addProjectionFilter, getDistanceLocation, getLookLocationDistance } from "../../common/KimetuCommonUtil";

export class KataComonClass {

    gardCheck(en: Player): boolean {

        const equ = en.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        const main = equ.getEquipment(EquipmentSlot.Mainhand);
        const off = equ.getEquipment(EquipmentSlot.Offhand);

        if (en.isSneaking && ((main != undefined && main.typeId.indexOf("shield") != -1) || (off != undefined && off.typeId.indexOf("shield") != -1))) {
            en.playSound("item.shield.block", {
                pitch: 1,
                volume: 2
            });
            return false;
        }
        if (en.isSneaking && (main != undefined && main.typeId.indexOf("nichirintou") != -1)) {
            en.playSound("break.iron", {
                pitch: 1,
                volume: 2
            });
            return false;
        }

        return true;
    }

    kokyuApplyDamage(entity:Entity, filter:EntityQueryOptions, enDamage:number, pDamage:number, itemStack:ItemStack | undefined): void {

        entity.addTag(entity.id);
        const targets = entity.dimension.getEntities(filter);

        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const damageNum = kaikyuNum == 0 ? 0.5 : kaikyuNum;
        targets.forEach(en => {
            if (en != undefined) {
                if (en instanceof Player) {
                    if (this.gardCheck(en)) {
                        en.applyDamage(pDamage*damageNum, {
                            cause: EntityDamageCause.entityAttack,
                            damagingEntity: entity
                        });
                    }
                } else {
                    en.applyDamage(enDamage*damageNum, {
                        cause: EntityDamageCause.entityAttack,
                        damagingEntity: entity
                    });
                }
            }
        });
        const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
        this.nitirintouFillBlock(
            entity.dimension,
            getDistanceLocation(entity.location, {x:distance.x-3,y:distance.y,z:distance.z-3}),
            getDistanceLocation(entity.location, {x:distance.x+3,y:distance.y+2,z:distance.z+3})
        );

        if (itemStack != undefined) {
            ItemDurabilityDamage(entity, itemStack, EquipmentSlot.Mainhand);
        }
        entity.removeTag(entity.id);

    }

    kokyuApplyKnockback(entity:Entity, filter:EntityQueryOptions, distance:Vector3, hNum:number, vNum:number): void {

        entity.addTag(entity.id);
        const targets = entity.dimension.getEntities(filter);
        targets.forEach(en => {
            en.applyKnockback(distance.x,distance.z,hNum,vNum);
        });
        entity.removeTag(entity.id);

    }

    kokyuApplyEffect(entity:Entity, filter:EntityQueryOptions, duration:number, damage:number, effect:MinecraftEffectTypes): void {

        entity.addTag(entity.id);
        const targets = entity.dimension.getEntities(filter);
        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const damageNum = kaikyuNum == 0 ? 0.5 : kaikyuNum;
        targets.forEach(en => {
            if (en instanceof Player) {
                if (this.gardCheck(en)) {
                    en.addEffect(effect, Math.round(duration*damageNum*0.25), {
                        amplifier: Math.round(damage*damageNum*0.25),
                        showParticles: true
                    });
                }
            } else {
                en.addEffect(effect, Math.round(duration*damageNum*0.75), {
                    amplifier: Math.round(damage*damageNum),
                    showParticles: true
                });
            }
        });
        entity.removeTag(entity.id);

    }

    projectRefrect(entity:Entity, volume:Vector3): boolean {

        let hit = false;
        const projfilter = addProjectionFilter(0, volume, 4.5);

        const projectiles = entity.dimension.getEntities(projfilter);
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

    nitirintouFillBlock(dimension:Dimension, from:Vector3, to:Vector3) {

        const volume = new BlockVolume(from, to);
        dimension.fillBlocks(volume, MinecraftBlockTypes.Air, {
            ignoreChunkBoundErrors: true,
            blockFilter: {
                includeTags: ['minecraft:is_sword_item_destructible']
            }
        }) as ListBlockVolume;
    
    };

}
