import { Entity, Vector3 } from "@minecraft/server";
import { PhoenixActionCompornent } from "../PhoenixActionCompornent";

export interface BossActionInterface {

    startMoniter(): void;
    startMoveing(): void;

}

export interface BossActionObject {
    entityName: string,
    className: string
}

export interface BossMoveMoverInterface {
    updatePosition(deltaTime: number): Vector3;
    setPotion(position: Vector3) : void;
    setCenterY(y: number): void;
    getCenter() :Vector3;
    moveCenter(deltaTime: number): Vector3;
    isComplete(): boolean;
    moveOrigin(deltaTime: number): Vector3;
    isCompleteOrigin(): boolean;
}

export const BossActionObjects = Object.freeze([
    {
        entityName: "kurokumaft:phoenix",
        className: "phoenix"
    }
]);

export const BossActionClassRecord: Record<string, new (entity: Entity) => BossActionInterface> = {
    phoenix: PhoenixActionCompornent
}
