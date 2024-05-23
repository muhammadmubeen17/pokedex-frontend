import React, { useEffect } from 'react'
import { Input, InputGroup, Grid, Row, Col } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

function Header() {
  const [search, setSearch] = React.useState('');

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get('query');
    if (query) {
      setSearch(query);
    }
  }, [searchParams]);

  const handleSearch = () => {
    if (search.trim() === '') {
      navigate(`/`);
    } else {
      navigate(`/search?query=${search}`);
    }
  }

  return (
    <header className='max-w-screen-lg mx-auto'>
      <nav className='grid grid-cols-12 py-5 gap-y-10'>
        <div className="flex gap-10 col-span-12 sm:col-span-6">
          <Link to={"/"} className="branding flex justify-center items-center gap-3 text-black hover:no-underline hover:text-primary focus:text-black focus:no-underline">
            <img src='/pokedex-frontend/logo.svg' alt='logo' width={20} height={20} />
            <div className="font-bold uppercase">UIN POKEDEX</div>
          </Link>
          <Link to={'/teams'} className="flex justify-center items-center text-black hover:no-underline hover:text-primary focus:text-black focus:no-underline">
            <div className="font-bold uppercase">Teams</div>
          </Link>
        </div>
        <div className="col-span-12 sm:col-span-6">
          <InputGroup size='md' inside className='w-full'>
            <Input placeholder='Search' className='w-full' value={search} onChange={setSearch} onPressEnter={handleSearch} />
            <InputGroup.Button onClick={handleSearch}>
              <SearchIcon />
            </InputGroup.Button>
          </InputGroup>
        </div>
      </nav>
    </header>
  )
}

export default Header