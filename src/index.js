import React, { Component } from 'react';
import { render } from 'react-dom';
import less from './index.less'

export default class Index extends Component {
	render() {
		return (
		<div className={less.test}>
			123
			<input className={less.input} placeholder="123"/>
		</div>
		);
	}
}
render(<Index />, document.getElementById('app'));
