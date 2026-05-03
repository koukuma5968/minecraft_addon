import { Entity } from "@minecraft/server";
import { MHInsectActionInterface } from "../../insect/action/MHInsectActionInterface";
import { ImmortalInsectAction } from "../../insect/action/ImmortalInsectAction";
import { BitterBugAction } from "../../insect/action/BitterBugAction";

export const MHInsectTypesActionClass: Record<string, new (entity:Entity) => MHInsectActionInterface> = {
  immortal_insect: ImmortalInsectAction,
  bitter_bug: BitterBugAction
}

