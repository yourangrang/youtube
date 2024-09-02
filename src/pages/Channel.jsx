import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFromAPI } from '../utils/api'

import Main from '../components/section/Main';
import VideoSearch from '../components/videos/VideoSearch';

import { CiBadgeDollar } from "react-icons/ci";
import { CiMedal } from "react-icons/ci";
import { CiRead } from "react-icons/ci";

const Channel = () => {
    const { channelId } = useParams();
    const [ channelDetail, setChannelDetail ] = useState();
    const [ channelVideo, setChannelVideo ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ nextPageToken, setNextPageToken ] = useState(null); 

    useEffect(() => {
        const fetchResults = async () => {
            try {
                //// 채널 세부 정보를 가져오기
                const data = await fetchFromAPI(`channels?part=snippet&id=${channelId}`);
                setChannelDetail(data.items[0]); //채널 정보를 상태에 저장

                // 채널 비디오 목록 가져오기
                const videosData = await fetchFromAPI(`search?channelId=${channelId}&part=snippet%2Cid&order=date`);
                setChannelVideo(videosData?.items); // 비디오 목록을 상태에 저장
                setNextPageToken(videosData?.nextPageToken); // 다음 페이지 토큰을 상태에 저장
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchResults(); //채널 ID가 변경될 때마다 fetchResults 함수 호출
    }, [channelId]);

    const loadMoreVideos = async () => {
        if (nextPageToken) {
            // 다음 페이지 토큰이 있으면 추가 비디오를 가져오기
            const videosData = await fetchFromAPI(`search?channelId=${channelId}&part=snippet%2Cid&order=date&pageToken=${nextPageToken}`);
             // 기존 비디오 목록에 새로운 비디오 추가
            setChannelVideo(prevVideos => [...prevVideos, ...videosData.items]);
            // 다음 페이지 토큰 업데이트
            setNextPageToken(videosData?.nextPageToken);
        }
    };

    const channelPageClass = loading ? 'isLoading' : 'isLoaded';

    return (
        <Main 
            title = "유튜브 채널"
            description="유튜브 채널페이지입니다.">
            
            <section id='channel' className={channelPageClass}>
                {channelDetail && (
                    <div className='channel__inner'>
                        <div className='channel__header' style={{ backgroundImage: `url(${channelDetail.brandingSettings.image.bannerExternalUrl})` }}>
                            <div className='circle'>
                                <img src={channelDetail.snippet.thumbnails.high.url} alt={channelDetail.snippet.title} />
                            </div>
                        </div>
                        <div className='channel__info'>
                            <h3 className='title'>{channelDetail.snippet.title}</h3>
                            <p className='desc'>{channelDetail.snippet.description}</p>
                            <div className='info'>
                                <span><CiBadgeDollar />{channelDetail.statistics.subscriberCount}</span>
                                <span><CiMedal />{channelDetail.statistics.videoCount}</span>
                                <span><CiRead />{channelDetail.statistics.viewCount}</span>
                            </div>
                        </div>
                        <div className='channel__video video__inner search'>
                            <VideoSearch videos={channelVideo} />
                        </div>
                        <div className='channel__more'>
                            {nextPageToken && <button onClick={loadMoreVideos}>더 보기</button>}
                        </div>
                    </div>
                )}
            </section>
        </Main>
    )
}

export default Channel