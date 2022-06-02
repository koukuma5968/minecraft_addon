tag @e[family=monster,c=3,r=20] add burstflare
execute @e[tag=burstflare] ~~~ particle kurokumaft:burstflare_particle ~~~
damage @e[tag=burstflare] 10 fire
execute @e[tag=burstflare] ~~~ summon kurokumaft:burstflaremagic ~~1~ minecraft:explode
tag @e[tag=burstflare] remove burstflare
