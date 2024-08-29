import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [ searchKeyword, setSearchKeyword ] = useState('');
  const navigate = useNavigate();

  const handleSearch = () =>{
    console.log(searchKeyword)
    if(searchKeyword){
      navigate(`/search/${searchKeyword}`);
      setSearchKeyword('');
    }
  };

  return (
    <div>
        <div id='search'>
            <div className='search__inner'>
                <label htmlFor='searchInput'>
                    <span className='ir'>검색</span>
                </label>
                <input 
                  type='search'
                  id='searchInput' 
                  className='search__input'             
                  placeholder='검색어를 입력해주세요'
                  autoComplete='off'
                  onChange={e=> setSearchKeyword(e.target.value)}
                  onKeyDown={e=>{
                    if(e.key === 'Enter'){
                      handleSearch();
                    }
                  }}
                />
            </div>
        </div>
    </div>
  )
}

export default Search