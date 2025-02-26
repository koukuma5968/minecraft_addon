import { KokyuTanjiroComponent } from "../../kokyu/KokyuTanjiroComponent";
import { NichirintouUseComponent } from "../../kokyu/NichirintouUseComponent";

export interface KokyuObject {
    itemName:string,
    type:number,
    kata: number[],
    kata_msg: string,
    className: string
}

export const kokyuClassRecord: Record<string, new () => NichirintouUseComponent> = {
    tanjiro: KokyuTanjiroComponent
};

export const KokyuObjects = Object.freeze([
    {
        itemName: "kurokumaft:nichirintou",
        type: 1
    },
    {
        itemName: "kurokumaft:nichirintou_tanjiro",
        type: 2,
        kata: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
        kata_msg: "msg.kurokumaft:tanjiro_kata",
        className: "tanjiro"
    },
    {
        itemName: "kurokumaft:nichirintou_zenitu",
        type: 2,
        kata: [1,2,7],
        kata_msg: "msg.kurokumaft:zenitu_kata",
        className: "zenitu"
    },
])
