tag @s add bumrod_self
particle kurokumaft:bumrod_particle ^ ^1.8 ^4.4
execute as @s positioned ^^^2 run damage @e[tag=!bumrod_self,family=!inanimate,family=!familiar,type=!item,r=5] 4 fire
execute as @s positioned ^^^2 run damage @e[tag=!bumrod_self,family=!inanimate,family=!familiar,type=!item,r=5] 4 fire
tag @s remove bumrod_self
