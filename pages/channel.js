import React from 'react'
import 'isomorphic-fetch'
import Link from 'next/link'

const Channel = ({ channel, audioClips }) => {

    const { title } = channel;

    return (
        <>
            <header>Podcast</header>
            <div className="channels">
                <h2>{title}</h2>
                {audioClips.map((clip) => (
                    <div className="podcast" key={clip.id}>{clip.title}</div>
                ))}
            </div>

            <style jsx>{`
                header {
                color: #fff;
                background: #8756ca;
                padding: 15px;
                text-align: center;
                }
                .channels {
                display: grid;
                grid-gap: 15px;
                padding: 15px;
                grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
                }
                a.channel {
                display: block;
                margin-bottom: 0.5em;
                color: #333;
                text-decoration: none;
                }
                .channel img {
                border-radius: 3px;
                box-shadow: 0px 2px 6px rgba(0,0,0,0.15);
                width: 100%;
                }
                h2 {
                padding: 5px;
                font-size: 0.9em;
                font-weight: 600;
                margin: 0;
                text-align: center;
                }
            `}</style>

            <style jsx global>{`
                body {
                margin: 0;
                font-family: system-ui;
                background: white;
                }
            `}</style>
        </>
    )
}

Channel.getInitialProps = async ({ query }) => {

    let idChannel = query.id;
    let reqChannel = await fetch(`https://api.audioboom.com/channels/${idChannel}`);
    let dataChannel = await reqChannel.json()
    let channel = dataChannel.body.channel;

    let reqAudios = await fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`);
    let dataAudios = await reqAudios.json()
    let audioClips = dataAudios.body.audio_clips;
    console.log("a", audioClips)
    return { channel, audioClips };
}

export default Channel;