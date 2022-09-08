execute @e[tag=flamespark3] ~~~ particle kurokumaft:firewall_particle ~~~
execute @e[tag=flamespark3] ~~~ setblock ~~~ fire 0 keep
execute @e[tag=flamespark3] ~~~ summon minecraft:lightning_bolt
damage @e[tag=flamespark3] 4 fire
damage @e[tag=flamespark3] 4 lightning
