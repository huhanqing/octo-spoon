<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="food">
      <div class="content">
        <div class="food-content">
          <div class="img-wrapper">
            <img class="img" :src="food.image" >
            <i class="icon-arrow_lift" @click="hide"></i>
          </div>
          <div class="content">
            <span class="title">{{food.name}}</span>
            <div class="detail">
              <span class="sell-count">月售{{food.sellCount}}份</span>
              <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
              <span class="now-price">￥{{food.price}}</span>
              <span class="old-price" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
            </div>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food"></cartcontrol>
          </div>
          <div class="add" v-show="!food.count || food.count===0" @click="add" ref="add">
            加入购物车
          </div>
        </div>
        <split></split>
        <div class="introduce" v-show="food.info">
          <span class="introduce-title">商品介绍</span>
          <span class="introduce-content">{{food.info}}</span>
        </div>
        <split v-show="food.info"></split>
        <div class="ratings">
          <span class="title">商品评价</span>
          <ratingselect @toggle="toggle" @select='selectRating' :ratings="food.ratings" :selectType="selectType" :onlyContent="onlyContent" :desc="desc"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings"
                  class="rating-item border-1px">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar">
                </div>
                <div class="time">{{rating.rateTime | format}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>

      </div>
    </div>
  </transition>

</template>

<script type="text/ecmascript-6">
  import cartcontrol from '../cartcontrol/cartcontrol'
  import ratingselect from '../ratingselect/Ratingselect'
  import Vue from 'vue'
  import {formatDate} from '../../common/js/date'
  import BScroll from 'better-scroll'
  import split from '../split/Split'
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

    export default {
      name: "food",
      props:{
          food:{

          }
      },
      data(){
          return{
            showFlag:false,
            selectType:ALL,
            onlyContent:true,
            desc:{
              ALL : '全部',
              POSITIVE : '推荐',
              NEGATIVE : '吐槽'
            }
          }
      },
      methods:{
          show(){
            this.showFlag = true;
            this.selectType = ALL;
            this.onlyContent = true;
            this.$nextTick(() => {
              // 用berter-scroll一定要在this.$nextTick中使用
              if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.food, {
                  click: true
                });
                console.log(this.scroll )
              } else {
                this.scroll.refresh();
              }
            });
          },
          hide(){
            this.showFlag = false
          },
          add(){
            if(!this.food.count){
              Vue.set(this.food,'count',1)
            }
            this.food.count = 1
          },
          selectRating(type){
            this.selectType = type;
            this.$nextTick(() => {
              this.scroll.refresh();
            });
          },
          toggle(){
            this.onlyContent = !this.onlyContent;
            this.$nextTick(() => {
              this.scroll.refresh();
            });
          },
          needShow(type, text) {
            if (this.onlyContent && !text) {
              return false;
            }
            if (this.selectType === ALL) {
              return true;
            } else {
              return type === this.selectType;
            }
          },
      },
      filters: {
        format(time) {
          let date = new Date(time);
          return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
      },
      components:{
        cartcontrol,
        split,
        ratingselect
      },

    }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/icon.css"
  @import "../../common/stylus/mixin.styl"

  .move-enter-active, .move-leave-active
    transition: all 0.5s linear
  .move-enter, .move-leave-active
    transform translate3d(100%,0,0)
  .food
    position fixed
    left 0
    top 0
    bottom 48px
    width 100%
    z-index 7
    background #fff
    .food-content
      position relative
      .img-wrapper
        position relative
        width 100%
        height 0
        padding-top 100%
        /*padding 100% 是相对宽去计算的 此处heighe为0 上内边距为宽的值 以达到高和宽一致的效果*/
        .img
          position absolute
          left 0
          top 0
          height 100%
          width 100%
        .icon-arrow_lift
          position fixed
          display inline-block
          padding 10px
          font-size 20px
          top 10px
          left 10px
          color #fff
      .content
        display flex
        flex-direction column
        padding 18px
        .title
          font-size 14px
          line-height 14px
          font-weight 700
          color rgb(7,17,27)
        .detail
          margin-top 8px
          margin-right 12px
          font-size 10px
          line-height 10px
          color rgb(147,153,159)
        .price
          margin-top 18px
          .now-price
            font-size 14px
            color rgb(240,20,20)
          .old-price
            font-size 10px
            line-height 24px
            text-decoration line-through
            color rgb(147,153,159)
      .cartcontrol-wrapper
        position absolute
        right 12px
        bottom 12px
      .add
        position absolute
        right 18px
        bottom 18px
        height 24px
        line-height 24px
        z-index 1
        font-size 10px
        border-radius 12px
        color #fff
        background rgb(0,160,220)
        padding 0 12px
        box-sizing border-box
    .introduce
      padding 18px
      .introduce-title
        display block
        font-size 14px
        line-height 14px
        font-weight 700
        color rgb(7,17,27)
      .introduce-content
        display block
        font-size 12px
        line-height 28px
        font-weight 200
        color rgb(77,85,93)
        margin-top 6px
        margin-left 8px
    .ratings
      padding 18px
      .title
        display inline-block
        line-height 14px
        font-size 14px
        color rgb(7,17,27)
      .rating-wrapper
        padding: 0 18px
      .rating-item
        position: relative
        padding: 16px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .user
          position: absolute
          right: 0
          top: 16px
          line-height: 12px
          font-size: 0
          .name
            display: inline-block
            margin-right: 6px
            vertical-align: top
            font-size: 10px
            color: rgb(147, 153, 159)
          .avatar
            border-radius: 50%
        .time
          margin-bottom: 6px
          line-height: 12px
          font-size: 10px
          color: rgb(147, 153, 159)
        .text
          line-height: 16px
          font-size: 12px
          color: rgb(7, 17, 27)
          .icon-thumb_up, .icon-thumb_down
            margin-right: 4px
            line-height: 16px
            font-size: 12px
          .icon-thumb_up
            color: rgb(0, 160, 220)
          .icon-thumb_down
            color: rgb(147, 153, 159)

      .no-rating
        padding: 16px 0
        font-size: 12px
        color: rgb(147, 153, 159)
</style>
