import { KokyuGiyuComponent } from "../../kokyu/player/character/KokyuGiyuComponent";
import { KokyuKanawoComponent } from "../../kokyu/player/character/KokyuKanawoComponent";
import { KokyuMituriComponent } from "../../kokyu/player/character/KokyuMituriComponent";
import { KokyuKyouzyuroComponent } from "../../kokyu/player/character/KokyuKyouzyuroComponent";
import { KokyuSanemiComponent } from "../../kokyu/player/character/KokyuSanemiComponent";
import { KokyuShinobuComponent } from "../../kokyu/player/character/KokyuShinobuComponent";
import { KokyuTanjiroComponent } from "../../kokyu/player/character/KokyuTanjiroComponent";
import { KokyuZenituComponent } from "../../kokyu/player/character/KokyuZenituComponent";
import { NichirintouChoiceComponent } from "../../kokyu/NichirintouChoiceComponent";
import { KokyuMobUseComponent, NichirintouUseComponent } from "../../kokyu/NichirintouUseComponent";
import { KokyuHebiComponent } from "../../kokyu/player/regimental/KokyuHebiComponent";
import { KokyuHiComponent } from "../../kokyu/player/regimental/KokyuHiComponent";
import { KokyuHonoComponent } from "../../kokyu/player/regimental/KokyuHonoComponent";
import { KokyuIwaComponent } from "../../kokyu/player/regimental/KokyuIwaComponent";
import { KokyuKaminariComponent } from "../../kokyu/player/regimental/KokyuKaminariComponent";
import { KokyuKasumiComponent } from "../../kokyu/player/regimental/KokyuKasumiComponent";
import { KokyuKazeComponent } from "../../kokyu/player/regimental/KokyuKazeComponent";
import { KokyuMizuComponent } from "../../kokyu/player/regimental/KokyuMizuComponent";
import { KokyuMushiComponent } from "../../kokyu/player/regimental/KokyuMushiComponent";
import { KokyuOtoComponent } from "../../kokyu/player/regimental/KokyuOtoComponent";
import { KokyuMuitiroComponent } from "../../kokyu/player/character/KokyuMuitiroComponent";
import { KokyuObanaiComponent } from "../../kokyu/player/character/KokyuObanaiComponent";
import { KokyuKoiComponent } from "../../kokyu/player/regimental/KokyuKoiComponent";
import { KokyuKedamonoComponent } from "../../kokyu/player/regimental/KokyuKedamonoComponent";
import { KokyuGyoumeiComponent } from "../../kokyu/player/character/KokyuGyoumeiComponent";
import { KokyuInosukeComponent } from "../../kokyu/player/character/KokyuInosukeComponent";
import { KokyuTengenComponent } from "../../kokyu/player/character/KokyuTengenComponent";
import { KokyuHanaComponent } from "../../kokyu/player/regimental/KokyuHanaComponent";
import { KokyuTukiComponent } from "../../kokyu/player/regimental/KokyuTukiComponent";
import { TanjiroComponent } from "../../kokyu/mob/character/TanjiroComponent";
import { GiyuComponent } from "../../kokyu/mob/character/GiyuComponent";
import { ZenituComponent } from "../../kokyu/mob/character/ZenituComponent";
import { InosukeComponent } from "../../kokyu/mob/character/InosukeComponent";
import { KanawoComponent } from "../../kokyu/mob/character/KanawoComponent";
import { ShinobuComponent } from "../../kokyu/mob/character/ShinobuComponent";
import { KyouzyuroComponent } from "../../kokyu/mob/character/KyouzyuroComponent";
import { TengenComponent } from "../../kokyu/mob/character/TengenComponent";
import { ObanaiComponent } from "../../kokyu/mob/character/ObanaiComponent";
import { SanemiComponent } from "../../kokyu/mob/character/SanemiComponent";
import { MituriComponent } from "../../kokyu/mob/character/MituriComponent";
import { MuitiroComponent } from "../../kokyu/mob/character/MuitiroComponent";
import { GyoumeiComponent } from "../../kokyu/mob/character/GyoumeiComponent";
import { MizuComponent } from "../../kokyu/mob/regimental/MizuComponent";
import { HiComponent } from "../../kokyu/mob/regimental/HiComponent";
import { KaminariComponent } from "../../kokyu/mob/regimental/KaminariComponent";
import { HanaComponent } from "../../kokyu/mob/regimental/HanaComponent";
import { HebiComponent } from "../../kokyu/mob/regimental/HebiComponent";
import { HonoComponent } from "../../kokyu/mob/regimental/HonoComponent";
import { IwaComponent } from "../../kokyu/mob/regimental/IwaComponent";
import { KasumiComponent } from "../../kokyu/mob/regimental/KasumiComponent";
import { KazeComponent } from "../../kokyu/mob/regimental/KazeComponent";
import { KoiComponent } from "../../kokyu/mob/regimental/KoiComponent";
import { MushiComponent } from "../../kokyu/mob/regimental/MushiComponent";
import { OtoComponent } from "../../kokyu/mob/regimental/OtoComponent";
import { TukiComponent } from "../../kokyu/mob/regimental/TukiComponent";
import { KedamonoComponent } from "../../kokyu/mob/regimental/KedamonoComponent";
import { Entity, ItemStack, Player } from "@minecraft/server";

export interface KokyuObject {
    itemName:string,
    type:number,
    kata: number[],
    kata_msg: string
    className: string
}

export const kokyuClassRecord = new Map<string, NichirintouUseComponent>();
kokyuClassRecord.set("nichirintou", new NichirintouChoiceComponent());
kokyuClassRecord.set("tanjiro", new KokyuTanjiroComponent());
kokyuClassRecord.set("zenitu", new KokyuZenituComponent());
kokyuClassRecord.set("inosuke", new KokyuInosukeComponent());
kokyuClassRecord.set("kanawo", new KokyuKanawoComponent());
kokyuClassRecord.set("giyu", new KokyuGiyuComponent());
kokyuClassRecord.set("shinobu", new KokyuShinobuComponent());
kokyuClassRecord.set("kyouzyuro", new KokyuKyouzyuroComponent());
kokyuClassRecord.set("sanemi", new KokyuSanemiComponent());
kokyuClassRecord.set("gyoumei", new KokyuGyoumeiComponent());
kokyuClassRecord.set("muitiro", new KokyuMuitiroComponent());
kokyuClassRecord.set("tengen", new KokyuTengenComponent());
kokyuClassRecord.set("obanai", new KokyuObanaiComponent());
kokyuClassRecord.set("mituri", new KokyuMituriComponent());
kokyuClassRecord.set("mizu", new KokyuMizuComponent());
kokyuClassRecord.set("kaminari", new KokyuKaminariComponent());
kokyuClassRecord.set("hi", new KokyuHiComponent());
kokyuClassRecord.set("kedamono", new KokyuKedamonoComponent());
kokyuClassRecord.set("hono", new KokyuHonoComponent());
kokyuClassRecord.set("kaze", new KokyuKazeComponent());
kokyuClassRecord.set("iwa", new KokyuIwaComponent());
kokyuClassRecord.set("kasumi", new KokyuKasumiComponent());
kokyuClassRecord.set("oto", new KokyuOtoComponent());
kokyuClassRecord.set("hebi", new KokyuHebiComponent());
kokyuClassRecord.set("koi", new KokyuKoiComponent());
kokyuClassRecord.set("mushi", new KokyuMushiComponent());
kokyuClassRecord.set("hana", new KokyuHanaComponent());
kokyuClassRecord.set("tuki", new KokyuTukiComponent());

export const KokyuObjects = Object.freeze([
    {
        itemName: "kurokumaft:nichirintou",
        type: 1,
        className: "nichirintou"
    },
    {
        itemName: "kurokumaft:nichirintou_tanjiro",
        type: 2,
        kata: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
        kata_msg: "mizu_kata",
        className: "tanjiro"
    },
    {
        itemName: "kurokumaft:nichirintou_zenitu",
        type: 3,
        kata: [1],
        kata_msg: "kaminari_kata",
        className: "zenitu"
    },
    {
        itemName: "kurokumaft:nichirintou_inosuke",
        type: 4,
        kata: [1,2,3,4,5,6,7,8,9,10],
        kata_msg: "kedamono_kata",
        className: "inosuke"
    },
    {
        itemName: "kurokumaft:nichirintou_kanawo",
        type: 5,
        kata: [2,4,5,6,7],
        kata_msg: "hana_kata",
        className: "kanawo"
    },
    {
        itemName: "kurokumaft:nichirintou_giyu",
        type: 6,
        kata: [1,2,3,4,5,6,7,8,9,10,11],
        kata_msg: "mizu_kata",
        className: "giyu"
    },
    {
        itemName: "kurokumaft:nichirintou_shinobu",
        type: 7,
        kata: [1,2,3,4],
        kata_msg: "mushi_kata",
        className: "shinobu"
    },
    {
        itemName: "kurokumaft:nichirintou_kyouzyuro",
        type: 8,
        kata: [1,2,3,4,5,9],
        kata_msg: "hono_kata",
        className: "kyouzyuro"
    },
    {
        itemName: "kurokumaft:nichirintou_sanemi",
        type: 9,
        kata: [1,2,3,4,5,6,7,8,9],
        kata_msg: "kaze_kata",
        className: "sanemi"
    },
    {
        itemName: "kurokumaft:nichirintou_gyoumei",
        type: 10,
        kata: [1,2,3,4,5],
        kata_msg: "iwa_kata",
        className: "gyoumei"
    },
    {
        itemName: "kurokumaft:nichirintou_muitiro",
        type: 11,
        kata: [1,2,3,4,5,6,7],
        kata_msg: "kasumi_kata",
        className: "muitiro"
    },
    {
        itemName: "kurokumaft:nichirintou_tengen",
        type: 12,
        kata: [1,2,3,4,5],
        kata_msg: "oto_kata",
        className: "tengen"
    },
    {
        itemName: "kurokumaft:nichirintou_obanai",
        type: 13,
        kata: [1,2,3,4,5],
        kata_msg: "hebi_kata",
        className: "obanai"
    },
    {
        itemName: "kurokumaft:nichirintou_mituri",
        type: 14,
        kata: [1,2,3,5,6],
        kata_msg: "koi_kata",
        className: "mituri"
    },
    {
        itemName: "kurokumaft:nichirintou_mizu",
        type: 15,
        kata: [1,2,3,4,5,6,7,8,9,10],
        kata_msg: "mizu_kata",
        className: "mizu"
    },
    {
        itemName: "kurokumaft:nichirintou_kaminari",
        type: 16,
        kata: [1,2,3,4,5,6],
        kata_msg: "kaminari_kata",
        className: "kaminari"
    },
    {
        itemName: "kurokumaft:nichirintou_hi",
        type: 17,
        kata: [1,2,3,4,5,6,7,8,9,10,11,12],
        kata_msg: "hi_kata",
        className: "hi"
    },
    {
        itemName: "kurokumaft:nichirintou_hono",
        type: 18,
        kata: [1,2,3,4,5],
        kata_msg: "hono_kata",
        className: "hono"
    },
    {
        itemName: "kurokumaft:nichirintou_kemono",
        type: 19,
        kata: [1,2,3,4,5,6,7,8,9,10],
        kata_msg: "kedamono_kata",
        className: "kedamono"
    },
    {
        itemName: "kurokumaft:nichirintou_kaze",
        type: 20,
        kata: [1,2,3,4,5,6,7,8,9],
        kata_msg: "kaze_kata",
        className: "kaze"
    },
    {
        itemName: "kurokumaft:nichirintou_iwa",
        type: 21,
        kata: [1,2,3,4,5],
        kata_msg: "iwa_kata",
        className: "iwa"
    },
    {
        itemName: "kurokumaft:nichirintou_kasumi",
        type: 22,
        kata: [1,2,3,4,5,6,7],
        kata_msg: "kasumi_kata",
        className: "kasumi"
    },
    {
        itemName: "kurokumaft:nichirintou_oto",
        type: 23,
        kata: [1,2,3,4,5],
        kata_msg: "oto_kata",
        className: "oto"
    },
    {
        itemName: "kurokumaft:nichirintou_hebi",
        type: 24,
        kata: [1,2,3,4,5],
        kata_msg: "hebi_kata",
        className: "hebi"
    },
    {
        itemName: "kurokumaft:nichirintou_koi",
        type: 25,
        kata: [1,2,3,5,6],
        kata_msg: "koi_kata",
        className: "koi"
    },
    {
        itemName: "kurokumaft:nichirintou_mushi",
        type: 26,
        kata: [1,2,3,4],
        kata_msg: "mushi_kata",
        className: "mushi"
    },
    {
        itemName: "kurokumaft:nichirintou_hana",
        type: 27,
        kata: [2,4,5,6],
        kata_msg: "hana_kata",
        className: "hana"
    },
    {
        itemName: "kurokumaft:nichirintou_tuki",
        type: 28,
        kata: [1,2,3,5,6,7,8,9,10,14,16],
        kata_msg: "tuki_kata",
        className: "tuki"
    },
])

export interface KokyuMobObject {
    entityName:string,
    className: string
}

export const KokyuMobClassRecord = new Map<string, KokyuMobUseComponent>();
KokyuMobClassRecord.set("tanjiro", new TanjiroComponent());
KokyuMobClassRecord.set("zenitu", new ZenituComponent());
KokyuMobClassRecord.set("inosuke", new InosukeComponent());
KokyuMobClassRecord.set("kanawo", new KanawoComponent());
KokyuMobClassRecord.set("giyu", new GiyuComponent());
KokyuMobClassRecord.set("shinobu", new ShinobuComponent());
KokyuMobClassRecord.set("kyouzyuro", new KyouzyuroComponent());
KokyuMobClassRecord.set("tengen", new TengenComponent());
KokyuMobClassRecord.set("obanai", new ObanaiComponent());
KokyuMobClassRecord.set("sanemi", new SanemiComponent());
KokyuMobClassRecord.set("mituri", new MituriComponent());
KokyuMobClassRecord.set("muitiro", new MuitiroComponent());
KokyuMobClassRecord.set("gyoumei", new GyoumeiComponent());
KokyuMobClassRecord.set("mizu", new MizuComponent());
KokyuMobClassRecord.set("hi", new HiComponent());
KokyuMobClassRecord.set("kaminari", new KaminariComponent());
KokyuMobClassRecord.set("hono", new HonoComponent());
KokyuMobClassRecord.set("kemono", new KedamonoComponent());
KokyuMobClassRecord.set("mushi", new MushiComponent());
KokyuMobClassRecord.set("hana", new HanaComponent());
KokyuMobClassRecord.set("koi", new KoiComponent());
KokyuMobClassRecord.set("oto", new OtoComponent());
KokyuMobClassRecord.set("kaze", new KazeComponent());
KokyuMobClassRecord.set("iwa", new IwaComponent());
KokyuMobClassRecord.set("hebi", new HebiComponent());
KokyuMobClassRecord.set("kasumi", new KasumiComponent());
KokyuMobClassRecord.set("tuki", new TukiComponent());


export const KokyuMobObjects = Object.freeze([
    {
        entityName: "kurokumaft:tanjiro",
        className: "tanjiro"
    },
    {
        entityName: "kurokumaft:zenitu",
        className: "zenitu"
    },
    {
        entityName: "kurokumaft:inosuke",
        className: "inosuke"
    },
    {
        entityName: "kurokumaft:kanawo",
        className: "kanawo"
    },
    {
        entityName: "kurokumaft:giyu",
        className: "giyu"
    },
    {
        entityName: "kurokumaft:shinobu",
        className: "shinobu"
    },
    {
        entityName: "kurokumaft:kyouzyuro",
        className: "kyouzyuro"
    },
    {
        entityName: "kurokumaft:tengen",
        className: "tengen"
    },
    {
        entityName: "kurokumaft:obanai",
        className: "obanai"
    },
    {
        entityName: "kurokumaft:sanemi",
        className: "sanemi"
    },
    {
        entityName: "kurokumaft:mituri",
        className: "mituri"
    },
    {
        entityName: "kurokumaft:muitiro",
        className: "muitiro"
    },
    {
        entityName: "kurokumaft:gyoumei",
        className: "gyoumei"
    },
    {
        entityName: "kurokumaft:nichirintou_mizu",
        className: "mizu"
    },
    {
        entityName: "kurokumaft:nichirintou_hi",
        className: "hi"
    },
    {
        entityName: "kurokumaft:nichirintou_kaminari",
        className: "kaminari"
    },
    {
        entityName: "kurokumaft:nichirintou_hono",
        className: "hono"
    },
    {
        entityName: "kurokumaft:nichirintou_kemono",
        className: "kemono"
    },
    {
        entityName: "kurokumaft:nichirintou_mushi",
        className: "mushi"
    },
    {
        entityName: "kurokumaft:nichirintou_hana",
        className: "hana"
    },
    {
        entityName: "kurokumaft:nichirintou_koi",
        className: "koi"
    },
    {
        entityName: "kurokumaft:nichirintou_oto",
        className: "oto"
    },
    {
        entityName: "kurokumaft:nichirintou_kaze",
        className: "kaze"
    },
    {
        entityName: "kurokumaft:nichirintou_iwa",
        className: "iwa"
    },
    {
        entityName: "kurokumaft:nichirintou_hebi",
        className: "hebi"
    },
    {
        entityName: "kurokumaft:nichirintou_kasumi",
        className: "kasumi"
    },
    {
        entityName: "kurokumaft:nichirintou_tuki",
        className: "tuki"
    },
]);

export async function startKokyuMonitoringMob(entity:Entity, className:string) {
    const KokyuClass = KokyuMobClassRecord.get(className);
    if (KokyuClass !== undefined) {
        KokyuClass.startMonitoring(entity);
    }
}

export async function hitKokyuAttackKataMob(entity:Entity, className:string) {
    const KokyuClass = KokyuMobClassRecord.get(className);
    if (KokyuClass !== undefined) {
        KokyuClass.hitAttackKata(entity);
    }
}

export async function changeKokyuKata(player:Player, className:string) {
    const kokyuClass = kokyuClassRecord.get(className);
    if (kokyuClass !== undefined) {
        kokyuClass.changeKata(player);
    }
}

export async function useAttackKokyuKata(player:Player, itemStack:ItemStack ,className:string) {
    const kokyuClass = kokyuClassRecord.get(className);
    if (kokyuClass !== undefined) {
        player.setProperty("kurokumaft:kokyu_use", true);
        player.setProperty("kurokumaft:kokyu_particle", true);
        kokyuClass.useAttackKata(player, itemStack);
    }
}

export async function releaseAttackKata(player:Player, item:ItemStack, duration:number, className:string) {
    const kokyuClass = kokyuClassRecord.get(className);
    if (kokyuClass !==undefined) {
        kokyuClass.releaseAttackKata(player, item, duration);
    }
   
}