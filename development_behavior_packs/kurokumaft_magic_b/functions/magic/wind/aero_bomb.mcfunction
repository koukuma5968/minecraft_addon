tag @e[family=monster,c=3,r=20] add aero_bomb
execute @e[tag=aero_bomb] ~~~ particle kurokumaft:aero_bomb_particle ~~~
damage @e[tag=aero_bomb] 10 fall
execute @e[tag=aero_bomb] ~~~ summon kurokumaft:burstflaremagic ~~1~ minecraft:explode
tag @e[tag=aero_bomb] remove aero_bomb
