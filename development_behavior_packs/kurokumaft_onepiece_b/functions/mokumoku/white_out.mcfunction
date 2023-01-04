tag @s add mokumoku_white_out
tag @e[tag=!mokumoku_white_out,r=10] add mokumoku_white_out_target
execute @s ^0.5^1^ particle kurokumaft:mokumoku ~~~
execute @s ^-0.5^1^ particle kurokumaft:mokumoku ~~~
execute @e[tag=mokumoku_white_out_target] ~~~ particle kurokumaft:white_out ~~~
effect @e[tag=mokumoku_white_out_target] slowness 60 255 true
effect @e[tag=mokumoku_white_out_target] blindness 60 255 true
tag @e[tag=mokumoku_white_out_target] remove mokumoku_white_out_target
tag @s remove mokumoku_white_out
