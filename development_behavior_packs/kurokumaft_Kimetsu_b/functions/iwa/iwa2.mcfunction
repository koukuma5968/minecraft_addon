tag @s add kokyu_iwa2
execute @s ^^^5 damage @e[tag=!kokyu_iwa2,r=5] 30 entity_attack
execute @s ^^^5 particle kurokumaft:iwa2_particle ~~~
execute @s ^^^5 summon kurokumaft:oto_bom ~~~ minecraft:explode
tag @s remove kokyu_iwa2
