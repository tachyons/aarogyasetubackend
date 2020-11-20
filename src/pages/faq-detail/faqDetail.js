import {h} from 'preact';
import {route} from 'preact-router';
/** @jsx h */
import {useEffect, useState, useRef, useContext} from 'preact/hooks';
import './faqDetail.css';
import ServerDataContext from '@stencil/server-data-context';
import useDisableBodyOverflow from '../../utils/useDisableBodyOverflow';

import FaqLoading from './FaqLoading';
import ErrorBlock from './ErrorBlock';

import getFaqData from '../../utils/get-faq-data';

import Image from '../../components/Image';

import arrowBackPng from '../../assets/arrow-back.png';

const ViewState = {
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  ERROR: 'ERROR',
};

function FaqDetail() {
  const [currentFilter, setCurrentFilter] = useState(null);
  const [viewState, setViewState] = useState(ViewState.LOADING);
  const [faqData, setFaqData] = useState(null);
  const rootElRef = useRef(null);
  const {language, flags} = useContext(ServerDataContext);
  const {lang: langCode} = flags;

  let selectedQuestion = null;
  if (
    typeof window !== 'undefined' &&
    window.location.search &&
    window.location.search.length > 0
  ) {
    const searchParams = new URLSearchParams(window.location.search);
    selectedQuestion = searchParams.get('selectedQuestion');
    selectedQuestion = selectedQuestion ? JSON.parse(selectedQuestion) : {};
  }

  useEffect(() => {
    if (rootElRef.current) {
      rootElRef.current.scrollTop = 0;
    }
  }, [currentFilter]);

  useEffect(() => {
    if (selectedQuestion && faqData) {
      const {index, section} = selectedQuestion;
      setCurrentFilter(section);
      const containerDomNodeId = `container_${section}_${index}`;
      const inputDomNodeId = `${section}_${index}`;
      const inputDomNode = document.getElementById(inputDomNodeId);
      if (inputDomNode) {
        inputDomNode.click();
      }
      setTimeout(() => {
        const containerDomNode = document.getElementById(containerDomNodeId);
        if (containerDomNode) {
          containerDomNode.scrollIntoView();
        }
      }, 300);
    }
  }, [faqData]);

  function fetchData() {
    setViewState(ViewState.LOADING);
    const lang = langCode;
    getFaqData(lang)
     
      .then(data => {
        setFaqData(data);
        setViewState(ViewState.LOADED);
      })
      .catch(reason => {
        console.error(reason);
        setViewState(ViewState.ERROR);
      });
  }

  useEffect(() => {
    fetchData();
    const element = document.querySelector('.appUserInfo');
    if (element) {
      element.style.display = 'none';
    }
    return () => {
      const element = document.querySelector('.appUserInfo');
      if (element) {
        element.style.display = 'flex';
      }
    };
  }, []);

  useDisableBodyOverflow();

  const {heading, all} = language.faq;

  const onClose = () => {
    route('/ncv19/');
  };

  return (
    <div className="faqDetailOuterWrapper">
      <div className="faqHeaderWrap">
        <div className="backIconWrap" onClick={onClose}>
          <Image src={arrowBackPng} alt="back" />
        </div>
        <div className="headerTextWrap">
          <p className="headerTextFaqDetail">{heading}</p>
        </div>
      </div>

      {viewState === ViewState.LOADING && (
        <div className="faq-placeholder">
          <FaqLoading />
          <FaqLoading />
          <FaqLoading />
        </div>
      )}

      {viewState === ViewState.ERROR && <ErrorBlock onRetry={fetchData} other={language.other} />}
      {viewState === ViewState.LOADED && (
        <div className="faqDetailInfoWrap">
          <div className="faqNavOuterWrap">
            <div
              className={currentFilter === null ? 'active' : ''}
              onClick={() => setCurrentFilter(null)}
            >
              {all}
            </div>
            {Object.keys(faqData).map(key => {
              const sectionName = faqData[key].display_title;
              return (
                <div
                  className={currentFilter === key ? 'active' : ''}
                  onClick={() => setCurrentFilter(key)}
                >
                  {sectionName}
                </div>
              );
            })}
          </div>
          <div className="faqDetailInnerBlock" ref={rootElRef}>
            {Object.keys(faqData)
              .filter(section => {
                if (currentFilter) {
                  return section === currentFilter;
                }
                return true;
              })
              .map(section => {
                const value = faqData[section];
                return (
                  <div className="sectionHeadTextWrap" key={section} id={`section_${section}`}>
                    <p className="sectionHeadText">{value.display_title}</p>
                    <div className="tabsDetail">
                      {value.q_a.map(({q, a}, index) => {
                        return (
                          <div
                            className="faqDetailBlock tabDetail"
                            id={`container_${section}_${index}`}
                          >
                            <input type="checkbox" id={`${section}_${index}`} />
                            <label
                              className="faqDetailQuestionText tabDetail-label"
                              htmlFor={`${section}_${index}`}
                            >
                              <span>
                                {index + 1}
                                .
                                {`${q}`}
                              </span>
                            </label>
                            <p
                              className="faqDetailAnswerWrap tabDetail-content"
                             
                              dangerouslySetInnerHTML={{__html: a}}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default FaqDetail;
