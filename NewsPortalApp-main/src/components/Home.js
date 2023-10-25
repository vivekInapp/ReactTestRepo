import React, { useEffect, useState, useMemo } from 'react'
import Header from './Header'
import api from '../shared/axios/axios'
import GridView from './GridView';
import { useDispatch } from 'react-redux';
import { turnLoaderOff, turnLoaderOn } from '../shared/appServices/appServiceSlice';
import ReadLaterGrid from './ReadLaterGrid';
import Pagination from '../shared/Paginagtion/Pagination';
//import ArticleFeed from './ArticleFeed';


const Home = () => {

  const dispatch = useDispatch();

  const [sections, setSections] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [articles, setArticles] = useState(null);
  const [filterdArticles, setFilterdArticles] = useState(null);
  const [page, setPage] = useState(0);
  //const [limit, setLimit] = useState(10);
  const [nytApiKey, setnytApiKey] = useState('uR1j3A82i48Cvvn6A4pQRWBCIhUCIvG7');
  const [currentPage, setCurrentPage] = useState(1);
  let PageSize = 10;


  useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    //const lastPageIndex = firstPageIndex + PageSize;
    const FetchArticles = async (offset) => {
      try {
        dispatch(turnLoaderOn());
        //let offset = (newPage) * limit;
        const articleResponse = await api.get(`https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${nytApiKey}&offset=${offset}&limit=${PageSize}`);
        setArticles(articleResponse.data.results);
        if (selectedSection == null) {
          setFilterdArticles(articleResponse.data.results);
        }
        else {
          setFilterdArticles(articleResponse.data.results.filter(x => { return (x.section.toUpperCase() === selectedSection.toUpperCase()) }));
        }
  
        // if (newPage !== 0) {
        //   if (action === 'next') {
        //     setPage(page + 1);
        //   }
        //   else {
        //     setPage(page - 1);
        //   }
  
        // }
        dispatch(turnLoaderOff());
  
      } catch (error) {
        dispatch(turnLoaderOff());
  
      }
    }
    FetchArticles(firstPageIndex);

    // const getArticles = async () => {
    //   await FetchArticles(firstPageIndex, lastPageIndex);
      
    // };
  
    // getArticles(); // run it, run it

  }, [currentPage]);



  useEffect(() => {
    fetchSections();
    //FetchArticles();
  }, [])

  const fetchSections = async () => {
    try {
      const sectionResponse = await api.get(`https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${nytApiKey}`);
      setSections(sectionResponse.data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const FetchArticles = async (offset, limit) => {
    try {
      dispatch(turnLoaderOn());
      //let offset = (newPage) * limit;
      const articleResponse = await api.get(`https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${nytApiKey}&offset=${offset}&limit=${limit}`);
      setArticles(articleResponse.data.results);
      if (selectedSection == null) {
        setFilterdArticles(articleResponse.data.results);
      }
      else {
        setFilterdArticles(articleResponse.data.results.filter(x => { return (x.section.toUpperCase() === selectedSection.toUpperCase()) }));
      }

      // if (newPage !== 0) {
      //   if (action === 'next') {
      //     setPage(page + 1);
      //   }
      //   else {
      //     setPage(page - 1);
      //   }

      // }
      dispatch(turnLoaderOff());

    } catch (error) {
      dispatch(turnLoaderOff());

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
            {articles && articles.length > 0 && <GridView data={filterdArticles}></GridView>}
            {/* <ReadLaterGrid></ReadLaterGrid> */}
          </div>

        </main>
        <div className='divPagination'>
          {/* <button className={(page == 0) ? 'paginationBtnDisabled' : 'paginationBtn'} disabled={page == 0} onClick={() => { FetchArticles(page - 1, 'previous') }} style={{ marginLeft: '50px' }}>Previous</button>
          
          <button className="paginationBtn" onClick={() => { FetchArticles(page + 1, 'next') }} style={{ marginRight: '50px' }}>Next</button> */}
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={100}
            pageSize={10}
            onPageChange={page => setCurrentPage(page)}
          />
        </div>
      </div>
    </>
  )
}

export default Home
