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

export interface KekkizyutuObject {
    itemName:string,
    type:number,
    kata: number[],
    kata_msg: string
    className: string
}

export const KekkizyutuClassRecord: Record<string, new () => KekkizyutuUseComponent> = {
    nezuko: ZyutuNezukoComponent,
    rui: ZyutuRuiComponent,
    akaza: ZyutuAkazaComponent,
    daki: ZyutuDakiComponent,
    gyutaro: ZyutuGyutaroComponent,
    sekido: ZyutuSekidoComponent,
    karaku: ZyutuKarakuComponent,
    aizetu: ZyutuAizetuComponent,
    urogi: ZyutuUrogiComponent,
    zouhakuten: ZyutuZouhakutenComponent,
};

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
        itemName: "kurokumaft:hakaisatu",
        type: 3,
        kata: [1,2,3,4,5,6,7,8,9,10],
        kata_msg: "kekkizyutu_hakai",
        className: "akaza"
    },
    {
        itemName: "kurokumaft:obi",
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
        itemName: "kurokumaft:urogi_ultrasonic",
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
]);

export interface KekkizyutuMobObject {
    entityName:string,
    className: string
}

export const KekkizyutuMobClassRecord: Record<string, new (entity:Entity) => KekkizyutuMobUseComponent> = {
    tokage: TokageComponent,
};

export const KekkizyutuMobObjects = Object.freeze([
    {
        entityName: "kurokumaft:tokage",
        className: "tokage"
    },
]);
