import { ItemStack, Entity, Player } from "@minecraft/server";
import { addOrgeFilter, getDistanceLocation, getLookLocationDistance } from "../../common/KimetuCommonUtil";
import { ItemDurabilityDamage } from "../../common/KimetuItemDurabilityDamage";
import { ZytuComonClass } from "./ZytuComonClass";

export class OgreNomalAttack extends ZytuComonClass {

    oneAttack(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }

        const distance = getLookLocationDistance(entity.getRotation().y, 1.5, 0, 0.5);
        const disLocation = getDistanceLocation(entity.location, distance);
        const filter = addOrgeFilter(0, disLocation, 3, entity.id);

        this.zyutuApplyDamage(entity, filter, 1);

    }

}
