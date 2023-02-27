tag @s add sunasuna_baluhan
execute positioned ^^^2 as @s run damage @e[tag=!sunasuna_baluhan,r=2.5] 2 magic
effect @e[tag=!sunasuna_baluhan,r=2.5] hunger 1 255 true
execute as @s run particle kurokumaft:baluhan ^^^1
tag @s remove sunasuna_baluhan
