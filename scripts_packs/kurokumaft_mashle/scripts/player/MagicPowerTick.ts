import { EntityComponentTypes, EntityEquippableComponent, EquipmentSlot, Player, system, TicksPerSecond, world } from "@minecraft/server";

export class MagicPowerTick {

    player: Player;
    num: number;

    constructor(player: Player) {
        this.player = player;
        this.num = 0;
    }

    startMonitoring() {
        this.num = system.runInterval(() => {
            if (this.player.isValid) {
                this.checkPlayerMagicTick();
            } else {
                system.clearRun(this.num);
            }
        }, 5);
    }

    async checkPlayerMagicTick() {
        if (this.player.isValid) {

            try {

            } catch (error: any) {

            } finally {
                this.player.onScreenDisplay.setTitle(
                    {
                        translate:"icon.kurokumaft:magic.power.full",
                    },
                    {
                        stayDuration: 10 * TicksPerSecond,
                        fadeInDuration: 0,
                        fadeOutDuration: 50 * TicksPerSecond
                    }
                );
            }

        }

    };

}
