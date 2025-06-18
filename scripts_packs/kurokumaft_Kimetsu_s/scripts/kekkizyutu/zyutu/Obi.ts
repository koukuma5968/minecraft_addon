import { Entity, Player, system } from "@minecraft/server";
import { ZytuComonClass } from "./ZytuComonClass";
import { getLookLocationDistancePitch, getDistanceLocation, addOrgeFilter, getLookLocationDistance, getDirectionVector } from "../../common/KimetuCommonUtil";
import { shooting } from "../../common/ShooterEvent";

export class Obi extends ZytuComonClass {

    /**
     * 薙ぎ払い
     */
    yokonagi(entity:Entity) {

        const distance = getLookLocationDistancePitch(entity.getRotation(), 5, 0);
        const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 6, entity.id);
        this.kokyuApplyDamage(entity, filter, 4, 2);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },6);

    }

    /**
     * 連撃
     */
    barrage(entity:Entity) {

        const num = system.runInterval(() => {
            const distance = getLookLocationDistancePitch(entity.getRotation(), 5, 0);
            const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 5, entity.id);
            this.kokyuApplyDamage(entity, filter, 2, 1);

        },2);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },40);

    }

    /**
     * 帯飛ばし
     */
    shot(entity:Entity) {

        const obi = shooting(entity, "kurokumaft:obi", 0, 3, undefined);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },5);

        let targethoming = false;

        const serchNum = system.runInterval(() => {

            if (entity == undefined) {
                return;
            }

            if (obi != undefined && !targethoming) {
                obi.addTag(obi.id);
                entity.addTag(entity.id);
                const targets = entity.dimension.getEntities({
                    excludeFamilies: [
                        "inanimate", "animal", "obi"
                    ],
                    excludeTypes: [
                        "item"
                    ],
                    excludeTags: [
                        entity.id,
                        obi.id
                    ],
                    location: obi.location,
                    closest: 1,
                    maxDistance: 32
                });
                entity.removeTag(entity.id);
                if (targets.length > 0) {
                    targethoming = true;
                    targets[0].addTag("hitObiTarget:"+ obi.id);
        
                    const num = system.runInterval(() =>{
                        if (entity != undefined) {
                            const hittargets = entity.dimension.getEntities({
                                excludeFamilies: [
                                    "inanimate", "animal", "obi"
                                ],
                                excludeTypes: [
                                    "item"
                                ],
                                tags: [
                                    "hitObiTarget:"+ obi.id
                                ],
                                location: obi.location,
                                closest: 1
                            });
                            if (hittargets.length > 0) {
                                const target = hittargets[0];
                                const targetLoc = getDirectionVector(obi.location, target.location);
                                const tpLoc = {
                                    x:obi.location.x+targetLoc.x,
                                    y:obi.location.y+targetLoc.y+1,
                                    z:obi.location.z+targetLoc.z
                                }
                                obi.teleport(tpLoc, {
                                    checkForBlocks: false,
                                    keepVelocity: true
                                });
                                obi.applyImpulse(targetLoc);
                            } else {
                                if (obi.isValid()) {
                                    system.clearRun(num);
                                    obi.setDynamicProperty("hormingNum");
                                    obi.remove();
                                }
                            }
                        }
           
                    }, 2);
                    obi.setDynamicProperty("hormingNum", num);
                    obi.setDynamicProperty("hitCount", 0);
                }
            }
    
        }, 4);

        system.runTimeout(() => {
            if (obi.isValid()) {
                system.clearRun(serchNum);
                obi.remove();
            }
        }, 100);

    }

    /**
     * 八重帯斬り
     */
    yaeobigiri(entity:Entity) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_obi4.value"}]});
        }
        const distance = getLookLocationDistance(entity.getRotation().y, 8, 0, 2);
        const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 10, entity.id);
        this.kokyuApplyDamage(entity, filter, 6, 3);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },6);

    }

}
