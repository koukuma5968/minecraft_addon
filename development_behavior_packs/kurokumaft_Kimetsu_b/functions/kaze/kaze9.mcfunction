tag @s add kokyu_kaze9
execute as @s positioned ^^-1^ run damage @e[tag=!kokyu_kaze9,r=5] 20 entity_attack
particle kurokumaft:kaze3_particle ^2^-1^2
particle kurokumaft:kaze1_particle ^2^-1^2
execute as @s positioned ^^-3^ run damage @e[tag=!kokyu_kaze9,r=5] 20 entity_attack
particle kurokumaft:kaze3_particle ^-2^-3^-2
particle kurokumaft:kaze1_particle ^-2^-3^-2
execute as @s positioned ^^-5^ run damage @e[tag=!kokyu_kaze9,r=5] 20 entity_attack
particle kurokumaft:kaze3_particle ^2^-5^2
particle kurokumaft:kaze1_particle ^2^-5^2
tag @s remove kokyu_kaze9
