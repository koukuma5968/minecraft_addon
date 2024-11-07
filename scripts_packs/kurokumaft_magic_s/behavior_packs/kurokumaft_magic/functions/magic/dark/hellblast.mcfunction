tag @e[tag=!hellblast_self,family=!inanimate,family=!familiar,type=!item,ry=-10,rym=10,r=8] add hellblast
execute at @e[tag=hellblast] run particle kurokumaft:dark_brushash_particle ~~~
execute as @e[tag=hellblast] run effect @s weakness 10 1 false
execute as @e[tag=hellblast] run effect @s slowness 10 1 false
damage @e[tag=hellblast] 2 wither
tag @e[tag=hellblast] remove hellblast