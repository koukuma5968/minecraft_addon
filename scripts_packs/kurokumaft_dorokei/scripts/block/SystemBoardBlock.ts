import { BlockCustomComponent, BlockComponentPlayerInteractEvent, Block, Player, world, Vector3 } from "@minecraft/server";
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

        showSystemForm(player);
    }

}

function showSystemForm(player:Player) {
    const modalForm = new ModalFormData().title({ translate: "msg.kurokumaft:systemblock.title"});

    const time_limit = world.getDynamicProperty("time_limit") as number;
    modalForm.slider(
        {translate: "msg.kurokumaft:systemblock.gamerule.time_limit.label"}, 1, 60, 
        {
            defaultValue: time_limit !== undefined ? time_limit : 10,
            valueStep: 1
        }
    );

    modalForm.divider();

    const transfer_position = world.getDynamicProperty("transfer_position") as Vector3;
    modalForm.label(
        {translate: "msg.kurokumaft:systemblock.gamerule.transfer_position.label"}
    );
    modalForm.textField({text: "x:"},{rawtext: [{text: transfer_position !== undefined ? transfer_position.x.toString() : ""}]});
    modalForm.textField({text: "y:"},{rawtext: [{text: transfer_position !== undefined ? transfer_position.y.toString() : ""}]});
    modalForm.textField({text: "z:"},{rawtext: [{text: transfer_position !== undefined ? transfer_position.z.toString() : ""}]});

    modalForm.divider();

    const area_position = world.getDynamicProperty("area_position") as Vector3;
    modalForm.label(
        {translate: "msg.kurokumaft:systemblock.gamerule.area_position.label"}
    );
    modalForm.textField({text: "x:"},{rawtext: [{text: area_position !== undefined ? area_position.x.toString() : ""}]});
    modalForm.textField({text: "y:"},{rawtext: [{text: area_position !== undefined ? area_position.y.toString() : ""}]});
    modalForm.textField({text: "z:"},{rawtext: [{text: area_position !== undefined ? area_position.z.toString() : ""}]});

    modalForm.divider();

    const area_range = world.getDynamicProperty("area_range") as number;
    modalForm.slider(
        {translate: "msg.kurokumaft:systemblock.gamerule.area_range.label"}, 30, 240, 
        {
            defaultValue: area_range !== undefined ? area_range : 64,
            valueStep: 1
        }
    );
    modalForm.divider();

    const outcome = world.getDynamicProperty("outcome") as number;
    modalForm.dropdown(
        {translate: "msg.kurokumaft:systemblock.gamerule.outcome.label"}, 
        [
            { translate: "msg.kurokumaft:systemblock.gamerule.outcome.apprehension"},
            { translate: "msg.kurokumaft:systemblock.gamerule.outcome.escape"}
        ],
        {
            defaultValueIndex: outcome !== undefined ? outcome : 0
        }
    );
    modalForm.divider();

    modalForm
        .show(player)
        .then((formData) => {
            const values = formData.formValues;
            if (values != undefined) {
                // values.forEach((v, i) => {
                //     console.info((i + "="), v);
                // });

                const transferPositionX = values[3] as string;
                const transferPositionY = values[4] as string;
                const transferPositionZ = values[5] as string;

                const areaPositionX = values[8] as string;
                const areaPositionY = values[9] as string;
                const areaPositionZ = values[10] as string;

                let eFlg = false;
                if (isNaN(Number(transferPositionX))) {
                    eFlg = true;
                } else if (isNaN(Number(transferPositionY))) {
                    eFlg = true;
                } else if (isNaN(Number(transferPositionZ))) {
                    eFlg = true;
                } else if (isNaN(Number(areaPositionX))) {
                    eFlg = true;
                } else if (isNaN(Number(areaPositionY))) {
                    eFlg = true;
                } else if (isNaN(Number(areaPositionZ))) {
                    eFlg = true;
                }

                if (!eFlg) {
                    const timeLimit = values[0] as number;
                    world.setDynamicProperty("time_limit", timeLimit);

                    world.setDynamicProperty("transfer_position", {
                        x:Number(transferPositionX),
                        y:Number(transferPositionY),
                        z:Number(transferPositionZ)
                    });

                    world.setDynamicProperty("area_position", {
                        x:Number(areaPositionX),
                        y:Number(areaPositionY),
                        z:Number(areaPositionZ)
                    });

                    const areaRange = values[12] as number;
                    world.setDynamicProperty("area_range", areaRange);

                    const outcome = values[14] as number;
                    world.setDynamicProperty("outcome", outcome);
                } else {
                    showSystemForm(player);
                }

            }
        })
        .catch((error: Error) => {
            world.sendMessage(error.message);
            console.log(error.stack);
            
        return -1;
    });
}

