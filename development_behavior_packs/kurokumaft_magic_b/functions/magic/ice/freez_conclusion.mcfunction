tag @e[family=monster,c=1,r=15] add freez_conclusion
execute @e[tag=freez_conclusion] ~~~ particle kurokumaft:freezingconclusion_particle ~~~
execute @e[tag=freez_conclusion] ~~~ fill ~-1 ~ ~-1 ~1 ~1 ~1 packed_ice
effect @e[tag=freez_conclusion] weakness 20 3 true
tag @e[tag=freez_conclusion] remove freez_conclusion
