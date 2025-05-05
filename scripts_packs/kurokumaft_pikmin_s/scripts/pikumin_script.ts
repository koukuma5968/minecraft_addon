import { Entity, EquipmentSlot, ItemStack, world } from "@minecraft/server";
import { initPikuminRegisterCustom } from "./custom/PikuminCustomComponentRegistry";
import { getRandomInRange } from "./common/PikuminCommonUtil";
import { subtractionItem } from "./common/PikuminItemDurabilityDamage";
import { OniyonBase } from "./entity/OniyonBase";
import { Pikumin } from "./entity/Pikumin";

// ワールド接続時
world.beforeEvents.worldInitialize.subscribe(initEvent => {
    initPikuminRegisterCustom(initEvent);
});

world.beforeEvents.playerLeave.subscribe(leaveEvent => {
    leaveEvent.player.clearDynamicProperties();
});

world.afterEvents.dataDrivenEntityTrigger.subscribe(event => {
    const entity = event.entity;
    if (event.eventId == "kurokumaft:this_kill") {
        entity.kill();
    }
});

world.afterEvents.playerInteractWithEntity.subscribe(event => {

    const target = event.target as Entity;
    const itemStack = event.itemStack as ItemStack;
    if (target.typeId.lastIndexOf("oniyon_base")) {
        if (itemStack != undefined && itemStack.typeId.lastIndexOf("pellet")) {
            new OniyonBase().pikuminSpawn(target, itemStack, event.player);
        }
    } else if (target.typeId.lastIndexOf("pikmin")) {
        if (itemStack == undefined) {
            new Pikumin().pikuminGrasp(target, event.player);
        }
    }
});