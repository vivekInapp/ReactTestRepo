import React from 'react'
import { Grid, Image, Header, Icon, Button, Popup } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { addReadLater, removeReadLater, getCurrentReadLater, getCurrentUser } from '../shared/users/userSlice'

function GridView(props) {

    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser)
    const currentReadLater = useSelector(getCurrentReadLater);
    const onAddLater = (article) => {
        dispatch(addReadLater(article));
    }


    let gridData = props?.data?.map((x, index) => {

        let haveThumbnail = (x.multimedia && x.multimedia?.length) > 0 ? true : false;
        let thumbnail = '';
        if (haveThumbnail) {
            thumbnail = x.multimedia.find(y => { return (y.format === 'Standard Thumbnail') })?.url;
        }
        let readLater = currentReadLater?.filter(item => { return (item.slug_name === x.slug_name) })
        let isAddedForReadLater = (readLater && readLater.length != 0) ? true : false;

        return (
            <Grid.Row key={x.slug_name} style={{ height: '' }} color={(index % 2) == 0 ? 'black' : 'black'}>
                
                    <Grid.Column>
                        <Image size='huge' src={thumbnail} ></Image>
                    </Grid.Column>
                
                <Grid.Column width={14}>
                    <Header><a href={x?.url === undefined ? '#' : x.url} target='_blank'>{(x?.title) === '' ? 'Title not available' : x?.title}</a></Header>
                    <p>{(x.abstract) === '' ? 'Abstract not available' : x?.abstract}</p>
                </Grid.Column>
                <Grid.Column width={1}>
                    {!isAddedForReadLater &&
                        <Popup
                            content='Add to read later'
                            trigger={<button className='btnAdd' onClick={() => { dispatch(addReadLater(x)) }}><Icon className='iconAdd' name='add'></Icon></button>}
                        />


                    }
                    {isAddedForReadLater &&
                        <Popup content='Remove from read later'
                            trigger={<button className='btnRemove' onClick={() => { dispatch(removeReadLater(x.slug_name)) }}><Icon className='iconRemove' name='minus'></Icon></button>}
                        />
                    }

                </Grid.Column>
            </Grid.Row>
        )
    })

    return (

        <Grid>
            {gridData}
        </Grid>

    )
}

export default GridView
