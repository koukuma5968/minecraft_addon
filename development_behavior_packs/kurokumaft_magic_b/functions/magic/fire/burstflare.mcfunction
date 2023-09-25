tag @e[family=monster,c=3,r=20] add burstflare
execute as @e[tag=burstflare] at @s run particle kurokumaft:burstflare_particle ~~~
damage @e[tag=burstflare] 10 fire
execute as @e[tag=burstflare] at @s run summon kurokumaft:burstflaremagic ~~1~ ~ ~ minecraft:explode
tag @e[tag=burstflare] remove burstflare
