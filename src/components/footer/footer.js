import {h} from 'preact';
/** @jsx h */
import {useContext} from 'preact/hooks';
import './footer.css';
import ServerDataContext from '@stencil/server-data-context';
import ClientDataContext from '@stencil/client-data-context';

import Image from '../Image';

import LogoSvg from '../../assets/logo.svg';
import emblemPng from '../../assets/emblem@3x.png';



function parseJwt (token) {
  var  base64Url = token.split('.')[1]; // token you get
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  var decodedData = JSON.parse(Buffer.from(base64, 'base64').toString('binary'));

  return decodedData;
}




function Footer() {

  const {language} = useContext(ServerDataContext);
  const {headers = {}} = useContext(ClientDataContext);

  var auth=headers['Authorization']

  var decoded = parseJwt(auth);
  var x=decoded.username;
  var mapHtml=null;

if(x=="bd43f6f8-c32b-463f-b1a7-43afb93cf6d7"||"60d57afa-bc12-4d0f-96ea-4deb28fe01a5"||"e397da7d-7e11-4947-b01a-ae01d6fc913e")
{
mapHtml="block";
}
else
{
  mapHtml=null;
}

  return (
    <footer className="pageFooter">
      <div className="linksOuterWrapper">
        <span className="linkDivider" />
        <a href="/ncv19/tnc/" className="linkText">
          {language.tncText}
        </a>
      
        
        

        

        <span className="linkDivider" />
      </div>

      <div>
        <div className="footerBtnBlock">
          <Image src={LogoSvg} alt="Logo" />
          
          {headers['ver-name'] ? <p>v{headers['ver-name']}</p> : null}
        </div>
        <div className="footerLogoWrap">
          <Image src={emblemPng} alt="GOI Logo" />
          <p>Government of India</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
