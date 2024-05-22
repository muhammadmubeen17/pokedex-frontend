import React, { useEffect, useState } from 'react'
import Client from '../sanityClient';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PageLoader from './Loader';

function Team() {
    const [team, setTeam] = useState([]);
    const [pokemons, setPokemons] = useState([]);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTeams = async () => {
            const response = await Client.fetch(
                `*[_type == "team" && slug.current == $slug]{
                  name,
                  slug,
                  description,
                  "imageUrl": image.asset->url,
                  pokemons[]->{
                    name,
                    slug,
                    rank,
                    "imageUrl": image.asset->url
                  } | order(rank asc)
                }[0]`,
                { slug }
            );
            setTeam(response);
            setPokemons(response.pokemons);
            console.log(response);
        };
        fetchTeams();
    }, []);

    return (
        <>
            <div className="mt-5">
                <h1 className='text-xl sm:text-2xl md:text-3xl text-black font-bold'>{team.name}</h1>
                <h2 className='text-lg uppercase font-bold mt-10'>Pokemons</h2>
                <div className="flex flex-wrap mt-5">
                    {
                        pokemons.length > 0 ?
                            pokemons.map((pokemon, index) => (
                                <div key={index} className="w-full sm:w-1/2 md:w-1/3">
                                    <div className="card p-5 bg-[#F9F9F9] rounded shadow-lg m-2 relative">
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

export default Team

// Function to pad rank with leading zeros
const padRank = (rank) => {
    return String(rank).padStart(3, '0');
};