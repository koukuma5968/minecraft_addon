execute as @s positioned ^^^5 run tag @e[family=monster,r=10,c=1] add tidal_wave
execute as @e[tag=tidal_wave] at @s run tag @e[family=monster,tag=!tidal_wave,tag=!tidal_wave_at,r=6] add tidal_wave_at
