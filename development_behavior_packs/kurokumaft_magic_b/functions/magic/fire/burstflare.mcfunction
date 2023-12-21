tag @e[tag=!burstflare_self,family=!inanimate,family=!familiar,type=!item,c=3,r=20] add burstflare
execute at @e[tag=burstflare] run particle kurokumaft:burstflare_particle ~~~
damage @e[tag=burstflare] 10 fire
execute at @e[tag=burstflare] run summon kurokumaft:burstflaremagic ~~1~ ~ ~ minecraft:explode
tag @e[tag=burstflare] remove burstflare
