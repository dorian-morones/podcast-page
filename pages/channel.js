import React from 'react'
import 'isomorphic-fetch'
import Link from 'next/link'
import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'
import PodcastList from '../components/PodcastList'
import Error from 'next/error';

const Channel = ({ channel, audioClips, series, statusCode }) => {

  if (statusCode !== 200) {
    return <Error statusCode={statusCode} />
}

  return (
    <>
      <Layout title={channel.title}>
        <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />

        <h1>{channel.title}</h1>

        {series.length > 0 &&
          <div>
            <h2>Series</h2>
            <ChannelGrid channels={series} />
          </div>
        }

        <h2>Ultimos Podcasts</h2>
        <PodcastList podcasts={audioClips} />

        <style jsx>{`
        .banner {
          width: 100%;
          padding-bottom: 25%;
          background-position: 50% 50%;
          background-size: cover;
          background-color: #aaa;
        }
        h1 {
          font-weight: 600;
          padding: 15px;
        }
        h2 {
          padding: 15px;
          font-size: 1.2em;
          font-weight: 600;
          margin: 0;
        }
      `}</style>
      </Layout>
    </>
  )
}

Channel.getInitialProps = async ({ query, res }) => {

  let idChannel = query.id;
  try {

    let [reqChannel, reqAudios, reqSeries] = await Promise.all([
      fetch(`https://api.audioboom.com/channels/${idChannel}`),
      fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`),
      fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`)
    ])

    if(reqChannel.status >= 400){
      res.statusCode = 404
      return { channel:null, audioClips:null, series:null, statusCode: 404 };
    }

    let dataChannel = await reqChannel.json()
    let channel = dataChannel.body.channel;

    let dataAudios = await reqAudios.json()
    let audioClips = dataAudios.body.audio_clips;

    let dataSeries = await reqSeries.json()
    let series = dataSeries.body.channels;

    return { channel, audioClips, series, statusCode:200 };
  } catch (e) {
    res.statusCode = 503;
    return { channel:null, audioClips:null, series:null, statusCode:503 };
  }
}

export default Channel;