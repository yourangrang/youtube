import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Main from '../components/section/Main'

import VideoSearch from '../components/videos/VideoSearch'
import { fetchFromAPI } from '../utils/api'

const Search = () => {
    const { searchId } = useParams(); // URL에서 searchId 파라미터를 추출
    const [ videos, setVideos ] = useState([]); //videos 상태는 비디오 목록을 저장
    const [ nextPageToken, setNextPageToken ] = useState(null); //다음 페이지의 데이터를 가져오기 위해 필요한 토큰을 저장
    const [ loading, setLoading ] = useState(true); 
    
    useEffect(() => {
        setVideos([]); //videos를 빈배열로 초기화
        fetchVideos(searchId); //함수를 호출해 새로운 데이터 가져옴
        setLoading(true);
    }, [searchId]);


    const fetchVideos = (query, pagetoken = '') => { //query는 검색어이고, pageToken은 페이지네이션을 위한 토큰
        fetchFromAPI(`search?part=snippet&${query}=${pagetoken}`)
            .then((data) =>{
                setNextPageToken(data.nextPageToken); //data.nextPageToken을 nextPageToken 상태에 저장
                setVideos((prevVideos)=> [...prevVideos, ...data.items]); //(prevVideos)에 새로 가져온 비디오(data.items)를 추가
                setLoading(false);
            })
            .catch((error)=>{
                console.error('Error fetching data:', error); //에러생길때마다 Error fetching data: 문장에 에러표시
                setLoading(false);
            });
    };

    const handleLoadMore = () =>{
        if (nextPageToken) { //nextPageToken 가 있으면
            fetchVideos(searchId, nextPageToken); //fetchVideos실행
        }
    };

    const searchPageClass = loading ? 'isloading' : 'isloaded';



    return (
        <Main 
            title = "유투브 검색"
            description="유튜브 검색 결과 페이지입니다.">
            
            <section id='searchPage' className={searchPageClass}>
                <div className="video__inner search">
                    <VideoSearch videos={videos} />
                </div>
                <div className="video__more">
                    {nextPageToken && (
                        <button onClick={handleLoadMore}>더 보기</button>
                    )}
                </div>
            </section>
        </Main>
    )
}

export default Search