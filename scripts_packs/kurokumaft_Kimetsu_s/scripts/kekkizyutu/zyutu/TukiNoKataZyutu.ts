import { EntityComponentTypes, EntityProjectileComponent, MolangVariableMap, Entity, system, Vector3, Player } from "@minecraft/server";
import { addOrgeFilter, getDistanceLocation, getForwardPosition, getLookLocationDistance, getLookLocationDistancePitch, getRandomInRange } from "../../common/KimetuCommonUtil";
import { ZytuComonClass } from "./ZytuComonClass";

export class TukiNoKataZyutu extends ZytuComonClass {

    /**
     * 壱ノ型 闇月・宵の宮
     */
    ichiNoKata(entity:Entity) {

        entity.setProperty("kurokumaft:kokyu_use", false);
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate: "msg.kurokumaft:tuki_kokyu1.value"}]});
            
        }

        const distance = getLookLocationDistance(entity.getRotation().y, 2.5, 0, 0.5);
        const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 3, entity.id);
        this.kokyuApplyDamage(entity, filter, 3, 1);

        const molang = new MolangVariableMap();
        molang.setFloat("variable.tuki_rotaion", -entity.getRotation().y);
        molang.setFloat("variable.tuki_size_x", 5);
        molang.setFloat("variable.tuki_size_y", 2.5);

        entity.dimension.spawnParticle("kurokumaft:mikazuki5_particle", getDistanceLocation(entity.location, distance), molang);

        system.waitTicks(5).then(() => {
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
        });

    }

    /**
     * 弐ノ型 珠華ノ弄月
     */
    niNoKata(entity:Entity) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate: "msg.kurokumaft:tuki_kokyu2.value"}]});
        }

        const molang = new MolangVariableMap();
        molang.setFloat("variable.tuki_size_x", 8);
        molang.setFloat("variable.tuki_size_y", 4);

        let side = -3;
        let tuki_rotaion = 90;
        const num = system.runInterval(() => {

            try {
                molang.setFloat("variable.tuki_rotaion", tuki_rotaion);
        
                const distance = getLookLocationDistance(entity.getRotation().y, 3, 0, 0.5);
                const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 3, entity.id);
                this.kokyuApplyDamage(entity, filter, 2, 1, );
        
                const pdistance = getLookLocationDistance(entity.getRotation().y, 2.5, side, 1);
                entity.dimension.spawnParticle("kurokumaft:mikazuki_sweep_particle", getDistanceLocation(entity.location, pdistance), molang);
        
                side=side+3;
                tuki_rotaion=tuki_rotaion-90;
            } catch (error: any) {
                system.clearRun(num);
            }
        },5);

        system.waitTicks(15).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

    }

    /**
     * 参ノ型 厭忌月・銷り
     */
    sanNoKata(entity:Entity) {
        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate: "msg.kurokumaft:tuki_kokyu3.value"}]});
        }

        const molang = new MolangVariableMap();
        molang.setFloat("variable.tuki_size_x", 5);
        molang.setFloat("variable.tuki_size_y", 2.5);

        // 左
        const distance = getLookLocationDistance(entity.getRotation().y, 2.5, -1.5, 1);
        const lfilter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 3.5, entity.id);
        this.kokyuApplyDamage(entity, lfilter, 3, 1, );

        molang.setFloat("variable.tuki_rotaion", 0);
        entity.dimension.spawnParticle("kurokumaft:mikazuki_sweep_particle", getDistanceLocation(entity.location, distance), molang);

        system.waitTicks(5).then(() => {
            // 右
            const distance = getLookLocationDistance(entity.getRotation().y, 2.5, 1.5, 1);
            const rfilter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 3.5, entity.id);
            this.kokyuApplyDamage(entity, rfilter, 3, 1, );

            molang.setFloat("variable.tuki_rotaion", 180);
            entity.dimension.spawnParticle("kurokumaft:mikazuki_sweep_particle", getDistanceLocation(entity.location, distance), molang);
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

    /**
     * 伍ノ型 月魄災渦
     */
    goNoKata(entity:Entity) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate: "msg.kurokumaft:tuki_kokyu5.value"}]});
            
        }
        const molang = new MolangVariableMap();

        const num = system.runInterval(() => {

            try {
                const y = getRandomInRange(0.1, 2.5);
                const distance = getLookLocationDistance(entity.getRotation().y, 3.5, 0, 0);
                const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 4, entity.id);
                this.kokyuApplyDamage(entity, filter, 2, 1, );

                const pdistance = getLookLocationDistance(entity.getRotation().y, 6.5, 0, y);
                molang.setFloat("variable.tuki_rotaion", -entity.getRotation().y);
                molang.setFloat("variable.tuki_size_x", getRandomInRange(8, 12));
                molang.setFloat("variable.tuki_size_y", getRandomInRange(4, 8));
                entity.dimension.spawnParticle("kurokumaft:mikazuki5_particle", getDistanceLocation(entity.location, pdistance), molang);
            } catch (error: any) {
                system.clearRun(num);
            }
        },2);

        system.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

    }

    /**
     * 陸ノ型 常夜孤月・無間
     */
    rokuNoKata(entity:Entity) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate: "msg.kurokumaft:tuki_kokyu6.value"}]});
            
        }

        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);
        molang.setFloat("variable.tuki_size_x", 8);
        molang.setFloat("variable.tuki_size_y", 4);

        const parlo = getForwardPosition(entity.location, entity.getRotation().y, 4);
        entity.dimension.spawnParticle("kurokumaft:mikazuki_box_particle", parlo, molang);

        const num = system.runInterval(() => {

            try {
                const side = getRandomInRange(-5, 5);
                const tuki_rotaion = getRandomInRange(-90, 90);
                molang.setFloat("variable.tuki_rotaion", tuki_rotaion);

                const distance = getLookLocationDistance(entity.getRotation().y, 6, 0, 0);
                const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 8, entity.id);
                this.kokyuApplyDamage(entity, filter, 2, 1, );

                const pdistance = getLookLocationDistance(entity.getRotation().y, 6, side, 1);
                entity.dimension.spawnParticle("kurokumaft:mikazuki_sweep_particle", getDistanceLocation(entity.location, pdistance), molang);

            } catch (error: any) {
                system.clearRun(num);
            }
        },2);

        system.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });
    }

    /**
     * 漆ノ型 厄鏡・月映え
     */
    shitiNoKata(entity:Entity) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate: "msg.kurokumaft:tuki_kokyu7.value"}]});
            
        }

        const front = getLookLocationDistance(entity.getRotation().y, 1, 0, 0);
        this.tukibae(entity,entity.location, front);
        const right1 = getLookLocationDistance(entity.getRotation().y, 1, 0.5, 0);
        this.tukibae(entity,entity.location, right1);
        const right2 = getLookLocationDistance(entity.getRotation().y, 1, 1, 0);
        this.tukibae(entity,entity.location, right2);
        const left1 = getLookLocationDistance(entity.getRotation().y, 1, -0.5, 0);
        this.tukibae(entity,entity.location, left1);
        const left2 = getLookLocationDistance(entity.getRotation().y, 1, -1, 0);
        this.tukibae(entity,entity.location, left2);

        const num = system.runInterval(() => {

            try {
                const distance = getLookLocationDistancePitch(entity.getRotation(), 6, 0);
                const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 8, entity.id);
                this.kokyuApplyDamage(entity, filter, 2, 1, );
            } catch (error: any) {
                system.clearRun(num);
            }
        },2);

        system.waitTicks(10).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });
    }

    /**
     * 月映え
     */
    async tukibae(entity:Entity, location:Vector3, distance:Vector3) {

        const tuki = entity.dimension.spawnEntity("kurokumaft:mikazuki_blead", {
            x:location.x + distance.x,
            y:location.y,
            z:location.z + distance.z
        });

        const projectile = tuki.getComponent(EntityComponentTypes.Projectile) as EntityProjectileComponent;
        projectile.owner = entity;
        projectile.shoot({
            x:distance.x * 3,
            y:0,
            z:distance.z * 3
        });
    
        const num = system.runInterval(() => {

            try {
                const filter = addOrgeFilter(0, location, 2, entity.id);
                const exes = filter.excludeFamilies;
                if (exes !== undefined) {
                    exes.push("tuki_blead");
                }
                this.kokyuApplyDamage(entity, filter, 2, 1);
            } catch (error: any) {
                system.clearRun(num);
            }
        },2);

        system.waitTicks(20).then(() => {
            if (tuki.isValid) {
                tuki.remove();
            }
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

    }

    /**
     * 捌ノ型 月龍輪尾
     */
    hachiNoKata(entity:Entity) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate: "msg.kurokumaft:tuki_kokyu8.value"}]});
            
        }

        const molang = new MolangVariableMap();
        molang.setFloat("variable.tuki_size_x", 8);
        molang.setFloat("variable.tuki_size_y", 4);

        const distance = getLookLocationDistance(entity.getRotation().y, 6.5, 0, 0);
        const disLotation = getDistanceLocation(entity.location, distance);

        molang.setFloat("variable.tuki_rotaion", -entity.getRotation().y);
        molang.setFloat("variable.tuki_size_x", getRandomInRange(8, 12));
        molang.setFloat("variable.tuki_size_y", getRandomInRange(4, 8));
        entity.dimension.spawnParticle("kurokumaft:mikazuki8_particle", disLotation, molang);

        const filter = addOrgeFilter(0, disLotation, 4, entity.id);
        this.kokyuApplyDamage(entity, filter, 6, 3, );

        system.waitTicks(15).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
        });

    }

    /**
     * 玖ノ型 降り月・連面
     */
    kuNoKata(entity:Entity) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate: "msg.kurokumaft:tuki_kokyu9.value"}]});
            
        }

        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);
        molang.setFloat("variable.tuki_size_x", 8);
        molang.setFloat("variable.tuki_size_y", 4);

        let tuki_rotaion = 75;
        const num = system.runInterval(() => {

            try {
                const side = getRandomInRange(-5, 5);
                molang.setFloat("variable.tuki_rotaion", tuki_rotaion);

                const distance = getLookLocationDistance(entity.getRotation().y, 6, 0, 0);
                const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 8, entity.id);
                this.kokyuApplyDamage(entity, filter, 2, 1, );

                const pdistance = getLookLocationDistance(entity.getRotation().y, 6, side, 1);
                entity.dimension.spawnParticle("kurokumaft:mikazuki_sweep_particle", getDistanceLocation(entity.location, pdistance), molang);
        
                tuki_rotaion=-tuki_rotaion;
            } catch (error: any) {
                system.clearRun(num);
            }
        },2);

        system.waitTicks(20).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });
    }

    /**
     * 拾ノ型 穿面斬・蘿月
     */
    zyuNoKata(entity:Entity) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate: "msg.kurokumaft:tuki_kokyu10.value"}]});
            
        }

        const ldistance = getLookLocationDistance(entity.getRotation().y, 1, -1.5, 0);
        this.ragetu(entity,entity.location, ldistance);

        const rdistance = getLookLocationDistance(entity.getRotation().y, 1, 1.5, 0);
        this.ragetu(entity,entity.location, rdistance);

        system.waitTicks(15).then(() => {
            entity.setProperty("kurokumaft:kokyu_use", false);
            entity.setProperty("kurokumaft:kokyu_particle", false);
        }).catch((error: any) => {
        }).finally(() => {
        });
    }

    /**
     * 蘿月
     */
    async ragetu(entity:Entity, location:Vector3, distance:Vector3) {

        const tuki = entity.dimension.spawnEntity("kurokumaft:mikazuki_ragetu", {
            x:location.x + distance.x,
            y:location.y,
            z:location.z + distance.z
        });

        const front = getLookLocationDistance(entity.getRotation().y, 2, 0, 0);
        const projectile = tuki.getComponent(EntityComponentTypes.Projectile) as EntityProjectileComponent;
        projectile.owner = entity;
        projectile.shoot({
            x:front.x * 3,
            y:0,
            z:front.z * 3
        });
    
        const num = system.runInterval(() => {

            try {
                const filter = addOrgeFilter(0, location, 2, entity.id);
                const exes = filter.excludeFamilies;
                if (exes !== undefined) {
                    exes.push("tuki_blead");
                }
                this.kokyuApplyDamage(entity, filter, 2, 1);
            } catch (error: any) {
                system.clearRun(num);
            }

        },2);

        system.waitTicks(20).then(() => {
            if (tuki.isValid) {
                tuki.remove();
            }
        }).catch((error: any) => {
        }).finally(() => {
            system.clearRun(num);
        });

    }

    /**
     * 拾肆ノ型 兇変・天満繊月
     */
    zyushiNoKata(entity:Entity) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate: "msg.kurokumaft:tuki_kokyu14.value"}]});
            
        }
        const molang = new MolangVariableMap();

        const num = system.runInterval(() => {

            try {
                const y = getRandomInRange(0.1, 2.5);
                const distance = getLookLocationDistance(entity.getRotation().y, 5, 0, 0);
                const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 6, entity.id);
                this.kokyuApplyDamage(entity, filter, 2, 1, );

                const pdistance = getLookLocationDistance(entity.getRotation().y, 8, 0, y);
                molang.setFloat("variable.tuki_rotaion", -entity.getRotation().y);
                molang.setFloat("variable.tuki_size_x", getRandomInRange(12, 16));
                molang.setFloat("variable.tuki_size_y", getRandomInRange(8, 12));
                entity.dimension.spawnParticle("kurokumaft:mikazuki5_particle", getDistanceLocation(entity.location, pdistance), molang);
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

    }

    /**
     * 拾陸ノ型 月虹・片割れ月
     */
    zyurokuNoKata(entity:Entity) {

        if (entity instanceof Player) {
            entity.onScreenDisplay.setActionBar({rawtext:[{translate: "msg.kurokumaft:tuki_kokyu16.value"}]});
            
        }
        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);
        molang.setFloat("variable.tuki_size_x", 8);
        molang.setFloat("variable.tuki_size_y", 4);

        let tuki_rotaion = 90;
        const num = system.runInterval(() => {

            try {
                const side = getRandomInRange(-5, 5);
                molang.setFloat("variable.tuki_rotaion", tuki_rotaion);

                const distance = getLookLocationDistance(entity.getRotation().y, 8, 0, 0);
                const filter = addOrgeFilter(0, getDistanceLocation(entity.location, distance), 8, entity.id);
                this.kokyuApplyDamage(entity, filter, 2, 1, );

                const pdistance = getLookLocationDistance(entity.getRotation().y, 8, side, 1);
                entity.dimension.spawnParticle("kurokumaft:mikazuki_sweep_particle", getDistanceLocation(entity.location, pdistance), molang);
        
                tuki_rotaion=-tuki_rotaion;
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

    }
    
}
