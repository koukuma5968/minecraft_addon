import { EntityDamageCause, EntityQueryOptions, Entity, Player } from "@minecraft/server";
import { KataComonClass } from "../../kokyu/kata/KataComonClass";

export class ZytuComonClass extends KataComonClass {

    kokyuApplyDamage(entity:Entity, filter:EntityQueryOptions, enDamage:number, pDamage:number): void {

        entity.addTag(entity.id);
        const targets = entity.dimension.getEntities(filter);
        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        targets.forEach(en => {
            if (en instanceof Player) {
                if (this.gardCheck(en)) {
                    en.applyDamage(pDamage*kaikyuNum, {
                        cause: EntityDamageCause.entityAttack,
                        damagingEntity: entity
                    });
                }
            } else {
                en.applyDamage(enDamage*kaikyuNum, {
                    cause: EntityDamageCause.entityAttack,
                    damagingEntity: entity
                });
            }
        });
        entity.removeTag(entity.id);

    }
}
