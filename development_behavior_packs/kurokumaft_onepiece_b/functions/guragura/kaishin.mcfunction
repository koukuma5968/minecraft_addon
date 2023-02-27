tag @s add guragura_kaishin
effect @e[tag=!guragura_kaishin,r=50] slowness 2 10 true
effect @e[tag=!guragura_kaishin,r=50] nausea 2 10 true
execute as @s positioned ^5^1.0^ run particle kurokumaft:guragura ~~~
execute as @s positioned ^2^1.0^ run particle kurokumaft:crack ~~~
execute as @s positioned ^-5^1.0^ run particle kurokumaft:guragura ~~~
execute as @s positioned ^-2^1.0^ run particle kurokumaft:crack ~~~
execute as @s positioned ~~~ run damage @e[tag=!guragura_kaishin,r=50] 5 anvil
tag @s remove guragura_kaishin
