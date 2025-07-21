import { ItemStack, Entity, system, TicksPerSecond, Player } from "@minecraft/server";
import { ZytuComonClass } from "./ZytuComonClass";

export class Kouri extends ZytuComonClass {

    /**
     * 蓮葉氷
     */
    ichi(entity:Entity) {
        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_kouri1.value"}]});
            }
            entity.setProperty("kurokumaft:kokyu_use", false);

            system.runTimeout(() => {
                entity.setProperty("kurokumaft:kokyu_particle", false);
            },6);
        } catch (error: any) {
        }

    }

    /**
     * 枯園垂り
     */
    niNoKata(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_kouri2.value"}]});
            }
            system.runTimeout(() => {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            },TicksPerSecond);
        } catch (error: any) {
        }
    }

    /**
     * 枯園垂り
     */
    sanNoKata(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_kouri3.value"}]});
            }
            system.runTimeout(() => {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            },30);
        } catch (error: any) {
        }

    }

    /**
     * 凍て曇
     */
    shiNoKata(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_kouri4.value"}]});
            }
            system.runTimeout(() => {
                entity.setProperty("kurokumaft:kokyu_particle", false);
                entity.setProperty("kurokumaft:kokyu_use", false);
            },20);
        } catch (error: any) {
        }
    }

    /**
     * 蔓蓮華
     */
    goNoKata(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_kouri5.value"}]});
            }
            system.runTimeout(() => {
                entity.setProperty("kurokumaft:kokyu_particle", false);
                entity.setProperty("kurokumaft:kokyu_use", false);
            },4);
        } catch (error: any) {
        }
    }

    /**
     * 寒烈の白姫
     */
    rokuNoKata(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_kouri6.value"}]});
            }
            system.runTimeout(() => {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            },25);
        } catch (error: any) {
        }

    }

    /**
     * 冬ざれ氷柱
     */
    shitiNoKata(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_kouri7.value"}]});
            }
            system.runTimeout(() => {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            },5);
        } catch (error: any) {
        }

    }

    /**
     * 散り蓮華
     */
    hachiNoKata(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_kouri8.value"}]});
            }
        } catch (error: any) {
        }
    }

    /**
     * 結晶ノ御子
     */
    kuNoKata(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_kouri9.value"}]});
            }
            system.runTimeout(() => {
                entity.setProperty("kurokumaft:kokyu_use", false);
                entity.setProperty("kurokumaft:kokyu_particle", false);
            },10);
        } catch (error: any) {
        }
    }

    /**
     * 霧氷・睡蓮菩薩
     */
    zyuNoKata(entity:Entity) {

        try {
            if (entity instanceof Player) {
                entity.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_kouri10.value"}]});
            }
        } catch (error: any) {
        }
    }

}
