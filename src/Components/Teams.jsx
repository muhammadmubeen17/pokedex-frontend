import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Client from '../sanityClient';
import PageLoader from './Loader';

function Teams() {
    const [teams, setTeams] = useState([]);
    const [loader, setLoader] = useState(true);

    const fetchTeams = async () => {
        const response = await Client.fetch(`*[_type == "team"]{
                                          name,
                                          slug,
                                          description,
                                          "imageUrl": image.asset->url
                                        }`);
        setTeams(response);
        // console.log(response);
    };

    useEffect(() => {
        fetchTeams();
        setTimeout(() => {
            setLoader(false);
        }, 1000);
    }, []);

    return (
        <>
            {
                loader ? <PageLoader />
                    :
                    <div className="mt-5">
                        <h1 className='text-xl sm:text-2xl md:text-3xl text-black font-bold'>TEAMS</h1>
                        <div className="flex flex-wrap mt-5">
                            {
                                teams.length > 0 ?
                                    teams.map((team, index) => (
                                        <div key={index} className="w-full sm:w-1/2 md:w-1/3">
                                            <div className="card px-5 py-8 bg-[#F9F9F9] rounded shadow-lg m-2 relative">
                                                <Link to={`/team/${team.slug.current}`} className="absolute top-0 bottom-0 left-0 right-0"></Link>
                                                <div className="flex flex-col justify-center items-center">
                                                    <div className="text-center mb-5 font-bold">{team.name}</div>
                                                    <img src={team.imageUrl} alt={team.name} className='h-32' />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    :
                                    <div className="w-full">
                                        No Teams Found <span role='img' aria-label='sad'>😢</span>
                                    </div>
                            }
                        </div>
                    </div>
            }
        </>
    );
}

export default Teams;