tag @s add sunasuna_sabers_petherd
execute at @s run damage @e[tag=!sunasuna_sabers_petherd,r=20] 1 magic
effect @e[tag=!sunasuna_sabers_petherd,r=20] slowness 1 2 true
execute at @s run particle kurokumaft:petherd ~~~
tag @s remove sunasuna_sabers_petherd
