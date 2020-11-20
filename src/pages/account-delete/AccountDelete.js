import {h} from 'preact';
/** @jsx h */
import {useContext} from 'preact/hooks';
import ServerDataContext from '@stencil/server-data-context';
import './account-delete.css';

export default function AccountDelete() {
  const {language} = useContext(ServerDataContext);
  const {accountDelete} = language;
  const {heading, items} = accountDelete;
  return (
    <div className="accountDeleteWrapper">
      <header className="heading">{heading}</header>
      <section className="content">
        <ol className="orderedListWrapper">
          {items.map(item => (
            <li className="listItem">
              <span className="listtext">{item.text}</span>
              <ul className="unorderedListWrapper">
                {(item.subText || []).map(subItem => (
                  <li className="sublistItem">
                    <span className="sublisttext">{subItem.value}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
