import { system, TicksPerSecond, world } from "@minecraft/server";
export class SystemMonitorTick {
    constructor() {
        this.num = 0;
    }
    startMonitoring(fieldRange, fieldDown) {
        if (this.num != 0) {
            system.clearRun(this.num);
        }
        this.num = system.runInterval(() => {
            try {
                this.checkPlayerKaikyuTick(fieldRange, fieldDown);
            }
            catch (error) {
                system.clearRun(this.num);
            }
        }, 0.5 * TicksPerSecond);
    }
    checkPlayerKaikyuTick(fieldRange, fieldDown) {
        return __awaiter(this, void 0, void 0, function* () {
            world.getAllPlayers().forEach(player => {
                if (player.isValid) {
                    player.onScreenDisplay.setTitle({
                        rawtext: [
                            { translate: "screen.kurokumaft:systemblock.fieldRange" },
                            { text: fieldRange, },
                            { text: "\n" },
                            { translate: "screen.kurokumaft:systemblock.fieldDown" },
                            { text: fieldDown, },
                        ]
                    }, {
                        stayDuration: 100,
                        fadeInDuration: 0,
                        fadeOutDuration: 1,
                        subtitle: ""
                    });
                }
            });
        });
    }
    ;
}
//# sourceMappingURL=SystemMonitorTick.js.map