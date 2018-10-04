import React, { Component } from 'react';
import Flex from 'Base/Flex';

/**
 * 组件库 组件
 * 有一个tag名 name
 * 有一个内容区，存放组件 children
 */
export default class Bag extends Component {
	constructor(props) {
		super(props);
		this.state = {
            $blocks: this.props.$blocks
        };
        console.log(this.props.$blocks )
	}
	render() {
		return (
			/* 组件库 */
			/* //TODO: 子项目的flex，使用百分比会奇怪的伸缩 √ 使用height：0可以控制，但是为什么呢 */
			/* //TODO: 这里不用flex-start，最后一个元素就会居中排列，但是用了，就不好控制其他的 -- 试试 用一个元素把他们包起来居中，此时需要注意Flex的层级带来的BUG */
			<Flex flow="column" style={{ flex: '1 1 ', height: 0 }}>
				<div>{this.props.name}</div>
				<Flex flow="row wrap" justify="flex-start" align="flex-start" style={{ flex: 1, overflowY: 'scroll' }}>
                    {this.state.$blocks}
				</Flex>
			</Flex>
		);
	}
}
