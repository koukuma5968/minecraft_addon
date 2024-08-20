tag @e[tag=!aero_bomb_self,family=!inanimate,family=!familiar,type=!item,c=3,r=20] add aero_bomb
execute at @e[tag=aero_bomb] run particle kurokumaft:aero_bomb_particle ~~~
damage @e[tag=aero_bomb] 10 fall
execute at @e[tag=aero_bomb] run summon kurokumaft:burstflaremagic ~~1~ ~ ~ minecraft:explode
tag @e[tag=aero_bomb] remove aero_bomb
