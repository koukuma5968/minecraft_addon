tag @s add rainbow_sword
execute as @s run particle kurokumaft:thunder_sword_slash_particle ~~~
execute as @e[tag=rainbow_sword] at @s run summon kurokumaft:fire_sword_magic ~~0.75~
execute as @e[tag=rainbow_sword] at @s run summon kurokumaft:thunder_sword_magic ~~0.75~
execute as @e[tag=rainbow_sword] at @s run summon kurokumaft:wind_sword_knockback_roar ~~0.75~
effect @s weakness 50 100 true
effect @s poison 50 100 true
effect @s slowness 20 30 true
effect @s wither 10 30 false
effect @e[tag=rainbow_sword_s] instant_health 1 70 false
tag @s remove rainbow_sword
tag @e[tag=rainbow_sword_s] remove rainbow_sword_s

