import { BlockVolume, Entity, system, TicksPerSecond, Player } from "@minecraft/server";
import { ZytuComonClass } from "./ZytuComonClass";
import { addOrgeFilter } from "../../common/KimetuCommonUtil";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";
import { shooting } from "../../common/ShooterEvent";

export class Koushi extends ZytuComonClass {

    /**
     * 刻糸牢
     */
    kokushirou(entity:Entity) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_ito1.value"}]});
        }
        entity.setProperty("kurokumaft:kokyu_use", false);

        const filter = addOrgeFilter(0, entity.location, 8, entity.id);
        entity.addTag(entity.id);
        const targets = entity.dimension.getEntities(filter);
        entity.removeTag(entity.id);
        targets.forEach(en => {
            const volume = new BlockVolume({x:en.location.x-1,y:en.location.y,z:en.location.z-1}, {x:en.location.x+1,y:en.location.y+1,z:en.location.z+1});
            en.dimension.fillBlocks(volume, MinecraftBlockTypes.Web);
        });

        this.kokyuApplyDamage(entity, filter, 3, 1);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },20);

    }

    /**
     * 刻糸輪転
     */
    kokushirinten(entity:Entity) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_ito2.value"}]});
        }
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);

        const ito = shooting(entity, "kurokumaft:kokushirinten", 0, 3, undefined);
        system.runTimeout(() => {
            if (ito.isValid()) {
                ito.remove();
            }
        }, 2*TicksPerSecond);
    }

    /**
     * 殺目篭
     */
    ayamekago(entity:Entity) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_ito3.value"}]});
        }
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);

        const filter = addOrgeFilter(1, entity.location, 10, entity.id);
        entity.addTag(entity.id);
        const targets = entity.dimension.getEntities(filter);
        entity.removeTag(entity.id);

        if (targets.length > 0) {
            const ayamekago = targets[0].dimension.spawnEntity("kurokumaft:ayamekago", targets[0].location);

            const num = system.runInterval(() => {
                if (targets[0] != undefined && targets[0].isValid()) {
                    targets[0].teleport(ayamekago.location);
                    this.kokyuApplyDamage(entity, filter, 2, 1);
                } else {
                    system.clearRun(num);
                    if (ayamekago != undefined && ayamekago.isValid()) {
                        ayamekago.remove();
                    }
                }
            }, 2);
    
            system.runTimeout(() => {
                system.clearRun(num);
                if (ayamekago != undefined && ayamekago.isValid()) {
                    ayamekago.remove();
                }
            },40);
        }
    }

}
