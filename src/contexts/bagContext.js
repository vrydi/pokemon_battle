import {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";

const BagContext = createContext()

export function BagProvider (props) {
    const [bag, setBag] = useState(JSON.parse(localStorage.getItem('bag')) || [
        {
            name: 'ether',
            amount: 5,
            description: "It restores the PP of a Pokemon's selected move by a maximum of 10 points."
        },
        {
            name: 'fresh water',
            amount: 2,
            description: 'Restores 30 HP.'
        },
        {
            name: 'full heal',
            amount: '3',
            description: 'A spray-type medicine. It heals all the status problems of a single Pokemon.'
        },
        {
            name: 'full restore',
            amount: 2,
            description: 'A medicine that fully restores the HP and heals any status problems of a single Pokemon.'
        },
        {
            name: 'revive',
            amount: 2,
            description: "A medicine that revives a fainted Pokémon. It restores half the Pokemon's maximum HP."
        }
    ])

    const updateBag = useCallback((bag)=>{
        setBag(bag)
        localStorage.setItem('bag', JSON.stringify(bag))
    }, [setBag])

    useEffect(()=>{
        localStorage.setItem('bag', JSON.stringify(bag))
    }, [bag])

    const api = useMemo(()=>({
            bag,
            updateBag
    }), [bag, updateBag])

    return <BagContext.Provider value={api}>
        {props.children}
    </BagContext.Provider>
}

export const useBagContext = () => useContext(BagContext)