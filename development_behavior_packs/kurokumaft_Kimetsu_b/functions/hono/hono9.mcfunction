tag @s add kokyu_hono9
execute as @s run damage @e[tag=!kokyu_hono9,family=!inanimate,family=!villager,family=!regimental_soldier,type=!item,r=5] 50 entity_attack
execute as @s run particle kurokumaft:hono_tiger_hit_particle ~~~
tag @s remove kokyu_hono9
