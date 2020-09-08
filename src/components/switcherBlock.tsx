import React from 'react'
import styled from 'styled-components'
import TechnologySwitch from './techSwitcher'
import { urlGenerator } from '../utils/urlGenerator'
import { withPrefix } from 'gatsby'
import { useNavigate, useLocation } from '@reach/router'

const SwitcherWrapper = styled.div`
  display: flex;
  position: absolute;
  top: -38px;
  @media only screen and (max-width: 767px) {
    flex-direction: column;
    width: 100%;
    top: -30px;
  }
`

const SwitcherBlock = ({ langSwitcher, dbSwitcher, location, navigate, slug }: any) => {
 
    // const navigate = useNavigate()
    // const location = useLocation()

    console.log(langSwitcher, dbSwitcher)

    console.log(location)

  const [pathTechParams] = location.pathname.split('/').splice(-1)
  const getTechFromParam = (type: string, defaultVal: string) => {
    const isTechPath = location.pathname !== withPrefix(urlGenerator(slug))
    let tech = defaultVal
    if (isTechPath) {
      if (type === 'lang') {
        ;[tech] = pathTechParams.split('-').splice(dbSwitcher ? -2 : -1)
      }

      if (type === 'db') {
        ;[tech] = pathTechParams.split('-').splice(-1)
      }
    }
    return tech
  }

  const [langSelected, setLangSelected] = React.useState(
    langSwitcher ? getTechFromParam('lang', langSwitcher[0]) : 'typescript'
  )
  const [dbSelected, setDbSelected] = React.useState(
    dbSwitcher ? getTechFromParam('db', dbSwitcher[0]) : 'postgres'
  )
  const goToNewPath = () => {
      console.log(langSelected, dbSelected)
    const newParams = `${langSwitcher ? `${langSelected}${dbSwitcher ? '-' : ''}` : ''}${
      dbSwitcher ? `${dbSelected}` : ''
    }`
    if (!pathTechParams.includes(newParams)) {
      navigate(withPrefix(`${urlGenerator(slug)}-${newParams}${location.hash}`), {
        replace: location.pathname === urlGenerator(slug),
      })
    }
  }

  // TODO : Simplify the function!
  const techChanged = (item: any, type: string) => {
    const elements = document.querySelectorAll('[id^="techswitch"]')
    elements.forEach((element: any) => element.classList.remove('show'))
    const elemToShow = [].slice.call(elements).filter((elm: any) => {
      if (type === 'lang') {
        if (dbSwitcher) {
          if (elm.id.includes('-*-')) {
            // lang is any
            return elm.id.includes(`-${dbSelected}`)
          } else {
            return (
              elm.id.includes(`-${item.technology}`) &&
              (elm.id.includes(`-${dbSelected}`) || elm.id.includes(`-*`))
            )
          }
        } else {
          return elm.id.includes(`-${item.technology}`)
        }
      } else if (type === 'db') {
        if (langSwitcher) {
          if (elm.id.slice(-1) === '*') {
            // db is any
            return elm.id.includes(`-${langSelected}`)
          } else {
            return (
              elm.id.includes(`-${item.technology}`) &&
              (elm.id.includes(`-${langSelected}`) || elm.id.includes(`-*`))
            )
          }
        } else {
          return elm.id.includes(`-${item.technology}`)
        }
      }
    })
    elemToShow && elemToShow.forEach((eShow: any) => eShow.classList.add('show'))
    goToNewPath()
  }

  const langChanged = (item: any) => {
      console.log(item)
    techChanged(item, 'lang')
    setLangSelected(item.technology)
  }

  const dbChanged = (item: any) => {
    techChanged(item, 'db')
    setDbSelected(item.technology)
  }

  // cleanup!! - memory leak!!
  React.useEffect(() => {
    // let mounted = true

    if (langSwitcher && !dbSwitcher ) {
      langChanged({ technology: langSelected })
    } else if (dbSwitcher && !langSwitcher ) {
      dbChanged({ technology: dbSelected })
    } else if (dbSwitcher && langSwitcher ) {
      langChanged({ technology: langSelected })
      dbChanged({ technology: dbSelected })
    }

    // return function cleanup() {
    //   mounted = false
    // }
  }, [langSelected, dbSelected])
  return (
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
  )
}

export default SwitcherBlock
