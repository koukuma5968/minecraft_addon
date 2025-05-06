import { Entity, EntityComponentTypes, EntityInitializationCause, EntityTypeFamilyComponent, ItemStack, system, TicksPerSecond, world } from "@minecraft/server";
import { initPikuminRegisterCustom } from "./custom/PikuminCustomComponentRegistry";
import { OniyonBase } from "./entity/OniyonBase";
import { Pikumin } from "./entity/Pikmin";
import { ButaDokkuri } from "./entity/ButaDokkuri";

// ワールド接続時
world.beforeEvents.worldInitialize.subscribe(initEvent => {
    initPikuminRegisterCustom(initEvent);
});

world.beforeEvents.playerLeave.subscribe(leaveEvent => {
    leaveEvent.player.clearDynamicProperties();
});

world.afterEvents.entityLoad.subscribe(event => {
    const entity = event.entity;
    if (entity.typeId.lastIndexOf("pikmin") != -1) {
        new Pikumin().checkExtremelyHotTime(entity);
    }
});

world.afterEvents.entityHitEntity.subscribe(event => {
    const damagingEntity = event.damagingEntity;
    const hitEntity = event.hitEntity;

    if (hitEntity.typeId == "kurokumaft:white_pikmin") {
        new Pikumin().whitePoison(damagingEntity);
    }
    if (damagingEntity.typeId == "kurokumaft:white_pikmin") {
        new Pikumin().whitePoison(hitEntity);
    }
});

world.afterEvents.dataDrivenEntityTrigger.subscribe(event => {
    const entity = event.entity;
    if (event.eventId == "kurokumaft:this_kill") {
        entity.kill();
    }
    if (event.eventId == "kurokumaft:dokkuri_breath") {
        const dokkuri = new ButaDokkuri();
        if ("kurokumaft:butadokkuri" == entity.typeId) {
            dokkuri.dokkuriFire(entity);
        } else if ("kurokumaft:kobutadokkuri" == entity.typeId) {
            dokkuri.kodokkuriFire(entity);
        } else if ("kurokumaft:mizubutadokkuri" == entity.typeId) {
            dokkuri.mizudokkuriFire(entity);
        } else if ("kurokumaft:zoubutadokkuri" == entity.typeId) {
            dokkuri.zoudokkuriFire(entity);
        }
    }
});

world.afterEvents.entitySpawn.subscribe(event => {
    const cause = event.cause;
    const entity = event.entity;
    if (entity.typeId == "kurokumaft:feather_pikmin_thrown") {
        system.runTimeout(() => {
            if (entity.isValid()) {
                entity.remove();
            }
        }, 3*TicksPerSecond);
    }
});

world.afterEvents.projectileHitEntity.subscribe(event => {

    const projectile = event.projectile as Entity;
    if (projectile.typeId.lastIndexOf("pikmin_thrown") != -1) {
        if (event.source != undefined) {
            new Pikumin().pikminThrownhit(projectile, event.getEntityHit().entity, event.source, event.location, event.dimension);
        }
    }

});

world.afterEvents.projectileHitBlock.subscribe(event => {

    const projectile = event.projectile as Entity;
    if (projectile.typeId.lastIndexOf("pikmin_thrown") != -1) {
        if (event.source != undefined) {
            new Pikumin().pikminThrownhitBlock(projectile, event.getBlockHit().block, event.source, event.location, event.dimension);
        }
    }
});

world.afterEvents.playerInteractWithEntity.subscribe(event => {

    const target = event.target as Entity;
    const itemStack = event.itemStack as ItemStack;
    if (target.typeId.lastIndexOf("oniyon_base") != -1) {
        if (itemStack != undefined && itemStack.typeId.lastIndexOf("pellet")) {
            new OniyonBase().pikuminSpawn(target, itemStack, event.player);
        }
    } else if (target.typeId.lastIndexOf("pikmin") != -1) {
        if (itemStack == undefined) {
            const familyTypes = target.getComponent(EntityComponentTypes.TypeFamily) as EntityTypeFamilyComponent;
            if (familyTypes.hasTypeFamily("pikmin_plant")) {
                new Pikumin().pikmintame(event.player, target);
            } else if (familyTypes.hasTypeFamily("pikmin")) {
                new Pikumin().pikminGrasp(target, event.player);
            }
        }
    }
});