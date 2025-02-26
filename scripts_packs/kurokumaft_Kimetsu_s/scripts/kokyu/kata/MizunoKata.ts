import { EntityDamageCause, Player, system, TicksPerSecond, world } from "@minecraft/server";
import { addRegimentalFilter, getLookPoints, getLookRotaionPoints, weightChoice } from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export class MizunoKata extends KataComonClass {

    /**
     * 壱ノ型 水面切り
     */
    ichinokata(player:Player) {
        let location = getLookPoints(player.getRotation(), player.location, 1.5)
        let filter = addRegimentalFilter(0, location, 2.5);
        this.kokyuApplyDamage(player, filter, 5, 2);
    }

    /**
     * 弐ノ型 水車
     */
    ninokata(player:Player) {
        // fornt
        let location = getLookPoints(player.getRotation(), player.location, 2.5);
        let filter = addRegimentalFilter(0, location, 1.5);
        this.kokyuApplyDamage(player, filter, 3, 1);
        // back
        location = getLookPoints(player.getRotation(), player.location, -2.5);
        filter = addRegimentalFilter(0, location, 1.5);
        this.kokyuApplyDamage(player, filter, 3, 1);
        // up
        location = getLookPoints(player.getRotation(), {x:player.location.x, y:player.location.y+2.5,z:player.location.z}, 0);
        filter = addRegimentalFilter(0, location, 1.5);
        this.kokyuApplyDamage(player, filter, 3, 1);
        // down
        location = getLookPoints(player.getRotation(), {x:player.location.x, y:player.location.y-2.5,z:player.location.z}, 0);
        filter = addRegimentalFilter(0, location, 1.5);
        this.kokyuApplyDamage(player, filter, 3, 1);
    }

    /**
     * 参ノ型 流流舞い
     */
    sannokata(player:Player) {
        // 右
        let right = getLookRotaionPoints(player.getRotation(), 1.5, 1.5);
        let rvolume = getLookPoints(player.getRotation(), {x:right.x, y:player.location.y,z:right.z}, 0);
        let rfilter = addRegimentalFilter(0, rvolume, 1.5);
        this.kokyuApplyDamage(player, rfilter, 2, 1);
        // 中央
        let center = getLookRotaionPoints(player.getRotation(), 1.5, 0);
        let cvolume = getLookPoints(player.getRotation(), {x:center.x, y:player.location.y,z:center.z}, 0);
        let cfilter = addRegimentalFilter(0, cvolume, 1.5);
        this.kokyuApplyDamage(player, cfilter, 2, 1);
        // 左
        let left = getLookRotaionPoints(player.getRotation(), 1.5, -1.5);
        let lvolume = getLookPoints(player.getRotation(), {x:left.x, y:player.location.y,z:left.z}, 0);
        let lfilter = addRegimentalFilter(0, lvolume, 1.5);
        this.kokyuApplyDamage(player, lfilter, 2, 1);
    }

    /**
     * 肆ノ型 打ち潮
     */
    shinokata(player:Player) {
        // 右
        let right = getLookRotaionPoints(player.getRotation(), 1.5, 2);
        let rvolume = getLookPoints(player.getRotation(), {x:right.x, y:player.location.y,z:right.z}, 0);
        let rfilter = addRegimentalFilter(0, rvolume, 1.5);
        player.dimension.spawnParticle("kurokumaft:mizu2_particle",rvolume)
        this.kokyuApplyDamage(player, rfilter, 3, 1);

        // 左
        let left = getLookRotaionPoints(player.getRotation(), 1.5, -2);
        let lvolume = getLookPoints(player.getRotation(), {x:left.x, y:player.location.y,z:left.z}, 0);
        let lfilter = addRegimentalFilter(0, lvolume, 1.5);
        player.dimension.spawnParticle("kurokumaft:mizu2_particle",lvolume)
        this.kokyuApplyDamage(player, lfilter, 3, 1);
    }

    /**
     * 伍ノ型 干天の慈雨
     */
    gonokata(player:Player) {

        let goKataLists = weightChoice([
            { item: 'small' , weight: 50 },
            { item: 'lage' , weight: 30 },
            { item: 'kill' , weight: 1 },
        ]);
       
        let volume = getLookPoints(player.getRotation(), player.location, 1.5)
        let filter = addRegimentalFilter(1, volume, 1.5);

        let targets = player.dimension.getEntities(filter);
        targets.forEach(en => {
            let choice = goKataLists.pick();
            switch (choice.item) {
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
     * 陸ノ型 ねじれ渦
     */
    rokunokata(player:Player) {
        let volume = getLookPoints(player.getRotation(), player.location, 0);
        player.dimension.spawnParticle("kurokumaft:mizu6_particle",player.location);
        if (player.isInWater) {
            let filter = addRegimentalFilter(0, volume, 5);
            this.kokyuApplyDamage(player, filter, 10, 4);
        } else {
            let filter = addRegimentalFilter(0, volume, 3.5);
            this.kokyuApplyDamage(player, filter, 5, 2);
        }
    }

    /**
     * 漆ノ型 雫波紋突き
     */
    shitinokata(player:Player) {
        let volume = getLookPoints(player.getRotation(), player.location, 3.5);
        player.dimension.spawnParticle("kurokumaft:mizu7_1_particle",volume);
        player.dimension.spawnParticle("kurokumaft:mizu7_2_particle",volume);
        let filter = addRegimentalFilter(0, volume, 2);
        this.kokyuApplyDamage(player, filter, 6, 3);
    }

    /**
     * 捌ノ型 滝壺
     */
    hachinokata(player:Player) {
        let num = system.runInterval(() => {
            player.teleport({x:player.location.x, y:player.location.y+0.5,z:player.location.z}, {
                checkForBlocks: true
            });
        },2);
        system.runTimeout(() => {
            system.clearRun(num);
            let volume = getLookPoints(player.getRotation(), player.location, 2.5);
            player.dimension.spawnParticle("kurokumaft:mizu8_particle",{x:player.location.x, y:player.location.y-1.5,z:player.location.z});
            let filter = addRegimentalFilter(0, volume, 2);
            this.kokyuApplyDamage(player, filter, 4, 2);
            system.waitTicks(2);
            this.kokyuApplyDamage(player, filter, 4, 2);
            system.waitTicks(2);
            this.kokyuApplyDamage(player, filter, 4, 2);
    
        },10);
    }

    /**
     * 玖ノ型 水流飛沫・乱
     */
    kunokata(player:Player) {
        let num = system.runInterval(() => {
            player.dimension.spawnParticle("kurokumaft:mizu_splash_particle",player.location);
        },2);
        player.addEffect(MinecraftEffectTypes.Speed, 10*TicksPerSecond,{
            amplifier: 5,
            showParticles: false
        });
        player.addEffect(MinecraftEffectTypes.JumpBoost, 10*TicksPerSecond,{
            amplifier: 3,
            showParticles: false
        });
        system.runTimeout(() => {
            system.clearRun(num);
        },10*TicksPerSecond);
    }

    /**
     * 拾ノ型 生生流転
     */
    zyunokata(player:Player) {
        let volume = getLookPoints(player.getRotation(), player.location, 0);
        let filter = addRegimentalFilter(0, volume, 3.5);
        this.kokyuApplyDamage(player, filter, 6, 3);
        player.dimension.spawnParticle("kurokumaft:mizu10_particle",player.location);
    }

}
