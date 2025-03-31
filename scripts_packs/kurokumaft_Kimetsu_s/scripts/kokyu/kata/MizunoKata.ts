import { EntityComponentTypes, EntityDamageCause, EntityProjectileComponent, ItemStack, MolangVariableMap, Player, system, TicksPerSecond, Vector3 } from "@minecraft/server";
import { addProjectionFilter, addRegimentalFilter, getLookPoints, getLookRotaionPoints, weightChoice } from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";
import { shooting } from "../../common/ShooterEvent";

export class MizuNoKata extends KataComonClass {

    /**
     * 壱ノ型 水面切り
     */
    ichiNoKata(player:Player, itemStack:ItemStack) {
        player.setProperty("kurokumaft:kokyu_use", false);
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:mizu_kokyu1.value"}]});
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
        },6);

        const location = getLookPoints(player.getRotation(), player.location, 1.5)
        const filter = addRegimentalFilter(0, location, 2.5, player.id);
        this.kokyuApplyDamage(player, filter, 4, 2, itemStack);

    }

    /**
     * 弐ノ型 水車
     */
    niNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:mizu_kokyu2.value\"}]}");
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },TicksPerSecond);
        // fornt
        let location = getLookPoints(player.getRotation(), player.location, 2.5);
        let filter = addRegimentalFilter(0, location, 2.5, player.id);
        this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
        // back
        location = getLookPoints(player.getRotation(), player.location, -2.5);
        filter = addRegimentalFilter(0, location, 2.5, player.id);
        this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
        // up
        location = getLookPoints(player.getRotation(), {x:player.location.x, y:player.location.y+2.5,z:player.location.z}, 0);
        filter = addRegimentalFilter(0, location, 2.5, player.id);
        this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
        // down
        location = getLookPoints(player.getRotation(), {x:player.location.x, y:player.location.y-2.5,z:player.location.z}, 0);
        filter = addRegimentalFilter(0, location, 2.5, player.id);
        this.kokyuApplyDamage(player, filter, 3, 1, itemStack);

    }

    /**
     * 参ノ型 流流舞い
     */
    sanNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:mizu_kokyu3.value\"}]}");
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },30);

        // 左
        const left = getLookRotaionPoints(player.getRotation(), 1.5, -1.5);
        const lvolume = getLookPoints(player.getRotation(), {x:player.location.x+left.x, y:player.location.y,z:player.location.z+left.z}, 0);
        const lfilter = addRegimentalFilter(0, lvolume, 3, player.id);
        this.kokyuApplyDamage(player, lfilter, 2, 1, itemStack);
        system.runTimeout(() => {
            // 右
            const right = getLookRotaionPoints(player.getRotation(), 1.5, 1.5);
            const rvolume = getLookPoints(player.getRotation(), {x:player.location.x+right.x, y:player.location.y,z:player.location.z+right.z}, 0);
            const rfilter = addRegimentalFilter(0, rvolume, 3, player.id);
            this.kokyuApplyDamage(player, rfilter, 2, 1, itemStack);
        }, 10);
        system.runTimeout(() => {
            // 中央
            const cvolume = getLookPoints(player.getRotation(), player.location, 1.5);
            const cfilter = addRegimentalFilter(0, cvolume, 3, player.id);
            this.kokyuApplyDamage(player, cfilter, 2, 1, itemStack);
        }, 20);

    }

    /**
     * 肆ノ型 打ち潮
     */
    shiNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:mizu_kokyu4.value\"}]}");
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
            player.setProperty("kurokumaft:kokyu_use", false);
        },20);

        // 左
        const left = getLookRotaionPoints(player.getRotation(), 1.5, -2);
        const lvolume = getLookPoints(player.getRotation(), {x:player.location.x+left.x, y:player.location.y+1,z:player.location.z+left.z}, 0);
        const lfilter = addRegimentalFilter(0, lvolume, 3.5, player.id);
        player.dimension.spawnParticle("kurokumaft:mizu2_particle",lvolume)
        this.kokyuApplyDamage(player, lfilter, 3, 1, itemStack);

        system.waitTicks(20);

       // 右
       const right = getLookRotaionPoints(player.getRotation(), 1.5, 2);
        const rvolume = getLookPoints(player.getRotation(), {x:player.location.x+right.x, y:player.location.y+1,z:player.location.z+right.z}, 0);
        const rfilter = addRegimentalFilter(0, rvolume, 3.5, player.id);
        player.dimension.spawnParticle("kurokumaft:mizu2_particle",rvolume)
        this.kokyuApplyDamage(player, rfilter, 3, 1, itemStack);

    }

    /**
     * 伍ノ型 干天の慈雨
     */
    goNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:mizu_kokyu5.value\"}]}");

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
            player.setProperty("kurokumaft:kokyu_use", false);
        },4);

        const goKataLists = weightChoice([
            { item: 'small' , weight: 55 },
            { item: 'lage' , weight: 40 },
            { item: 'kill' , weight: 5 },
        ]);

        const volume = getLookPoints(player.getRotation(), player.location, 1.5)
        const filter = addRegimentalFilter(1, volume, 3, player.id);

        const targets = player.dimension.getEntities(filter);
        targets.forEach(en => {
            const choice = goKataLists.pick();
            switch (choice as string) {
                case 'small': 
                    if (en instanceof Player) {
                        if (this.gardCheck(en)) {
                            en.applyDamage(2, {
                                cause: EntityDamageCause.entityAttack,
                                damagingEntity: player
                            });
                        }
                    } else {
                        en.applyDamage(3, {
                            cause: EntityDamageCause.entityAttack,
                            damagingEntity: player
                        });
                    }
       
                    break;
                case 'lage': 
                    if (en instanceof Player) {
                        if (this.gardCheck(en)) {
                            en.applyDamage(3, {
                                cause: EntityDamageCause.entityAttack,
                                damagingEntity: player
                            });
                        }
                    } else {
                        en.applyDamage(8, {
                            cause: EntityDamageCause.entityAttack,
                            damagingEntity: player
                        });
                    }

                    break;
                case 'kill': 
                    en.kill();
                    break;
            }
    
        });
        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);
        player.dimension.spawnParticle("kurokumaft:mizu5_particle",player.location,molang);
        player.dimension.spawnParticle("kurokumaft:mizu5_particle",player.location,molang);

    }

    /**
     * 陸ノ型 ねじれ渦
     */
    rokuNoKata(player:Player, itemStack:ItemStack) {

        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:mizu_kokyu6.value\"}]}");

        const volume = getLookPoints(player.getRotation(), player.location, 0);
        if (player.isInWater) {
            const filter = addRegimentalFilter(0, volume, 5, player.id);
            this.kokyuApplyDamage(player, filter, 10, 4, itemStack);
        } else {
            const filter = addRegimentalFilter(0, volume, 3.5, player.id);
            this.kokyuApplyDamage(player, filter, 5, 2, itemStack);
        }
        const num = system.runInterval(() => {
            if (player.isInWater) {
                const filter = addRegimentalFilter(0, volume, 5, player.id);
                this.kokyuApplyDamage(player, filter, 10, 4, itemStack);
            } else {
                const filter = addRegimentalFilter(0, volume, 3.5, player.id);
                this.kokyuApplyDamage(player, filter, 5, 2, itemStack);
            }
        },4);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },25);

    }

    /**
     * 漆ノ型 雫波紋突き
     */
    shitiNoKata(player:Player, itemStack:ItemStack) {

        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:mizu_kokyu7.value\"}]}");
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },5);

        const volume = getLookPoints(player.getRotation(), player.location, 3.5);
        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);
        player.dimension.spawnParticle("kurokumaft:mizu7_1_particle",volume,molang);
        player.dimension.spawnParticle("kurokumaft:mizu7_2_particle",volume,molang);
        const filter = addRegimentalFilter(0, volume, 2.5, player.id);
        this.kokyuApplyDamage(player, filter, 6, 3, itemStack);

    }

    /**
     * 捌ノ型 滝壺
     */
    hachiNoKata(player:Player, itemStack:ItemStack) {

        player.setProperty("kurokumaft:kokyu_use", false);
        if (!player.getDynamicProperty("kurokumaft:mizuhati")) {
            player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:mizu_kokyu8.value\"}]}");
            player.setDynamicProperty("kurokumaft:mizuhati", true);

            let oLocate = player.location;
            let volume = getLookPoints(player.getRotation(), player.location, 0);
            let num = system.runInterval(() => {
                player.teleport({x:player.location.x, y:player.location.y+0.5,z:player.location.z}, {
                    checkForBlocks: true
                });
            },2);
            let parnum = 0;

            system.runTimeout(() => {
                player.setProperty("kurokumaft:kokyu_particle", false);
                system.clearRun(num);
                let filter = addRegimentalFilter(0, volume, 6, player.id);

                const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
                const molang = new MolangVariableMap();
                molang.setFloat("variable.kaikyu", kaikyuNum);
                parnum = system.runInterval(() => {
                    player.dimension.spawnParticle("kurokumaft:mizu8_particle",{x:oLocate.x, y:oLocate.y+0.5,z:oLocate.z}, molang);
                    player.dimension.spawnParticle("kurokumaft:mizu_pillar_particle",{x:player.location.x+0.5, y:player.location.y-0.5,z:player.location.z+0.5}, molang);
                    player.dimension.spawnParticle("kurokumaft:mizu_pillar_particle",{x:player.location.x+0.5, y:player.location.y-0.5,z:player.location.z-0.5}, molang);
                    player.dimension.spawnParticle("kurokumaft:mizu_pillar_particle",{x:player.location.x-0.5, y:player.location.y-0.5,z:player.location.z+0.5}, molang);
                    player.dimension.spawnParticle("kurokumaft:mizu_pillar_particle",{x:player.location.x-0.5, y:player.location.y-0.5,z:player.location.z-0.5}, molang);
                    this.kokyuApplyDamage(player, filter, 6, 3, itemStack);
                },1);
    
            },25);
            system.runTimeout(() => {
                player.setDynamicProperty("kurokumaft:mizuhati", false);
                system.clearRun(parnum);
            },40);

        }
    }

    /**
     * 玖ノ型 水流飛沫・乱
     */
    kuNoKata(player:Player, itemStack:ItemStack) {

        if (player.getDynamicProperty("kurokumaft:chage_type") == undefined) {
            player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:mizu_kokyu9.value\"}]}");
            player.setDynamicProperty("kurokumaft:chage_type", true);
    
            player.addEffect(MinecraftEffectTypes.Speed, 10*TicksPerSecond,{
                amplifier: 5,
                showParticles: false
            });
            player.addEffect(MinecraftEffectTypes.JumpBoost, 10*TicksPerSecond,{
                amplifier: 3,
                showParticles: false
            });
            system.runTimeout(() => {
                player.setProperty("kurokumaft:kokyu_use", false);
                player.setProperty("kurokumaft:kokyu_particle", false);
                player.setDynamicProperty("kurokumaft:chage_type", undefined);
            },10*TicksPerSecond);
        }
    }

    /**
     * 拾ノ型 生生流転　発射
     */
    zyuNoKataShot(player:Player, itemStack:ItemStack) {

        let chage = player.getProperty("kurokumaft:kokyu_chage") as number;
        player.setProperty("kurokumaft:kokyu_use", false);
        if (chage == 4) {
            player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:mizu_kokyu10.value\"}]}");
            player.setProperty("kurokumaft:kokyu_chage", 10);
            system.runTimeout(() => {
                let dragon = shooting(player, "kurokumaft:mizu_dragon", 0, 3, undefined);
                player.setProperty("kurokumaft:kokyu_chage", 0);
                player.setProperty("kurokumaft:kokyu_particle", false);
                system.runTimeout(() => {
                    dragon.remove();
                }, 2*TicksPerSecond);
            },10);
        }

    }

    /**
     * 拾ノ型 生生流転
     */
    zyuNoKata(player:Player, itemStack:ItemStack) {

        let chage = player.getProperty("kurokumaft:kokyu_chage") as number;
        if (chage < 4) {
            player.setProperty("kurokumaft:kokyu_particle", true);

            if (chage+1 < 4) {
                system.runTimeout(() => {
                    chage = player.getProperty("kurokumaft:kokyu_chage") as number;
                    if (chage < 4) {
                        player.setProperty("kurokumaft:kokyu_particle", false);
                    }
                },14);
            }
            player.setProperty("kurokumaft:kokyu_chage", chage+1);
        }
        let volume = getLookPoints(player.getRotation(), player.location, 0);
        let filter = addRegimentalFilter(0, volume, 4.5, player.id);
        this.kokyuApplyDamage(player, filter, 6, 3, itemStack);
    }

    /**
     * 拾壱ノ型 凪
     */
    zyuichiNoKata(player:Player, itemStack:ItemStack) {

        if (player.getDynamicProperty("kurokumaft:chage_type") == undefined) {
            player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:mizu_kokyu11.value\"}]}");
            player.setDynamicProperty("kurokumaft:chage_type", true);

            this.nagiIntervalId = system.runInterval(() => {
                player.setProperty("kurokumaft:kokyu_attack", false);
                this.checkNagiReflection(player, itemStack);
            },2);

            const parnum = system.runInterval(() => {
                const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
                const molang = new MolangVariableMap();
                molang.setFloat("variable.kaikyu", kaikyuNum);
                player.dimension.spawnParticle("kurokumaft:mizu11_particle",player.location,molang);
            },TicksPerSecond);

            system.runTimeout(() => {
                player.setProperty("kurokumaft:kokyu_attack", false);
                player.setProperty("kurokumaft:kokyu_use", false);
                player.setProperty("kurokumaft:kokyu_particle", false);
                player.setDynamicProperty("kurokumaft:chage_type", undefined);
                system.clearRun(this.nagiIntervalId);
                system.clearRun(parnum);
            },10*TicksPerSecond);
        }
    }

    private nagiIntervalId: number =0;
    private checkNagiReflection(player: Player, itemStack:ItemStack): void {
        if (player.isValid()) {

            const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
            const volume = getLookPoints(player.getRotation(), player.location, 0);
            const projfilter = addProjectionFilter(0, volume, 4.5);

            const projectiles = player.dimension.getEntities(projfilter);
            projectiles.forEach(projectile => {
                projectile.clearVelocity();
                const projComp = projectile.getComponent(EntityComponentTypes.Projectile) as EntityProjectileComponent;
                if (projComp != undefined) {
                    projComp.shoot(projectile.getViewDirection(), {
                        uncertainty: 0
                    });
                    player.setProperty("kurokumaft:kokyu_attack", true);
                }
            });

            player.addTag(player.id);
            const filter = addRegimentalFilter(0, volume, 4.5, player.id);
            const targets = player.dimension.getEntities(filter);
            targets.forEach(en => {
                const view = en.getViewDirection();
                en.applyKnockback(-Math.round(view.x)*3,-Math.round(view.z)*3,3,0);
                if (en instanceof Player) {
                    if (this.gardCheck(en)) {
                        en.applyDamage(2*kaikyuNum, {
                            cause: EntityDamageCause.entityAttack,
                            damagingEntity: player
                        });
                    }
                } else {
                    en.applyDamage(6*kaikyuNum, {
                        cause: EntityDamageCause.entityAttack,
                        damagingEntity: player
                    });
                }
                player.setProperty("kurokumaft:kokyu_attack", true);
            });
            player.removeTag(player.id);

        } else {
            system.clearRun(this.nagiIntervalId);
        }
    };
   
}
