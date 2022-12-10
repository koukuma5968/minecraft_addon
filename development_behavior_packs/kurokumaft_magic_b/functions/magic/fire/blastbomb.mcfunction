tag @e[family=monster,c=3,r=20] add blastbomb
execute @e[tag=blastbomb] ~~~ particle kurokumaft:burstflare_particle ~~~
damage @e[tag=blastbomb] 10 fire
execute @e[tag=blastbomb] ~~~ summon kurokumaft:blastbombmagic ~~1~ minecraft:explode
tag @e[tag=blastbomb] remove blastbomb
