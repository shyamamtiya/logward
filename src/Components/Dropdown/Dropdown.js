import React from 'react';
import { Dropdown } from 'antd';

function DropdownList(props) {
    const {menu}  = props;

    return (
    <Dropdown overlay={menu} trigger={['click']}>
            {props.render}
    </Dropdown>
    );
}

export default DropdownList;