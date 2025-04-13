import { EntityDamageCause, ItemStack, MolangVariableMap, Player, system, TicksPerSecond, world } from "@minecraft/server";
import { addRegimentalFilter, getLookPoints, getLookRotaionPoints, weightChoice } from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";
import { shooting } from "../../common/ShooterEvent";

export class KaminariNoKata extends KataComonClass {

    /**
     * 壱ノ型 霹靂一閃
     */
    ichiNoKata(player:Player, itemStack:ItemStack) {
        player.setProperty("kurokumaft:kokyu_use", false);
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kaminari_kokyu1.value\"}]}");

        const point = getLookRotaionPoints(player.getRotation(), 1, 0);
        player.applyKnockback(point.x,point.z,15,0);

        const num = system.runInterval(() => {
            const filter = addRegimentalFilter(0, player.location, 2.5, player.id);
            this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
        },1);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },6);

    }
    /**
     * 壱ノ型 霹靂一閃 連
     */
    ichiNoKataRen(player:Player, itemStack:ItemStack) {

        player.setDynamicProperty("kurokumaft:attack_count", 0);
        player.addEffect(MinecraftEffectTypes.Speed, 5*TicksPerSecond,{
            amplifier: 10,
            showParticles: false
        });

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_chage", 0);
            player.setProperty("kurokumaft:kokyu_particle", false);
            player.setDynamicProperty("kurokumaft:chage_type", undefined);
            let chage = player.getDynamicProperty("kurokumaft:attack_count") as number;
            player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kaminari_kokyu1_rengeki.value\", \"with\":[\""+chage+"\"]}]}");
        },5*TicksPerSecond);

    }
    /**
     * 壱ノ型 霹靂一閃 連撃
     */
    ichiAttack(player:Player, itemStack:ItemStack) {

        const location = getLookPoints(player.getRotation(), player.location, 1.5)
        const filter = addRegimentalFilter(0, location, 3, player.id);
        this.kokyuApplyDamage(player, filter, 5, 2, itemStack);

    }

    /**
     * 壱ノ型 霹靂一閃 神速
     */
    ichiNoKataShinsoku(player:Player, itemStack:ItemStack) {

        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kaminari_kokyu1_shinsoku.value\"}]}");
        player.setProperty("kurokumaft:kokyu_use", false);
        player.setProperty("kurokumaft:kokyu_chage", 0);

        const location = getLookRotaionPoints(player.getRotation(), 1, 0);
        player.applyKnockback(location.x,location.z,50,0);

        const num = system.runInterval(() => {
            const filter = addRegimentalFilter(0, player.location, 3.5, player.id);
            this.kokyuApplyDamage(player, filter, 5, 2, itemStack);
        },1);

        system.runTimeout(() => {
            player.setDynamicProperty("kurokumaft:chage_type", undefined);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },12);

    }

    /**
     * 弐ノ型 稲魂
     */
    niNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kaminari_kokyu2.value\"}]}");

        const num = system.runInterval(() => {
            const location = getLookPoints(player.getRotation(), player.location, 1.5)
            const filter = addRegimentalFilter(0, location, 3, player.id);
            this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
        },4);
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },20);

    }

    /**
     * 参ノ型 聚蚊成雷
     */
    sanNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kaminari_kokyu3.value\"}]}");

        const num = system.runInterval(() => {
            const location = getLookPoints(player.getRotation(), player.location, 0);
            const filter = addRegimentalFilter(0, location, 6, player.id);
            this.kokyuApplyDamage(player, filter, 3, 1, itemStack);
        },2);
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },30);

    }

    /**
     * 肆ノ型 遠雷
     */
    shiNoKata(player:Player, itemStack:ItemStack) {
        player.setProperty("kurokumaft:kokyu_use", false);
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kaminari_kokyu4.value\"}]}");

        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);
        const num = system.runInterval(() => {
            const location = getLookPoints(player.getRotation(), player.location, 0);
            const filter = addRegimentalFilter(1, location, 10, player.id);
            this.kokyuApplyDamage(player, filter, 5, 2, itemStack);
    
            player.dimension.spawnParticle("kurokumaft:kaminari4_particle",player.location,molang);
        },2);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },20);

    }

    /**
     * 伍ノ型 熱界雷
     */
    goNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kaminari_kokyu5.value\"}]}");

        const nowloc = player.location;
        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);
        const num = system.runInterval(() => {
            player.dimension.spawnParticle("kurokumaft:kaminari5_particle",nowloc,molang);
        },1);

        shooting(player, "kurokumaft:kaminari_dragon_small", 0, 3, undefined);

        const location = getLookPoints(player.getRotation(), player.location, 0);
        const filter = addRegimentalFilter(1, location, 6, player.id);
        this.kokyuApplyDamage(player, filter, 5, 2, itemStack);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },10);

    }

    /**
     * 陸ノ型 電轟雷轟
     */
    rokuNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kaminari_kokyu6.value\"}]}");

        const point = getLookRotaionPoints(player.getRotation(), 1, 0);
        player.applyKnockback(point.x,point.z,0,0.8);

        player.addEffect(MinecraftEffectTypes.SlowFalling, 1*TicksPerSecond,{
            amplifier: 1,
            showParticles: false
        });

        const nowloc = player.location;
        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);
        const num = system.runInterval(() => {
            player.dimension.spawnParticle("kurokumaft:kaminari6_particle",nowloc,molang);
        },1);

        const location = getLookPoints(player.getRotation(), player.location, 0);
        const filter = addRegimentalFilter(1, location, 15, player.id);
        this.kokyuApplyDamage(player, filter, 8, 4, itemStack);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },10);

    }

    /**
     * 漆ノ型 火雷神
     */
    shitiNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kaminari_kokyu7.value\"}]}");
        player.setProperty("kurokumaft:kokyu_use", false);
        player.setProperty("kurokumaft:kokyu_chage", 0);
        player.setDynamicProperty("kurokumaft:chage_type", undefined);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
        },20);

        const location = getLookPoints(player.getRotation(), player.location, 0)
        let filter = addRegimentalFilter(1, location, 30, player.id);

        const targets = player.dimension.getEntities(filter);
        if (targets.length > 0) {
            player.teleport(targets[0].location, {
                facingLocation: targets[0].location,
            });
        }

        filter = addRegimentalFilter(0, player.location, 6, player.id);
        this.kokyuApplyDamage(player, filter, 20, 6, itemStack);

    }

}
