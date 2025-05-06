import { Entity, EntityDamageCause, system, TicksPerSecond } from "@minecraft/server";
import { addDokkuriFireFilter, addDokkuriMizuFilter, getDistanceLocation, getLookLocationDistance } from "../common/PikuminCommonUtil";

export class ButaDokkuri {

    dokkuriFire(dokkuri: Entity) {

        const num = system.runInterval(() => {
            if (dokkuri.isValid()) {

                const distance1 = getLookLocationDistance(dokkuri.getRotation().y, 1, 0, 0.5);
                dokkuri.dimension.spawnParticle("kurokumaft:dokkuri_fire", getDistanceLocation(dokkuri.location, distance1));
                const target1 = dokkuri.dimension.getEntities(addDokkuriFireFilter(getDistanceLocation(dokkuri.location, distance1), 1.5));
                target1.forEach(en => {
                    en.applyDamage(2, {
                        cause: EntityDamageCause.fire,
                        damagingEntity: dokkuri
                    })
                });
    
                const distance2= getLookLocationDistance(dokkuri.getRotation().y, 2, 0, 0.5);
                dokkuri.dimension.spawnParticle("kurokumaft:dokkuri_fire", getDistanceLocation(dokkuri.location, distance2));
                const target2 = dokkuri.dimension.getEntities(addDokkuriFireFilter(getDistanceLocation(dokkuri.location, distance2), 1.5));
                target2.forEach(en => {
                    en.applyDamage(2, {
                        cause: EntityDamageCause.fire,
                        damagingEntity: dokkuri
                    })
                });
    
                const distance3 = getLookLocationDistance(dokkuri.getRotation().y, 3, 0, 0.5);
                dokkuri.dimension.spawnParticle("kurokumaft:dokkuri_fire", getDistanceLocation(dokkuri.location, distance3));
                const target3 = dokkuri.dimension.getEntities(addDokkuriFireFilter(getDistanceLocation(dokkuri.location, distance3), 1.5));
                target3.forEach(en => {
                    en.applyDamage(2, {
                        cause: EntityDamageCause.fire,
                        damagingEntity: dokkuri
                    })
                });
    
                const distance4 = getLookLocationDistance(dokkuri.getRotation().y, 4, 0, 0.5);
                dokkuri.dimension.spawnParticle("kurokumaft:dokkuri_fire", getDistanceLocation(dokkuri.location, distance4));
                const target4 = dokkuri.dimension.getEntities(addDokkuriFireFilter(getDistanceLocation(dokkuri.location, distance4), 1.5));
                target4.forEach(en => {
                    en.applyDamage(2, {
                        cause: EntityDamageCause.fire,
                        damagingEntity: dokkuri
                    })
                });
    
            }

        }, 5);

        system.runTimeout(() =>{
            system.clearRun(num);
        }, 2*TicksPerSecond);
    }

    kodokkuriFire(dokkuri: Entity) {

        const num = system.runInterval(() => {
            if (dokkuri.isValid()) {
                const distance1 = getLookLocationDistance(dokkuri.getRotation().y, 1, 0, 0.5);
                dokkuri.dimension.spawnParticle("kurokumaft:dokkuri_fire", getDistanceLocation(dokkuri.location, distance1));
                const target1 = dokkuri.dimension.getEntities(addDokkuriFireFilter(getDistanceLocation(dokkuri.location, distance1), 1.5));
                target1.forEach(en => {
                    en.applyDamage(1, {
                        cause: EntityDamageCause.fire,
                        damagingEntity: dokkuri
                    })
                });
    
                const distance2= getLookLocationDistance(dokkuri.getRotation().y, 2, 0, 0.5);
                dokkuri.dimension.spawnParticle("kurokumaft:dokkuri_fire", getDistanceLocation(dokkuri.location, distance2));
                const target2 = dokkuri.dimension.getEntities(addDokkuriFireFilter(getDistanceLocation(dokkuri.location, distance2), 1.5));
                target2.forEach(en => {
                    en.applyDamage(1, {
                        cause: EntityDamageCause.fire,
                        damagingEntity: dokkuri
                    })
                });
    
                const distance3 = getLookLocationDistance(dokkuri.getRotation().y, 3, 0, 0.5);
                dokkuri.dimension.spawnParticle("kurokumaft:dokkuri_fire", getDistanceLocation(dokkuri.location, distance3));
                const target3 = dokkuri.dimension.getEntities(addDokkuriFireFilter(getDistanceLocation(dokkuri.location, distance3), 1.5));
                target3.forEach(en => {
                    en.applyDamage(1, {
                        cause: EntityDamageCause.fire,
                        damagingEntity: dokkuri
                    })
                });
    
                const distance4 = getLookLocationDistance(dokkuri.getRotation().y, 4, 0, 0.5);
                dokkuri.dimension.spawnParticle("kurokumaft:dokkuri_fire", getDistanceLocation(dokkuri.location, distance4));
                const target4 = dokkuri.dimension.getEntities(addDokkuriFireFilter(getDistanceLocation(dokkuri.location, distance4), 1.5));
                target4.forEach(en => {
                    en.applyDamage(1, {
                        cause: EntityDamageCause.fire,
                        damagingEntity: dokkuri
                    })
                });
    
            }

        }, 5);

        system.runTimeout(() =>{
            system.clearRun(num);
        }, 1*TicksPerSecond);

    }

    mizudokkuriFire(dokkuri: Entity) {

        const num = system.runInterval(() => {
            if (dokkuri.isValid()) {
                const distance1 = getLookLocationDistance(dokkuri.getRotation().y, 1, 0, 0.5);
                dokkuri.dimension.spawnParticle("kurokumaft:dokkuri_mizu", getDistanceLocation(dokkuri.location, distance1));
                const target1 = dokkuri.dimension.getEntities(addDokkuriMizuFilter(getDistanceLocation(dokkuri.location, distance1), 1.5));
                target1.forEach(en => {
                    en.applyDamage(2, {
                        cause: EntityDamageCause.drowning,
                        damagingEntity: dokkuri
                    })
                });
    
                const distance2= getLookLocationDistance(dokkuri.getRotation().y, 2, 0, 0.5);
                dokkuri.dimension.spawnParticle("kurokumaft:dokkuri_mizu", getDistanceLocation(dokkuri.location, distance2));
                const target2 = dokkuri.dimension.getEntities(addDokkuriMizuFilter(getDistanceLocation(dokkuri.location, distance2), 1.5));
                target2.forEach(en => {
                    en.applyDamage(2, {
                        cause: EntityDamageCause.drowning,
                        damagingEntity: dokkuri
                    })
                });
    
                const distance3 = getLookLocationDistance(dokkuri.getRotation().y, 3, 0, 0.5);
                dokkuri.dimension.spawnParticle("kurokumaft:dokkuri_mizu", getDistanceLocation(dokkuri.location, distance3));
                const target3 = dokkuri.dimension.getEntities(addDokkuriMizuFilter(getDistanceLocation(dokkuri.location, distance3), 1.5));
                target3.forEach(en => {
                    en.applyDamage(2, {
                        cause: EntityDamageCause.drowning,
                        damagingEntity: dokkuri
                    })
                });
    
                const distance4 = getLookLocationDistance(dokkuri.getRotation().y, 4, 0, 0.5);
                dokkuri.dimension.spawnParticle("kurokumaft:dokkuri_mizu", getDistanceLocation(dokkuri.location, distance4));
                const target4 = dokkuri.dimension.getEntities(addDokkuriMizuFilter(getDistanceLocation(dokkuri.location, distance4), 1.5));
                target4.forEach(en => {
                    en.applyDamage(2, {
                        cause: EntityDamageCause.drowning,
                        damagingEntity: dokkuri
                    })
                });
    
            }

        }, 5);

        system.runTimeout(() =>{
            system.clearRun(num);
        }, 2*TicksPerSecond);
    }

    zoudokkuriFire(dokkuri: Entity) {

        const num = system.runInterval(() => {
            if (dokkuri.isValid()) {

                const distance1 = getLookLocationDistance(dokkuri.getRotation().y, 10, 0, 2.5);
                dokkuri.dimension.spawnParticle("kurokumaft:dokkuri_fire", getDistanceLocation(dokkuri.location, distance1));
                const target1 = dokkuri.dimension.getEntities(addDokkuriFireFilter(getDistanceLocation(dokkuri.location, distance1), 4));
                target1.forEach(en => {
                    en.applyDamage(3, {
                        cause: EntityDamageCause.fire,
                        damagingEntity: dokkuri
                    })
                });
    
                const distance2= getLookLocationDistance(dokkuri.getRotation().y, 12, 0, 2.5);
                dokkuri.dimension.spawnParticle("kurokumaft:dokkuri_fire", getDistanceLocation(dokkuri.location, distance2));
                const target2 = dokkuri.dimension.getEntities(addDokkuriFireFilter(getDistanceLocation(dokkuri.location, distance2), 4));
                target2.forEach(en => {
                    en.applyDamage(3, {
                        cause: EntityDamageCause.fire,
                        damagingEntity: dokkuri
                    })
                });
    
                const distance3 = getLookLocationDistance(dokkuri.getRotation().y, 14, 0, 2.5);
                dokkuri.dimension.spawnParticle("kurokumaft:dokkuri_fire", getDistanceLocation(dokkuri.location, distance3));
                const target3 = dokkuri.dimension.getEntities(addDokkuriFireFilter(getDistanceLocation(dokkuri.location, distance3), 4));
                target3.forEach(en => {
                    en.applyDamage(3, {
                        cause: EntityDamageCause.fire,
                        damagingEntity: dokkuri
                    })
                });
    
                const distance4 = getLookLocationDistance(dokkuri.getRotation().y, 16, 0, 2.5);
                dokkuri.dimension.spawnParticle("kurokumaft:dokkuri_fire", getDistanceLocation(dokkuri.location, distance4));
                const target4 = dokkuri.dimension.getEntities(addDokkuriFireFilter(getDistanceLocation(dokkuri.location, distance4), 4));
                target4.forEach(en => {
                    en.applyDamage(3, {
                        cause: EntityDamageCause.fire,
                        damagingEntity: dokkuri
                    })
                });
    
            }

        }, 5);

        system.runTimeout(() =>{
            system.clearRun(num);
        }, 2*TicksPerSecond);
    }


}