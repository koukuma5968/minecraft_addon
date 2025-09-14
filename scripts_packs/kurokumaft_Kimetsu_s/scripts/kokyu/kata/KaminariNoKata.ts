import { ItemStack, MolangVariableMap, Entity, system, TicksPerSecond, Player } from "@minecraft/server";
import { addRegimentalFilter, getDistanceLocation, getLookLocationDistance, getLookLocationDistancePitch, getRandomInRange} from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { shooting } from "../../common/ShooterEvent";
import { ItemDurabilityDamage } from "../../common/KimetuItemDurabilityDamage";

export class KaminariNoKata extends KataComonClass {

    /**
     * 壱ノ型 霹靂一閃
     */
    ichiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu1.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }

        const num = system.runInterval(() => {
            try {
                const filter = addRegimentalFilter(0, entity.location, 2.5, entity);
                this.kokyuApplyDamage(entity, filter, 5);
                const distance = getLookLocationDistance(entity.getRotation().y, 4, 0, 0);
                entity.applyKnockback({x:distance.x,z:distance.z},0);
            } catch (error: any) {
                system.clearRun(num);
            }
        },1);

        system.waitTicks(6).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

    }

    /**
     * 壱ノ型 霹靂一閃
     */
    ichiNoKataRen(entity:Entity, itemStack:ItemStack | undefined) {
        const num = system.runInterval(() => {
            try {
                const filter = addRegimentalFilter(0, entity.location, 2.5, entity);
                this.kokyuApplyDamage(entity, filter, 3);
                const distance = getLookLocationDistance(entity.getRotation().y, 4, 0, 0);
                entity.applyKnockback({x:distance.x,z:distance.z},0);
            } catch (error: any) {
                system.clearRun(num);
            }
        },1);

        system.waitTicks(6).then(() => {
            entity.teleport(entity.location, {
                keepVelocity: false,
                rotation: {
                    x:0,
                    y:entity.getRotation().y + getRandomInRange(75, 115)
                }
            });
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

    }

    /**
     * 壱ノ型 霹靂一閃（六連）
     */
    ichiNoKataRoku(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu1.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }

        entity.setProperty("kurokumaft:kokyu_use", false);
        this.ichiNoKataRen(entity, itemStack);
        const num = system.runInterval(() => {
            try {
                this.ichiNoKataRen(entity, itemStack);
            } catch (error: any) {
                system.clearRun(num);
            }
        }, 8);

        system.waitTicks(49).then(() => {
            entity.setProperty("kurokumaft:kokyu_particle", false);
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu1_rengeki.value",with:["6"]}]});
            }
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

    }

    /**
     * 壱ノ型 霹靂一閃（八連）
     */
    ichiNoKataHati(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu1.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }

        entity.setProperty("kurokumaft:kokyu_use", false);
        this.ichiNoKataRen(entity, itemStack);
        const num = system.runInterval(() => {
            try {
                this.ichiNoKataRen(entity, itemStack);
            } catch (error: any) {
                system.clearRun(num);
            }
        }, 8);

        system.waitTicks(65).then(() => {
            entity.setProperty("kurokumaft:kokyu_particle", false);
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu1_rengeki.value",with:["8"]}]});
            }
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

    }


    /**
     * 壱ノ型 霹靂一閃 神速
     */
    ichiNoKataShinsoku(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu1_shinsoku.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }

        const molang = new MolangVariableMap();
        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        molang.setFloat("variable.kaikyu", kaikyuNum);
        const num = system.runInterval(() => {
            try {
                const distance = getLookLocationDistance(entity.getRotation().y, 6, 0, 0);
                entity.applyKnockback({x:distance.x,z:distance.z},0);

                entity.dimension.spawnParticle("kurokumaft:kaminari4_particle",entity.location,molang);
                const filter = addRegimentalFilter(0, entity.location, 3.5, entity);
                this.kokyuApplyDamage(entity, filter, 8);
            } catch (error: any) {
                system.clearRun(num);
            }
        },1);

        system.waitTicks(6).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

    }

    /**
     * 弐ノ型 稲魂
     */
    niNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu2.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }

        const num = system.runInterval(() => {
            try {
                const distance = getLookLocationDistancePitch(entity.getRotation(), 1.5, 0);
                const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
                this.kokyuApplyDamage(entity, filter, 3);
            } catch (error: any) {
                system.clearRun(num);
            }
        },4);
        system.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

    }

    /**
     * 参ノ型 聚蚊成雷
     */
    sanNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu3.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }

        const num = system.runInterval(() => {
            try {
                const filter = addRegimentalFilter(0, entity.location, 4, entity);
                this.kokyuApplyDamage(entity, filter, 3);
            } catch (error: any) {
                system.clearRun(num);
            }
        },2);

        const distance = getLookLocationDistance(entity.getRotation().y, 4, -4, 0);
        entity.applyKnockback({x:distance.x,z:distance.z},0);
        entity.teleport(entity.location, {
            keepVelocity: false,
            rotation: {
                x:0,
                y:entity.getRotation().y + 90
            }
        });

        const num2 = system.runInterval(() => {
            try {
                const distance = getLookLocationDistance(entity.getRotation().y, 4, -4, 0);
                entity.applyKnockback({x:distance.x,z:distance.z},0);
                entity.teleport(entity.location, {
                    keepVelocity: false,
                    rotation: {
                        x:0,
                        y:entity.getRotation().y - 90
                    }
                });
            } catch (error: any) {
                system.clearRun(num2);
            }
        }, 5);

        system.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
            system.clearRun(num2);
        });

    }

    /**
     * 肆ノ型 遠雷
     */
    shiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu4.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        entity.setProperty("kurokumaft:kokyu_use", false);

        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);
        const num = system.runInterval(() => {

            try {
                const distance = getLookLocationDistance(entity.getRotation().y, 8, 0, 0);
                const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 8, entity);
                this.kokyuApplyDamage(entity, filter, 2);
        
                entity.dimension.spawnParticle("kurokumaft:kaminari4_particle",entity.location,molang);
            } catch (error: any) {
                system.clearRun(num);
            }
        },4);

        system.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

    }

    /**
     * 伍ノ型 熱界雷
     */
    goNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu5.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }

        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const num = system.runInterval(() => {
            try {
                entity.dimension.spawnParticle("kurokumaft:kaminari5_particle", entity.location, molang);
            } catch (error: any) {
                system.clearRun(num);
            }
        },2);

        const filter = addRegimentalFilter(1, entity.location, 6, entity);
        this.kokyuApplyDamage(entity, filter, 3);

        system.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

        let event = "kurokumaft:small_damage";
        if (kaikyuNum > 8) {
            event = "kurokumaft:lage_damage";
        } else if (kaikyuNum > 4) {
            event = "kurokumaft:middle_damage";
        }
        const dragon = shooting(entity, "kurokumaft:kaminari_dragon_small", 0, 3, event);

        system.waitTicks(2*TicksPerSecond).then(() => {
            if (dragon.isValid) {
                dragon.remove();
            }
        }).catch((error: any) => {
        }).finally(() => {
        });

    }

    /**
     * 陸ノ型 電轟雷轟
     */
    rokuNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu6.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }

        const distance = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
        entity.applyKnockback({x:distance.x,z:distance.z},0.8);

        entity.addEffect("minecraft:slow_falling", 1*TicksPerSecond,{
            amplifier: 1,
            showParticles: false
        });

        const nowloc = entity.location;
        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);
        const num = system.runInterval(() => {

            try {
                entity.dimension.spawnParticle("kurokumaft:kaminari6_particle",nowloc,molang);
            } catch (error: any) {
                system.clearRun(num);
            }
        },1);

        const filter = addRegimentalFilter(1, entity.location, 10, entity);
        this.kokyuApplyDamage(entity, filter, 5);

        system.waitTicks(10).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

    }

    /**
     * 漆ノ型 火雷神
     */
    shitiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kokyu7.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        entity.setProperty("kurokumaft:kokyu_chage", 10);
        entity.setProperty("kurokumaft:kokyu_use", false);

        const filter = addRegimentalFilter(1, entity.location, 30, entity);

        entity.addTag(entity.id);
        const targets = entity.dimension.getEntities(filter);
        entity.removeTag(entity.id);
        if (targets.length > 0) {
            entity.teleport(targets[0].location, {
                facingLocation: targets[0].location,
            });
        }

        const filter2 = addRegimentalFilter(0, entity.location, 8, entity);
        this.kokyuApplyDamage(entity, filter2, 15);

        system.waitTicks(10).then(() => {
            entity.setProperty("kurokumaft:kokyu_chage", 0);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
        });

    }

}
