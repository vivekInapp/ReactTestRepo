import React, { useEffect, useState, useMemo } from 'react'
import Header from './Header'
import api from '../shared/axios/axios'
import GridView from './GridView';
import { useDispatch, useSelector } from 'react-redux';
import { turnLoaderOff, turnLoaderOn } from '../shared/appServices/appServiceSlice';
import ReadLaterGrid from './ReadLaterGrid';
import { getCurrentReadLater, removeReadLater } from '../shared/users/userSlice'
import Pagination from '../shared/Paginagtion/Pagination';

const ReadLater = () => {

    let PageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);





    const [sections, setSections] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);
    const [filterdArticles, setFilterdArticles] = useState([]);
    const [nytApiKey, setnytApiKey] = useState('uR1j3A82i48Cvvn6A4pQRWBCIhUCIvG7');
    const [pageNo, setPageNo] = useState(0);
    const articles = useSelector(getCurrentReadLater);



    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        setFilterdArticles(articles);
        if (selectedSection) {
            setFilterdArticles(articles.filter(x => { return (x.section.toUpperCase() === selectedSection.toUpperCase()) }));
        }

        if(filterdArticles.length > PageSize) {
            return filterdArticles?.slice(firstPageIndex, lastPageIndex);
        }
        else {
            return filterdArticles
        }

        

    }, [currentPage, articles, filterdArticles]);

    // useEffect (()=>{
    //     const firstPageIndex = (currentPage - 1) * PageSize;
    //      const lastPageIndex = firstPageIndex + PageSize;

    // }, [currentPage])


    useEffect(() => {
        fetchSections();
    }, [])

    const fetchSections = async () => {
        try {
            const sectionResponse = await api.get(`https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${nytApiKey}`);
            setSections(sectionResponse.data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }




    const onSectionClick = (section) => {
        if (selectedSection === section) {
            setSelectedSection(null);
            setFilterdArticles(articles)
        }
        else {
            setSelectedSection(section);
            setFilterdArticles(articles.filter(x => { return (x.section.toUpperCase() === section.toUpperCase()) }));
        }

    }

    let sectionList = sections?.map(x => {
        return (
            <p className={(selectedSection === x.section) ? 'sectionSelected' : 'sections'} key={x.section} onClick={() => { onSectionClick(x.section) }} ><span >{x.display_name}</span> </p>
        )
    })

    return (

        <>
            <Header></Header>
            <div className="container">
                <div className="left-section">
                    {sectionList}
                </div>

                <main>
                    <div className='divArticles'>

                        <ReadLaterGrid data={currentTableData} ></ReadLaterGrid>
                    </div>

                </main>
                <div className='divPagination'>
                    {/* <button className={(0 == 0) ? 'paginationBtnDisabled' : 'paginationBtn'} disabled={0 == 0} style={{ marginLeft: '50px' }}>Previous</button>

                    <button className="paginationBtn" style={{ marginRight: '50px' }}>Next</button> */}

                    <Pagination
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalCount={filterdArticles.length}
                        pageSize={PageSize}
                        onPageChange={page => setCurrentPage(page)}
                    />
                </div>
            </div>
        </>
    )
}
export default ReadLater