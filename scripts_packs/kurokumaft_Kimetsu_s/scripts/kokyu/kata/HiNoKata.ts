import { ItemStack, MolangVariableMap, Entity, system, TicksPerSecond, Player } from "@minecraft/server";
import { addRegimentalFilter, getDistanceLocation, getLookLocationDistance, getLookLocationDistancePitch} from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { ItemDurabilityDamage } from "../../common/KimetuItemDurabilityDamage";

export class HiNoKata extends KataComonClass {

    /**
     * 壱ノ型 円舞
     */
    ichiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu1.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        const distance = getLookLocationDistance(entity.getRotation().y, 2.5, 0, 0.5);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
        this.kokyuApplyDamage(entity, filter, 7);

        system.waitTicks(2).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
        }).catch((error: any) => {
        }).finally(() => {
        });

        system.waitTicks(10).then(() => {
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
        });

    }

    /**
     * 壱ノ型 円舞一閃
     */
    ichiNoKataIssen(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu1_issen.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }

        const num = system.runInterval(() => {
            try {
                const distance = getLookLocationDistance(entity.getRotation().y, 5, 0, 0);
                entity.applyKnockback({x:distance.x,z:distance.z},0);

                const filter = addRegimentalFilter(0, entity.location, 3.5, entity);
                this.kokyuApplyDamage(entity, filter, 4);
            } catch (error :any) {
                system.clearRun(num);
            }
        },1);

        system.waitTicks(8).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            system.waitTicks(4).then(() => {
                entity.setProperty("kurokumaft:kokyu_particle", false);
            }).catch((error: any) => {
            }).finally(() => {
            });
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });


    }

    /**
     * 弐ノ型 碧羅の天
     */
    niNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu2.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        const distance = getLookLocationDistance(entity.getRotation().y, 2.5, 0, 0.5);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
        this.kokyuApplyDamage(entity, filter, 7);

        system.waitTicks(7).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
        });

    }

    /**
     * 参ノ型 烈日紅鏡
     */
    sanNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu3.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        // 左
        const ldistance = getLookLocationDistance(entity.getRotation().y, 1.5, -1.5, 1);
        const lfilter = addRegimentalFilter(0, getDistanceLocation(entity.location, ldistance), 3, entity);
        this.kokyuApplyDamage(entity, lfilter, 4);

        system.waitTicks(15).then(() => {
            // 右
            const rdistance = getLookLocationDistance(entity.getRotation().y, 1.5, 1.5, 1);
            const rfilter = addRegimentalFilter(0, getDistanceLocation(entity.location, rdistance), 3, entity);
            this.kokyuApplyDamage(entity, rfilter, 4);
        }).catch((error: any) => {
        }).finally(() => {
        });

        system.waitTicks(25).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
        });
    }

    /**
     * 肆ノ型 灼骨炎陽
     */
    shiNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu4.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        let z = 0;
        const num = system.runInterval(() => {
            try {
                const distance = getLookLocationDistance(entity.getRotation().y, z, 0, 0.5);
                const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
                this.kokyuApplyDamage(entity, filter, 3);
                z++;
            } catch (error: any) {
                system.clearRun(num);
            }
        },4);

        system.waitTicks(30).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

     }

    /**
     * 伍ノ型 陽華突
     */
    goNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu5.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        entity.setProperty("kurokumaft:kokyu_use", false);

        const distance = getLookLocationDistancePitch(entity.getRotation(), 3.5, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3.5, entity);
        this.kokyuApplyDamage(entity, filter, 7);

        system.waitTicks(5).then(() => {
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
        });

    }

    /**
     * 陸ノ型 日暈の龍 頭舞い
     */
    rokuNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu6.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        entity.setDynamicProperty("kurokumaft:chage_type", true);
        entity.setProperty("kurokumaft:kokyu_chage", 1);

        entity.setProperty("kurokumaft:kokyu_attack", true);
        let side = 5;
        const num = system.runInterval(() => {
            try {
                const filter = addRegimentalFilter(0, entity.location, 4, entity);
                this.kokyuApplyDamage(entity, filter, 4);
    
                const distance = getLookLocationDistance(entity.getRotation().y, 3, side, 0);
                entity.applyKnockback({x:distance.x,z:distance.z},0);

                side = -side;
            } catch (error: any) {
                system.clearRun(num);
            }
        },4);

        system.waitTicks(1*TicksPerSecond).then(() => {
            entity.setProperty("kurokumaft:kokyu_attack", false);
            entity.setProperty("kurokumaft:kokyu_chage", 0);
            entity.setProperty("kurokumaft:kokyu_particle", false);
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setDynamicProperty("kurokumaft:chage_type", undefined);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });
    }

    /**
     * 漆ノ型 斜陽転身
     */
    shitiNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu7.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        const distance = getLookLocationDistance(entity.getRotation().y, -2, 0, 0);
        entity.applyKnockback({x:distance.x,z:distance.z},0.5);

        const distance2 = getLookLocationDistance(entity.getRotation().y, 3, 0, -1);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance2), 4, entity);
        this.kokyuApplyDamage(entity, filter, 9);

        system.waitTicks(15).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
        });

    }

    /**
     * 捌ノ型 飛輪陽炎
     */
    hachiNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu8.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        const distance = getLookLocationDistance(entity.getRotation().y, 3.5, 0, 0.5);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 4, entity);
        this.kokyuApplyDamage(entity, filter, 6);

        system.waitTicks(15).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
        });
    }

    /**
     * 玖ノ型 輝輝恩光
     */
    kuNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu9.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const num = system.runInterval(() => {
            try {
                entity.dimension.spawnParticle("kurokumaft:hi9_particle", entity.location, molang);
            } catch (error: any) {
                system.clearRun(num);
            }
        },1);

        const distance = getLookLocationDistance(entity.getRotation().y, 1.5, 0, 0.5);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 2, entity);
        this.kokyuApplyDamage(entity, filter, 5);

        const udistance = getLookLocationDistance(entity.getRotation().y, 1.5, 0, 3);
        const ufilter = addRegimentalFilter(0, getDistanceLocation(entity.location, udistance), 3, entity);
        this.kokyuApplyDamage(entity, ufilter, 5);

        system.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

    }

    /**
     * 拾ノ型 火車
     */
    zyuNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu10.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        // fornt
        const fdistance = getLookLocationDistance(entity.getRotation().y, 2.5, 0, 0);
        const ffilter = addRegimentalFilter(0, getDistanceLocation(entity.location, fdistance), 2.5, entity);
        this.kokyuApplyDamage(entity, ffilter, 4);
        // back
        const bdistance = getLookLocationDistance(entity.getRotation().y, -2.5, 0, 0);
        const bfilter = addRegimentalFilter(0, getDistanceLocation(entity.location, bdistance), 2.5, entity);
        this.kokyuApplyDamage(entity, bfilter, 4);
        // up
        const udistance = getLookLocationDistance(entity.getRotation().y, 0, 0, 2.5);
        const ufilter = addRegimentalFilter(0, getDistanceLocation(entity.location, udistance), 2.5, entity);
        this.kokyuApplyDamage(entity, ufilter, 4);
        // down
        const ddistance = getLookLocationDistance(entity.getRotation().y, 0, 0, -2.5);
        const dfilter = addRegimentalFilter(0, getDistanceLocation(entity.location, ddistance), 2.5, entity);
        this.kokyuApplyDamage(entity, dfilter, 4);

        system.waitTicks(5).then(() => {
            const point = getLookLocationDistance(entity.getRotation().y, 4, 0, 0);
            entity.applyKnockback({x:point.x,z:point.z},0.5);
        }).catch((error: any) => {
        }).finally(() => {
        });

        system.waitTicks(15).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
        });
    }

    /**
     * 拾壱ノ型 幻日虹
     */
    zyuichiNoKata(entity:Entity, itemStack:ItemStack | undefined) {

        if (entity.getDynamicProperty("kurokumaft:chage_type") === undefined) {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu11.value"}]});
                if (itemStack !== undefined) {
                    ItemDurabilityDamage(entity, itemStack);
                }
            }
            entity.setDynamicProperty("kurokumaft:chage_type", true);

            entity.triggerEvent("kurokumaft:add_damage_clear");

            this.gennitiIntervalId = system.runInterval(() => {
                try {
                    this.checkGennitiMove(entity, itemStack);
                } catch (error: any) {
                    system.clearRun(this.gennitiIntervalId);
                }
            },2);

            const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
            const molang = new MolangVariableMap();
            molang.setFloat("variable.kaikyu", kaikyuNum);
    
            const num = system.runInterval(() => {
                try {
                    entity.dimension.spawnParticle("kurokumaft:hi_heat_haze_particle", entity.location, molang);
                } catch (error: any) {
                    system.clearRun(num);
                }
            },1);
    
            system.waitTicks(3*TicksPerSecond).then(() => {
                entity.setProperty("kurokumaft:kokyu_attack", false);
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
                entity.setDynamicProperty("kurokumaft:chage_type", undefined);
                entity.triggerEvent("kurokumaft:remove_damage_clear");
            }).catch((error: any) => {
            }).finally(() => {
                system.clearRun(this.gennitiIntervalId);
                system.clearRun(num);
            });
        }
    }

    private gennitiIntervalId: number =0;
    private checkGennitiMove(entity: Entity, itemStack:ItemStack | undefined): void {
        if (entity.isValid) {
            const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
            const molang = new MolangVariableMap();
            molang.setFloat("variable.kaikyu", kaikyuNum);

            if (this.projectRefrect(entity, entity.location)) {
                entity.dimension.spawnParticle("kurokumaft:hi11_particle",entity.location,molang);
            }

            entity.addTag(entity.id);
            const filter = addRegimentalFilter(1, entity.location, 2.5, entity);
            const targets = entity.dimension.getEntities(filter);
            targets.forEach(en => {
                entity.dimension.spawnParticle("kurokumaft:hi11_particle",entity.location,molang);
            });
            entity.removeTag(entity.id);

        } else {
            system.clearRun(this.gennitiIntervalId);
        }
    };

    /**
     * 拾弐ノ型 炎舞
     */
    zyuniNoKata(entity:Entity, itemStack:ItemStack | undefined) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu12.value"}]});
            if (itemStack !== undefined) {
                ItemDurabilityDamage(entity, itemStack);
            }
        }
        const distance = getLookLocationDistance(entity.getRotation().y, 2.5, 0, 0.5);
        const filter = addRegimentalFilter(0, getDistanceLocation(entity.location, distance), 3, entity);
        this.kokyuApplyDamage(entity, filter, 5);

        system.waitTicks(5).then(() => {
            this.kokyuApplyDamage(entity, filter, 5);
        }).catch((error: any) => {
        }).finally(() => {
        });

        system.waitTicks(10).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
        });
    }
    
}
