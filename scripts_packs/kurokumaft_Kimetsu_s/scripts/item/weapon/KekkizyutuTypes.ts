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
    nezuko: NezukoComponent,
    daki: DakiComponent,
    gyutaro: GyutaroComponent,
    rui: RuiComponent,
    akaza: AkazaComponent,
    aizetu: AizetuComponent,
    karaku: KarakuComponent,
    sekido: SekidoComponent,
    urogi: UrogiComponent,
    zouhakuten: ZouhakutenComponent,
};

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
]);
