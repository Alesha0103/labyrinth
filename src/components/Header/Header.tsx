import React from 'react'
import { LanguageButtons } from '../LanguageButtons/LanguageButtons';
import { ThemeButtons } from '../ThemeButtons/ThemeButtons';
import "./Header.scss"

export const Header = () => {
  return (
    <div className="header-wrapper">
      <div className="header">
        <LanguageButtons />
        <ThemeButtons />
      </div>
    </div>
  )
}
