tag @s add stone_bread
particle kurokumaft:stone_bread_particle ^ ^1.8 ^3.5
execute as @s positioned ^^^2 run damage @e[tag=!stone_bread,family=!inanimate,family=!familiar,type=!item,r=4] 5 falling_block
tag @s remove stone_bread
