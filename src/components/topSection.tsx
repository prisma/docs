import * as React from 'react';
import styled from 'styled-components';
import TOC from './toc';
import TechnologySwitch from './techSwitcher';
import ParentTitle from './parentTitleComp';
import { useNavigate, redirectTo } from '@reach/router';
import { urlGenerator } from '../utils/urlGenerator';

const TopSectionWrapper = styled.div`
  position: relative;
  hr.bigger-margin {
    margin-top: 3.5rem;
    margin-bottom: 4rem;
  }
`;

const MainTitle = styled.h1`
  font-family: 'Montserrat';
  font-size: 2rem;
  font-style: normal;
  font-weight: bold;
  letter-spacing: -0.02em;
  color: #1a202c;
  margin: 0;
  margin-top: 4px;
`;

const SwitcherWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 78px;
`;

const TopSection = ({ location, title, slug, indexPage, langSwitcher, dbSwitcher, onChangeParam }: any) => {
  const navigate = useNavigate();
  const getTechFromParam = (type: string, defaultVal: string) => {
    const searchParam = new URLSearchParams(location.search).get(type);
    return searchParam ? searchParam : defaultVal;
  };

  const [langSelected, setLangSelected] = React.useState(
    langSwitcher ? getTechFromParam('lang', langSwitcher[0]) : 'typescript'
  );
  const [dbSelected, setDbSelected] = React.useState(
    dbSwitcher ? getTechFromParam('db', dbSwitcher[0]) : 'postgres'
  );

  const goToNewPath = () => {
    const newParams = `?${langSwitcher ? `lang=${langSelected}${dbSwitcher ? '&' : ''}` : ''}${
      dbSwitcher ? `db=${dbSelected}` : ''
    }`;
    if (!(location.pathname.includes(urlGenerator(slug)) && location.search === newParams)) {
      navigate(newParams);
      onChangeParam(newParams);
    }
    // const newParams = `${langSwitcher ? `${langSelected}${dbSwitcher ? '-' : ''}` : ''}${
    //   dbSwitcher ? `${dbSelected}` : ''
    // }`;

    // console.log(newParams);
    // if (!(location.pathname.includes(urlGenerator(slug)) && location.pathname.includes(newParams))) {
    //   redirectTo(`${parentSlug}-${newParams}`);
    //   //redirectTo(`http://localhost:8000/getting-started/quickstart-${newParams}`)
    // }
  };

  // TODO : Simplify the function!
  const techChanged = (item: any, type: string) => {
    const elements = document.querySelectorAll('[id^="techswitch"]');
    elements.forEach((element: any) => element.classList.remove('show'));
    const elemToShow = [].slice.call(elements).filter((elm: any) => {
      if (type === 'lang') {
        if (dbSwitcher) {
          if (elm.id.includes('-*-')) {
            // lang is any
            return elm.id.includes(`-${dbSelected}`);
          } else {
            return (
              elm.id.includes(`-${item.technology}`) &&
              (elm.id.includes(`-${dbSelected}`) || elm.id.includes(`-*`))
            );
          }
        } else {
          return elm.id.includes(`-${item.technology}`);
        }
      } else if (type === 'db') {
        if (langSwitcher) {
          if (elm.id.slice(-1) === '*') {
            // db is any
            return elm.id.includes(`-${langSelected}`);
          } else {
            return (
              elm.id.includes(`-${item.technology}`) &&
              (elm.id.includes(`-${langSelected}`) || elm.id.includes(`-*`))
            );
          }
        } else {
          return elm.id.includes(`-${item.technology}`);
        }
      }
    });
    elemToShow && elemToShow.forEach((eShow: any) => eShow.classList.add('show'));
    goToNewPath();
  };

  const langChanged = (item: any) => {
    techChanged(item, 'lang');
    setLangSelected(item.technology);
  };

  const dbChanged = (item: any) => {
    techChanged(item, 'db');
    setDbSelected(item.technology);
  };

  React.useEffect(() => {
    if (langSwitcher && !dbSwitcher) {
      langChanged({ technology: langSelected });
    } else if (dbSwitcher && !langSwitcher) {
      dbChanged({ technology: dbSelected });
    } else if (dbSwitcher && langSwitcher) {
      langChanged({ technology: langSelected });
      dbChanged({ technology: dbSelected });
    }
  });

  return (
    <TopSectionWrapper>
      {!indexPage && <ParentTitle slug={slug} />}
      <MainTitle>{title}</MainTitle>
      {!indexPage && <hr className={`${langSwitcher || dbSwitcher ? 'bigger-margin' : ''}`} />}
      <SwitcherWrapper>
        {langSwitcher && (
          <TechnologySwitch
            type="lang"
            onChangeTech={langChanged}
            technologies={langSwitcher}
            defaultTech={langSelected}
          />
        )}
        {dbSwitcher && (
          <TechnologySwitch
            type="db"
            onChangeTech={dbChanged}
            technologies={dbSwitcher}
            defaultTech={dbSelected}
          />
        )}
      </SwitcherWrapper>
      {!indexPage && <TOC location={location} />}
    </TopSectionWrapper>
  );
};

export default TopSection;
