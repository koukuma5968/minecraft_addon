import { world } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";
import { SystemMonitorTick } from "../monitor/SystemMonitorTick";
const systemMonitorTick = new SystemMonitorTick();
/**
 * システムブロック
 */
export class SystemBoardBlock {
    onPlayerInteract(event) {
        const block = event.block;
        const player = event.player;
        showSystemForm(player);
    }
}
function showSystemForm(player) {
    const modalForm = new ModalFormData().title({ translate: "msg.kurokumaft:systemblock.title" });
    const time_limit = world.getDynamicProperty("time_limit");
    modalForm.slider({ translate: "msg.kurokumaft:systemblock.gamerule.time_limit.label" }, 1, 60, {
        defaultValue: time_limit !== undefined ? time_limit : 10,
        valueStep: 1
    });
    modalForm.divider();
    const transfer_position = world.getDynamicProperty("transfer_position");
    modalForm.label({ translate: "msg.kurokumaft:systemblock.gamerule.transfer_position.label" });
    modalForm.textField({ text: "x:" }, { rawtext: [{ text: transfer_position !== undefined ? transfer_position.x.toString() : "" }] });
    modalForm.textField({ text: "y:" }, { rawtext: [{ text: transfer_position !== undefined ? transfer_position.y.toString() : "" }] });
    modalForm.textField({ text: "z:" }, { rawtext: [{ text: transfer_position !== undefined ? transfer_position.z.toString() : "" }] });
    modalForm.divider();
    const area_position = world.getDynamicProperty("area_position");
    modalForm.label({ translate: "msg.kurokumaft:systemblock.gamerule.area_position.label" });
    modalForm.textField({ text: "x:" }, { rawtext: [{ text: area_position !== undefined ? area_position.x.toString() : "" }] });
    modalForm.textField({ text: "y:" }, { rawtext: [{ text: area_position !== undefined ? area_position.y.toString() : "" }] });
    modalForm.textField({ text: "z:" }, { rawtext: [{ text: area_position !== undefined ? area_position.z.toString() : "" }] });
    modalForm.divider();
    const area_range = world.getDynamicProperty("area_range");
    modalForm.slider({ translate: "msg.kurokumaft:systemblock.gamerule.area_range.label" }, 30, 240, {
        defaultValue: area_range !== undefined ? area_range : 64,
        valueStep: 1
    });
    modalForm.divider();
    const outcome = world.getDynamicProperty("outcome");
    modalForm.dropdown({ translate: "msg.kurokumaft:systemblock.gamerule.outcome.label" }, [
        { translate: "msg.kurokumaft:systemblock.gamerule.outcome.apprehension" },
        { translate: "msg.kurokumaft:systemblock.gamerule.outcome.escape" }
    ], {
        defaultValueIndex: outcome !== undefined ? outcome : 0
    });
    modalForm.divider();
    modalForm
        .show(player)
        .then((formData) => {
        const values = formData.formValues;
        if (values != undefined) {
            // values.forEach((v, i) => {
            //     console.info((i + "="), v);
            // });
            const transferPositionX = values[3];
            const transferPositionY = values[4];
            const transferPositionZ = values[5];
            const areaPositionX = values[8];
            const areaPositionY = values[9];
            const areaPositionZ = values[10];
            let eFlg = false;
            if (isNaN(Number(transferPositionX))) {
                eFlg = true;
            }
            else if (isNaN(Number(transferPositionY))) {
                eFlg = true;
            }
            else if (isNaN(Number(transferPositionZ))) {
                eFlg = true;
            }
            else if (isNaN(Number(areaPositionX))) {
                eFlg = true;
            }
            else if (isNaN(Number(areaPositionY))) {
                eFlg = true;
            }
            else if (isNaN(Number(areaPositionZ))) {
                eFlg = true;
            }
            if (!eFlg) {
                const timeLimit = values[0];
                world.setDynamicProperty("time_limit", timeLimit);
                world.setDynamicProperty("transfer_position", {
                    x: Number(transferPositionX),
                    y: Number(transferPositionY),
                    z: Number(transferPositionZ)
                });
                world.setDynamicProperty("area_position", {
                    x: Number(areaPositionX),
                    y: Number(areaPositionY),
                    z: Number(areaPositionZ)
                });
                const areaRange = values[12];
                world.setDynamicProperty("area_range", areaRange);
                const outcome = values[14];
                world.setDynamicProperty("outcome", outcome);
            }
            else {
                showSystemForm(player);
            }
        }
    })
        .catch((error) => {
        world.sendMessage(error.message);
        console.log(error.stack);
        return -1;
    });
}
//# sourceMappingURL=SystemBoardBlock.js.map