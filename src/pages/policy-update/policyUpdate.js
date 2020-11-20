import {h, Fragment} from 'preact';
/** @jsx h */
import {useState, useEffect, useContext} from 'preact/hooks';
import './policyUpdate.css';

import ClientDataContext from '@stencil/client-data-context';
import ConfigFromEnv from '@stencil/config-from-env';

import Image from '../../components/Image';

function PolicyUpdate() {
  const [showPolicyPopup, setPolicyPopup] = useState(false);
  const [userConsent, setUserConsent] = useState(true);
  const [userExit, setUserExit] = useState(false);
  const {headers} = useContext(ClientDataContext);

  const setExit = () => {
    setUserExit(!userExit);
    setUserConsent(!userConsent);
  };

  useEffect(() => {
    if (showPolicyPopup) {
      window.document.querySelector('body').style.overflow = 'hidden';
    } else {
      window.document.querySelector('body').style.overflow = 'auto';
    }
  }, [showPolicyPopup]);

  useEffect(() => {
    if (headers.Authorization) {
      fetch(`${ConfigFromEnv('__NCV_API__')}/ncv19/show-policy/`, {
        headers: {
          Authorization: headers.Authorization,
        },
      })
        .then(response => response.json())
        .then(data => {
          const {show} = data;
          setPolicyPopup(show);
        });
    }
  }, []);

  if (!showPolicyPopup) {
    return null;
  }
  return (
    <div className="policyUpdateOuterWrap">
      <div className="policyInnerWrap">
        {userExit && (
          <div className="exitAppWrap">
            <div className="exitSadFaceWrap">
              <Image src="/assets/sadFace.svg" alt="sad face" />
            </div>
            <div className="exitHeadTextWrap">
              <p className="exitHeadText">Sorry to See You Go…</p>
            </div>
            <div className="exitInfoTextWrap">
              <p className="exitInfoText">
                We keep updating our policies to keep it relevant for our users – and very often we
                will incorporate your views and suggestions.
              </p>

              <p className="exitSuggestionText">
                For any questions or suggestions, please reach out to us{' '}
                <a href="mailto:policy@setuaarogya.in">policy@setuaarogya.in</a>
              </p>
            </div>
          </div>
        )}

        {userConsent && (
          <Fragment>
            <div className="policyHeaderWrap">
              <h2 className="policyUpdateHeadText">
                We have updated our Terms of Use and Privacy Policy
              </h2>
            </div>
            <div className="policyInfoMainWrap">
              <p className="policyInfoHeadText">
                The Terms of Use of Aarogya Setu have been modified as follows:
              </p>
              <ol>
                <li>Failure to comply with the terms of Use no longer results in suspension</li>
                <li>Reference to the convenience services and ePass features</li>
                <li>
                  Clarifications provided as to the consequences of not keeping the phone with you.
                </li>
                <li>The restrictions on tampering and reverse-engineering have been removed</li>
                <li>
                  It has been made clear that it is only if you delete the App that you will no
                  longer be able to use the Service
                </li>
                <li>
                  Clarifications as to the liability of the government for certain actions and
                  disclaimers.
                </li>
                <li>Contact information has been provided for defect reporting.</li>
              </ol>
              <p className="policyInfoSubText">
                Please read and review the revised terms of Use <a href="/tnc/">here</a>. You must
                accept the revised terms in order to continue to use the App.
              </p>
            </div>
            <div className="policyInfoMainWrap">
              <p className="policyInfoHeadText">
                The Privacy Policy of Aarogya Setu has been modified as follows:
              </p>
              <ol>
                <li>Clarifications have been provided as to what data is collected.</li>
                <li>Reference has been made to data processed by pressing the Report button</li>
                <li>
                  Additional clarifications have been provided as to the use of data and that
                  location data for the past 30 days can be uploaded under specified circumstances
                </li>
                <li>Additional clarifications have been provided as to data retention.</li>
              </ol>
              <p className="policyInfoSubText">
                Please read and review the revised Privacy Policy <a href="/privacy/">here</a>. You
                must accept the revised terms in order to continue to use the App.
              </p>
            </div>
          </Fragment>
        )}

        <div className="policyFixedBtnWrap">
          <div className="policyBtnInnerWrap">
            {!userConsent && (
              <div className="policyCancelWrap">
                <p className="closeText">You may close the app & uninstall it </p>
                <p className="closeText">or</p>
                <button className="acceptBtn" type="button" onClick={setExit}>
                  Go Back
                </button>
              </div>
            )}

            {userConsent && (
              <Fragment>
                <button
                  type="button"
                  className="acceptBtn"
                  onClick={() => {
                    if (userConsent) {
                      setPolicyPopup(false);
                      fetch(`${ConfigFromEnv('__NCV_API__')}/ncv19/policy-accepted/`, {
                        headers: {
                          Authorization: headers.Authorization,
                        },
                      });
                    }
                  }}
                >
                  {userConsent ? 'I Accept' : 'Exit app'}
                </button>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PolicyUpdate;
