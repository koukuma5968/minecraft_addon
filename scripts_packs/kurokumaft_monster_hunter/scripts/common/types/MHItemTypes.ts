
export type MHPotinEffectType = {
    type: string,
    name: string,
    chance: number,
    duration: number,
    amplifier: number,
    particle: string
}

export type MHWeaponItemType = {
    type: string,
    attack: number,
    rarity: number,
    critical: number,
    slot: number,
    element: string[],
    sharpness: number[]
}

export type MHArmorItemType = {
    name: string,
    type: string,
    rarity: number,
    slot: number,
    protection: MHArmorProtectLevelsType
}

export type MHArmorSkilType = {
    name: string,
    point: number
}

export type MHArmorProtectLevelsType = {
    level: number,
    value: number
}

export const sharpnessDamageMap = [
    {
        sharpness: 10,
        rate: 0.1
    },
    {
        sharpness: 20,
        rate: 0.3
    },
    {
        sharpness: 30,
        rate: 0.6
    },
    {
        sharpness: 40,
        rate: 0.8
    },
    {
        sharpness: 50,
        rate: 1
    },
    {
        sharpness: 60,
        rate: 1.2
    },
    {
        sharpness: 70,
        rate: 1.35
    },
    {
        sharpness: 80,
        rate: 1.5
    },
    {
        sharpness: 90,
        rate: 1.8
    },
    {
        sharpness: 100,
        rate: 2
    }
]

export const weaponsDamageMap = [
    {
        weaponType: "kurokumaft:one_handed_sword",
        attackType: "slash",
        damage_rate: 1,
        critical_rate: 1.12,
        element_rate: 1.4
    },
    {
        weaponType: "kurokumaft:dual_blades",
        attackType: "slash",
        damage_rate: 0.8,
        critical_rate: 1.25,
        element_rate: 1.5
    },
    {
        weaponType: "kurokumaft:great_sword",
        attackType: "slash",
        damage_rate: 1.55,
        critical_rate: 1.35,
        element_rate: 1.2
    },
    {
        weaponType: "kurokumaft:long_sword",
        attackType: "slash",
        damage_rate: 1.4,
        critical_rate: 1.3,
        element_rate: 1.25
    },
    {
        weaponType: "kurokumaft:hammer",
        attackType: "blow",
        damage_rate: 1.85,
        critical_rate: 1.5,
        element_rate: 1.15
    },
    {
        weaponType: "kurokumaft:hunting_horn",
        attackType: "blow",
        damage_rate: 1.6,
        critical_rate: 1.4,
        element_rate: 1.2
    },
    {
        weaponType: "kurokumaft:lance",
        attackType: "stab",
        damage_rate: 1.5,
        critical_rate: 1.25,
        element_rate: 1.3
    },
    {
        weaponType: "kurokumaft:gunlance",
        attackType: "stab",
        damage_rate: 1.45,
        critical_rate: 1.2,
        element_rate: 1.35
    },
    {
        weaponType: "kurokumaft:bow",
        attackType: "arrow",
        damage_rate: 0.95,
        critical_rate: 1.3,
        element_rate: 1.65
    },
    {
        weaponType: "kurokumaft:light_bowgun",
        attackType: "bullet",
        damage_rate: 0.65,
        critical_rate: 1.6,
        element_rate: 1.85
    },
    {
        weaponType: "kurokumaft:heavy_bowgun",
        attackType: "bullet",
        damage_rate: 0.8,
        critical_rate: 1.4,
        element_rate: 1.7
    }
]

export const armorPropatiesMap = [
    {
        name: "kurokumaft:hunter_helm",
        type: "kurokumaft:armor_sword",
        skills : [
            {name: "clairvoyance", point: 4},
            {name: "grilled_meat", point: 1},
            {name: "map", point: 2},
            {name: "water_resistance", point: -2}
        ],
        protectLevels: [
            {level: 1, value: 6},
            {level: 3, value: 10},
            {level: 4, value: 12},
            {level: 8, value: 20}
        ]
    },
    {
        name: "kurokumaft:hunter_mail",
        type: "kurokumaft:armor_sword",
        skills : [
            {name: "clairvoyance", point: 8},
            {name: "grilled_meat", point: 3},
            {name: "map", point: 2},
            {name: "attack", point: 1},
            {name: "water_resistance", point: -2}
        ],
        protectLevels: [
            {level: 1, value: 6},
            {level: 3, value: 10},
            {level: 4, value: 12},
            {level: 8, value: 20}
        ]
    },
    {
        name: "kurokumaft:hunter_grieve",
        type: "kurokumaft:armor_sword",
        skills : [
            {name: "clairvoyance", point: 1},
            {name: "grilled_meat", point: 4},
            {name: "map", point: 2},
            {name: "attack", point: 1},
            {name: "water_resistance", point: -1}
        ],
        protectLevels: [
            {level: 1, value: 6},
            {level: 3, value: 10},
            {level: 4, value: 12},
            {level: 8, value: 20}
        ]
    },
    {
        name: "kurokumaft:hunter_faure",
        type: "kurokumaft:armor_sword",
        skills : [
            {name: "clairvoyance", point: 2},
            {name: "grilled_meat", point: 2},
            {name: "map", point: 4},
            {name: "water_resistance", point: -1}
        ],
        protectLevels: [
            {level: 1, value: 6},
            {level: 3, value: 10},
            {level: 4, value: 12},
            {level: 8, value: 20}
        ]
    }
]