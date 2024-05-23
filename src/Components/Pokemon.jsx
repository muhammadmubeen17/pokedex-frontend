import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Client from '../sanityClient';
import { PortableText } from '@portabletext/react';
import PageLoader from './Loader';

function Pokemon() {
    const [pokemon, setPokemon] = useState(null);
    const [types, setTypes] = useState([]);
    const [loader, setLoader] = useState(true);

    const { slug } = useParams();
    const navigate = useNavigate();

    const fetchSinglePokemon = async (slug) => {
        const response = await Client.fetch(
            `*[_type == "pokemon" && slug.current == $slug]{
                name,
                rank,
                "imageUrl": image.asset->url,
                stats,
                content,
                types[]->{
                    name,
                    color,
                    "imageUrl": image.asset->url
                }
            }[0]`,
            { slug }
        );

        return response;
    };

    useEffect(() => {
        if (slug) {
            fetchSinglePokemon(slug).then((response) => {
                if (!response) {
                    navigate('/404');
                } else {
                    // console.log(response);
                    setPokemon(response);
                    setTypes(response.types);
                    setLoader(false);
                }
            }).catch((error) => {
                // console.error(error);
            });
        }
    }, [slug])

    const statOrder = ['hp', 'attack', 'defense', 'specialAttack', 'specialDefense', 'speed'];

    return (
        <>
            {
                loader ? <PageLoader />
                    :
                    <>
                        {
                            pokemon ?
                                <div className="grid grid-cols-12 gap-4">
                                    <div className="col-span-12 sm:col-span-6">
                                        <h1 className='text-lg sm:text-xl uppercase'>{pokemon.name}</h1>
                                        <div className="card px-2 py-2 rounded mt-2 text-center" style={{ backgroundColor: types[0]?.color ? types[0]?.color : '#F9F9F9' }}>
                                            <img src={pokemon.imageUrl} alt={pokemon.name} className='w-full max-w-[300px] mx-auto' />
                                        </div>
                                    </div>
                                    <div className="col-span-12 sm:col-span-6">
                                        {
                                            types.length > 0 &&
                                            <>
                                                <h1 className='text-lg uppercase font-bold'>Type(s)</h1>
                                                <div className="flex flex-wrap mb-3">
                                                    {
                                                        types.map((type, index) => (
                                                            <div key={index} className={`${types.length === 1 ? 'w-full' : 'w-1/2'}`}>
                                                                <div className={`card px-2 py-2 rounded shadow-lg m-1 sm:m-2`} style={{ backgroundColor: type.color ? type.color : '#F9F9F9' }}>
                                                                    <div className="flex items-center gap-2">
                                                                        <img src={type.imageUrl} alt={type.name} width={40} />
                                                                        <div className="text-center font-bold">{type.name}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </>
                                        }
                                        <h1 className='text-lg uppercase font-bold'>Stats</h1>
                                        <ul className='mt-2'>
                                            {pokemon.stats && statOrder.map((key) => (
                                                <li key={key} className='flex justify-between'>
                                                    <div className="">
                                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                                    </div>
                                                    <div className="font-bold">{pokemon.stats[key]}</div>
                                                </li>
                                            ))}
                                        </ul>
                                        <div>
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <h1 className='text-base sm:text-lg text-black font-bold uppercase my-4'>Abilities</h1>
                                        <PortableText value={pokemon.content} />
                                    </div>
                                </div>
                                :
                                <div className="w-full text-center">
                                    No Pokemon Found
                                </div>
                        }
                    </>
            }
        </>
    )
}

export default Pokemon