tag @s add flash_self
tag @e[tag=!flash_self,family=!inanimate,family=!familiar,type=!item,r=5,c=10] add flash
execute as @e[tag=flash] at @s run particle kurokumaft:light_particle ~~~
execute as @e[tag=flash] at @s run effect @s blindness 5 5 false
damage @e[tag=flash] 1 soul_campfire
tag @e[tag=flash] remove flash
tag @s remove flash_self
