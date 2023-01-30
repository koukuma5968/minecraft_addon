execute @s ~~~ particle kurokumaft:thunder_sword_slash_particle ~~~
execute @e[family=!player,family=!inanimate,r=5.5] ~~~ summon kurokumaft:fire_sword_magic ~~0.75~
execute @e[family=!player,family=!inanimate,r=5.5] ~~~ summon kurokumaft:thunder_sword_magic ~~0.75~
execute @e[family=!player,family=!inanimate,r=5.5] ~~~ summon kurokumaft:wind_sword_knockback_roar ~~0.75~
effect @s weakness 50 100 true
effect @s poison 50 100 true
effect @e[family=!player,family=!inanimate,r=5.5] slowness 20 30 true
execute @s ~~~ effect @e[family=!player,family=!inanimate,r=7] wither 10 30 false
execute @s ~~~ effect @e[family=player,family=!inanimate,r=7] instant_health 1 70 false
