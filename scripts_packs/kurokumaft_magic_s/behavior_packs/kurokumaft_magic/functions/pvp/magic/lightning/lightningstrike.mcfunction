tag @e[tag=!lightningstrike_self,family=!inanimate,family=!familiar,type=!item,r=15] add lightningstrike
execute at @e[tag=lightningstrike_self] run particle kurokumaft:thunder_sword_particle ~~~
execute at @e[tag=lightningstrike] run particle kurokumaft:spark_particle ~~~
effect @e[tag=lightningstrike] slowness 1 1 true
damage @e[tag=lightningstrike] 6 lightning
tag @e[tag=lightningstrike] remove lightningstrike
