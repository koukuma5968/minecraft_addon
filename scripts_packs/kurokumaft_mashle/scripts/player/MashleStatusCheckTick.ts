import { Player, system } from "@minecraft/server";
import { UniqueMagic, UniqueMagicList } from "../common/MashleMagicConst";

export class MashleStatusCheckTick {

    player: Player;
    num: number;

    constructor(player: Player) {
        this.player = player;
        this.num = 0;
    }

    startMonitoring() {
        this.num = system.runInterval(() => {
            if (this.player.isValid) {
                this.checkPlayerKaikyuTick();
            } else {
                system.clearRun(this.num);
            }
        }, 5);
    }

    async checkPlayerKaikyuTick() {
        if (this.player.isValid) {

            try {

                const unique_magic = this.player.getProperty("kurokumaft:unique_magic") as number;

                const unique = UniqueMagicList.find(magic => magic.id === unique_magic) as UniqueMagic;
                const max = this.player.getProperty("kurokumaft:magic_power_max") as number;
                const now = this.player.getProperty("kurokumaft:magic_power_value") as number;

                this.player.onScreenDisplay.setTitle(
                    {
                        rawtext:[
                            {translate: "msg.kurokumaft:unique.magic.text"}, {translate: "item.kurokumaft:unique.magic." + unique.name},
                            {text:"\n"},
                            {text: "msg.kurokumaft:magic.point.text"},{text: now.toString()},{text:"/"},{text: max.toString()}
                        ]
                    },
                    {
                        stayDuration: 100,
                        fadeInDuration: 0,
                        fadeOutDuration: 1,
                        subtitle: ""
                    }
                );
            } catch (error: any) {

            } finally {
            }

        }

    };
}
