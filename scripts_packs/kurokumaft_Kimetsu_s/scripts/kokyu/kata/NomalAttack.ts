import { ItemStack, Entity, Player } from "@minecraft/server";
import { addRegimentalFilter, getDistanceLocation, getLookLocationDistance } from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { ItemDurabilityDamage } from "../../common/KimetuItemDurabilityDamage";

export class NomalAttack extends KataComonClass {

    oneAttack(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }

        const distance = getLookLocationDistance(entity.getRotation().y, 1.5, 0, 0.5);
        const disLocation = getDistanceLocation(entity.location, distance);
        const filter = addRegimentalFilter(0, disLocation, 3, entity);

        this.kokyuApplyDamage(entity, filter, 0);

    }

}
