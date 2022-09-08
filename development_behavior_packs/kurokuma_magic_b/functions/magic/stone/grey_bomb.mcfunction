tag @e[family=monster,c=3,r=20] add grey_bomb
execute @e[tag=grey_bomb] ~~~ particle kurokumaft:grey_bomb_particle ~~~
damage @e[tag=grey_bomb] 10 falling_block
execute @e[tag=grey_bomb] ~~~ summon kurokumaft:burstflaremagic ~~-1~ minecraft:explode
tag @e[tag=grey_bomb] remove grey_bomb
