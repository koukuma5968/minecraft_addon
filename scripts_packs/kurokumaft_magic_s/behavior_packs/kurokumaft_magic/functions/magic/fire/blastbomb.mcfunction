tag @s add blastbomb_self
tag @e[tag=!blastbomb_self,family=!inanimate,family=!familiar,type=!item,c=3,r=20] add blastbomb
execute as @e[tag=blastbomb] at @s run particle kurokumaft:burstflare_particle ~~~
damage @e[tag=blastbomb] 10 fire
execute as @e[tag=blastbomb] at @s run summon kurokumaft:blastbombmagic ~~1~ ~ ~ minecraft:explode
tag @e[tag=blastbomb] remove blastbomb
tag @s remove blastbomb_self