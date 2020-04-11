import React from 'react';
import { Menu } from 'antd';

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a href="/">Home</a>
      </Menu.Item>
    
      <Menu.Item key="subscription">
        <a href="/subscription">Subscription</a>
      </Menu.Item>

      <Menu.Item key="movie">
        <a href="/movie">Movie</a>
      </Menu.Item>

      <Menu.Item key="favorite">
        <a href="/movie/favorite/list">Favorite</a>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu