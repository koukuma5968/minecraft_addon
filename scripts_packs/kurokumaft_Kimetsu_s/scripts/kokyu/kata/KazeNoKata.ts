import { ItemStack, MolangVariableMap, Player, system, TicksPerSecond } from "@minecraft/server";
import { addRegimentalFilter, getDistanceLocation, getLookLocationDistance, getLookLocationDistancePitch, getRandomInRange } from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export class KazeNoKata extends KataComonClass {

    /**
     * 壱ノ型 塵旋風・削ぎ
     */
    ichiNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaze_kokyu1.value"}]});
        player.setProperty("kurokumaft:kokyu_use", false);

        const distance = getLookLocationDistance(player.getRotation().y, 1, 0, 0);
        player.applyKnockback(distance.x,distance.z,30,0);

        const num = system.runInterval(() => {
            const filter = addRegimentalFilter(0, player.location, 3.5, player.id);
            this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
        },1);

        system.runTimeout(() => {
            player.setDynamicProperty("kurokumaft:chage_type", undefined);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },12);

    }

    /**
     * 弐ノ型 爪々・科戸風
     */
    niNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaze_kokyu2.value"}]});

        // fornt
        const distance = getLookLocationDistancePitch(player.getRotation(), 2.5, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 3, player.id);
        this.kokyuApplyDamage(player, filter, 4, 1, itemStack);

        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        player.dimension.spawnParticle("kurokumaft:kaze2_particle", getDistanceLocation(player.location, distance), molang);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },10);

    }

    /**
     * 参ノ型 晴嵐風樹
     */
    sanNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaze_kokyu3.value"}]});

        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const num = system.runInterval(() => {
            const distance = getLookLocationDistancePitch(player.getRotation(), 1.5, 0);
            const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 3, player.id);
            this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
            player.dimension.spawnParticle("kurokumaft:kaze3_particle", getDistanceLocation(player.location, distance), molang);
        },2);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },30);

    }

    /**
     * 肆ノ型 昇上砂塵嵐
     */
    shiNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaze_kokyu4.value"}]});

        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const num = system.runInterval(() => {
            const distance = getLookLocationDistance(player.getRotation().y, 0, 0, 4);
            const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 5, player.id);
            this.kokyuApplyDamage(player, filter, 2, 1, itemStack);

            player.dimension.spawnParticle("kurokumaft:kaze4_particle", player.location, molang);
            this.checkSazinReflection(player);
        },2);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
            player.setProperty("kurokumaft:kokyu_use", false);
            system.clearRun(this.sazinIntervalId);
            system.clearRun(num);
        },40);

    }

    private sazinIntervalId: number =0;
    private checkSazinReflection(player: Player): void {
        if (player.isValid()) {

            this.projectRefrect(player, player.location);

            player.addTag(player.id);
            const filter = addRegimentalFilter(0, player.location, 5, player.id);
            const targets = player.dimension.getEntities(filter);
            targets.forEach(en => {
                const view = en.getViewDirection();
                en.applyKnockback(-Math.round(player.location.x-view.x),-Math.round(player.location.z-view.z),3,1);
            });
            player.removeTag(player.id);

        } else {
            system.clearRun(this.sazinIntervalId);
        }
    };

    /**
     * 伍ノ型 木枯らし颪
     */
    goNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaze_kokyu5.value"}]});

        const distance = getLookLocationDistance(player.getRotation().y, 0, 0, 1);
        player.applyKnockback(distance.x,distance.z,0,1);

        const num = system.runInterval(() => {
            const distance = getLookLocationDistance(player.getRotation().y, 2.5, 0, -1.5);
            const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 5, player.id);
            this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
        },2);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
            player.setProperty("kurokumaft:kokyu_use", false);
            system.clearRun(num);
        },30);

    }

    /**
     * 陸ノ型 黒風烟嵐
     */
    rokuNoKata(player:Player, itemStack:ItemStack) {

        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaze_kokyu6.value"}]});

        const distance = getLookLocationDistance(player.getRotation().y, 1.5, 0, 0);
        const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 3, player.id);
        this.kokyuApplyDamage(player, filter, 3, 1, itemStack);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },15);

    }

    /**
     * 漆ノ型 勁風・天狗風
     */
    shitiNoKata(player:Player, itemStack:ItemStack) {

        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaze_kokyu7.value"}]});

        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        for (let i=0; i<=6; i++) {
            const side = getRandomInRange(-4, 4);
            const around = getRandomInRange(-4, 4);
            const distance = getLookLocationDistance(player.getRotation().y, around, side, 0);
            player.dimension.spawnParticle("kurokumaft:kaze7_particle",getDistanceLocation(player.location, distance), molang);
        }

        const num = system.runInterval(() => {
            const filter = addRegimentalFilter(0, player.location, 4.5, player.id);
            this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
        },4);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },20);

    }

    /**
     * 捌ノ型 初烈風斬り
     */
    hachiNoKata(player:Player, itemStack:ItemStack) {

        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaze_kokyu8.value"}]});

        const num = system.runInterval(() => {
            const filter = addRegimentalFilter(0, player.location, 4, player.id);
            this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
 
            const distance = getLookLocationDistance(player.getRotation().y, 2, 0, 0);
            player.applyKnockback(distance.x,distance.z,10,0);

        },4);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },40);
    }

    /**
     * 玖ノ型 韋駄天台風
     */
    kuNoKata(player:Player, itemStack:ItemStack) {

        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaze_kokyu9.value"}]});

        const distance = getLookLocationDistance(player.getRotation().y, 0, 0, 1);
        player.applyKnockback(distance.x,distance.z,0,1);

        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const num = system.runInterval(() => {
            const distance = getLookLocationDistance(player.getRotation().y, 3, 0, -1);
            const filter = addRegimentalFilter(0, getDistanceLocation(player.location, distance), 5, player.id);
            this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
            player.dimension.spawnParticle("kurokumaft:kaze3_particle",getDistanceLocation(player.location, distance), molang);
        },2);

        player.addEffect(MinecraftEffectTypes.SlowFalling, 2*TicksPerSecond,{
            amplifier: 1,
            showParticles: false
        });

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },40);
    }

}
