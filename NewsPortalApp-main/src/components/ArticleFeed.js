import React from 'react'
import { Feed, Icon, Header } from 'semantic-ui-react'


function ArticleFeed(props) {

    let feedEvents = props?.data?.map(x => {
        let haveMultimedia = (x.multimedia && x.multimedia?.length) > 0 ? true : false;
        let thumbnail = '';
        let images = [];
        let feedExtras = [];
        if (haveMultimedia) {
            debugger
            thumbnail = x.multimedia.find(y => { return (y.format === 'Standard Thumbnail') })?.url;
            images = x.multimedia.filter(m => { return (m.type === 'image') })
            feedExtras = images.map(i=>{ return(<img src={i?.url}></img>) })
        }
        let date = 'Dd'//new Date(x.created_date);
        
        return (
            <Feed.Event>
                <Feed.Label image={thumbnail}></Feed.Label>
                <Feed.Content>
                    <Feed.Summary>
                        <Header><a href={x?.url === undefined ? '#' : x.url} target='_blank'>{(x?.title) === '' ? 'Title not available' : x?.title}</a></Header>
                        <Feed.Date>{date}</Feed.Date>
                    </Feed.Summary>
                    <Feed.Extra text>{x?.abstract}</Feed.Extra>
                    {/* {(images.length > 0) && <Feed.Extra images>{feedExtras}</Feed.Extra>} */}
                    <Feed.Meta>
                        <Feed.Like>
                            <Icon name='add'></Icon>
                        </Feed.Like>
                    </Feed.Meta>
                </Feed.Content>
            </Feed.Event>
        )
    })


    return (
        <Feed>
            {feedEvents}
        </Feed>
    )
}

export default ArticleFeed
