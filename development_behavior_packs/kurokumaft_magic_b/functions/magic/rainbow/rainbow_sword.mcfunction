execute as @s run particle kurokumaft:thunder_sword_slash_particle ~~~
execute as @e[family=!player,family=!inanimate,r=5.5] at @s run summon kurokumaft:fire_sword_magic ~~0.75~
execute as @e[family=!player,family=!inanimate,r=5.5] at @s run summon kurokumaft:thunder_sword_magic ~~0.75~
execute as @e[family=!player,family=!inanimate,r=5.5] at @s run summon kurokumaft:wind_sword_knockback_roar ~~0.75~
effect @s weakness 50 100 true
effect @s poison 50 100 true
effect @e[family=!player,family=!inanimate,r=5.5] slowness 20 30 true
execute as @s run effect @e[family=!player,family=!inanimate,r=7] wither 10 30 false
execute as @s run effect @e[family=player,family=!inanimate,r=7] instant_health 1 70 false
