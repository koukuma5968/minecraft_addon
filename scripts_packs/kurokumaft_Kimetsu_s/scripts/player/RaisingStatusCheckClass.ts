import { Entity, Player, system } from "@minecraft/server";

export class RaisingStatusCheckClass {

    statusCheck(player: Player, orge: Entity) {
        const kaikyu = player.getProperty("kurokumaft:kaikyu") as number;
        const count = player.getProperty("kurokumaft:orge_kill") as number;
        const point = orge.getProperty("kurokumaft:orge_point") as number;
        let upPoint = count+point;
        let killtarget=0;
        switch(kaikyu) {
            case 0:
                killtarget=1;
                break;
            case 10:
                const orgeKaikyu = orge.getProperty("kurokumaft:orge_kaikyu") as number;
                if (orgeKaikyu >= 9) {
                    killtarget=killtarget+300;
                } else {
                    upPoint = 0;
                }
            case 9:
                killtarget=killtarget+90;
            case 8:
                killtarget=killtarget+80;
            case 7:
                killtarget=killtarget+70;
            case 6:
                killtarget=killtarget+60;
            case 5:
                killtarget=killtarget+50;
            case 4:
                killtarget=killtarget+40;
            case 3:
                killtarget=killtarget+30;
            case 2:
                killtarget=killtarget+20;
            case 1:
                killtarget=killtarget+10;
                if (upPoint >= killtarget) {
                    player.setProperty("kurokumaft:kaikyu", kaikyu+1);
                    player.setProperty("kurokumaft:orge_kill", 0);
                    system.runTimeout(() => {
                        player.triggerEvent("kurokumaft:kakyu_change");
                    }, 2);
                } else {
                    player.setProperty("kurokumaft:orge_kill", upPoint);
                }
        }

    }
}
