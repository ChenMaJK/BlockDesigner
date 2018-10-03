import React, { Component } from 'react';

/**
 * Flex:弹性盒子
 * * flow		flexFlow
 * * justify	justifyContent
 * * align		alignItems
 * * aligns		alignContent
 */
export default class Flex extends Component {
	render() {
		return (
			<div
				style={{
					display: 'flex',
					flexFlow: this.props.flow,
					justifyContent: this.props.justify,
					alignItems: this.props.align,
					alignContent: this.props.aligns,
					...this.props.style
				}}
			>
				{this.props.children}
			</div>
		);
	}
}
