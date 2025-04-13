import { ExplosionOptions, ItemStack, MolangVariableMap, Player, system, TicksPerSecond } from "@minecraft/server";
import { addRegimentalFilter, getLookPoints, getLookRotaionPoints } from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { shooting } from "../../common/ShooterEvent";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export class OtoNoKata extends KataComonClass {

    /**
     * 壱ノ型 轟
     */
    ichiNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:oto_kokyu1.value\"}]}");

        const location = getLookPoints(player.getRotation(), player.location, 1.5)
        const filter = addRegimentalFilter(1, location, 3, player.id);
        this.kokyuApplyDamage(player, filter, 3, 1, itemStack);

        const option = {
            allowUnderwater: true,
            breaksBlocks: true,
            causesFire: false,
            source: player
        };
        player.dimension.createExplosion(location, 1, option);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },5);

    }

    /**
     * 弐ノ型 薙ぎ払い
     */
    niNoKata(player:Player, itemStack:ItemStack) {

        const option = {
            allowUnderwater: true,
            breaksBlocks: false,
            causesFire: false,
            source: player
        };

        let side = -2;
        const num = system.runInterval(() => {
            const left = getLookRotaionPoints(player.getRotation(), 2, side);
            const lvolume = getLookPoints(player.getRotation(), {x:player.location.x+left.x, y:player.location.y,z:player.location.z+left.z}, 0);
            const lfilter = addRegimentalFilter(0, lvolume, 4, player.id);
            this.kokyuApplyDamage(player, lfilter, 2, 1, itemStack);
            player.dimension.createExplosion(lvolume, 1, option);
            side=side+2;
        },5);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },16);

    }

    /**
     * 参ノ型 突進突き
     */
    sanNoKata(player:Player, itemStack:ItemStack) {
        player.setProperty("kurokumaft:kokyu_use", false);

        const option = {
            allowUnderwater: true,
            breaksBlocks: false,
            causesFire: false,
            source: player
        };

        const location = getLookRotaionPoints(player.getRotation(), 1, 0);
        player.applyKnockback(location.x,location.z,30,0);

        const num = system.runInterval(() => {
            const filter = addRegimentalFilter(0, player.location, 3.5, player.id);
            this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
            const front = getLookPoints(player.getRotation(), player.location, 1);
            player.dimension.createExplosion(front, 2, option);
        },2);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
            system.clearRun(num);
        },12);

    }

    /**
     * 肆ノ型 鳴弦奏々
     */
    shiNoKata(player:Player, itemStack:ItemStack) {
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:oto_kokyu4.value\"}]}");

        const kaikyuNum = player.getProperty("kurokumaft:kaikyu") as number;
        const molang = new MolangVariableMap();
        molang.setFloat("variable.kaikyu", kaikyuNum);

        const option = {
            allowUnderwater: true,
            breaksBlocks: false,
            causesFire: false,
            source: player
        };

        const num = system.runInterval(() => {
            const location = getLookPoints(player.getRotation(), player.location, 0);
            const filter = addRegimentalFilter(0, location, 5, player.id);
            this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
            this.checkSousouReflection(player, option);
        },2);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
            player.setProperty("kurokumaft:kokyu_use", false);
            system.clearRun(this.sousouIntervalId);
            system.clearRun(num);
        },20);

    }
    private sousouIntervalId: number =0;
    private checkSousouReflection(player: Player, option: ExplosionOptions): void {
        if (player.isValid()) {

            const volume = getLookPoints(player.getRotation(), player.location, 0);
            this.projectRefrect(player, volume);

            player.addTag(player.id);

            let side = getLookRotaionPoints(player.getRotation(), -2, -2);
            let front = getLookPoints(player.getRotation(), {x:player.location.x+side.x, y:player.location.y,z:player.location.z+side.z}, 0);
            player.dimension.createExplosion(front, 2, option);

            side = getLookRotaionPoints(player.getRotation(), -2, 2);
            front = getLookPoints(player.getRotation(), {x:player.location.x+side.x, y:player.location.y,z:player.location.z+side.z}, 0);
            player.dimension.createExplosion(front, 2, option);

            side = getLookRotaionPoints(player.getRotation(), 2, -2);
            front = getLookPoints(player.getRotation(), {x:player.location.x+side.x, y:player.location.y,z:player.location.z+side.z}, 0);
            player.dimension.createExplosion(front, 2, option);

            side = getLookRotaionPoints(player.getRotation(), 2, 2);
            front = getLookPoints(player.getRotation(), {x:player.location.x+side.x, y:player.location.y,z:player.location.z+side.z}, 0);
            player.dimension.createExplosion(front, 2, option);

            player.removeTag(player.id);

        } else {
            system.clearRun(this.sousouIntervalId);
        }
    };

    /**
     * 伍ノ型 響斬無間
     */
    goNoKata(player:Player, itemStack:ItemStack) {

        if (player.getDynamicProperty("kurokumaft:chage_type") == undefined) {
            player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:oto_kokyu5.value\"}]}");
            player.setDynamicProperty("kurokumaft:chage_type", true);

            player.addEffect(MinecraftEffectTypes.Speed, 3*TicksPerSecond,{
                amplifier: 5,
                showParticles: false
            });

            const option = {
                allowUnderwater: true,
                breaksBlocks: false,
                causesFire: false,
                source: player
            };
    
            const num = system.runInterval(() => {
                const location = getLookRotaionPoints(player.getRotation(), 1, 0);
                player.applyKnockback(location.x,location.z,3,0);

                const filter = addRegimentalFilter(0, player.location, 3.5, player.id);
                this.kokyuApplyDamage(player, filter, 2, 1, itemStack);

                let side = getLookRotaionPoints(player.getRotation(), -3, 0);
                let front = getLookPoints(player.getRotation(), {x:player.location.x+side.x, y:player.location.y,z:player.location.z+side.z}, 0);
                player.dimension.createExplosion(front, 2.5, option);
    
                side = getLookRotaionPoints(player.getRotation(), -3, 0);
                front = getLookPoints(player.getRotation(), {x:player.location.x+side.x, y:player.location.y,z:player.location.z+side.z}, 0);
                player.dimension.createExplosion(front, 2.5, option);
            },2);
    
            system.runTimeout(() => {
                player.setProperty("kurokumaft:kokyu_use", false);
                player.setProperty("kurokumaft:kokyu_particle", false);
                player.setDynamicProperty("kurokumaft:chage_type", undefined);
                system.clearRun(num);
            },3*TicksPerSecond);
    
        }

    }

}
