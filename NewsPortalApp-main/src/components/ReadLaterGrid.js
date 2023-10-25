import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentReadLater, removeReadLater } from '../shared/users/userSlice'
import { Grid, Header, Popup, Icon } from 'semantic-ui-react'

function ReadLaterGrid(props) {

    const dispatch = useDispatch();

    let gridData = props?.data?.map((x, index) => {
        return (
            <Grid.Row key={x.slug_name} color={'black'}>
                <Grid.Column width={14}>
                    <Header><a href={x?.url === undefined ? '#' : x.url} target='_blank'>{(x?.title) === '' ? 'Title not available' : x?.title}</a></Header>
                    <p>{(x.abstract) === '' ? 'Abstract not available' : x?.abstract}</p>
                </Grid.Column>
                <Grid.Column width={1}>

                    <Popup content='Remove from read later'
                        trigger={<button className='btnRemove' onClick={() => { dispatch(removeReadLater(x.slug_name)) }}><Icon className='iconRemove' name='minus'></Icon></button>}
                    />


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

export default ReadLaterGrid
