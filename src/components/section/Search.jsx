import React from 'react'

const Search = () => {
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
                />
            </div>
        </div>
    </div>
  )
}

export default Search