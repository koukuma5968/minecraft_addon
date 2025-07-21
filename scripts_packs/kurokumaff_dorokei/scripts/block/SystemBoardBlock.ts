import { BlockCustomComponent, BlockComponentPlayerInteractEvent, Block, Player, BlockVolume, world, system, BlockStates, BlockPermutation, DisplaySlotId } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";
import { SystemMonitorTick } from "../monitor/SystemMonitorTick";

const systemMonitorTick = new SystemMonitorTick();

/**
 * システムブロック
 */
export class SystemBoardBlock implements BlockCustomComponent {

    onPlayerInteract(event:BlockComponentPlayerInteractEvent) {
        const block = event.block as Block;
        const player = event.player as Player;

        this.gameruleForm(block, player);
    }

    private gameruleForm(block:Block, player:Player) {
        const modalForm = new ModalFormData().title({ translate: "msg.kurokumaft:systemblock.title"});

        modalForm.dropdown(
            {translate: "msg.kurokumaft:systemblock.gamerule.outcome.label"}, 
            [
                { translate: "msg.kurokumaft:systemblock.gamerule.outcome.apprehension"},
                { translate: "msg.kurokumaft:systemblock.gamerule.outcome.escape"}
            ], {
            defaultValueIndex:0
        });

        modalForm
            .show(player)
            .then((formData) => {
                const values = formData.formValues;
                if (values != undefined) {
                    const fieldDown = values[0] as string;

                }
            })
            .catch((error: Error) => {
                world.sendMessage(error.message);
                console.log(error.stack);
                
            return -1;
        });
    }

    private fieldForm (block:Block, player:Player) {

        const modalForm = new ModalFormData().title({ translate: "msg.kurokumaft:systemblock.title"});

        modalForm.label({translate: "msg.kurokumaft:systemblock.field.range.label"});
        modalForm.slider({ translate: "msg.kurokumaft:systemblock.field.down.text"}, 1, 64, {
            defaultValue:1
        });
        modalForm.slider({ translate: "msg.kurokumaft:systemblock.field.range.text"}, 24, 256, {
            defaultValue:24
        });

        modalForm
            .show(player)
            .then((formData) => {
                const values = formData.formValues;
                if (values != undefined) {
                    const fieldDown = values[1] as number;
                    const fieldRange = values[2] as number;

                    if (block.location.y-fieldDown < -63) {
                        throw ({ translate: "error.kurokumaft:systemblock.field.down.max_orver"});
                    }

                    systemMonitorTick.startMonitoring(fieldRange.toString(), fieldDown.toString());
                }
            })
            .catch((error: Error) => {
                world.sendMessage(error.message);
                console.log(error.stack);
                
            return -1;
        });

    }
}

