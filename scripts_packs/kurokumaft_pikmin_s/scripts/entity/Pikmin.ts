import { Block, Dimension, Entity, EntityComponentTypes, EntityDamageCause, EntityEquippableComponent, EntityProjectileComponent, EntityTameableComponent, EquipmentSlot, ItemStack, Player, system, TicksPerSecond, Vector3 } from "@minecraft/server";
import { addTargetFilter } from "../common/PikuminCommonUtil";
import { MinecraftBlockTypes, MinecraftEffectTypes } from "@minecraft/vanilla-data";

export class Pikumin {

    checkExtremelyHotTime(pikmin: Entity) {
        if (pikmin.isValid()) {
            const mode = pikmin.getProperty("kurokumaft:mode") as string;
            if (mode == "nomal") {
                return;
            }

            pikmin.triggerEvent("kurokumaft:extremely_hot_up");

            pikmin.dimension.spawnParticle("kurokumaft:extremely_hot_emitter", pikmin.location);
            const num = system.runInterval(() => {
                if (pikmin.isValid()) {
                    const splay_timer = pikmin.getProperty("kurokumaft:splay_timer") as number;
                    if (splay_timer != 0) {
                        pikmin.setProperty("kurokumaft:splay_timer", splay_timer-1);
                        pikmin.dimension.spawnParticle("kurokumaft:extremely_hot_emitter", pikmin.location);
                    }
                }
            }, TicksPerSecond);

            const splay_timer = pikmin.getProperty("kurokumaft:splay_timer") as number;
            system.runTimeout(() => {
                if (pikmin.isValid()) {
                    pikmin.setProperty("kurokumaft:mode", "nomal");
                    pikmin.setProperty("kurokumaft:splay_timer", 60);
                    pikmin.triggerEvent("kurokumaft:extremely_hot_down");
                }
                system.clearRun(num);
            }, splay_timer*TicksPerSecond);
        }
    };

    pikminGrasp(target: Entity, player:Player) {
        const pikumin = target.typeId.split(":")[1].split("_");
        const equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        switch(pikumin[0]) {
            case "red":
                equ.setEquipment(EquipmentSlot.Mainhand, new ItemStack("kurokumaft:red_pikmin_item", 1));
            break;
            case "blue":
                equ.setEquipment(EquipmentSlot.Mainhand, new ItemStack("kurokumaft:blue_pikmin_item", 1));
            break;
            case "yellow":
                equ.setEquipment(EquipmentSlot.Mainhand, new ItemStack("kurokumaft:yellow_pikmin_item", 1));
            break;
            case "purple":
                equ.setEquipment(EquipmentSlot.Mainhand, new ItemStack("kurokumaft:purple_pikmin_item", 1));
            break;
            case "white":
                equ.setEquipment(EquipmentSlot.Mainhand, new ItemStack("kurokumaft:white_pikmin_item", 1));
            break;
            case "rock":
                equ.setEquipment(EquipmentSlot.Mainhand, new ItemStack("kurokumaft:rock_pikmin_item", 1));
            break;
            case "feather":
                equ.setEquipment(EquipmentSlot.Mainhand, new ItemStack("kurokumaft:feather_pikmin_item", 1));
            break;
        }
        target.remove();
    }

    pikmintame(player:Player, pikmin:Entity) {

        const tameable = pikmin.getComponent(EntityComponentTypes.Tameable) as EntityTameableComponent;
        if (!tameable.isTamed) {
            tameable.tame(player);
            pikmin.triggerEvent("kurokumaft:pikmin_pull_up");
        }
    }

    pikminThrownhit(projectile:Entity ,target: Entity | undefined, source: Entity, location: Vector3, dimension:Dimension) {
        const pikumin = projectile.typeId.split(":")[1].split("_");
        source.addTag(source.id);
        switch(pikumin[0]) {
            case "red":
                const redTargets = dimension.getEntities(addTargetFilter(0, location, 6, source.id));
                redTargets.forEach(en => {
                    dimension.spawnParticle("minecraft:mobflame_single", en.location);
                    en.applyDamage(6, {
                        cause: EntityDamageCause.fire,
                        damagingEntity: source
                    })
                });
                if (projectile.isValid()) {
                    projectile.remove();
                }
            break;
            case "blue":
                const blueTargets = dimension.getEntities(addTargetFilter(0, location, 6, source.id));
                blueTargets.forEach(en => {
                    dimension.spawnParticle("minecraft:bubble_column_up_particle", en.location);
                    en.addEffect(MinecraftEffectTypes.Weakness, 10*TicksPerSecond, {
                        amplifier: 10,
                        showParticles: false
                    });
                    en.applyDamage(6, {
                        cause: EntityDamageCause.drowning,
                        damagingEntity: source
                    })
                })
                if (projectile.isValid()) {
                    projectile.remove();
                }
            break;
            case "yellow":
                const yellowTargets = dimension.getEntities(addTargetFilter(0, location, 6, source.id));
                yellowTargets.forEach(en => {
                    dimension.spawnParticle("minecraft:yellow_lightning", en.location);
                    en.applyDamage(6, {
                        cause: EntityDamageCause.lightning,
                        damagingEntity: source
                    })
                })
                if (projectile.isValid()) {
                    projectile.remove();
                }
            break;
            case "purple":
                if (projectile.isValid()) {
                    const shock = dimension.spawnEntity("kurokumaft:purple_shock", location);
                    const projeComp = shock.getComponent(EntityComponentTypes.Projectile) as EntityProjectileComponent;
                    projeComp.owner = source;
                    projectile.remove();
                }
            break;
            case "white":
                if (target != undefined) {
                    target.addEffect(MinecraftEffectTypes.Poison, 10*TicksPerSecond, {
                        amplifier: 10,
                        showParticles: false
                    });
                }
                if (projectile.isValid()) {
                    projectile.remove();
                }
            break;
            case "rock":
                if (target != undefined) {
                    target.applyKnockback(-Math.round(location.x-target.getViewDirection().x),-Math.round(location.z-target.getViewDirection().z),6,1);
                    target.addEffect(MinecraftEffectTypes.Nausea, 5*TicksPerSecond, {
                        amplifier: 5,
                        showParticles: false
                    });
                }
                if (projectile.isValid()) {
                    projectile.remove();
                }
            break;
            case "feather":
                if (target != undefined) {
                    target.addEffect(MinecraftEffectTypes.Levitation, 5*TicksPerSecond, {
                        amplifier: 5,
                        showParticles: false
                    });
                }
            break;
        }
        source.addTag(source.id);

    }

    pikminThrownhitBlock(projectile:Entity ,block: Block | undefined, source: Entity, location: Vector3, dimension:Dimension) {
        const pikumin = projectile.typeId.split(":")[1].split("_");
        source.addTag(source.id);
        switch(pikumin[0]) {
            case "red":
                if (projectile.isValid()) {
                    const red = dimension.spawnEntity("kurokumaft:red_pikmin", location);
                    red.triggerEvent("kurokumaft:oniyon_spawned");
                    red.triggerEvent("kurokumaft:pikmin_pull_up");
                    projectile.remove();
                }
            break;
            case "blue":
                if (projectile.isValid()) {
                    const blue = dimension.spawnEntity("kurokumaft:blue_pikmin", location);
                    blue.triggerEvent("kurokumaft:oniyon_spawned");
                    blue.triggerEvent("kurokumaft:pikmin_pull_up");
                    projectile.remove();
                }
            break;
            case "yellow":
                if (projectile.isValid()) {
                    const yellow = dimension.spawnEntity("kurokumaft:yellow_pikmin", location);
                    yellow.triggerEvent("kurokumaft:oniyon_spawned");
                    yellow.triggerEvent("kurokumaft:pikmin_pull_up");
                    projectile.remove();
                }
            break;
            case "purple":
                if (projectile.isValid()) {
                    const shock = dimension.spawnEntity("kurokumaft:purple_shock", location);
                    const projeComp = shock.getComponent(EntityComponentTypes.Projectile) as EntityProjectileComponent;
                    projeComp.owner = source;

                    const purple = dimension.spawnEntity("kurokumaft:purple_pikmin", location);
                    purple.triggerEvent("kurokumaft:oniyon_spawned");
                    purple.triggerEvent("kurokumaft:pikmin_pull_up");
                    projectile.remove();
                }
            break;
            case "white":
                if (projectile.isValid()) {
                    const white = dimension.spawnEntity("kurokumaft:white_pikmin", location);
                    white.triggerEvent("kurokumaft:oniyon_spawned");
                    white.triggerEvent("kurokumaft:pikmin_pull_up");
                    projectile.remove();
                }
            break;
            case "rock":
                if (block != undefined) {
                    dimension.setBlockType(location, MinecraftBlockTypes.Air);
                    dimension.spawnItem(new ItemStack(block.typeId, 1), {x:location.x,y:location.y+1,z:location.z});
                }
                if (projectile.isValid()) {
                    const rock = dimension.spawnEntity("kurokumaft:rock_pikmin", location);
                    rock.triggerEvent("kurokumaft:oniyon_spawned");
                    rock.triggerEvent("kurokumaft:pikmin_pull_up");
                    projectile.remove();
                }
            break;
            case "feather":
                if (projectile.isValid()) {
                    const feather = dimension.spawnEntity("kurokumaft:feather_pikmin", location);
                    feather.triggerEvent("kurokumaft:oniyon_spawned");
                    feather.triggerEvent("kurokumaft:pikmin_pull_up");
                    projectile.remove();
                }
            break;
        }
        source.addTag(source.id);

    }

    whitePoison(target:Entity) {
        target.addEffect(MinecraftEffectTypes.Poison, 10*TicksPerSecond, {
            amplifier: 5,
            showParticles: false
        });
    }
}