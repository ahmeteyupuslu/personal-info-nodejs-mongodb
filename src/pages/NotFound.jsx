import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div style={{backgroundColor:'white', height: '100vw'}}>
        <h1 style={{paddingTop:'200px'}}>ERİŞMEK İSTEDİĞİNİZ MEVCUT DEĞİL VEYA ERİŞİMİNİZ YOK</h1>
        <h2><Link to="/">GİRİŞ EKRANI</Link></h2>
    </div>
  )
}

export default NotFound