import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import PageLoader from './Loader';
import Client from '../sanityClient';

function Type() {
    const [pokemons, setPokemons] = useState([]);
    const [type, setType] = useState([]);
    const { slug } = useParams();
    const navigate = useNavigate();

    const fetchPokemons = async () => {
        const response = await Client.fetch(`*[_type == "pokemon" && $slug in types[]->slug.current]{
                                          name,
                                          slug,
                                          rank,
                                          "imageUrl": image.asset->url
                                        } | order(rank asc)
                                      `, { slug });

        setPokemons(response);
    };

    const fetchPokemonType = async () => {
        const response = await Client.fetch(`*[_type == "pokemonType" && slug.current == $slug]{
                                                name,
                                                slug,
                                                "imageUrl": image.asset->url,
                                                color    
                                            }[0]
                                        `, { slug });

        if (response) {
            setType(response);
            console.log(response)
            document.title = `Pokemon Type - ${response.name}`;
        } else {
            navigate('/404');
        }
    }

    useEffect(() => {
        fetchPokemons();
        fetchPokemonType();
    }, [slug]);

    return (
        <>
            <div className="mt-5">
                <div className='text-xl sm:text-2xl md:text-3xl text-black font-bold'>
                    <div className="flex items-center gap-2">
                        <img src={type.imageUrl} alt={type.name} width={40} />
                        <div className="text-center font-bold">{type.name}</div>
                    </div>
                </div>
                <div className="flex flex-wrap mt-5">
                    {
                        pokemons.length > 0 ?
                            pokemons.map((pokemon, index) => (
                                <div key={index} className="w-full sm:w-1/2 md:w-1/3">
                                    <div className="card p-5 rounded shadow-lg m-2 relative" style={{ backgroundColor: type.color ? type.color : '#F9F9F9' }}>
                                        <Link to={`/pokemon/${pokemon.slug.current}`} className="absolute top-0 bottom-0 left-0 right-0"></Link>
                                        <div className="flex flex-col justify-center items-center">
                                            <img src={pokemon.imageUrl} alt={pokemon.name} width={80} />
                                            <div className="text-center mt-5 font-bold">{pokemon.name}</div>
                                            <div className="text-center mt-5">{`#${padRank(pokemon.rank)}`}</div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            :
                            <PageLoader />
                    }
                </div>
            </div>
        </>
    )
}

export default Type

// Function to pad rank with leading zeros
const padRank = (rank) => {
    return String(rank).padStart(3, '0');
};