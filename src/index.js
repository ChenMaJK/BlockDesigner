import React, { Component } from 'react';
import { render } from 'react-dom';
import less from './index.less';

import Flex from 'Layout/Flex';
import Header from 'Layout/Header';
import Body from 'Layout/Body';

import Bag from 'Base/Bag';
import Div from 'Base/Div';
import withCopyDrag from 'HOC/withCopyDrag';

const DivWithDrag = withCopyDrag(Div);
// TODO: 可读性不好，需要思考
export default class Index extends Component {
	render() {
		return (
			<Flex flow="column" align="strech" justify="center" className={less.test}>
				{/* header */}
				<Flex flow="row nowrap" align="center" justify="center" className={less.header}>
					<Flex
						flow="row nowrap"
						justify="space-between"
						align="center"
						style={{ flex: '0.9 1', height: '6vh' }}
					>
						<span>BlockDesigner</span>
						<span>userInfo</span>
					</Flex>
				</Flex>
				{/* body */}
				<Flex flow="row nowrap" align="strech">
					{/* left */}
					<Flex flow="column nowrap" align="strech" style={{ flex: '0 0 18%' }}>
						<Bag name="Icon组件" $blocks={<DivWithDrag>12223</DivWithDrag>} />
						<Bag name="基础组件" />
						<Bag name="高阶组件" />
						<Bag name="组合组件" />
						<Bag name="业务组件" />
					</Flex>
					{/* right */}
					<Flex
						flow="column nowrap"
						justify="space-between"
						align="strech"
						style={{ flex: '1 1', minHeight: '95vh' }}
					>
						<Flex flow="row nowrap" style={{}}>
							{/* // TODO: 当页面最小的时候，右侧内容会被挤出布局 */}
							<div style={{ whiteSpace: 'nowrap' }}>制作</div>
							<div style={{ whiteSpace: 'nowrap' }}>预览</div>
						</Flex>
						<Flex flow="column nowrap" style={{ flex: '1 1' }}>
							123
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		);
	}
}
render(<Index />, document.getElementById('app'));
