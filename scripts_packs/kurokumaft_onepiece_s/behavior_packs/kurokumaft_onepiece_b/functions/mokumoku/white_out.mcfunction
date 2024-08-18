tag @s add mokumoku_white_out
tag @e[tag=!mokumoku_white_out,r=10] add mokumoku_white_out_target
execute positioned ^0.5^1^ at @s run particle kurokumaft:mokumoku ~~~
execute positioned ^-0.5^1^ at @s run particle kurokumaft:mokumoku ~~~
execute at @e[tag=mokumoku_white_out_target] run summon kurokumaft:white_out
tag @e[tag=mokumoku_white_out_target] remove mokumoku_white_out_target
tag @s remove mokumoku_white_out
