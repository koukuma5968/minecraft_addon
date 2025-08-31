import { weightChoice } from "./KimetuCommonUtil";

export const OgreKaikyu = Object.freeze([
    { name: 'kurokumaft:aizetu' , rank: "crescent", num: 4 },
    { name: 'kurokumaft:akaza' , rank: "crescent", num: 3 },
    { name: 'kurokumaft:douma' , rank: "crescent", num: 2 },
    { name: 'kurokumaft:gyutaro' , rank: "crescent", num: 6 },
    { name: 'kurokumaft:hantengu_obie' , rank: "crescent", num: 4 },
    { name: 'kurokumaft:hantengu' , rank: "crescent", num: 4 },
    { name: 'kurokumaft:karaku' , rank: "crescent", num: 4 },
    { name: 'kurokumaft:rui' , rank: "quarter", num: 5 },
    { name: 'kurokumaft:sekido' , rank: "crescent", num: 4 },
    { name: 'kurokumaft:urogi' , rank: "crescent", num: 4 },
    { name: 'kurokumaft:zouhakuten' , rank: "crescent", num: 4 },
    
]);

export const TaishiKaikyu = Object.freeze([
    { name: 'kurokumaft:genya' , min: 1, max: 7 },
    { name: 'kurokumaft:kanawo' , min: 4, max: 10 },
    { name: 'kurokumaft:tanjiro' , min: 1, max: 10 },
    { name: 'kurokumaft:zenitu' , min: 1, max: 10 },
    { name: 'kurokumaft:inosuke' , min: 1, max: 10 },
    { name: 'kurokumaft:regimental_girl' , min: 1, max: 7 },
    { name: 'kurokumaft:regimental_guy' , min: 1, max: 7 },
    
]);

export const kaikyuPointList = [
    "0",
    "100",
    "300",
    "600",
    "1000",
    "1500",
    "2100",
    "2800",
    "3600",
    "4500",
    "10",
    "-"
];

export const ogrePointList = [
    {name :"none", value: "100", regene: 0, regeneTime: 0},
    {name :"low", value: "150", regene: 1, regeneTime: 240},
    {name :"unusual", value: "200", regene: 2, regeneTime: 480},
    {name :"quarter", value: "400", regene: 3, regeneTime: 720},
    {name :"crescent", value: "500", regene: 4, regeneTime: 1200},
    {name :"king", value: "-", regene: 5, regeneTime: 3600},
];

export const kekkizyutuPickLists = weightChoice([
    {item:'kurokumaft:bakketu',weight:20},
    {item:'kurokumaft:koushi',weight:20},
    {item:'kurokumaft:obi_item',weight:15},
    {item:'kurokumaft:nichirintou_kaigaku',weight:10},
    {item:'kurokumaft:gyutaro_kama',weight:10},
    {item:'kurokumaft:zouhakuten_bati',weight:5},
    {item:'kurokumaft:gyokko_tubo',weight:5},
    {item:'kurokumaft:hakaisatu_item',weight:5},
    {item:'kurokumaft:douma_sensu',weight:5},
    {item:'kurokumaft:kyokokukamusari',weight:5},
]);

export const kekkizyutuLists = Object.freeze([
    {item:"kurokumaft:bakketu",             msg:"item.kurokumaft:bakketu.name",},
    {item:"kurokumaft:koushi",              msg:"item.kurokumaft:koushi.name",},
    {item:"kurokumaft:obi_item",            msg:"item.kurokumaft:obi.name",},
    {item:"kurokumaft:gyutaro_kama",        msg:"item.kurokumaft:tigama.name",},
    {item:"kurokumaft:zouhakuten_bati",     msg:"item.kurokumaft:mogura.name",},
    {item:"kurokumaft:gyokko_tubo",         msg:"item.kurokumaft:suisei.name",},
    {item:"kurokumaft:hakaisatu_item",      msg:"item.kurokumaft:hakaisatu.name",},
    {item:"kurokumaft:douma_sensu",         msg:"item.kurokumaft:koori.name",},
    {item:"kurokumaft:kyokokukamusari",     msg:"item.kurokumaft:mikatuki.name",},
    {item:"kurokumaft:nichirintou_kaigaku", msg:"item.kurokumaft:kokurai.name",},
]);

export const NitirintouEquips = Object.freeze([
    {
        itemName: "kurokumaft:nichirintou_tanjiro",
        charaName: "kurokumaft:tanjiro"
    },
    {
        itemName: "kurokumaft:nichirintou_zenitu",
        charaName: "kurokumaft:zenitu"
    },
    {
        itemName: "kurokumaft:nichirintou_inosuke",
        charaName: "kurokumaft:inosuke"
    },
    {
        itemName: "kurokumaft:nichirintou_kanawo",
        charaName: "kurokumaft:kanawo"
    },
    {
        itemName: "kurokumaft:nichirintou_giyu",
        charaName: "kurokumaft:giyu"
    },
    {
        itemName: "kurokumaft:nichirintou_shinobu",
        charaName: "kurokumaft:shinobu"
    },
    {
        itemName: "kurokumaft:nichirintou_kyouzyuro",
        charaName: "kurokumaft:kyouzyuro"
    },
    {
        itemName: "kurokumaft:nichirintou_sanemi",
        charaName: "kurokumaft:sanemi"
    },
    {
        itemName: "kurokumaft:nichirintou_gyoumei",
        charaName: "kurokumaft:gyoumei"
    },
    {
        itemName: "kurokumaft:nichirintou_muitiro",
        charaName: "kurokumaft:muitiro"
    },
    {
        itemName: "kurokumaft:nichirintou_tengen",
        charaName: "kurokumaft:tengen"
    },
    {
        itemName: "kurokumaft:nichirintou_obanai",
        charaName: "kurokumaft:obanai"
    },
    {
        itemName: "kurokumaft:nichirintou_mituri",
        charaName: "kurokumaft:mituri"
    },
])
