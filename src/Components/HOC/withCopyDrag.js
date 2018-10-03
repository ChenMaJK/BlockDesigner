import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

// 拖动
const withCopyDrag = (WrappedComponent) => {
	class HocComponent extends React.Component {
		constructor(props) {
			super(props);
			console.log(WrappedComponent);
			this.isCanDrag = false;
			this.state = {
				$copy: null
			};
		}
		// TODO:更好的注释
		// 当鼠标按下时，设置拖拽事件
		// * e 事件
		handleMouseDown = (e) => {
			let that = this;
			// 鼠标按下，设置可拖拽，并生成复制件this.$copy
			that.setDrag(true);
			// TODO:更好的事件绑定方式，
			// 设置鼠标移动事件
			let mousemove = document.addEventListener('mousemove', this.handleMouseMove);
			// 设置鼠标放开事件
			document.addEventListener('mouseup', (e) => {
                // 设置不可拖拽，并移除鼠标移动事件，鼠标放开事件，判断是否为内容区中的元素，依次判断是否放下此复制体
                console.log(e)
				that.setDrag(false);
				document.removeEventListener('mousemove', this.handleMouseMove);
				document.removeEventListener('mouseup', this.handleMouseMove);
			});
			e.preventDefault();
		};
		handleMouseMove = (e) => {
			// TODO:更好的拖拽方式
			// 拖拽复制件this.$copy
			if (this.isCanDrag) {
				let $copy = ReactDOM.findDOMNode(this.$copy);
				$copy.style.left = e.pageX - $copy.offsetWidth / 2 + 'px';
				$copy.style.top = e.pageY - $copy.offsetHeight / 2 + 'px';
			}
		};
		// 设置或清除 可拖拽以及复制件
		setDrag = (flag) => {
			if (flag) {
				// 设置
				let $copy = (
					<WrappedComponent
						{...this.props}
						onMouseMove={this.handleMouseMove}
						ref={(copy) => {
							this.$copy = copy;
						}}
						style={{
							position: 'absolute',
							userSelect: 'none'
						}}
					/>
				);
				this.isCanDrag = true;
				this.setState({
					$copy: $copy
				});
			} else {
				// 清除
				this.isCanDrag = false;
				this.setState({
					$copy: null
				});
			}
		};
		render() {
			return (
				<React.Fragment>
					<WrappedComponent
						onMouseDown={this.handleMouseDown}
						{...this.props}
						style={{
							userSelect: 'none'
						}}
					>
						{this.props.children}
					</WrappedComponent>
					{this.state.$copy}
				</React.Fragment>
			);
		}
	}
	return HocComponent;
};
export default withDrag;
