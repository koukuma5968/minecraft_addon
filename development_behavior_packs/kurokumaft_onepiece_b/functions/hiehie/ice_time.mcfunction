tag @s add hiehie_ice_time
tag @e[tag=!hiehie_ice_time,r=10] add hiehie_ice_time_target
execute at @s positioned ^0.5^1^ run particle kurokumaft:hiehie ~~~
execute at @s positioned ^-0.5^1^ run particle kurokumaft:hiehie ~~~
execute at @e[tag=hiehie_ice_time_target] positioned ~~~ run summon kurokumaft:ice_time_entity
tag @e[tag=hiehie_ice_time_target] remove hiehie_ice_time_target
tag @s remove hiehie_ice_time
