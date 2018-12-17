<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList()">
        <div class="left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
            </div>
            <div class="count" v-show="totalCount>0">
              {{totalCount}}
            </div>
          </div>
          <div class="price" :class="{'highlight':totalCount>0}">
            <span >￥{{totalPrice}}</span>
          </div>
          <div class="distribution">
            <span>另需配送费￥{{deliveryPrice}}元</span>
          </div>
        </div>
        <div class="right" :class="payClass" @click.stop="pay">
          <!--@click.stop 阻止冒泡-->
          <span>{{payBtn}}</span>
        </div>
      </div>

      <!--<div class="ball-wrapper">-->
      <!--<div v-for="(ball,index) in balls">-->
      <!--<transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">-->
      <!--<div class="ball"  v-show="ball.show"></div>-->
      <!--</transition>-->
      <!--</div>-->
      <!--</div>-->
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <span class="title">购物车</span>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="goods" v-for="(goods,index) in selectFoods">
                <span class="name">{{goods.name}}</span>
                <div class="price">
                  <span>￥{{goods.price*goods.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="goods"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="mask">
      <div class="mask" v-show="listShow" @click="hideList"></div>
    </transition>

  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import cartcontrol from '../cartcontrol/cartcontrol'


    export default {
      props:{
          selectFoods:{
            type: Array,
            default(){
              return [
                {
                  price:22,
                  count:1
                }
              ]
            }
          },
          deliveryPrice:{
            default:0
          },
          minPrice:{
            default:0
          }
        },
      data(){
        return{
          // balls:[
          //   {
          //     show:false
          //   },
          //   {
          //     show:false
          //   },
          //   {
          //     show:false
          //   },
          //   {
          //     show:false
          //   },
          //   {
          //     show:false
          //   }
          // ],
          // dropBalls:[
          //
          // ],
          fold:true
        }
      },
      computed:{
          totalPrice(){
            let total = 0;
            for(let i=0;i<this.selectFoods.length;i++){
              total += this.selectFoods[i].price * this.selectFoods[i].count
            }
            return total
          },
          totalCount(){
            let count = 0;
            for(let i=0;i<this.selectFoods.length;i++){
              count += this.selectFoods[i].count
            }
            return count
          },
          payBtn(){
            if(this.totalPrice===0){
              return `￥${this.minPrice}起送`
            }
            else if(this.totalPrice<this.minPrice && this.totalPrice>0){
              return `还差${this.minPrice - this.totalPrice}元起送`
            }
            else {
              return `去结算`
            }

          },
          payClass(){
            if(this.totalPrice < this.minPrice){
              return 'not-enough'
            }
            else {
              return 'enough'
            }
          },
          listShow(){
            if(!this.totalCount){
              this.fold = true;
              return false;
            }
            let show = !this.fold;
            if (show) {
              this.$nextTick(() => {
                if (!this.scroll) {
                  this.scroll = new BScroll(this.$refs.listContent, {
                    click: true
                  });
                } else {
                  this.scroll.refresh();
                }
              });
            }
            return show
          }
      },
      components:{
        cartcontrol
      },
      methods:{
          // drop(el){
          //   for(let i=0;i<this.balls.length;i++){
          //     ball = this.balls[i];
          //     if(!ball.show){
          //       ball.show = true;
          //       ball.el = el;
          //       this.dropBalls.push(ball);
          //       return
          //     }
          //   }
          // },
          // beforeDrop(el) {
          //   let count = this.balls.length;
          //   while (count--) {
          //     let ball = this.balls[count];
          //     if (ball.show) {
          //       let rect = ball.el.getBoundingClientRect();
          //       let x = rect.left - 32;
          //       let y = -(window.innerHeight - rect.top - 22);
          //       el.style.display = '';
          //       el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          //       el.style.transform = `translate3d(0,${y}px,0)`;
          //       let inner = el.getElementsByClassName('inner-hook')[0];
          //       inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          //       inner.style.transform = `translate3d(${x}px,0,0)`;
          //     }
          //   }
          // },
          // dropping(el, done) {
          //   let rf = el.offsetHeight;
          //   // 强制使浏览器重绘
          //   this.$nextTick(() => {
          //     el.style.webkitTransform = 'translate3d(0,0,0)';
          //     el.style.transform = 'translate3d(0,0,0)';
          //     let inner = el.getElementsByClassName('inner-hook')[0];
          //     inner.style.webkitTransform = 'translate3d(0,0,0)';
          //     inner.style.transform = 'translate3d(0,0,0)';
          //     el.addEventListener('transitionend', done);
          //   });
          // },
          // afterDrop(el) {
          //   let ball = this.dropBalls.shift();
          //   if (ball) {
          //     ball.show = false;
          //     el.style.display = 'none';
          //   }
          // },
          toggleList(){
            if(!this.totalCount){
              return
            }
            this.fold = !this.fold;
          },
          empty(){
            for(let i=0;i<this.selectFoods.length;i++){
              this.selectFoods[i].count = 0
            }
          },
          hideList(){
            this.fold = true;
          },
          pay(){
            if(this.totalPrice < this.minPrice){
              return
            }
            window.alert(`成功支付${this.totalPrice}元`)
          }
      }
    }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/icon.css"
  @import "../../common/stylus/mixin.styl"
  .shopcart
    position fixed
    left 0
    bottom 0
    width 100%
    height 48px
    z-index 9
    .content
      display flex
      .left
        flex 1
        background #141d27
        .logo-wrapper
          display inline-block
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          vertical-align top
          border-radius 50%
          background #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            text-align center
            background #2b342c
            &.highlight
              background rgb(0,160,220)
            .icon-shopping_cart
              font-size 24px
              color #80858a
              line-height 44px
              &.highlight
                color #fff
          .count
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color #fff
            background rgb(240,20,20)
            box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
        .price
          display inline-block
          vertical-align top
          line-height 24px
          margin-top 12px
          padding-right 12px
          box-sizing border-box
          border-right 1px solid rgba(255,255,255,0.1)
          font-size 16px
          font-weight 700
          color rgba(255,255,255,0.4)
          &.highlight
            color #fff
        .distribution
          display inline-block
          vertical-align top
          line-height 24px
          margin 12px 0 0 12px
          font-size 10px
          font-weight 700
          color rgba(255,255,255,0.4)
      .right
        flex 0 0 105px
        width 105px
        height 48px
        line-height 48px
        text-align center
        font-size 12px
        font-weight 700
        color rgba(255,255,255,0.4)
        &.not-enough
          background #2b333b
        &.enough
          background #00b43c
          color #fff
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform: translate3d(0, -100%, 0)
      &.fold-enter-active, &.fold-leave-active
        transition: all 0.5s
      &.fold-enter, &.fold-leave-active
        transform: translate3d(0, 0, 0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)
      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .goods
          position: relative
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px
  .mask
    position fixed
    width 100%
    height 100%
    left 0
    top 0
    z-index 8
    -webkit-backdrop-filter blur(10px)
    background: rgba(7, 17, 27, 0.6)
    &.mask-enter-active, &.mask-leave-active
      transition: all 0.5s
    &.mask-enter, &.mask-leave-active
      opacity: 0
      background: rgba(7, 17, 27, 0)
    /*.ball-wrapper
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear*/
</style>
