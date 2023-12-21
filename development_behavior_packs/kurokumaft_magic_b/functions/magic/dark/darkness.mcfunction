tag @s add darkness_self
tag @e[tag=!darkness_self,family=!inanimate,family=!familiar,ry=-25,rym=25,r=5,c=10] add darkness
execute at @e[tag=darkness] run particle kurokumaft:dark_particle ~~~
execute at @e[tag=darkness] run effect @s weakness 5 5 false
damage @e[tag=darkness] 1 wither
tag @e[tag=darkness] remove darkness