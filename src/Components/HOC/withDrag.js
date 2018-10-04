import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

// 拖动
// TODO: 多层if嵌套的解耦 策略模式
const withDrag = (WrappedComponent) => {
	class HocComponent extends React.Component {
		constructor(props) {
			super(props);
			this.isCanDrag = false;
			this.state = {
				$copy: null,
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
				let $drag = null;
				if (this.props.isCopy) {
					$drag  = ReactDOM.findDOMNode(this.$copy);
				} else {
					$drag  = ReactDOM.findDOMNode(this.$drag); 
				}
				let x = e.pageX - $drag.offsetLeft;
				let y = e.pageY - $drag.offsetTop;
				$drag.style.transform = `translate(${x}px,${y}px)`;
			}
		};
		handleMouseUp = (e) => {
			
		};
		// 设置或清除 可拖拽以及复制件
		setDrag = (flag) => {
			if (flag) {
				// 设置
				if(this.props.isCopy){
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
					this.setState({
						$copy: $copy
					});
				}

				this.isCanDrag = true;
			} else {
				// 清除
				this.isCanDrag = false;
				if (this.props.isCopy) {
					REF_CACHE.$desk.addBlock("1", this.$copy);
					this.setState({
						$copy: null
					});
				}
			}
		};
		render() {
			return (
				<React.Fragment>
					<WrappedComponent
						ref={(drag)=>{this.$drag = drag}}
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
