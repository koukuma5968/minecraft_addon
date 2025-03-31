import { EntityDamageCause, ItemStack, Player, system, TicksPerSecond, world } from "@minecraft/server";
import { addRegimentalFilter, getLookPoints, getLookRotaionPoints, weightChoice } from "../../common/KimetuCommonUtil";
import { ZytuComonClass } from "./ZytuComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";
import { shooting } from "../../common/ShooterEvent";

export class Kouri extends ZytuComonClass {

    /**
     * 蓮葉氷
     */
    ichi(player:Player, itemStack:ItemStack) {
        player.setProperty("kurokumaft:kokyu_use", false);
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kekkizyutu_kouri1.value\"}]}");
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
        },6);

        let location = getLookPoints(player.getRotation(), player.location, 1.5)
        let filter = addRegimentalFilter(0, location, 2.5, player.id);
        this.kokyuApplyDamage(player, filter, 4, 2, itemStack);

    }

    /**
     * 枯園垂り
     */
    niNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kekkizyutu_kouri2.value\"}]}");
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
     * 枯園垂り
     */
    sanNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kekkizyutu_kouri3.value\"}]}");
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },30);

        // 左
        let left = getLookRotaionPoints(player.getRotation(), 1.5, -1.5);
        let lvolume = getLookPoints(player.getRotation(), {x:player.location.x+left.x, y:player.location.y,z:player.location.z+left.z}, 0);
        let lfilter = addRegimentalFilter(0, lvolume, 3, player.id);
        this.kokyuApplyDamage(player, lfilter, 2, 1, itemStack);
        system.runTimeout(() => {
            // 右
            let right = getLookRotaionPoints(player.getRotation(), 1.5, 1.5);
            let rvolume = getLookPoints(player.getRotation(), {x:player.location.x+right.x, y:player.location.y,z:player.location.z+right.z}, 0);
            let rfilter = addRegimentalFilter(0, rvolume, 3, player.id);
            this.kokyuApplyDamage(player, rfilter, 2, 1, itemStack);
        }, 10);
        system.runTimeout(() => {
            // 中央
            let cvolume = getLookPoints(player.getRotation(), player.location, 1.5);
            let cfilter = addRegimentalFilter(0, cvolume, 3, player.id);
            this.kokyuApplyDamage(player, cfilter, 2, 1, itemStack);
        }, 20);

    }

    /**
     * 凍て曇
     */
    shiNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kekkizyutu_kouri4.value\"}]}");
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
            player.setProperty("kurokumaft:kokyu_use", false);
        },20);

        // 左
        let left = getLookRotaionPoints(player.getRotation(), 1.5, -2);
        let lvolume = getLookPoints(player.getRotation(), {x:player.location.x+left.x, y:player.location.y+1,z:player.location.z+left.z}, 0);
        let lfilter = addRegimentalFilter(0, lvolume, 3.5, player.id);
        player.dimension.spawnParticle("kurokumaft:mizu2_particle",lvolume)
        this.kokyuApplyDamage(player, lfilter, 3, 1, itemStack);

        system.waitTicks(20);

       // 右
        let right = getLookRotaionPoints(player.getRotation(), 1.5, 2);
        let rvolume = getLookPoints(player.getRotation(), {x:player.location.x+right.x, y:player.location.y+1,z:player.location.z+right.z}, 0);
        let rfilter = addRegimentalFilter(0, rvolume, 3.5, player.id);
        player.dimension.spawnParticle("kurokumaft:mizu2_particle",rvolume)
        this.kokyuApplyDamage(player, rfilter, 3, 1, itemStack);

    }

    /**
     * 蔓蓮華
     */
    goNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kekkizyutu_kouri5.value\"}]}");

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
            player.setProperty("kurokumaft:kokyu_use", false);
        },4);

        let goKataLists = weightChoice([
            { item: 'small' , weight: 55 },
            { item: 'lage' , weight: 40 },
            { item: 'kill' , weight: 5 },
        ]);
       
        let volume = getLookPoints(player.getRotation(), player.location, 1.5)
        let filter = addRegimentalFilter(1, volume, 3, player.id);

        let targets = player.dimension.getEntities(filter);
        targets.forEach(en => {
            let choice = goKataLists.pick();
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
        player.dimension.spawnParticle("kurokumaft:mizu5_particle",player.location);
        player.dimension.spawnParticle("kurokumaft:mizu5_particle",player.location);

    }

    /**
     * 寒烈の白姫
     */
    rokuNoKata(player:Player, itemStack:ItemStack) {

        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kekkizyutu_kouri6.value\"}]}");

        let volume = getLookPoints(player.getRotation(), player.location, 0);
        if (player.isInWater) {
            let filter = addRegimentalFilter(0, volume, 5, player.id);
            this.kokyuApplyDamage(player, filter, 10, 4, itemStack);
        } else {
            let filter = addRegimentalFilter(0, volume, 3.5, player.id);
            this.kokyuApplyDamage(player, filter, 5, 2, itemStack);
        }
        let num = system.runInterval(() => {
            if (player.isInWater) {
                let filter = addRegimentalFilter(0, volume, 5, player.id);
                this.kokyuApplyDamage(player, filter, 10, 4, itemStack);
            } else {
                let filter = addRegimentalFilter(0, volume, 3.5, player.id);
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
     * 冬ざれ氷柱
     */
    shitiNoKata(player:Player, itemStack:ItemStack) {

        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kekkizyutu_kouri7.value\"}]}");
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },5);

        let volume = getLookPoints(player.getRotation(), player.location, 3.5);
        player.dimension.spawnParticle("kurokumaft:mizu7_1_particle",volume);
        player.dimension.spawnParticle("kurokumaft:mizu7_2_particle",volume);
        let filter = addRegimentalFilter(0, volume, 2.5, player.id);
        this.kokyuApplyDamage(player, filter, 6, 3, itemStack);

    }

    /**
     * 散り蓮華
     */
    hachiNoKata(player:Player, itemStack:ItemStack) {

        player.setProperty("kurokumaft:kokyu_use", false);
        if (!player.getDynamicProperty("kurokumaft:mizuhati")) {
            player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kekkizyutu_kouri8.value\"}]}");
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

                parnum = system.runInterval(() => {
                    player.dimension.spawnParticle("kurokumaft:mizu8_particle",{x:oLocate.x, y:oLocate.y+0.5,z:oLocate.z});
                    player.dimension.spawnParticle("kurokumaft:mizu_pillar_particle",{x:player.location.x+0.5, y:player.location.y-0.5,z:player.location.z+0.5});
                    player.dimension.spawnParticle("kurokumaft:mizu_pillar_particle",{x:player.location.x+0.5, y:player.location.y-0.5,z:player.location.z-0.5});
                    player.dimension.spawnParticle("kurokumaft:mizu_pillar_particle",{x:player.location.x-0.5, y:player.location.y-0.5,z:player.location.z+0.5});
                    player.dimension.spawnParticle("kurokumaft:mizu_pillar_particle",{x:player.location.x-0.5, y:player.location.y-0.5,z:player.location.z-0.5});
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
     * 結晶ノ御子
     */
    kuNoKata(player:Player, itemStack:ItemStack) {

        if (player.getDynamicProperty("kurokumaft:chage_type") == undefined) {
            player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kekkizyutu_kouri9.value\"}]}");
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
     * 霧氷・睡蓮菩薩
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

}
