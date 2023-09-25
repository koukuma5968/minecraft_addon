tag @e[family=monster,c=3,r=20] add aero_bomb
execute as @e[tag=aero_bomb] run particle kurokumaft:aero_bomb_particle ~~~
damage @e[tag=aero_bomb] 10 fall
execute as @e[tag=aero_bomb] run summon kurokumaft:burstflaremagic ~~1~ ~ ~ minecraft:explode
tag @e[tag=aero_bomb] remove aero_bomb
