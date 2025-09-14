import { Entity, Player, system } from "@minecraft/server";
import { ZytuComonClass } from "./ZytuComonClass";
import { getLookLocationDistancePitch, getDistanceLocation, addOrgeFilter, getLookLocationDistance, getDirectionVector } from "../../common/KimetuCommonUtil";
import { shooting } from "../../common/ShooterEvent";

export class Obi extends ZytuComonClass {

    /**
     * 薙ぎ払い
     */
    yokonagi(entity:Entity) {

        try {
            const distance = getLookLocationDistancePitch(entity.getRotation(), 5, 0);
            const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 6, entity.id);
            this.zyutuApplyDamage(entity, filter, 5);

            system.waitTicks(6).then(() => {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            }).catch((error: any) => {
            }).finally(() => {
            });
        } catch (error: any) {
        }

    }

    /**
     * 連撃
     */
    barrage(entity:Entity) {

        try {
            const num = system.runInterval(() => {

                try {
                    const distance = getLookLocationDistancePitch(entity.getRotation(), 5, 0);
                    const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 5, entity.id);
                    this.zyutuApplyDamage(entity, filter, 3);
                } catch (error: any) {
                    system.clearRun(num);
                }

            },2);

            system.waitTicks(40).then(() => {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            }).catch((error: any) => {
            }).finally(() => {
                system.clearRun(num);
            });
        } catch (error: any) {
        }

    }

    /**
     * 帯飛ばし
     */
    shot(entity:Entity) {

        try {

            const obi = shooting(entity, "kurokumaft:obi", 0, 3, undefined);

            let targethoming = false;

            const serchNum = system.runInterval(() => {

                try {
                    if (entity === undefined) {
                        return;
                    }

                    if (obi !== undefined && !targethoming) {
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
                
                            const num = system.runInterval(() => {
                                try {
                                    if (entity !== undefined) {
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
                                            if (obi.isValid) {
                                                system.clearRun(num);
                                                obi.setDynamicProperty("hormingNum");
                                                obi.remove();
                                            }
                                        }
                                    }
                                } catch (error: any) {
                                    system.clearRun(num);
                                }
                            }, 2);
                            obi.setDynamicProperty("hormingNum", num);
                            obi.setDynamicProperty("hitCount", 0);
                        }
                    }
                } catch (error: any) {
                    system.clearRun(serchNum);
                }
        
            }, 4);

            system.waitTicks(5).then(() => {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            }).catch((error: any) => {
            }).finally(() => {
            });

            system.waitTicks(100).then(() => {
                if (obi.isValid) {
                    system.clearRun(serchNum);
                    obi.remove();
                }
            }).catch((error: any) => {
            }).finally(() => {
            });

        } catch (error: any) {
        }
    }

    /**
     * 八重帯斬り
     */
    yaeobigiri(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_obi4.value"}]});
            }
            const distance = getLookLocationDistance(entity.getRotation().y, 8, 0, 2);
            const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 10, entity.id);
            this.zyutuApplyDamage(entity, filter, 10);

            system.waitTicks(6).then(() => {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            }).catch((error: any) => {
            }).finally(() => {
            });

        } catch (error: any) {
        }
    }

}
