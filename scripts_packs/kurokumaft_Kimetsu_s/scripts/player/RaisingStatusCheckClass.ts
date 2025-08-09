import { Entity, Player, system, world } from "@minecraft/server";

export class RaisingStatusCheckClass {

    statusCheck(player: Player, ogre: Entity) {
        const kaikyu = player.getProperty("kurokumaft:kaikyu") as number;
        const count = player.getProperty("kurokumaft:ogre_kill") as number;
        const point = ogre.getProperty("kurokumaft:ogre_point") as number;
        let upPoint = count+point;
        let killtarget=0;
        switch(kaikyu) {
            case 10:
                const rank = player.getProperty("kurokumaft:ogre_rank") as string;
                if (rank === "crescent") {
                    killtarget=killtarget+1;
                }
                if (10 >= killtarget) {
                    player.setProperty("kurokumaft:kaikyu", kaikyu+1);
                    player.setProperty("kurokumaft:ogre_kill", 0);
                    system.runTimeout(() => {
                        player.triggerEvent("kurokumaft:kaikyu_change");
                    }, 4);
                } else {
                    player.setProperty("kurokumaft:ogre_kill", count+1);
                }
                break;
            case 9:
                killtarget=killtarget+900;
            case 8:
                killtarget=killtarget+800;
            case 7:
                killtarget=killtarget+700;
            case 6:
                killtarget=killtarget+600;
            case 5:
                killtarget=killtarget+500;
            case 4:
                killtarget=killtarget+400;
            case 3:
                killtarget=killtarget+300;
            case 2:
                killtarget=killtarget+200;
            case 1:
                killtarget=killtarget+100;
                if (upPoint >= killtarget) {
                    player.setProperty("kurokumaft:kaikyu", kaikyu+1);
                    player.setProperty("kurokumaft:ogre_kill", 0);
                    system.runTimeout(() => {
                        player.triggerEvent("kurokumaft:kaikyu_change");
                    }, 4);
                } else {
                    player.setProperty("kurokumaft:ogre_kill", upPoint);
                }
                break
            case 0:
                player.setProperty("kurokumaft:kaikyu", kaikyu+1);
                player.setProperty("kurokumaft:ogre_kill", 0);
                system.runTimeout(() => {
                    player.triggerEvent("kurokumaft:kaikyu_change");
                }, 4);
                break
        }

    }
}
