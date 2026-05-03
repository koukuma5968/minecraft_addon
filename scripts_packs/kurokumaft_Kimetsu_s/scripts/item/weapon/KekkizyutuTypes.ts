import { Entity } from "@minecraft/server";
import { KekkizyutuMobUseComponent, KekkizyutuUseComponent } from "../../kekkizyutu/KekkizyutuUseComponent";
import { ZyutuAizetuComponent } from "../../kekkizyutu/player/character/ZyutuAizetuComponent";
import { ZyutuAkazaComponent } from "../../kekkizyutu/player/character/ZyutuAkazaComponent";
import { ZyutuDakiComponent } from "../../kekkizyutu/player/character/ZyutuDakiComponent";
import { ZyutuGyutaroComponent } from "../../kekkizyutu/player/character/ZyutuGyutaroComponent";
import { ZyutuKarakuComponent } from "../../kekkizyutu/player/character/ZyutuKarakuComponent";
import { ZyutuNezukoComponent } from "../../kekkizyutu/player/character/ZyutuNezukoComponent";
import { ZyutuRuiComponent } from "../../kekkizyutu/player/character/ZyutuRuiComponent";
import { ZyutuSekidoComponent } from "../../kekkizyutu/player/character/ZyutuSekidoComponent";
import { ZyutuUrogiComponent } from "../../kekkizyutu/player/character/ZyutuUrogiComponent";
import { ZyutuZouhakutenComponent } from "../../kekkizyutu/player/character/ZyutuZouhakutenComponent";
import { TokageComponent } from "../../kekkizyutu/mob/TokageComponent";
import { DakiComponent } from "../../kekkizyutu/mob/DakiComponent";
import { GyutaroComponent } from "../../kekkizyutu/mob/GyutaroComponent";
import { RuiComponent } from "../../kekkizyutu/mob/RuiComponent";
import { NezukoComponent } from "../../kekkizyutu/mob/NezukoComponent";
import { AkazaComponent } from "../../kekkizyutu/mob/AkazaComponent";
import { AizetuComponent } from "../../kekkizyutu/mob/AizetuComponent";
import { KarakuComponent } from "../../kekkizyutu/mob/KarakuComponent";
import { SekidoComponent } from "../../kekkizyutu/mob/SekidoComponent";
import { UrogiComponent } from "../../kekkizyutu/mob/UrogiComponent";
import { ZouhakutenComponent } from "../../kekkizyutu/mob/ZouhakutenComponent";
import { KokushibouComponent } from "../../kekkizyutu/mob/KokushibouComponent";
import { ZyutuKokushibouComponent } from "../../kekkizyutu/player/character/ZyutuKokushibouComponent";
import { ZyutuKaigakuComponent } from "../../kekkizyutu/player/character/ZyutuKaigakuComponent";
import { ZyutuDoumaComponent } from "../../kekkizyutu/player/character/ZyutuDoumaComponent";
import { DoumaComponent } from "../../kekkizyutu/mob/DoumaComponent";
import { KessyounomikoComponent } from "../../kekkizyutu/mob/KessyounomikoComponent";
import { MuhyousuirenbosatuComponent } from "../../kekkizyutu/mob/MuhyousuirenbosatuComponent";
import { ZyutuGyokkoComponent } from "../../kekkizyutu/player/character/ZyutuGyokkoComponent";
import { GyokkoComponent } from "../../kekkizyutu/mob/GyokkoComponent";
import { ZyutuSusamaruComponent } from "../../kekkizyutu/player/character/ZyutuSusamaruComponent";
import { SusamaruComponent } from "../../kekkizyutu/mob/SusamaruComponent";
import { ZyutuYahabaComponent } from "../../kekkizyutu/player/character/ZyutuYahabaComponent";
import { YahabaComponent } from "../../kekkizyutu/mob/YahabaComponent";
import { KaigakuComponent } from "../../kekkizyutu/mob/KaigakuComponent";

export interface KekkizyutuObject {
    itemName:string,
    type:number,
    kata: number[],
    kata_msg: string
    className: string
}

export const KekkizyutuClassRecord = new Map<string, KekkizyutuUseComponent>();
KekkizyutuClassRecord.set("nezuko", new ZyutuNezukoComponent());
KekkizyutuClassRecord.set("rui", new ZyutuRuiComponent());
KekkizyutuClassRecord.set("akaza", new ZyutuAkazaComponent());
KekkizyutuClassRecord.set("daki", new ZyutuDakiComponent());
KekkizyutuClassRecord.set("gyutaro", new ZyutuGyutaroComponent());
KekkizyutuClassRecord.set("sekido", new ZyutuSekidoComponent());
KekkizyutuClassRecord.set("karaku", new ZyutuKarakuComponent());
KekkizyutuClassRecord.set("aizetu", new ZyutuAizetuComponent());
KekkizyutuClassRecord.set("urogi", new ZyutuUrogiComponent());
KekkizyutuClassRecord.set("zouhakuten", new ZyutuZouhakutenComponent());
KekkizyutuClassRecord.set("douma", new ZyutuDoumaComponent());
KekkizyutuClassRecord.set("kokushibou", new ZyutuKokushibouComponent());
KekkizyutuClassRecord.set("kaigaku", new ZyutuKaigakuComponent());
KekkizyutuClassRecord.set("gyokko", new ZyutuGyokkoComponent());
KekkizyutuClassRecord.set("susamaru", new ZyutuSusamaruComponent());
KekkizyutuClassRecord.set("yahaba", new ZyutuYahabaComponent());

export const KekkizyutuObjects = Object.freeze([
    {
        itemName: "kurokumaft:bakketu",
        type: 1,
        kata: [1],
        kata_msg: "kekkizyutu_bakketu",
        className: "nezuko"
    },
    {
        itemName: "kurokumaft:koushi",
        type: 2,
        kata: [1,2,3],
        kata_msg: "kekkizyutu_ito",
        className: "rui"
    },
    {
        itemName: "kurokumaft:hakaisatu_item",
        type: 3,
        kata: [1,2,3,4,5,6,7,8,9,10],
        kata_msg: "kekkizyutu_hakai",
        className: "akaza"
    },
    {
        itemName: "kurokumaft:obi_item",
        type: 4,
        kata: [1,2,3,4],
        kata_msg: "kekkizyutu_obi",
        className: "daki"
    },
    {
        itemName: "kurokumaft:gyutaro_kama",
        type: 5,
        kata: [1,2,3],
        kata_msg: "kekkizyutu_tigama",
        className: "gyutaro"
    },
    {
        itemName: "kurokumaft:sekido_syakuzyou",
        type: 6,
        kata: [1],
        kata_msg: "kekkizyutu_ikazuti",
        className: "sekido"
    },
    {
        itemName: "kurokumaft:karaku_ougi",
        type: 7,
        kata: [1],
        kata_msg: "kekkizyutu_toppu",
        className: "karaku"
    },
    {
        itemName: "kurokumaft:aizetu_spear",
        type: 8,
        kata: [1],
        kata_msg: "kekkizyutu_shitotu",
        className: "aizetu"
    },
    {
        itemName: "kurokumaft:urogi_ultrasonic_item",
        type: 9,
        kata: [1],
        kata_msg: "kekkizyutu_kyoumei",
        className: "urogi"
    },
    {
        itemName: "kurokumaft:zouhakuten_bati",
        type: 10,
        kata: [1, 2, 3, 4],
        kata_msg: "kekkizyutu_zouhakuten",
        className: "zouhakuten"
    },
    {
        itemName: "kurokumaft:douma_sensu",
        type: 11,
        kata: [1,2,3,4,5,6,7,8,9],
        kata_msg: "kekkizyutu_koori",
        className: "douma"
    },
    {
        itemName: "kurokumaft:kyokokukamusari",
        type: 12,
        kata: [1,2,3,5,6,7,8,9,10,14,16],
        kata_msg: "tuki_kata",
        className: "kokushibou"
    },
    {
        itemName: "kurokumaft:nichirintou_kaigaku",
        type: 13,
        kata: [2,3,4,5,6],
        kata_msg: "kaminari_kata",
        className: "kaigaku"
    },
    {
        itemName: "kurokumaft:gyokko_tubo",
        type: 14,
        kata: [1,2,3,4,5,6],
        kata_msg: "kekkizyutu_tubo",
        className: "gyokko"
    },
    {
        itemName: "kurokumaft:susamaru_mari",
        type: 15,
        kata: [1,2],
        kata_msg: "kekkizyutu_mari",
        className: "susamaru"
    },
    {
        itemName: "kurokumaft:kouketunoya",
        type: 16,
        kata: [1,2,3,4],
        kata_msg: "kekkizyutu_kouketunoya",
        className: "yahaba"
    },
]);

export interface KekkizyutuMobObject {
    entityName:string,
    className: string
}

export const KekkizyutuMobClassRecord = new Map<string, KekkizyutuMobUseComponent>();
KekkizyutuMobClassRecord.set("tokage", new TokageComponent());
KekkizyutuMobClassRecord.set("nezuko", new NezukoComponent());
KekkizyutuMobClassRecord.set("daki", new DakiComponent());
KekkizyutuMobClassRecord.set("gyutaro", new GyutaroComponent());
KekkizyutuMobClassRecord.set("rui", new RuiComponent());
KekkizyutuMobClassRecord.set("akaza", new AkazaComponent());
KekkizyutuMobClassRecord.set("aizetu", new AizetuComponent());
KekkizyutuMobClassRecord.set("karaku", new KarakuComponent());
KekkizyutuMobClassRecord.set("sekido", new SekidoComponent());
KekkizyutuMobClassRecord.set("urogi", new UrogiComponent());
KekkizyutuMobClassRecord.set("zouhakuten", new ZouhakutenComponent());
KekkizyutuMobClassRecord.set("kokushibou", new KokushibouComponent());
KekkizyutuMobClassRecord.set("kaigaku", new KaigakuComponent());
KekkizyutuMobClassRecord.set("douma", new DoumaComponent());
KekkizyutuMobClassRecord.set("kessyounomiko", new KessyounomikoComponent());
KekkizyutuMobClassRecord.set("muhyousuirenbosatu", new MuhyousuirenbosatuComponent());
KekkizyutuMobClassRecord.set("gyokko", new GyokkoComponent());
KekkizyutuMobClassRecord.set("susamaru", new SusamaruComponent());
KekkizyutuMobClassRecord.set("yahaba", new YahabaComponent());

export const KekkizyutuMobObjects = Object.freeze([
    {
        entityName: "kurokumaft:tokage",
        className: "tokage"
    },
    {
        entityName: "kurokumaft:nezuko",
        className: "nezuko"
    },
    {
        entityName: "kurokumaft:daki",
        className: "daki"
    },
    {
        entityName: "kurokumaft:gyutaro",
        className: "gyutaro"
    },
    {
        entityName: "kurokumaft:rui",
        className: "rui"
    },
    {
        entityName: "kurokumaft:akaza",
        className: "akaza"
    },
    {
        entityName: "kurokumaft:aizetu",
        className: "aizetu"
    },
    {
        entityName: "kurokumaft:karaku",
        className: "karaku"
    },
    {
        entityName: "kurokumaft:sekido",
        className: "sekido"
    },
    {
        entityName: "kurokumaft:urogi",
        className: "urogi"
    },
    {
        entityName: "kurokumaft:zouhakuten",
        className: "zouhakuten"
    },
    {
        entityName: "kurokumaft:kokushibou",
        className: "kokushibou"
    },
    {
        entityName: "kurokumaft:kaigaku",
        className: "kaigaku"
    },
    {
        entityName: "kurokumaft:douma",
        className: "douma"
    },
    {
        entityName: "kurokumaft:kessyounomiko",
        className: "kessyounomiko"
    },
    {
        entityName: "kurokumaft:muhyousuirenbosatu",
        className: "muhyousuirenbosatu"
    },
    {
        entityName: "kurokumaft:gyokko",
        className: "gyokko"
    },
    {
        entityName: "kurokumaft:susamaru",
        className: "susamaru"
    },
    {
        entityName: "kurokumaft:yahaba",
        className: "yahaba"
    },
]);

export async function startKekkizyutuMonitoringMob(entity:Entity, className:string) {
    const kekkizyutuClass = KekkizyutuMobClassRecord.get(className);
    if (kekkizyutuClass !== undefined) {
        kekkizyutuClass.startMonitoring(entity);
    }
}

export async function hitKekkizyutuAttackKataMob(entity:Entity, className:string) {
    const kekkizyutuClass = KekkizyutuMobClassRecord.get(className);
    if (kekkizyutuClass !== undefined) {
        kekkizyutuClass.hitAttackZyutu(entity);
    }
}

export async function hitKekkizyutuAttackKata(entity:Entity, className:string) {
    const kekkizyutuClass = KekkizyutuClassRecord.get(className);
    if (kekkizyutuClass !== undefined) {
        kekkizyutuClass.hitAttackZyutu(entity);
    }
}