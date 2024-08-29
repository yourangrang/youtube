import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Main from '../components/section/Main'

import VideoSearch from '../components/videos/VideoSearch'

const Search = () => { 
    const { searchId } = useParams(); //searchId(검색어)파라미터를 가져옴
    const [videos, setVideos] = useState([]); //videos 초기값 빈배열로 설정, 이변수는 검색 결과로 받아온 비디오 목록을 저장함


    useEffect(()=>{  // searchId가 변경될 때마다 유튜브 API를 호출하여 검색 결과를 가져옴
        fetch(
            `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${searchId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
        )
        .then(response=> response.json()) //API 응답을 JSON으로 파싱
        .then(result=>{ 
            console.log(result);  //결과를 가져옴
            setVideos(result.items) //결과를 setVideos 함수를 사용하여 videos 상태 변수에 저장
        })
        .catch(error=>console.log(error)); //API 호출중 발생가능한 오류 처리
    },[searchId]);



    return (
        <Main 
            title = "유투브 검색"
            description="유튜브 검색 결과 페이지입니다.">
            

            <section id='searchPage'>
                <div className="video__inner search">
                    <VideoSearch videos={videos}/>
                </div>
            </section>
        </Main>
    )
}

export default Search