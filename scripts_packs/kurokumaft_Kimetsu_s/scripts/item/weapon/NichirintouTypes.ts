import { probabilisticChoice } from "./nichirintou/Nichirintou"
import { changeTanjiro, kokyuTanjiro } from "./nichirintou/NichirintouTanjiro"

export interface KokyuObject {
    itemName:string,
    type:number,
    kata: number[],
    kata_msg: string,
    change: CallableFunction,
    func: CallableFunction
}

export const KokyuObjects = Object.freeze([
    {
        itemName: "kurokumaft:nichirintou",
        type: 1,
        change: undefined,
        func: probabilisticChoice
    },
    {
        itemName: "kurokumaft:nichirintou_tanjiro",
        type: 2,
        kata: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
        kata_msg: "msg.kurokumaft:tanjiro_kata",
        change: changeTanjiro,
        func: kokyuTanjiro
    },
    {
        itemName: "kurokumaft:nichirintou_zenitu",
        type: 2,
        kata: [1,2,7],
        kata_msg: "msg.kurokumaft:tanjiro_kata",
        change: changeTanjiro,
        func: kokyuTanjiro
    },
])
