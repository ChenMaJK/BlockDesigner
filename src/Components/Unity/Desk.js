import React, { Component } from 'react';

export default class Desk extends Component {
	constructor(props) {
		super(props);
		this.state = {
			castle: <React.Fragment> 请拖拽元素到这里来把 </React.Fragment>
		};
	}
	// _pos = 12 为根元素下第1个元素的第2个元素
	addBlock = (_pos, _block) => {
        let castle = `<React.Fragment >12 </React.Fragment>`;
        // 取_pos每一位的数字，然后寻找当前层那一个对象并进入
        console.log(_block)
        let $castle = React.createElement( _block);
        console.log($castle)
		this.setState({
			castle: $castle
		});
	};
	render() {
		return <div>{this.state.castle}</div>;
	}
}
