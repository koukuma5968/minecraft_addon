import { EquipmentSlot, ItemStack, MolangVariableMap, Player, system, TicksPerSecond } from "@minecraft/server";
import { addRegimentalFilter, getDistanceLocation, getLookLocationDistance, getLookLocationDistancePitch, isTargetInFront} from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";
import { ItemDurabilityDamage } from "../../common/KimetuItemDurabilityDamage";

export class HiNoKata extends KataComonClass {

    /**
     * 壱ノ型 円舞
     */
    ichiNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu1.value"}]});

        const distance = getLookLocationDistance(player.getRotation().y, 2.5, 0, 0.5);
        const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 3, player.id);
        this.kokyuApplyDamage(player, filter, 4, 1, itemStack);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
        },2);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
        },15);

    }

    /**
     * 壱ノ型 円舞一閃
     */
    ichiNoKataIssen(player:Player, itemStack:ItemStack) {

        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu1_issen.value"}]});
        player.setProperty("kurokumaft:kokyu_use", false);
        player.setProperty("kurokumaft:kokyu_chage", 0);

        const distance = getLookLocationDistance(player.getRotation().y, 1, 0, 0);
        player.applyKnockback(distance.x,distance.z,30,0);

        const num = system.runInterval(() => {
            const filter = addRegimentalFilter(0, player.location, 3.5, player.id);
            this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
        },1);

        system.runTimeout(() => {
            player.setDynamicProperty("kurokumaft:chage_type", undefined);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },12);

    }

    /**
     * 弐ノ型 碧羅の天
     */
    niNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu2.value"}]});

        const distance = getLookLocationDistance(player.getRotation().y, 2.5, 0, 0.5);
        const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 3, player.id);
        this.kokyuApplyDamage(player, filter, 6, 2, itemStack);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },7);

    }

    /**
     * 参ノ型 烈日紅鏡
     */
    sanNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu3.value"}]});

        // 左
        const ldistance = getLookLocationDistance(player.getRotation().y, 1.5, -1.5, 1);
        const lfilter = addRegimentalFilter(0, getDistanceLocation(player.location, ldistance), 3, player.id);
        this.kokyuApplyDamage(player, lfilter, 3, 1, itemStack);

        system.runTimeout(() => {
            // 右
            const rdistance = getLookLocationDistance(player.getRotation().y, 1.5, 1.5, 1);
            const rfilter = addRegimentalFilter(0, getDistanceLocation(player.location, rdistance), 3, player.id);
            this.kokyuApplyDamage(player, rfilter, 3, 1, itemStack);
        }, 15);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },25);
    }

    /**
     * 肆ノ型 灼骨炎陽
     */
    shiNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu4.value"}]});

        let z = 0;
        const num = system.runInterval(() => {
            const distance = getLookLocationDistance(player.getRotation().y, z, 0, 0.5);
            const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 3, player.id);
            this.kokyuApplyDamage(player, filter, 6, 2, itemStack);
            z++;
        },4);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },30);

     }

    /**
     * 伍ノ型 陽華突
     */
    goNoKata(player:Player, itemStack:ItemStack) {

        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu5.value"}]});

        player.setProperty("kurokumaft:kokyu_use", false);

        const distance = getLookLocationDistancePitch(player.getRotation(), 3.5, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 3.5, player.id);
        this.kokyuApplyDamage(player, filter, 6, 2, itemStack);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
        },5);

    }

    /**
     * 陸ノ型 日暈の龍 頭舞い
     */
    rokuNoKata(player:Player, itemStack:ItemStack) {

        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu6.value"}]});
        player.setDynamicProperty("kurokumaft:chage_type", true);
        player.setProperty("kurokumaft:kokyu_chage", 1);

        player.addEffect(MinecraftEffectTypes.Speed, 5*TicksPerSecond,{
            amplifier: 6,
            showParticles: false
        });

        player.setProperty("kurokumaft:kokyu_attack", true);
        let side = 2;
        const num = system.runInterval(() => {
            const filter = addRegimentalFilter(0, player.location, 4, player.id);
            this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
 
            const distance = getLookLocationDistance(player.getRotation().y, 2, side, 0);
            player.applyKnockback(distance.x,distance.z,5,0);


            side = -side;
        },4);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_attack", false);
            player.setProperty("kurokumaft:kokyu_chage", 0);
            player.setProperty("kurokumaft:kokyu_particle", false);
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setDynamicProperty("kurokumaft:chage_type", undefined);
            system.clearRun(num);
        },5*TicksPerSecond);
    }

    /**
     * 漆ノ型 斜陽転身
     */
    shitiNoKata(player:Player, itemStack:ItemStack) {

        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu7.value"}]});

        const distance = getLookLocationDistance(player.getRotation().y, -3, 0, 1);
        player.applyKnockback(distance.x,distance.z,1,0.6);

        const distance2 = getLookLocationDistance(player.getRotation().y, 3, 0, -1);
        const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance2), 4, player.id);
        this.kokyuApplyDamage(player, filter, 6, 3, itemStack);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },15);

    }

    /**
     * 捌ノ型 飛輪陽炎
     */
    hachiNoKata(player:Player, itemStack:ItemStack) {

        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu8.value"}]});

        const distance = getLookLocationDistance(player.getRotation().y, 3.5, 0, 0.5);
        const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 4, player.id);
        this.kokyuApplyDamage(player, filter, 6, 3, itemStack);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },15);
    }

    /**
     * 玖ノ型 輝輝恩光
     */
    kuNoKata(player:Player, itemStack:ItemStack) {

        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu9.value"}]});

        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const num = system.runInterval(() => {
            player.dimension.spawnParticle("kurokumaft:hi9_particle", player.location, molang);
        },1);

        const distance = getLookLocationDistance(player.getRotation().y, 1.5, 0, 0.5);
        const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 2, player.id);
        this.kokyuApplyDamage(player, filter, 6, 3, itemStack);

        const udistance = getLookLocationDistance(player.getRotation().y, 1.5, 0, 3);
        const ufilter = addRegimentalFilter(0, getDistanceLocation(player.location, udistance), 3, player.id);
        this.kokyuApplyDamage(player, ufilter, 6, 3, itemStack);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },20);

    }

    /**
     * 拾ノ型 火車
     */
    zyuNoKata(player:Player, itemStack:ItemStack) {

        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu10.value"}]});

        // fornt
        const fdistance = getLookLocationDistance(player.getRotation().y, 2.5, 0, 0);
        const ffilter = addRegimentalFilter(0, getDistanceLocation(player.location, fdistance), 2.5, player.id);
        this.kokyuApplyDamage(player, ffilter, 6, 3, itemStack);
        // back
        const bdistance = getLookLocationDistance(player.getRotation().y, -2.5, 0, 0);
        const bfilter = addRegimentalFilter(0, getDistanceLocation(player.location, bdistance), 2.5, player.id);
        this.kokyuApplyDamage(player, bfilter, 6, 3, itemStack);
        // up
        const udistance = getLookLocationDistance(player.getRotation().y, 0, 0, 2.5);
        const ufilter = addRegimentalFilter(0, getDistanceLocation(player.location, udistance), 2.5, player.id);
        this.kokyuApplyDamage(player, ufilter, 6, 3, itemStack);
        // down
        const ddistance = getLookLocationDistance(player.getRotation().y, 0, 0, -2.5);
        const dfilter = addRegimentalFilter(0, getDistanceLocation(player.location, ddistance), 2.5, player.id);
        this.kokyuApplyDamage(player, dfilter, 6, 3, itemStack);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },15);
    }

    /**
     * 拾壱ノ型 幻日虹
     */
    zyuichiNoKata(player:Player, itemStack:ItemStack) {

        if (player.getDynamicProperty("kurokumaft:chage_type") == undefined) {
            player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu11.value"}]});
            player.setDynamicProperty("kurokumaft:chage_type", true);

            player.triggerEvent("kurokumaft:add_damage_clear");

            this.gennitiIntervalId = system.runInterval(() => {
                this.checkGennitiMove(player, itemStack);
            },2);

            const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
            const molang = new MolangVariableMap();
            molang.setFloat("variable.kaikyu", kaikyuNum);
    
            const num = system.runInterval(() => {
                player.dimension.spawnParticle("kurokumaft:hi_heat_haze_particle", player.location, molang);
            },1);
    
            system.runTimeout(() => {
                player.setProperty("kurokumaft:kokyu_attack", false);
                player.setProperty("kurokumaft:kokyu_use", false);
                player.setProperty("kurokumaft:kokyu_particle", false);
                player.setDynamicProperty("kurokumaft:chage_type", undefined);
                system.clearRun(this.gennitiIntervalId);
                system.clearRun(num);
                player.triggerEvent("kurokumaft:remove_damage_clear");
            },10*TicksPerSecond);
        }
    }

    private gennitiIntervalId: number =0;
    private checkGennitiMove(player: Player, itemStack:ItemStack): void {
        if (player.isValid()) {
            const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
            const molang = new MolangVariableMap();
            molang.setFloat("variable.kaikyu", kaikyuNum);

            if (this.projectRefrect(player, player.location)) {
                player.dimension.spawnParticle("kurokumaft:hi11_particle",player.location,molang);
            }

            player.addTag(player.id);
            const filter = addRegimentalFilter(1, player.location, 2.5, player.id);
            const targets = player.dimension.getEntities(filter);
            targets.forEach(en => {
                player.dimension.spawnParticle("kurokumaft:hi11_particle",player.location,molang);
            });
            player.removeTag(player.id);

        } else {
            system.clearRun(this.gennitiIntervalId);
        }
    };

    /**
     * 拾弐ノ型 炎舞
     */
    zyuniNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kokyu12.value"}]});

        const distance = getLookLocationDistance(player.getRotation().y, 2.5, 0, 0.5);
        const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 3, player.id);
        this.kokyuApplyDamage(player, filter, 6, 3, itemStack);

        system.runTimeout(() => {
            this.kokyuApplyDamage(player, filter, 6, 3, itemStack);
        }, 10);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },10);
    }
    
}
