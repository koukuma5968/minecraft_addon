import { EntityComponentTypes, EntityDamageCause, EntityEquippableComponent, EntityQueryOptions, EquipmentSlot, Player, world } from "@minecraft/server";

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

    kokyuApplyDamage(player:Player, filter:EntityQueryOptions, enDamage:number, pDamage:number): void {

        let targets = player.dimension.getEntities(filter);
        targets.forEach(en => {
            if (en instanceof Player) {
                if (this.gardCheck(en)) {
                    en.applyDamage(pDamage, {
                        cause: EntityDamageCause.entityAttack,
                        damagingEntity: player
                    });
                }
            } else {
                en.applyDamage(enDamage, {
                    cause: EntityDamageCause.entityAttack,
                    damagingEntity: player
                });
            }
        });

    }
}
