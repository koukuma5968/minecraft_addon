import { ItemStack, Player, system, EntityComponentTypes, EntityInventoryComponent, ItemLockMode, EntityEquippableComponent, EquipmentSlot } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { kekkizyutuLists, kekkizyutuPickLists } from "../../common/KimetuConst";

export class OgreEatCommon {

    rankUpPoint (rank: string) : number {

        let rankPoint = 0;
        switch (rank) {
            case "low" :
                rankPoint = 150;
            break;
            case "unusual" :
                rankPoint = 200;
            break;
            case "quarter" :
                rankPoint = 400;
            break;
            case "crescent" :
                rankPoint = 500;
            break;
        }

        return rankPoint;
    }

    upRankCheck(rank: string, player: Player, becoming: number) {

        const rankPoint = this.rankUpPoint(rank);

        if (becoming >= rankPoint) {
            switch (rank) {
                case "low" :
                    player.setProperty("kurokumaft:ogre_rank", "unusual");
                    const Inventory = player.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
                    const container = Inventory.container;
                    if (container !== undefined) {
                        const itemstack = container.transferItem(0, container);
                        if (itemstack !== undefined) {
                            player.dimension.spawnItem(itemstack, player.location);
                        }
                        const modalForm = new ActionFormData().title({ translate: "msg.kurokumaft:kekkizyutu.title"});

                        kekkizyutuLists.forEach(zyutu => {
                            modalForm.button(
                                {translate: zyutu.msg}, 
                            );
                        });

                        modalForm
                            .show(player)
                            .then((result: ActionFormResponse) => {
                                let kekkizyutu;
                                if (result.canceled) {
                                    kekkizyutu = kekkizyutuPickLists.pick();
                                } else {
                                    const index = result.selection as number;
                                    kekkizyutu = kekkizyutuLists[index].item;
                                }
                                if (kekkizyutu === "kurokumaft:obi_item") {
                                    const equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
                                    const chest = equ.getEquipment(EquipmentSlot.Chest);
                                    if (chest !== undefined) {
                                        player.dimension.spawnItem(chest, player.location);
                                    }
                                    equ.setEquipment(EquipmentSlot.Chest, new ItemStack("kurokumaft:daki_obi", 1))
                                }
                                const zyutu = new ItemStack(kekkizyutu, 1);
                                zyutu.lockMode = ItemLockMode.slot;
                                container.setItem(0, zyutu);
                            })
                            .catch((error: Error) => {
                                console.log(error.stack);
                                return -1;
                            });
                    }

                break;
                case "unusual" :
                    player.setProperty("kurokumaft:ogre_rank", "quarter");
                break;
                case "quarter" :
                    const moon1 = player.getProperty("kurokumaft:ogre_moon") as number;
                    if (moon1 === 1) {
                        player.setProperty("kurokumaft:ogre_moon", 6);
                        player.setProperty("kurokumaft:ogre_rank", "crescent");
                    } else {
                        player.setProperty("kurokumaft:ogre_moon", moon1-1);
                    }
                break;
                case "crescent" :
                    const moon2 = player.getProperty("kurokumaft:ogre_moon") as number;
                    if (moon2 === 1) {
                        player.setProperty("kurokumaft:ogre_rank", "king");
                    } else {
                        player.setProperty("kurokumaft:ogre_moon", moon2-1);
                    }
                break;
            }
            player.setProperty("kurokumaft:ogre_becoming", 0);
            system.runTimeout(() => {
                player.triggerEvent("kurokumaft:ogre_rank_change");
            }, 4);
        } else {
            player.setProperty("kurokumaft:ogre_becoming", becoming);
        }
    }

}
