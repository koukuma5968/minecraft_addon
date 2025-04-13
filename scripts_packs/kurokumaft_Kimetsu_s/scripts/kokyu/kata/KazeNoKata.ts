import { EntityComponentTypes, EntityDamageCause, EntityProjectileComponent, ItemStack, MolangVariableMap, Player, system, TicksPerSecond } from "@minecraft/server";
import { addProjectionFilter, addRegimentalFilter, getLookPoints, getLookRotaionPoints, getRandomInRange, weightChoice } from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export class KazeNoKata extends KataComonClass {

    /**
     * 壱ノ型 塵旋風・削ぎ
     */
    ichiNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kaze_kokyu1.value\"}]}");
        player.setProperty("kurokumaft:kokyu_use", false);

        const location = getLookRotaionPoints(player.getRotation(), 1, 0);
        player.applyKnockback(location.x,location.z,30,0);

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
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kaze_kokyu2.value\"}]}");

        // fornt
        const location = getLookPoints(player.getRotation(), player.location, 2.5);
        const filter = addRegimentalFilter(0, location, 3, player.id);
        this.kokyuApplyDamage(player, filter, 4, 1, itemStack);

        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        player.dimension.spawnParticle("kurokumaft:kaze2_particle",location, molang);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },10);

    }

    /**
     * 参ノ型 晴嵐風樹
     */
    sanNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kaze_kokyu3.value\"}]}");

        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const num = system.runInterval(() => {
            const location = getLookPoints(player.getRotation(), player.location, 1.5);
            const filter = addRegimentalFilter(0, location, 3, player.id);
            this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
            player.dimension.spawnParticle("kurokumaft:kaze3_particle",location, molang);
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
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kaze_kokyu4.value\"}]}");

        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const num = system.runInterval(() => {
            const location = getLookPoints(player.getRotation(), player.location, 0);
            const filter = addRegimentalFilter(0, location, 5, player.id);
            this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
            player.dimension.spawnParticle("kurokumaft:kaze4_particle",location, molang);
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

            const volume = getLookPoints(player.getRotation(), player.location, 0);
            this.projectRefrect(player, volume);

            player.addTag(player.id);
            const filter = addRegimentalFilter(0, volume, 5, player.id);
            const targets = player.dimension.getEntities(filter);
            targets.forEach(en => {
                const view = en.getViewDirection();
                en.applyKnockback(-Math.round(view.x)*3,-Math.round(view.z)*3,3,1);
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
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kaze_kokyu5.value\"}]}");

        const point = getLookRotaionPoints(player.getRotation(), 0, 0);
        player.applyKnockback(point.x,point.z,0,1);

        const num = system.runInterval(() => {
            const location = getLookPoints(player.getRotation(), player.location, 3);
            const filter = addRegimentalFilter(0, location, 5, player.id);
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

        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kaze_kokyu6.value\"}]}");

        const location = getLookPoints(player.getRotation(), player.location, 1.5);
        const filter = addRegimentalFilter(0, location, 3, player.id);
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

        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kaze_kokyu7.value\"}]}");

        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        for (let i=0; i<=6; i++) {
            const side = getRandomInRange(-4, 4);
            const around = getRandomInRange(-4, 4);
            const point = getLookRotaionPoints(player.getRotation(), around, side);
            const particleVol = getLookPoints(player.getRotation(), {x:player.location.x+point.x, y:player.location.y,z:player.location.z+point.z}, 0);
            player.dimension.spawnParticle("kurokumaft:kaze7_particle",particleVol, molang);
        }

        const num = system.runInterval(() => {
            const volume = getLookPoints(player.getRotation(), player.location, 0);
            const filter = addRegimentalFilter(0, volume, 4.5, player.id);
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

        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kaze_kokyu8.value\"}]}");

        const num = system.runInterval(() => {
            let location = getLookPoints(player.getRotation(), player.location, 0)
            let filter = addRegimentalFilter(0, location, 4, player.id);
            this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
 
            let point = getLookRotaionPoints(player.getRotation(), 2, 0);
            player.applyKnockback(point.x,point.z,10,0);

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

        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kaze_kokyu9.value\"}]}");

        const point = getLookRotaionPoints(player.getRotation(), 0, 0);
        player.applyKnockback(point.x,point.z,0,1);

        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const num = system.runInterval(() => {
            const location = getLookPoints(player.getRotation(), player.location, 3);
            const filter = addRegimentalFilter(0, location, 5, player.id);
            this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
            player.dimension.spawnParticle("kurokumaft:kaze3_particle",location, molang);
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
