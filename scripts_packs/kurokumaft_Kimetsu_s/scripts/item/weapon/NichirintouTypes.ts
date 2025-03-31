import { KokyuGiyuComponent } from "../../kokyu/KokyuGiyuComponent";
import { KokyuGyoumeiComponent } from "../../kokyu/KokyuGyoumeiComponent";
import { KokyuInosukeComponent } from "../../kokyu/KokyuInosukeComponent";
import { KokyuKanawoComponent } from "../../kokyu/KokyuKanawoComponent";
import { KokyuMituriComponent } from "../../kokyu/KokyuMituriComponent";
import { KokyuKyouzyuroComponent } from "../../kokyu/KokyuKyouzyuroComponent";
import { KokyuSanemiComponent } from "../../kokyu/KokyuSanemiComponent";
import { KokyuShinobuComponent } from "../../kokyu/KokyuShinobuComponent";
import { KokyuTanjiroComponent } from "../../kokyu/KokyuTanjiroComponent";
import { KokyuTengenComponent } from "../../kokyu/KokyuTengenComponent";
import { KokyuZenituComponent } from "../../kokyu/KokyuZenituComponent";
import { NichirintouChoiceComponent } from "../../kokyu/NichirintouChoiceComponent";
import { NichirintouUseComponent } from "../../kokyu/NichirintouUseComponent";
import { KokyuHebiComponent } from "../../kokyu/regimental/KokyuHebiComponent";
import { KokyuHiComponent } from "../../kokyu/regimental/KokyuHiComponent";
import { KokyuHonoComponent } from "../../kokyu/regimental/KokyuHonoComponent";
import { KokyuIwaComponent } from "../../kokyu/regimental/KokyuIwaComponent";
import { KokyuKaminariComponent } from "../../kokyu/regimental/KokyuKaminariComponent";
import { KokyuKasumiComponent } from "../../kokyu/regimental/KokyuKasumiComponent";
import { KokyuKazeComponent } from "../../kokyu/regimental/KokyuKazeComponent";
import { KokyuMizuComponent } from "../../kokyu/regimental/KokyuMizuComponent";
import { KokyuMushiComponent } from "../../kokyu/regimental/KokyuMushiComponent";
import { KokyuOtoComponent } from "../../kokyu/regimental/KokyuOtoComponent";

export interface KokyuObject {
    itemName:string,
    type:number,
    kata: number[],
    kata_msg: string
    className: string
}

export const kokyuClassRecord: Record<string, new () => NichirintouUseComponent> = {
    nichirintou: NichirintouChoiceComponent,
    tanjiro: KokyuTanjiroComponent,
    zenitu: KokyuZenituComponent,
    inosuke: KokyuInosukeComponent,
    kanawo: KokyuKanawoComponent,
    giyu: KokyuGiyuComponent,
    shinobu: KokyuShinobuComponent,
    kyouzyuro: KokyuKyouzyuroComponent,
    sanemi: KokyuSanemiComponent,
    gyoumei: KokyuGyoumeiComponent,
    muitiro: KokyuTanjiroComponent,
    tengen: KokyuTengenComponent,
    obanai: KokyuKanawoComponent,
    mituri: KokyuMituriComponent,
    mizu: KokyuMizuComponent,
    kaminari: KokyuKaminariComponent,
    hi: KokyuHiComponent,
    hono: KokyuHonoComponent,
    kaze: KokyuKazeComponent,
    iwa: KokyuIwaComponent,
    kasumi: KokyuKasumiComponent,
    oto: KokyuOtoComponent,
    hebi: KokyuHebiComponent,
    koi: KokyuHiComponent,
    mushi: KokyuMushiComponent,
};

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
        kata: [1,4,5],
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
        itemName: "kurokumaft:nichirintou_kaze",
        type: 19,
        kata: [1,2,3,4,5,6,7,8,9],
        kata_msg: "kaze_kata",
        className: "kaze"
    },
    {
        itemName: "kurokumaft:nichirintou_iwa",
        type: 19,
        kata: [1,2,3,4,5],
        kata_msg: "iwa_kata",
        className: "iwa"
    },
    {
        itemName: "kurokumaft:nichirintou_kasumi",
        type: 20,
        kata: [1,2,3,4,5,6,7],
        kata_msg: "kasumi_kata",
        className: "kasumi"
    },
    {
        itemName: "kurokumaft:nichirintou_oto",
        type: 21,
        kata: [1,2,3,4,5],
        kata_msg: "oto_kata",
        className: "oto"
    },
    {
        itemName: "kurokumaft:nichirintou_hebi",
        type: 22,
        kata: [1,2,3,4,5],
        kata_msg: "hebi_kata",
        className: "hebi"
    },
    {
        itemName: "kurokumaft:nichirintou_koi",
        type: 23,
        kata: [1,2,3,5,6],
        kata_msg: "koi_kata",
        className: "koi"
    },
    {
        itemName: "kurokumaft:nichirintou_mushi",
        type: 24,
        kata: [1,2,3,4],
        kata_msg: "mushi_kata",
        className: "mushi"
    },
    {
        itemName: "kurokumaft:nichirintou_tuki",
        type: 25,
        kata: [1,2,3,5,6,7,8,9,10,14,16],
        kata_msg: "tuki_kata",
        className: "tuki"
    },
])
