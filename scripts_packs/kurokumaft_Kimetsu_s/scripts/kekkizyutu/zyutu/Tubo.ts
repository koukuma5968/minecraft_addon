import { Entity, system, TicksPerSecond, Player, EntityComponentTypes, EntityTameableComponent, BlockVolume, EntityProjectileComponent, EntityDamageCause } from "@minecraft/server";
import { ZytuComonClass } from "./ZytuComonClass";
import { addOrgeFilter, getDistanceLocation, getLookLocationDistance, getRandomInRange } from "../../common/KimetuCommonUtil";

export class Tubo extends ZytuComonClass {

    /**
     * 水獄鉢
     */
    suigokubati(entity:Entity) {
        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_tubo1.value"}]});
            }
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);

            const filter = addOrgeFilter(3, entity.location, 10, entity.id);
            filter.excludeFamilies?.push("sakana");
            entity.addTag(entity.id);
            const targets = entity.dimension.getEntities(filter);
            targets.forEach(en => {
                const suigokubati = en.dimension.spawnEntity("kurokumaft:suigokubati", en.location);
                this.suigokubatiHold(suigokubati, en);
            });
            entity.removeTag(entity.id);

        } catch (error: any) {
        }

    }

    async suigokubatiHold(suigokubati:Entity, target:Entity) {
        const num = system.runInterval(() => {
            try {
                if (suigokubati.isValid && target.isValid) {
                    target.teleport({x:suigokubati.location.x,y:suigokubati.location.y+0.2,z:suigokubati.location.z});
                    target.applyDamage(1, {
                        cause: EntityDamageCause.drowning,
                        damagingEntity: suigokubati
                    })
                } else {
                    if (suigokubati.isValid) {
                        suigokubati.remove();
                    }
                    system.clearRun(num);
                }
            } catch (error: any) {
                system.clearRun(num);
            }
        },2);
    }

    /**
     * 千本針魚殺
     */
    senbonbarigyosatu(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_tubo2.value"}]});
            }

            const left = getLookLocationDistance(entity.getRotation().y, 2, 2, 1);
            const gyosatu1 = entity.dimension.spawnEntity("kurokumaft:gyosatu", getDistanceLocation(entity.location, left));
            const tameable = gyosatu1.getComponent(EntityComponentTypes.Tameable) as EntityTameableComponent;
            if (!tameable.isTamed) {
                if (entity instanceof Player) {
                    tameable.tame(entity);
                }
            }

            const right = getLookLocationDistance(entity.getRotation().y, 2, -2, 1);
            const gyosatu2 = entity.dimension.spawnEntity("kurokumaft:gyosatu", getDistanceLocation(entity.location, right));
            const tameable2 = gyosatu2.getComponent(EntityComponentTypes.Tameable) as EntityTameableComponent;
            if (!tameable2.isTamed) {
                if (entity instanceof Player) {
                    tameable2.tame(entity);
                }
            }

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
     * 蛸壺地獄
     */
    takotubozigoku(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_tubo3.value"}]});
            }

            const num = system.runInterval(() => {
                try {
                    const distance = getLookLocationDistance(entity.getRotation().y, 5, 0, 0);
                    const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 6, entity.id);
                    filter.excludeFamilies?.push("sakana");
                    this.kokyuApplyDamage(entity, filter, 4, 2);

                } catch (error: any) {
                    system.clearRun(num);
                }
            },2);

            system.waitTicks(2*TicksPerSecond).then(() => {
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
     * 一万滑空粘魚
     */
    itimankakkuunengyo(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_tubo4.value"}]});
            }

            const distance = getLookLocationDistance(entity.getRotation().y, 5, 0, 0);
            const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 5, entity.id);
            filter.excludeFamilies?.push("sakana");
            const num = system.runInterval(() => {
                this.nengyo(entity, getRandomInRange(-3, 3), getRandomInRange(-2, 2));
                this.kokyuApplyDamage(entity, filter, 4, 2);
            }, 2);

            system.waitTicks(30).then(() => {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            }).catch((error: any) => {
            }).finally(() => {
                system.clearRun(num);
            });
        } catch (error: any) {
        }
    }

    async nengyo(entity:Entity, side:number, top:number) {

        const distance = getLookLocationDistance(entity.getRotation().y, 1, side, top);
        const bulet = entity.dimension.spawnEntity("kurokumaft:nengyo", getDistanceLocation(
            {
                x:entity.location.x,
                y:entity.location.y+0.5,
                z:entity.location.z
            },
            distance
        ));

        const distance2 = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
        const projectile = bulet.getComponent(EntityComponentTypes.Projectile) as EntityProjectileComponent;
        projectile.owner = entity;
        projectile.shoot({
            x:distance2.x,
            y:0,
            z:distance2.z
        });

        system.waitTicks(10).then(() => {
            if (bulet.isValid) {
                bulet.remove();
            }
        })
    }

    /**
     * 魚召喚
     */
    sakanasyoukan(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_tubo5.value"}]});
            }

            const left = getLookLocationDistance(entity.getRotation().y, 2, 2, 0);
            const sakana1 = entity.dimension.spawnEntity("kurokumaft:kyodaigyo_kiba", getDistanceLocation(entity.location, left));
            const tameable = sakana1.getComponent(EntityComponentTypes.Tameable) as EntityTameableComponent;
            if (!tameable.isTamed) {
                if (entity instanceof Player) {
                    tameable.tame(entity);
                }
            }

            const right = getLookLocationDistance(entity.getRotation().y, 2, -2, 0);
            const sakana2 = entity.dimension.spawnEntity("kurokumaft:kyodaigyo_kiba", getDistanceLocation(entity.location, right));
            const tameable2 = sakana2.getComponent(EntityComponentTypes.Tameable) as EntityTameableComponent;
            if (!tameable2.isTamed) {
                if (entity instanceof Player) {
                    tameable2.tame(entity);
                }
            }

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
     * 陣殺魚鱗
     */
    zinsatugyorin(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_tubo6.value"}]});
            }

            const num = system.runInterval(() => {
                try {
                    const filter = addOrgeFilter(0, entity.location, 2.5, entity.id);
                    filter.excludeFamilies?.push("sakana");
                    this.kokyuApplyDamage(entity, filter, 4, 2);

                    const distance = getLookLocationDistance(entity.getRotation().y, 4, 0, 0);
                    entity.applyKnockback({x:distance.x,z:distance.z},0.15);
                } catch (error: any) {
                    system.clearRun(num);
                }
                system.waitTicks(4).then(() => {
                    entity.teleport(entity.location, {
                        keepVelocity: false,
                        rotation: {
                            x:0,
                            y:entity.getRotation().y + getRandomInRange(75, 115)
                        }
                    });
                }).catch((error: any) => {
                }).finally(() => {
                });

            },5);

            system.waitTicks(2*TicksPerSecond).then(() => {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            }).catch((error: any) => {
            }).finally(() => {
                system.clearRun(num);
            });
        } catch (error: any) {
        }

    }

}

export async function gyokkoMove(entity:Entity) {

    const distance = getLookLocationDistance(entity.getRotation().y, getRandomInRange(-10, 10), getRandomInRange(-10, 10), 0);
    entity.teleport(getDistanceLocation(entity.location, distance), {
        checkForBlocks: true
    });
}