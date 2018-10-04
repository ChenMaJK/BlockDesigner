import React, { Component } from 'react';

import Flex from 'Base/Flex';
export default class Header extends Component {
	render() {
		return (
        <Flex>
            <span className={less.title}>{this.props.title}</span>
            <span></span>
        </Flex>
        );
	}
}
