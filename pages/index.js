import React from 'react'
import 'isomorphic-fetch'
import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'

const Home = ({ channels }) => {

    return (
        <>
            <Layout title="Podcasts">
                <ChannelGrid channels={channels} />
            </Layout>
        </>
    )
}

export async function getServerSideProps() {
    let req = await fetch('https://api.audioboom.com/channels/recommended');
    let { body: channels } = await req.json();

    return { props: { channels: channels } };
}

export default Home;