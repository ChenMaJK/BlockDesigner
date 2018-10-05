import React, { Component } from 'react';

export default class Desk extends Component {
	constructor(props) {
		super(props);
		this.state = {
			blockJson: [{ id: "0", name: 'test', children: [{ id: "00", name: 'test2', children: [] }] }, { id: "1", name: 'test3', children: []}]
		};
	}
	// _pos = 12 为根元素下第1个元素的第2个元素
	addBlock = (_pos, _blockJson) => {
		let blockJson = this.state.blockJson;
		let currentBlockJson = blockJson[_pos.charAt(0)] ;
		for (let i = 1; i < _pos.length; i++) { 
			currentBlockJson = currentBlockJson.children[_pos.charAt(i)];
			
		}
		console.log(currentBlockJson)
		let newBlockJson = {
			id: _pos + currentBlockJson.children.length.toString(),
			name:_blockJson.name,
			children:[]
		}
		currentBlockJson.children.push(newBlockJson);
		console.log(currentBlockJson)
		console.log(blockJson)
		this.setState({blockJson:blockJson})
	};
	parseJson = (_blockJson) => {
		let vDOM = [];
		// console.log(_blockJson);
		if (_blockJson instanceof Array) {
			let childrenDOM = [];
			for (let childDOM of _blockJson) {
				childrenDOM.push(this.parseJson(childDOM));
			}
			vDOM.push(<React.Fragment>{childrenDOM}</React.Fragment>);
		} else {
			// console.log(_blockJson);
			vDOM.push(
				<div key={_blockJson.id} vid={_blockJson.id}>
					{_blockJson.name}
					{_blockJson.children && this.parseJson(_blockJson.children)}
				</div>
			);
		}
		// console.log(vDOM);
		return vDOM;
	};
	render() {
		return <React.Fragment>{this.parseJson(this.state.blockJson)}</React.Fragment>;
	}
}
