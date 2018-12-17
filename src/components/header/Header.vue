<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="img"><img width="64" height="64" :src="seller.avatar"></div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          <span>{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
        </div>
        <div class="supports">
          <div v-if="seller.supports">
            <span class="icon" :class="classData[seller.supports[0].type]"></span>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>

        </div>
      </div>
      <div class="content-more" @click="showDetails">
        <div v-if="seller.supports">
          <span class="count">{{seller.supports.length}}个</span><i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
    </div>
    <div class="inform-wrapper" @click="showDetails">
      <span class="inform-img"></span>
      <span class="inform-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div v-show="details" class="details" >
        <div class="details-wrapper clearfix" >
          <div class="details-main">
            <span class="details-name">{{seller.name}}</span>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="details-bar">
              <div class="line"></div>
              <span class="details-text">优惠信息</span>
              <div class="line"></div>
            </div>
            <div class="details-title">
              <ul v-if="seller.supports">
                <li v-for="(item,key) in classData" class="details-title-li">
                  <span class="details-title-icon" :class="classData[seller.supports[key].type]"></span>
                  <span class="details-title-text">{{seller.supports[key].description}}</span>
                </li>
              </ul>
            </div>
            <div class="details-bar">
              <div class="line"></div>
              <span class="details-text">商家公告</span>
              <div class="line"></div>
            </div>
            <div class="details-details">
              <span class="details-details-text">{{seller.bulletin}}</span>
            </div>
          </div>

        </div>
        <div class="details-close">
          <i class="icon-close" @click="hideDetails"></i>
        </div>
      </div>
    </transition>

  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star'

  export default {
    data(){
      return{
        details:false,
        // classData:[
        //   'decrease',
        //   'discount',
        //   'special',
        //   'invoice',
        //   'guarantee'
        // ]
      }
    },
    components:{
      star
    },
    props:[
      'seller'
    ],
    methods:{
      showDetails:function () {
        this.details = true
      },
      hideDetails:function () {
        this.details = false
      }
    },
    created(){
      this.classData=[
        'decrease',
        'discount',
        'special',
        'invoice',
        'guarantee'
      ]
    }

  }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/icon.css"
  @import "../../common/stylus/base.styl"
  .header
    position relative
    background-color rgba(7,17,27,0.5)
    overflow hidden
    .content-wrapper
      position  relative
      padding 24px 12px 18px 24px
      .img
        display inline-block
        border-radius 2px
      .content
        display inline-block
        vertical-align top
        margin-left 16px
        .title
          margin 2px 0 8px 0
          .brand
            display inline-block
            vertical-align top
            width 30px
            height 18px
            bg-img('brand')
            background-size 30px 18px
            background-repeat no-repeat
          .name
            display inline-block
            font-size 16px
            color rgb(255,255,255)
            font-weight bold
            line-height 18px
            margin-left 6px
        .description
          font-size 12px
          color rgb(255,255,255)
          line-height 12px
          font-weight 200
          margin-bottom 10px
        .supports
          .icon
            display inline-block
            vertical-align top
            width 12px
            height 12px
            background-size 12px 12px
            background-repeat no-repeat
            &.decrease
              bg-img('decrease_1')
            &.discount
              bg-img('discount_1')
            &.guarantee
              bg-img('guarantee_1')
            &.invoice
              bg-img('invoice_1')
            &.special
              bg-img('special_1')
          .text
            display inline-block
            vertical-align top
            font-size 10px
            color rgb(255,255,255)
            line-height 12px
            font-weight 200
      .content-more
        position absolute
        right 12px
        bottom 18px
        height 24px
        border-radius 14px
        background-color rgba(0,0,0,0.2)
        text-align center
        line-height 18px
        width 45px
        .count
          vertical-align center
          font-size 10px
          line-height 12px
          color rgb(255,255,255)
          font-weight 200
        .icon-keyboard_arrow_right
          font-size 10px
    .inform-wrapper
      height 28px
      line-height 28px
      padding 0 12px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      background-color rgba(7,17,27,0.2)
      .inform-img
        display inline-block
        height 12px
        width 22px
        bg-img('bulletin')
        background-size 22px 12px
        background-repeat no-repeat
      .inform-text
        vertical-align top
        margin-top 7px
        font-size 10px
        color rgb(255,255,255)
        font-weight 200
        line-height 28px
      .icon-keyboard_arrow_right
        font-size 10px
    .background
      position absolute
      top 0
      left 0
      height 100%
      width 100%
      z-index -1
      filter blur(10px)
    .fade-enter-active
      transition: all 0.5s
    .fade-enter
      opacity: 0
      background rgba(7,17,27,0)
    .fade-leave-to
      opacity: 1
      background rgba(7,17,27,0.8)

    .details
      position fixed
      height 100%
      width 100%
      top 0
      left 0
      background rgba(7,17,27,0.8)
      overflow auto
      z-index 102
      backdrop-filter blur(10px)
      .details-wrapper
        width 100%
        min-height 100%
        .details-main
          display flex
          flex-direction column
          justify-content center
          margin 64px 36px 18px 36px
          padding-bottom 64px
          .details-name
            text-align center
            color rgb(255,255,255)
            font-size 16px
            font-weight 700
            line-height 16px
          .star-wrapper
            margin-top 16px
            text-align center
          .details-bar
            display flex
            flex-direction row
            justify-content space-around
            margin-top 28px
            margin-bottom 28px
            .line
              width 34%
              height 2px
              margin-top 7px
              background-color rgba(255,255,255,0.5)
            .details-text
              font-size 14px
              line-height 14px
              font-weight 700
              color rgb(255,255,255)
          .details-title
            padding-left 12px
            .details-title-li
              margin-bottom 12px
              .details-title-icon
                display inline-block
                height 16px
                width 16px
                background-size 16px 16px
                background-repeat no-repeat
                &.decrease
                  bg-img('decrease_2')
                &.discount
                  bg-img('discount_2')
                &.guarantee
                  bg-img('guarantee_2')
                &.invoice
                  bg-img('invoice_2')
                &.special
                  bg-img('special_2')
              .details-title-text
                vertical-align text-top
                font-size 12px
                line-height 12px
                font-weight 200
                color rgb(255,255,255)
                margin-left 6px
          .details-details
            padding-left 12px
            padding-right 12px
            .details-details-text
              font-size 12px
              line-height 24px
              font-weight 200
              color rgb(255,255,255)
      .details-close
        margin -64px auto 0 auto
        height 32px
        width 32px
        font-size 32px
        color rgba(255,255,255,0.5)

</style>
