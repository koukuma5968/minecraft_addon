import { ItemStack, Entity, system, Player, EntityComponentTypes, EntityTameableComponent } from "@minecraft/server";
import { ZytuComonClass } from "./ZytuComonClass";
import { getLookLocationDistancePitch, addOrgeFilter, getDistanceLocation, getLookLocationDistance, getRandomInRange, addRegimentalFilter } from "../../common/KimetuCommonUtil";
import { shooting } from "../../common/ShooterEvent";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export class Bunretu extends ZytuComonClass {

    /**
     * 超音波
     */
    ultrasonic(entity:Entity) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_kyoumei1.value"}]});
        }

        const distance = getLookLocationDistancePitch(entity.getRotation(), 3, 0);
        const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 4, entity.id);
        this.kokyuApplyEffect(entity, filter, 10, 5, MinecraftEffectTypes.Nausea);

        const ultrasonic = shooting(entity, "kurokumaft:urogi_ultrasonic", 0, 3, undefined);
        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
            if (ultrasonic != undefined && ultrasonic.id != undefined) {
                ultrasonic.remove();
            }
        },10);

    }

    /**
     * 雷
     */
    ikazuti(entity:Entity) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_ikazuti1.value"}]});
        }

        const num = system.runInterval(() => {
            const filter = addOrgeFilter(0, entity.location, 10, entity.id);
            this.kokyuApplyDamage(entity, filter, 2, 1);

            entity.dimension.spawnParticle("kurokumaft:ikazuti_particle", entity.location);

        },2);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },40);
    }

    /**
     * 激涙刺突
     */
    shitotu(entity:Entity) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_shitotu1.value"}]});
        }

        const num = system.runInterval(() => {
            const distance = getLookLocationDistancePitch(entity.getRotation(), 3, 0);
            const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 4, entity.id);
            this.kokyuApplyDamage(entity, filter, 3, 1);
        },2);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },11);

    }

    /**
     * 突風
     */
    toppu(entity:Entity) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_toppu1.value"}]});
        }

        entity.addTag(entity.id);
        const distance = getLookLocationDistance(entity.getRotation().y, 4, 0, 0);
        const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 5, entity.id);
        const targets = entity.dimension.getEntities(filter);
        targets.forEach(en => {
            en.applyKnockback(distance.x,distance.z,3,1);
        });
        entity.removeTag(entity.id);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },6);
    }

    /**
     * 石竜子
     */
    tokage(entity:Entity) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_zouhakuten1.value"}]});
        }
        entity.setProperty("kurokumaft:kokyu_use", false);
        entity.setProperty("kurokumaft:kokyu_particle", false);

        const tokage = entity.dimension.spawnEntity("kurokumaft:tuti_dragon", entity.location);

        const tameable = tokage.getComponent(EntityComponentTypes.Tameable) as EntityTameableComponent;
        if (!tameable.isTamed) {
            if (entity instanceof Player) {
                tameable.tame(entity);
            }
        }

    }
    
    /**
     * 狂鳴雷殺
     */
    kyoumeiraisatu(entity:Entity) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_zouhakuten2.value"}]});
        }
        entity.setProperty("kurokumaft:kokyu_use", false);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },6);
    }
    
    /**
     * 狂圧鳴波
     */
    kyouatumeiha(entity:Entity) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_zouhakuten3.value"}]});
        }
        entity.setProperty("kurokumaft:kokyu_use", false);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },6);
    }

    /**
     * 無間業樹
     */
    mukengouzyu(entity:Entity) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_zouhakuten4.value"}]});
        }
        entity.setProperty("kurokumaft:kokyu_use", false);

        system.runTimeout(() => {
            entity.setProperty("kurokumaft:kokyu_particle", false);
        },6);
    }

}
