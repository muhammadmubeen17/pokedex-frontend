import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Client from '../sanityClient';
import PageLoader from './Loader';

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [loader, setLoader] = useState(true);

  const fetchPokemons = async () => {
    const response = await Client.fetch(`*[_type == "pokemon"] | order(rank asc) [0...9]{
                                            name,
                                            slug,
                                            rank,
                                            "imageUrl": image.asset->url
                                          }
                                        `);

    setPokemons(response);
    // console.log(response)
  };

  const fetchTypes = async () => {
    const response = await Client.fetch(`*[_type == "pokemonType"]{
                                            name,
                                            slug,
                                            "imageUrl": image.asset->url,
                                            color
                                          }
                                        `);

    setTypes(response);
    // console.log(response)
  };

  useEffect(() => {
    fetchPokemons();
    fetchTypes();
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  return (
    <>
      {
        loader ? <PageLoader />
          :
          <>
            <div className="mt-5">
              <h1 className='text-xl sm:text-2xl md:text-3xl text-black font-bold'>MAIN POKEMONS</h1>
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
            {
              types.length > 0 &&
              <div className="mt-5">
                <h1 className='text-base sm:text-lg md:text-xl text-black font-bold'>TYPES</h1>
                <div className="flex flex-wrap mt-2">
                  {
                    types.map((type, index) => (
                      <div key={index} className="w-1/2 xs:w-1/2 sm:w-1/3 md:w-1/4 md2:w-1/5 lg:w-1/6">
                        <div className={`card px-2 py-2 rounded shadow-lg m-1 sm:m-2 relative`} style={{ backgroundColor: type.color ? type.color : '#F9F9F9' }}>
                          <Link to={`/type/${type.slug.current}`} className="absolute top-0 bottom-0 left-0 right-0"></Link>
                          <div className="flex items-center gap-2">
                            <img src={type.imageUrl} alt={type.name} width={40} />
                            <div className="text-center font-bold">{type.name}</div>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            }
          </>
      }
    </>
  );
}

export default Home;

// Function to pad rank with leading zeros
const padRank = (rank) => {
  return String(rank).padStart(3, '0');
};