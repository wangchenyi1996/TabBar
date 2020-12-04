<template>
  <view class="raffle-wheel">
    <!-- canvas 宽高按照设计稿 750 设定，样式按照 750 / 2 设定，避免画板内容模糊 -->
    <canvas
      :class="canvasData.className"
      :canvas-id="canvasData.canvasId"
      :width="canvasData.width"
      :height="canvasData.height"
      :style="{
        width: canvasData.width,
        height: canvasData.height,
        transform: `rotate(${canvasAngle + targetAngle}deg)`,
        transitionDuration: `${transitionDuration}s`
      }"
    />
    <view class="raffle-wheel__action" @click="handleAction"></view>
    <!-- 为了兼容 app 端 ctx.measureText 所需的标签 -->
    <text class="raffle-wheel__measureText">{{ measureText }}</text>
  </view>
</template>

<script>
  export default {
    name: 'RaffleWheel',
    props: {
      // 奖品列表
      prizeList: {
        type: Array,
        // 必须是偶数
        validator: function (value) {
          return value.length % 2 === 0
        },
        required: true
      },
      // 奖品区块对应背景颜色
      colors: {
        type: Array,
        default: () => [
          '#FFF',
          '#FFE9AA'
        ],
        // 必须是偶数且仅为 2 个颜色相互交替
        validator: function (value) {
          return value.length === 2
        }
      },
      // 旋转动画时间 单位s
      duration: {
        type: Number,
        default: 8
      },
      // 字体颜色
      fontColor: {
        type: String,
        default: '#C30B29'
      },
      // 文字的大小
      fontSize: {
        type: String,
        default: '12px'
      },
      // 奖品文字多行情况下的行高
      lineHeight: {
        type: Number,
        default: 20
      },
      // 奖品名称所对应的 key 值
      strKey: {
        type: String,
        required: true
      },
      // 奖品文字总长度限制
      strMaxLength: {
        type: Number,
        default: 12
      },
      // 奖品文字多行情况下第一行文字长度
      strLineLength: {
        type: Number,
        default: 6
      }
    },
    data () {
      return {
        // 画板数据
        canvasData: {
          className: 'raffle-wheel__canvas',
          canvasId: 'raffleWheelCanvas',
          width: 238,
          height: 238
        },
        // 旋转到奖品目标需要的角度
        targetAngle: 0,
        // 转盘奖品文本位置距离圆心的距离
        textRadius: 100,
        // 旋转动画时间 单位 s
        transitionDuration: 0,
        // 是否正在旋转
        isRotate: false,
        // 当前停留在那个奖品的序号
        stayIndex: 0,
        // 解决 app 不支持 measureText 的问题
        measureText: ''
      }
    },
    computed: {
      // 根据奖品列表计算 canvas 旋转角度
      // 让 启动按钮指针 在奖品分区中间 position = 45
      // 让 启动按钮指针 在奖品分区边界 position = 90
      canvasAngle () {
        let prizeCount = this.prizeList.length
        let position = 90
        if (prizeCount % 4 !== 0) {
          return 0
        } else {
          let num = prizeCount / 4
          return num % 2 === 0 ? position / num : position
        }
      }
    },
    methods: {
      // 开始旋转
      handleStartRotate (targetIndex) {
        // 奖品总数
        let prizeCount = this.prizeList.length
        let baseAngle = 360 / prizeCount
        let angles = 0
        if (this.targetAngle === 0) {
          console.log('第一次旋转')
          // 因为第一个奖品是从0°开始的，即水平向右方向
          // 第一次旋转角度 = 270度 - (停留的序号-目标序号) * 每个奖品区间角度 - 每个奖品区间角度的一半 - canvas自身旋转的度数
          angles = (270 - (targetIndex - this.stayIndex) * baseAngle - baseAngle / 2) - this.canvasAngle
        } else {
          console.log('后续旋转')
          // 后续继续旋转 就只需要计算停留的位置与目标位置的角度
          angles = -(targetIndex - this.stayIndex) * baseAngle
        }
        // 更新目前序号
        this.stayIndex = targetIndex
        // 转 8 圈，圈数越多，转的越快
        this.targetAngle += angles + 360 * 8

        // 计算转盘结束对时间，预加一些延迟确保转盘停止后触发结束事件
        let endTime = this.transitionDuration * 1000 + 200
        setTimeout(() => {
          this.isRotate = false
          this.$emit('actionEnd')
        }, endTime)
      },
      // 点击 开始抽奖 按钮
      handleAction () {
        if (this.isRotate) return
        this.isRotate = true
        this.$emit('actionStart')
      },
      // 渲染转盘
      async drawWheelCanvas () {
        // 获取 canvas 画布
        const canvasId = this.canvasData.canvasId
        const ctx = uni.createCanvasContext(canvasId, this)
        
        // canvas 的宽高
        let canvasW = this.canvasData.width
        let canvasH = this.canvasData.height

        // 根据奖品个数计算 角度
        let prizeCount = this.prizeList.length
        let baseAngle = Math.PI * 2 / prizeCount
        // 在给定矩形内清空一个矩形
        ctx.clearRect(0, 0, canvasW, canvasH)
  
        // 设置描边颜色
        ctx.strokeStyle = '#FFBE04'
  
        // 设置字号字体，Canvas 文本字号字体的默认值是 10px sans-serif，这里必须对 字号 字体 同时覆盖
        let family = "-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', STHeiti, 'Microsoft Yahei', Tahoma, Simsun, sans-serif"
        ctx.font = `${this.fontSize} ${family}`
  
        // 注意，开始画的位置是从0°角的位置开始画的。也就是水平向右的方向。
        // 画具体内容
        for (let i = 0; i < prizeCount; i++) {
          // 当前角度
          let angle = i * baseAngle
          // console.log('当前角度', angle)
  
          // 开始画内容
          ctx.beginPath()
  
          // 开始画圆弧
          // context.arc(x, y, ratius, startAngle, endAngle, anticlockwise)
          // x => 圆弧对应的圆心横坐标 x
          // y => 圆弧对应的圆心横坐标 y
          // radius => 圆弧的半径大小
          // startAngle => 圆弧开始的角度，单位是弧度
          // endAngle => 圆弧结束的角度，单位是弧度
          // anticlockwise(可选) => 绘制方向，true 为逆时针，false 为顺时针
          let outsideRadius = canvasW / 2
          let insideRadius = 20
          ctx.arc(canvasW * 0.5, canvasH * 0.5, outsideRadius, angle, angle + baseAngle, false)
          ctx.arc(canvasW * 0.5, canvasH * 0.5, insideRadius, angle + baseAngle, angle, true)
          // 开始链接线条
          ctx.stroke()
          // 每个奖品区块背景填充颜色
          ctx.fillStyle = this.colors[i % 2]
          // 填充颜色
          ctx.fill()
          // 保存当前画布的状态
          ctx.save()
  
          // 开始绘制奖品内容
          ctx.fillStyle = this.fontColor
          let rewardName = this.strLimit(this.prizeList[i][this.strKey])
  
          // translate方法重新映射画布上的 (0,0) 位置
          let translateX = canvasW * 0.5 + Math.cos(angle + baseAngle / 2 ) * this.textRadius
          let translateY = canvasH * 0.5 + Math.sin(angle + baseAngle / 2) * this.textRadius
          ctx.translate(translateX, translateY)
  
          // rotate方法旋转当前的绘图，因为文字是和当前扇形中心线垂直的
          ctx.rotate(angle + (baseAngle / 2 ) + (Math.PI / 2))
  
          // 设置文本位置并处理换行
          // console.log('原始文本', rewardName)
          if (rewardName.length > this.strLineLength && this.strLineLength !== 0) {
            rewardName = rewardName.substring(0, this.strLineLength) + ',' + rewardName.substring(this.strLineLength)
            let rewardNames = rewardName.split(',')
            // console.log('多行文本', rewardNames)
            for (let j = 0; j < rewardNames.length; j++) {
              if (ctx.measureText(rewardNames[j]).width) {
                ctx.fillText(rewardNames[j], -ctx.measureText(rewardNames[j]).width / 2, j * this.lineHeight)
              } else {
                this.measureText = rewardNames[j]
                await this.$nextTick()
                let textWidth = await this.getTextWidth()
                ctx.fillText(rewardNames[j], -textWidth / 2, j * this.lineHeight)
                // console.log(rewardNames[j], textWidth, i)
              }
            }
          } else {
            if (ctx.measureText(rewardName).width) {
              ctx.fillText(rewardName, -ctx.measureText(rewardName).width / 2, 0)
            } else {
              this.measureText = rewardName
              await this.$nextTick()
              let textWidth = await this.getTextWidth()
              ctx.fillText(rewardName, -textWidth / 2, 0)
              // console.log(rewardName, textWidth, i)
            }
          }
          // 还原画板的状态到上一个save()状态之前
          ctx.restore()
        }
        ctx.draw()
      },
      // 兼容 app 端不支持 ctx.measureText
      getTextWidth () {
        return new Promise((resolve, reject) => {
          uni.createSelectorQuery().in(this).select('.raffle-wheel__measureText').fields({
            size: true,
          }, (res) => {
            resolve(res.width)
          }).exec()
        })
      },
      // 处理文字溢出
      strLimit (value) {
        let maxLength = this.strMaxLength
        if (!value || !maxLength) return value
        return value.length > maxLength ? value.slice(0, maxLength - 1) + '...' : value
      }
    },
    mounted () {
      this.$nextTick(() => {
      	setTimeout(() => {
      		this.drawWheelCanvas()
          this.transitionDuration = this.duration
      	}, 50)
      })
    }
  }
</script>

<style lang="scss" scoped>
  $actionBgUrl: '~static/raffle-wheel/raffle-wheel__action';
  .raffle-wheel {
    position: relative;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 240px;
    height: 240px;
  }
  .raffle-wheel__canvas {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 238px;
    height: 238px;
    transition: transform cubic-bezier(.34,.12,.05,.95);
  }
  .raffle-wheel__action {
    position: absolute;
    top: calc(50% - 58px);
    left: calc(50% - 58px);
    width: 114px;
    height: 114px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    background-image: url($actionBgUrl + ".png");
    @media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2) {
      background-image: url($actionBgUrl + "@2x.png");
    }
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
      background-image: url($actionBgUrl + "@3x.png");
    }
  }
  .raffle-wheel__measureText {
    position: absolute;
    left: 0;
    top: 0;
    white-space: nowrap;
    font-size: 12px;
    opacity: 0;
  }
</style>
