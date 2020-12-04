<template>
  <view class="home">
    <view class="home-title">
      <text class="home-title__text">raffle-wheel</text>
    </view>
    <view class="home-wheel">
      <raffle-wheel
        ref="raffleWheel"
        :prizeList="prizeList"
        strKey="name"
        @actionStart="handleActionStart"
        @actionEnd="handleActionEnd"
      />
    </view>
    <view class="home-result">
      <text class="home-result__text">{{ targetName }}</text>
    </view>
  </view>
</template>

<script>
  import RaffleWheel from '@/components/raffle-wheel/raffle-wheel.vue'
  export default {
    name: 'Home',
    components: {
      RaffleWheel
    },
    data () {
      return {
        // 奖品数据
        prizeList: [
          { name: '0.1元现金奖', count: 10 },
          { name: '10元现金奖', count: 0 },
          { name: '5元话费', count: 1 },
          { name: '50元现金奖', count: 0 },
          { name: '1卷抽纸', count: 3 },
          { name: '0.02元现金奖', count: 8 },
          { name: '50金币', count: 4 },
          { name: '100金币', count: 0 }
        ],
        // 中奖下标
        targetIndex: 0,
        // 中奖类目名称
        targetName: ''
      }
    },
    methods: {
      // 本次抽奖开始
      handleActionStart () {
        // 模拟请求
        setTimeout(() => {
          // 随机一个下标获奖
          this.targetIndex = Math.floor(Math.random() * this.prizeList.length)
          console.log('中奖商品 =>', this.prizeList[this.targetIndex].name)
          console.log('商品数量 =>', this.prizeList[this.targetIndex].count)
          // 开始执行旋转定位
          this.$refs.raffleWheel.handleStartRotate(this.targetIndex)
        }, 200)
      },
      // 本次抽奖结束
      handleActionEnd () {
        console.log('旋转结束，执行拿到结果后到逻辑')
        this.targetName = '恭喜您，获得 ' + this.prizeList[this.targetIndex].name
      }
    }
  }
</script>

<style lang="scss" scoped>
  $wheelBgUrl: '~static/raffle-wheel/raffle-wheel__bg';
  .home {
    padding: 50px 0;
  }
  .home-title {
    text-align: center;
    margin-bottom: 50px;
  }
  .home-title__text {
    color: #000;
    font-size: 40px;
    font-weight: bold;
  }
  .home-wheel {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 280px;
    height: 280px;
    margin: 0 auto;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    background-image: url($wheelBgUrl + ".png");
    @media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2) {
      background-image: url($wheelBgUrl + "@2x.png");
    }
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
      background-image: url($wheelBgUrl + "@3x.png");
    }
  }
  .home-result {
    text-align: center;
    margin-top: 50px;
  }
  .home-result__text {
    color: #000;
    font-size: 20px;
    font-weight: bold;
  }
</style>
