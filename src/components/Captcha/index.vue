<template>
	<div class="captcha" @click="change()">
		<canvas id="s-cavas" :width="width" :height="height"></canvas>
	</div>
</template>

<script>
	export default {
		name: 'captcha',
		props: {
			codeLen: {
				type: Number,
				default: 4
			}
		},
		data() {
			return {
				fontMin: 25,
				fontMax: 35,
				backgroupColorMin: 180,
				backgroupColorMax: 240,
				colorMin: 50,
				colorMax: 160,
				lineColorMin: 40,
				lineColorMax: 180,
				dotColorMin: 0,
				dotColorMax: 255,
				width: 112,
				height: 47,

				code: ''
			}
		},
		methods: {
			/* 生成随机数 */
			randomNum(min, max) {
				return Math.floor(Math.random() * (max - min) + min)
			},

			/* 生成随机验证码值 */
			randomStr() {

				let code = ''

				let random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
					'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
					'j', 'k', 'l',
					'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z')
				for (let i = 0; i < this.codeLen; i++) {
					let index = this.randomNum(0, 62)
					code += random[index]
				}


				return code

			},

			/* 生成随机色 */
			randomColor(min, max) {
				let r = this.randomNum(min, max)

				let g = this.randomNum(min, max)
				let b = this.randomNum(min, max)

				return 'rgb(' + r + ',' + g + ',' + b + ')'
			},

			/* 绘制验证码 */
			drawPic() {
				let canvas = document.getElementById('s-cavas')
				let ctx = canvas.getContext('2d')

				/* 绘制背景 */
				ctx.fillStyle = '#FFFFFF' // 设置图形填充颜色
				ctx.strokeStyle = this.randomColor(this.backgroupColorMin, this.backgroupColorMax) // 设置图形轮廓颜色
				ctx.fillRect(0, 0, this.width, this.height) // 绘制矩形
				ctx.strokeRect(0, 0, this.width, this.height) // 绘制矩形边框

				this.code = this.randomStr() // 生成code值

				/* 绘制文字 */
				for (let i = 0; i < this.code.length; i++) {

					this.drawText(ctx, this.code[i], i)
				}

				this.drawLine(ctx)
				this.drawDot(ctx)

				/* 将验证码值传给父组件 */
				this.$emit('getCode', this.code)
			},

			/* 绘制文字 */
			drawText(ctx, txt, i) {

				ctx.fillStyle = '' + this.randomColor(this.colorMin, this.colorMax) + ''
				ctx.font = this.randomNum(this.fontMin, this.fontMax) + 'px SimHei' // 字体及字体大小
				ctx.textBaseline = 'alphabetic' // 基线对齐

				let x = (i + 1) * (this.width / (this.code.length + 1))
				let y = this.randomNum(this.fontMax, this.height - 5)

				let deg = this.randomNum(-45, 45)

				/* 修改坐标原点和旋转角度 */
				ctx.translate(x, y) // 移动不同位置  参数偏移量
				ctx.rotate(deg * Math.PI / 180) // 旋转 参数角度
				ctx.fillText(txt, 0, 0)

				/* 恢复坐标原点和旋转角度 */
				ctx.rotate(-deg * Math.PI / 180)
				ctx.translate(-x, -y)

			},


			/* 绘制干扰线 */
			drawLine(ctx) {
				for (let i = 0; i < 8; i++) {
					ctx.strokeStyle = '' + this.randomColor(this.lineColorMin, this.lineColorMax) + ''
					ctx.beginPath() //新建一条路径
					ctx.moveTo(this.randomNum(0, this.width), this.randomNum(0, this.height)) //设置起点x,y
					ctx.lineTo(this.randomNum(0, this.width), this.randomNum(0, this.height)) //绘制直线 x,y 一条当前位置到x,y点的直线
					ctx.stroke() // 通过线条绘制图形轮廓
				}
			},
			/* 绘制干扰点 */
			drawDot(ctx) {
				for (let i = 0; i < 100; i++) {
					ctx.fillStyle = this.randomColor(0, 255)
					ctx.beginPath()
					// 绘制圆弧或圆，x,y,radius，startAngle,endAngle,anticlockwise // x,y 圆心点，radius 半径，从startAngle开始到endAngle结束
					ctx.arc(this.randomNum(0, this.width), this.randomNum(0, this.height), 1, 0, 2 * Math.PI)
					ctx.fill() //通过填充路径的内容区域生成实心的图形。
				}
			},
			change() {
				this.drawPic()
			}

		},
		mounted() {
			this.drawPic()
		},
	}
</script>

<style>
</style>
