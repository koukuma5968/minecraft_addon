import { ItemCustomComponent, ItemStack, Player, ItemComponentConsumeEvent, system, EntityComponentTypes, EntityInventoryComponent, ItemLockMode } from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";
import { weightChoice } from "../../common/KimetuCommonUtil";

const kekkizyutuLists = weightChoice([
    { item: 'kurokumaft:bakketu' , weight: 30 },
    { item: 'kurokumaft:gyutaro_kama' , weight: 20 },
    { item: 'kurokumaft:hakaisatu' , weight: 20 },
    { item: 'kurokumaft:hantengu' , weight: 20 },
    { item: 'kurokumaft:koushi' , weight: 30 },
    { item: 'kurokumaft:obi' , weight: 20 },
]);

export class BloodDrinking implements ItemCustomComponent {

    onConsume (event: ItemComponentConsumeEvent) {

        const item = event.itemStack as ItemStack;
        const player = event.source as Player;
        const lores = item.getLore();
        const rank = player.getProperty("kurokumaft:ogre_rank");
        let becoming = player.getProperty("kurokumaft:ogre_becoming") as number;
        if (lores !== undefined && lores.length > 0) {
            switch (lores[0]) {
                case "Lv 5" :
                    becoming = becoming + 30;
                    break;
                case "Lv 4" :
                    becoming = becoming + 25;
                    break;
                case "Lv 3" :
                    becoming = becoming + 20;
                    break;
                case "Lv 2" :
                    becoming = becoming + 15;
                    break;
                case "Lv 1" :
                    becoming = becoming + 10;
                    break;
                break;
            }
        } else {
            becoming = becoming + 10;
        }

        if ("none" === rank) {
            if (becoming >= 100) {
                player.setProperty("kurokumaft:ogre_rank", "low");
                player.setProperty("kurokumaft:ogre_becoming", 0);
                system.runTimeout(() => {
                    player.triggerEvent("kurokumaft:ogre_rank_change");
                }, 4);
            } else {
                player.setProperty("kurokumaft:ogre_becoming", becoming);
                player.addEffect(MinecraftEffectTypes.Hunger, 20, {
                    amplifier : 10,
                    showParticles: false
                });
                player.addEffect(MinecraftEffectTypes.Wither, 20, {
                    amplifier : 5,
                    showParticles: false
                });
            }
        } else {
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
                            const kekkizyutu = kekkizyutuLists.pick();
                            if (kekkizyutu === "kurokumaft:hantengu") {
                                const zyutu = new ItemStack("kurokumaft:zouhakuten_bati", 1);
                                zyutu.lockMode = ItemLockMode.slot;
                                container.setItem(0, zyutu);

                            } else {
                                const zyutu = new ItemStack(kekkizyutu, 1);
                                zyutu.lockMode = ItemLockMode.slot;
                                container.setItem(0, zyutu);
                            }
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
    };

}
