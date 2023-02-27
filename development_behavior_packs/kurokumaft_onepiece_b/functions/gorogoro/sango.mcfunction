tag @s add gorogoro_sango
tag @e[tag=!gorogoro_sango,c=2] add gorogoro_sango_t
execute at @e[tag=gorogoro_sango_t] run summon lightning_bolt
execute at @e[tag=gorogoro_sango_t] run particle kurokumaft:vari_particle ~~~
tag @e[tag=gorogoro_sango_t] remove gorogoro_sango_t
tag @s remove gorogoro_sango
