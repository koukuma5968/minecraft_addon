import { ExplosionOptions, ItemStack, MolangVariableMap, Player, system, TicksPerSecond } from "@minecraft/server";
import { addRegimentalFilter, getDistanceLocation, getForwardPosition, getLeftPosition, getLookLocationDistance, getRightPosition } from "../../common/KimetuCommonUtil";
import { KataComonClass } from "./KataComonClass";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export class OtoNoKata extends KataComonClass {

    /**
     * 壱ノ型 轟
     */
    ichiNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate: "msg.kurokumaft:oto_kokyu1.value"}]});

        const distance = getLookLocationDistance(player.getRotation().y, 1.5, 0, 0.5);
        const disLocation = getDistanceLocation(player.location, distance);
        const filter = addRegimentalFilter(0, disLocation, 3, player.id);
        this.kokyuApplyDamage(player, filter, 3, 1, itemStack);

        const option = {
            allowUnderwater: true,
            breaksBlocks: true,
            causesFire: false,
            source: player
        };
        player.dimension.createExplosion(disLocation, 1, option);

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
            const distance = getLookLocationDistance(player.getRotation().y, 2, side, 0.5);
            const disLocation = getDistanceLocation(player.location, distance);
            const filter = addRegimentalFilter(0, disLocation, 4, player.id);
            this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
            player.dimension.createExplosion(disLocation, 1, option);
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

        const distance = getLookLocationDistance(player.getRotation().y, 1, 0, 0.5);
        player.applyKnockback(distance.x,distance.z,30,0);

        const num = system.runInterval(() => {
            const filter = addRegimentalFilter(0, player.location, 3.5, player.id);
            this.kokyuApplyDamage(player, filter, 2, 1, itemStack);
            const front = getForwardPosition(player.location, player.getRotation().y, 1);
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
        player.onScreenDisplay.setActionBar({rawtext:[{translate: "msg.kurokumaft:oto_kokyu4.value"}]});

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
            const filter = addRegimentalFilter(0, player.location, 5, player.id);
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

            this.projectRefrect(player, player.location);

            player.addTag(player.id);

            let distance = getLookLocationDistance(player.getRotation().y, 2, 2, 0);
            let disLocation = getDistanceLocation(player.location, distance);
            player.dimension.createExplosion(disLocation, 2, option);

            distance = getLookLocationDistance(player.getRotation().y, -2, 2, 0);
            disLocation = getDistanceLocation(player.location, distance);
            player.dimension.createExplosion(disLocation, 2, option);

            distance = getLookLocationDistance(player.getRotation().y, 2, -2, 0);
            disLocation = getDistanceLocation(player.location, distance);
            player.dimension.createExplosion(disLocation, 2, option);

            distance = getLookLocationDistance(player.getRotation().y, -2, -2, 0);
            disLocation = getDistanceLocation(player.location, distance);
            player.dimension.createExplosion(disLocation, 2, option);

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
            player.onScreenDisplay.setActionBar({rawtext:[{translate: "msg.kurokumaft:oto_kokyu5.value"}]});

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
                const distance = getLookLocationDistance(player.getRotation().y, 1, 0, 0.5);
    
                player.applyKnockback(distance.x,distance.z,3,0);

                const filter = addRegimentalFilter(0, player.location, 3.5, player.id);
                this.kokyuApplyDamage(player, filter, 2, 1, itemStack);

                const right = getRightPosition(player.location, player.getRotation().y, 3);
                player.dimension.createExplosion(right, 2.5, option);
    
                const left = getLeftPosition(player.location, player.getRotation().y, 3);
                player.dimension.createExplosion(left, 2.5, option);
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
