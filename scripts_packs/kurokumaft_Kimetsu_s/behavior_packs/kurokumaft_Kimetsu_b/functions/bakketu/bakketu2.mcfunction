damage @e[tag=bakketu_enemy] 5 entity_attack
execute as @e[tag=bakketu_enemy] at @s run particle kurokumaft:bakketu ~~~
execute as @e[tag=bakketu_enemy] at @s run particle kurokumaft:bakketu_fire ~~~

effect @e[tag=bakketu_ally] instant_health 1 5 true
execute as @e[tag=bakketu_ally] at @s run particle kurokumaft:bakketu ~~~
execute as @e[tag=bakketu_ally] at @s run particle kurokumaft:bakketu_fire ~~~
