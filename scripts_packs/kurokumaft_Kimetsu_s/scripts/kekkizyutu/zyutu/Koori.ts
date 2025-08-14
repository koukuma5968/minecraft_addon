import { ItemStack, Entity, system, TicksPerSecond, Player, System, EntityQueryOptions, world, EntityComponentTypes, EntityTameableComponent, EntityDamageCause } from "@minecraft/server";
import { ZytuComonClass } from "./ZytuComonClass";
import { addOrgeFilter, getDistanceLocation, getLookLocationDistance, getLookLocationDistancePitch, getRandomInRange } from "../../common/KimetuCommonUtil";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export class Koori extends ZytuComonClass {

    /**
     * 蓮葉氷
     */
    hasuhagoori(entity:Entity) {
        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_koori1.value"}]});
            }
            const distance = getLookLocationDistancePitch(entity.getRotation(), 3, 0);
            const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 3, entity.id);
            this.kokyuApplyDamage(entity, filter, 4, 2);

            for (let i=-3; i<=3; i=i+3) {
                const distance = getLookLocationDistance(entity.getRotation().y, 4, i, 0);
                entity.dimension.setBlockType(getDistanceLocation(entity.location, distance), "kurokumaft:hasuhagoori_block");
            }

            system.waitTicks(12).then(() => {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            }).catch((error: any) => {
            }).finally(() => {
            });
        } catch (error: any) {
        }

    }

    /**
     * 枯園垂り
     */
    karesonosizuri(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_koori2.value"}]});
            }

            const num = system.runInterval(() => {
                try {
                    const distance = getLookLocationDistance(entity.getRotation().y, 2, 0, 0);
                    const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 4, entity.id);
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
     * 凍て曇
     */
    itegumori(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_koori3.value"}]});
            }

            const num = system.runInterval(() => {
                try {
                    const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
                    const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 6, entity.id);
                    this.kokyuApplyDamage(entity, filter, 4, 2);
                    this.kokyuApplyEffect(entity, filter, 20, 2, MinecraftEffectTypes.Weakness);

                } catch (error: any) {
                    system.clearRun(num);
                }
            },2);

            entity.dimension.spawnParticle("kurokumaft:itegumori_particle", entity.location);

            system.waitTicks(1*TicksPerSecond).then(() => {
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
     * 蔓蓮華
     */
    tururenge(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_koori4.value"}]});
            }

            let owner = undefined;
            const tameable = entity.getComponent(EntityComponentTypes.Tameable) as EntityTameableComponent;
            if (tameable !== undefined && tameable.isTamed) {
                owner = tameable.tamedToPlayer;
            }
            const left = getLookLocationDistance(entity.getRotation().y, 2, 2, 0);
            const hasu1 = entity.dimension.spawnEntity("kurokumaft:hasuhagoori", getDistanceLocation(entity.location, left));

            const renge1 = new hasuRenge(hasu1, entity, owner);
            renge1.startMonitoring();

            const center = getLookLocationDistance(entity.getRotation().y, 4, 0, 0);
            const hasu2 = entity.dimension.spawnEntity("kurokumaft:hasuhagoori", getDistanceLocation(entity.location, center));
            const renge2 = new hasuRenge(hasu2, entity, owner);
            renge2.startMonitoring();

            const right = getLookLocationDistance(entity.getRotation().y, 2, -2, 0);
            const hasu3 = entity.dimension.spawnEntity("kurokumaft:hasuhagoori", getDistanceLocation(entity.location, right));
            const renge3 = new hasuRenge(hasu3, entity, owner);
            renge3.startMonitoring();

            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        } catch (error: any) {
        }
    }

    /**
     * 寒烈の白姫
     */
    kanretunosirahime(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_koori5.value"}]});
            }

            const left = getLookLocationDistance(entity.getRotation().y, 2, 2, 0);
            const shirahime1 = entity.dimension.spawnEntity("kurokumaft:kanretunosirahime", getDistanceLocation(entity.location, left));
            const tameable = shirahime1.getComponent(EntityComponentTypes.Tameable) as EntityTameableComponent;
            if (!tameable.isTamed) {
                if (entity instanceof Player) {
                    tameable.tame(entity);
                }
            }

            const right = getLookLocationDistance(entity.getRotation().y, 2, -2, 0);
            const shirahime2 = entity.dimension.spawnEntity("kurokumaft:kanretunosirahime", getDistanceLocation(entity.location, right));
            const tameable2 = shirahime2.getComponent(EntityComponentTypes.Tameable) as EntityTameableComponent;
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
     * 冬ざれ氷柱
     */
    fuyuzareturara(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_koori6.value"}]});
            }

            const num = system.runInterval(() => {
                try {
                    const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
                    const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 8, entity.id);
                    this.kokyuApplyDamage(entity, filter, 4, 2);

                } catch (error: any) {
                    system.clearRun(num);
                }
            },2);
            entity.dimension.spawnParticle("kurokumaft:koori_turara_particle", entity.location);

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
     * 散り蓮華
     */
    tirirenge(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_koori7.value"}]});
            }
            const num = system.runInterval(() => {
                try {
                    const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
                    const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 6, entity.id);
                    this.kokyuApplyDamage(entity, filter, 4, 2);

                } catch (error: any) {
                    system.clearRun(num);
                }
            },2);

            entity.dimension.spawnParticle("kurokumaft:tirirenge_particle", entity.location);

            system.waitTicks(1*TicksPerSecond).then(() => {
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
     * 結晶ノ御子
     */
    kessyounomiko(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_koori8.value"}]});
            }

            const center = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
            const miko = entity.dimension.spawnEntity("kurokumaft:kessyounomiko", getDistanceLocation(entity.location, center));
            const tameable = miko.getComponent(EntityComponentTypes.Tameable) as EntityTameableComponent;
            if (!tameable.isTamed) {
                if (entity instanceof Player) {
                    tameable.tame(entity);
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
     * 霧氷・睡蓮菩薩
     */
    muhyousuirenbosatu(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_koori9.value"}]});
            }

            const center = getLookLocationDistance(entity.getRotation().y, 4, 0, 0);
            const bosatu = entity.dimension.spawnEntity("kurokumaft:muhyousuirenbosatu", getDistanceLocation(entity.location, center));
            const tameable = bosatu.getComponent(EntityComponentTypes.Tameable) as EntityTameableComponent;
            if (!tameable.isTamed) {
                if (entity instanceof Player) {
                    tameable.tame(entity);
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
     * 菩薩範囲攻撃
     */
    bosatuattack(entity:Entity) {

        try {
            const num = system.runInterval(() => {
                try {
                    const distance = getLookLocationDistance(entity.getRotation().y, 0, 0, 0);
                    const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 8, entity.id);
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

}

class hasuRenge extends ZytuComonClass {

    entity: Entity;
    num: number;
    ownerEntity: Entity;
    player: Player | undefined;

    constructor(entity: Entity, ownerEntity: Entity, player: Player | undefined) {
        super();
        this.entity = entity;
        this.num = 0;
        this.ownerEntity = ownerEntity;
        this.ownerEntity.addTag(this.entity.id);
        if (player !== undefined) {
            this.player = player;
            this.player.addTag(this.entity.id);
        }
    }

    startMonitoring() {
        this.num = system.runInterval(() => {
            if (this.entity.isValid) {
                this.entity.setProperty("kurokumaft:attack_ran", 0);
                this.attackTick();
            } else {
                system.clearRun(this.num);
                if (this.ownerEntity.isValid) {
                    this.ownerEntity.removeTag(this.entity.id)
                }
                if (this.player !== undefined) {
                    this.player.removeTag(this.entity.id)
                }
            }
        }, 10);
    }

    async attackTick() {
 
        const filter = {
            excludeFamilies: [
                "inanimate", "animal", "hasuhagoori", "koori"
            ],
            excludeTypes: [
                "item"
            ],
            excludeTags: [
                this.entity.id
            ],
            closest: 1,
            location: this.entity.location,
            maxDistance: 4
        } as EntityQueryOptions;

        if (!world.gameRules.pvp) {
            filter.excludeFamilies?.push("player");
        }

        const targets = this.entity.dimension.getEntities(filter);
        if (targets.length > 0) {
            this.entity.teleport(this.entity.location, {
                facingLocation: targets[0].location
            })
            const ran = getRandomInRange(1, 4);
            this.entity.setProperty("kurokumaft:attack_ran", ran);
            this.kokyuApplyDamage(this.entity, filter, 3, 1);
        }
    }

}

/**
 * 白姫の息吹
 */
export function ibuki(entity:Entity) {

    try {

        const num = system.runInterval(() => {
            try {
                const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
                const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 6, entity.id);
                filter.excludeFamilies?.push("koori");

                const targets = entity.dimension.getEntities(filter);
                targets.forEach(en => {
                    if (en !== undefined && en.isValid) {
                        if (en instanceof Player) {
                            en.applyDamage(2, {
                                cause: EntityDamageCause.entityAttack,
                                damagingEntity: entity
                            });
                            en.addEffect(MinecraftEffectTypes.Weakness, 20, {
                                amplifier: 2,
                                showParticles: true
                            });
                        } else {
                            en.applyDamage(4, {
                                cause: EntityDamageCause.entityAttack,
                                damagingEntity: entity
                            });
                            en.addEffect(MinecraftEffectTypes.Weakness, 20, {
                                amplifier: 4,
                                showParticles: true
                            });
                        }
                    }
                });
            } catch (error: any) {
                system.clearRun(num);
            }
        },2);

        entity.dimension.spawnParticle("kurokumaft:itegumori_particle", entity.location);

        system.waitTicks(1*TicksPerSecond).then(() => {
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });
    } catch (error: any) {
    }

}

