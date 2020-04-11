import React from 'react';
import { Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faThumbsUp, faVideo } from "@fortawesome/free-solid-svg-icons";

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a href="/">Home</a>
      </Menu.Item>
    
      <Menu.Item key="subscription">
        <a href="/subscription"><FontAwesomeIcon icon={faVideo} size="lg" /> Subscription</a>
      </Menu.Item>

      <Menu.Item key="movie">
        <a href="/movie"><FontAwesomeIcon icon={faFilm} size="lg" /></a>
      </Menu.Item>

      <Menu.Item key="favorite">
        <a href="/movie/favorite/list"><FontAwesomeIcon icon={faThumbsUp} size="lg" /> Favorite</a>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu