import {h} from 'preact';
import React from 'react';
/** @jsx h */
import './userDetailPop.css';
import {useState, useContext} from 'preact/hooks';
import ClientDataContext from '@stencil/client-data-context';
import ConfigFromEnv from '@stencil/config-from-env';
import closeIcon from '../../../assets/closeIcon.png';
import arrowDown from '../../../assets/arrow-down.png';

const qnas = [
  {
    q: 'How do you know the person?',
    a: [
      {
        list: ['Friend', 'Child/Spouse', 'Parents', 'Colleague/Relative'],
        answerType: 'Relation',
        type: 'dropdown',
        resTyp: 'relation',
      },
    ],
  },
  {
    q: 'Details of related person, who tested positive for COVID-19',
    a: [
      {
        answerType: 'Name of Related persion',
        type: 'text',
        placeholder: 'Enter name',
        resTyp: 'name',
      },
      {
        answerType: 'Phone Number of Related persion',
        type: 'number',
        placeholder: 'Enter Phone number',
        resTyp: 'phone',
      },
      {
        list: ['1 - 20 Years', '21 - 40 Years', '41 - 65 Years', '65+ Years'],
        answerType: 'Age Range',
        type: 'dropdown',
        resTyp: 'age',
      },
    ],
  },
  {
    q: 'Were you living with the person anytime within 14days, before infection was confirmed?',
    a: [
      {
        list: ['Yes, I stayed with the person', 'Yes I stayed for sometime in last 14days', 'No'],
        answerType: '',
        type: 'dropdown',
        resTyp: 'stayed',
      },
    ],
  },
];

const UserDetailPop = ({header, qna, note, cta, confirmStatus, onSubmit}) => {
  const [final_result, setResult] = useState({});

  const onSelection = (resTyp, value) => {
    const next = {[resTyp]: value};
    setResult(prev => {
      return {...prev, ...next};
    });
  };

  const noofQuestion = qnas.map(v => v.a.length).reduce((sum, current) => sum + current, 0);
  const resultKeys = Object.keys(final_result);
  const isSubmitActive =
    noofQuestion === resultKeys.length &&
    resultKeys.reduce((res, curr) => res && !!final_result[curr], true) &&
    final_result?.phone.length === 10;

  return (
    <>
      <div className="popOverlayWrap"></div>
      <div className="popUserContent">
        <div className="popUserHeader" onClick={() => confirmStatus('close')}>
          <a href="javascript:void(0);">
            <img src={closeIcon} />
          </a>
          <p class="popuserHeadText">{header}</p>
        </div>
        <div className="popUserBodyWrap">
          <div className="userDetailOuterWrap">
            {qnas.map(({a}, index) => (
              <div className="userDetailInnerWrap">
                <p className="questionText">{`${index + 1}. ${qna[index].q}`}</p>
                {a.map(({list = [], type = '', resTyp = ''}, subIndex) => {
                  const {placeholder: langPlaceholder, list: langList, answerType = ''} = qna[
                    index
                  ].a[subIndex];
                  const [showDropDown, setDropDown] = useState(false);
                  return (
                    <div className="answerWrap">
                      {(answerType && <label className="answerLabel">{answerType}</label>) || null}
                      {((type === 'text' || type === 'number') && (
                        <div className="answerSelect">
                          <input
                            type={type}
                            placeholder={langPlaceholder}
                            onBlur={e => onSelection(resTyp, e?.target?.value)}
                          />
                        </div>
                      )) ||
                        null}
                      {(list.length && (
                        <div className="answerSelect" onClick={() => setDropDown(true)}>
                          <p className="selectedAnswer">
                            {list.indexOf(final_result[resTyp]) !== -1
                              ? langList[list.indexOf(final_result[resTyp])]
                              : 'Select'}
                          </p>
                          <img src={arrowDown} />
                        </div>
                      )) ||
                        null}
                      {(showDropDown && (
                        <>
                          {(type === 'dropdown' && (
                            <div className="selectDropDown">
                              {list.map((txt, listLndex) => (
                                <p
                                  className="selectOptions"
                                  onClick={() => {
                                    setDropDown(false);
                                    onSelection(resTyp, txt);
                                  }}
                                >
                                  {langList[listLndex]}
                                </p>
                              )) || null}
                             
                            </div>
                          )) ||
                            null}
                        </>
                      )) ||
                        null}
                    </div>
                  );
                }) || null}
              </div>
            )) || null}
          </div>
          <div className="popUserFooter">
            {(note && (
              <p className="popFooterInfoText">
                <span>NOTE:</span>
                {note}
              </p>
            )) ||
              null}
            <button
              className={isSubmitActive ? 'submitActive' : 'submitDisabled'}
              onClick={() => onSubmit({...final_result, status: 'Known'})}
            >
              {cta}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailPop;
