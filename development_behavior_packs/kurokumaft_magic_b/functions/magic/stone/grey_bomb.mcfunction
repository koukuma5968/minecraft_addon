tag @e[tag=!grey_bomb_self,family=!inanimate,type=!item,c=3,r=20] add grey_bomb
execute at @e[tag=grey_bomb] run particle kurokumaft:grey_bomb_particle ~~~
damage @e[tag=grey_bomb] 10 falling_block
execute at @e[tag=grey_bomb] run summon kurokumaft:burstflaremagic ~~-1~ ~ ~ minecraft:explode
tag @e[tag=grey_bomb] remove grey_bomb
