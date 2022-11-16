damage @e[tag=bakketu_enemy] 5 entity_attack
execute @e[tag=bakketu_enemy] ~~~ particle kurokumaft:bakketu ~~~
execute @e[tag=bakketu_enemy] ~~~ particle kurokumaft:bakketu_fire ~~~

effect @e[tag=bakketu_ally] instant_health 1 5 true
execute @e[tag=bakketu_ally] ~~~ particle kurokumaft:bakketu ~~~
execute @e[tag=bakketu_ally] ~~~ particle kurokumaft:bakketu_fire ~~~
