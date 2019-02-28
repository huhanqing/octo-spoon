<template>
    <div class="ratings" ref="ratings">
      <div class="ratings-content">
        <div class="overview">
          <div class="overview-left">
            <div class="score">{{seller.score}}</div>
            <div class="title">综合评分</div>
            <div class="rank">高于周边商家{{seller.rankRate}}%</div>
          </div>
          <div class="overview-right">
            <div class="score-wrapper">
              <span class="title">服务态度</span>
              <star :size="36" :score="seller.serviceScore"></star>
              <span class="score">{{seller.serviceScore}}</span>
            </div>
            <div class="score-wrapper">
              <span class="title">商品评分</span>
              <star :size="36" :score="seller.foodScore"></star>
              <span class="score">{{seller.foodScore}}</span>
            </div>
            <div class="delivery-wrapper">
              <span class="title">送达时间</span>
              <span class="delivery">{{seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
        <split></split>
        <ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings"></ratingselect>
        <div class="rating-wrapper">
          <ul>
            <li v-for="(rating,key) in ratings" v-show="needShow(rating.rateType, rating.text)" class="rating-item">
              <div class="avatar">
                <img width="28" height="28" :src="rating.avatar">
              </div>
              <div class="content">
                <span class="name">{{rating.username}}</span>
                <div class="star-wrapper">
                  <star :size="24" :score="rating.score"></star>
                  <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                </div>
                <span class="text">{{rating.text}}</span>
                <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                  <span class="icon-thumb_up"></span>
                  <span class="item" v-for="item in rating.recommend">{{item}}</span>
                </div>
                <div class="time">
                  {{rating.rateTime | formatDate}}
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!--<shopcart></shopcart>-->
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import star from '../star/star'
  import split from '../split/split'
  import ratingselect from '../ratingselect/ratingselect'
  import {formatDate} from 'common/js/date';
  // import shopcart from '../shopcart/shopcart'

  const ALL = 2;
  const ERR_OK = 0;

    export default {
        name: "ratings",
        props:{
          seller:{
            type:Object
          }
        },
        data(){
          return{
            ratings:[],
            showFlag : true,
            selectType : ALL,
            onlyContent : true
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
                this.scroll = new BScroll(this.$refs.ratings, {
                  click: true
                });
                console.log(this.scroll )
              } else {
                this.scroll.refresh();
              }
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
          selectRating(type) {
            this.selectType = type;
            this.$nextTick(() => {
              this.scroll.refresh();
            });
          },
          toggleContent() {
            this.onlyContent = !this.onlyContent;
            this.$nextTick(() => {
              this.scroll.refresh();
            });
          }
        },
        created(){
          this.$http.get('/api/ratings').then(response => {
            //使用this.$http.get('请求地址')来发送请求,与后端数据交互
            response = response.body;
            if(response.errno === ERR_OK){
              //检查是否成功拿到字段
              this.ratings = response.data;
              this.$nextTick(()=>{
                this.scroll = new BScroll(this.$refs.ratings, {
                  click: true
                });
              });
            }
          }, response => {
            // error callback
          })
        },
        filters: {
          formatDate(time) {
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
          }
        },
        components:{
          star,
          split,
          ratingselect
          // shopcart
        }
    }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/icon.css"


  .ratings
    position absolute
    top 174px
    bottom 0
    left 0
    width 100%
    overflow hidden
    .ratings-content
      .overview
        display flex
        padding 18px 0
        .overview-left
          flex 0 0 137px
          padding 6px 0
          width 137px
          border-right 1px solid rgba(7,17,27,0.1)
          text-align center
          @media only screen and (max-width: 320px)
            /*媒体查询，only(限定某种设备)，当屏幕的宽度小于320px时使用以下样式*/
            flex: 0 0 120px
            width: 120px
          .score
            margin-bottom 6px
            font-size 24px
            line-height 28px
            color rgb(255,153,0)
          .title
            margin-bottom 8px
            font-size 12px
            line-height 12px
            color rgb(7,17,27)
          .rank
            padding-bottom 6px
            font-size 10px
            line-height 10px
            color rgb(147,153,159)
        .overview-right
          flex 1
          padding 6px 0 6px 24px
          @media only screen and (max-width: 320px)
            padding-left: 6px
          .score-wrapper
            margin-bottom 8px
            font-size 0
            .title
              display inline-block
              line-height 18px
              vertical-align top
              font-size 12px
              color rgb(7, 17, 27)
            .star
              display inline-block
              margin 0 12px
              vertical-align top
            .score
              display inline-block
              line-height 18px
              vertical-align top
              font-size 12px
              color rgb(255, 153, 0)
          .delivery-wrapper
            font-size 0
            .title
              line-height 18px
              font-size 12px
              color rgb(7, 17, 27)
            .delivery
              margin-left 12px
              font-size 12px
              color rgb(147, 153, 159)
      .rating-wrapper
        padding 0 18px
        .rating-item
          display flex
          padding 18px 0
          border-1px(rgba(7, 17, 27, 0.1))
          .avatar
            flex 0 0 28px
            width 28px
            margin-right 12px
            img
              border-radius 50%
          .content
            position relative
            flex 1
            .name
              margin-bottom 4px
              line-height 12px
              font-size 10px
              color rgb(7, 17, 27)
            .star-wrapper
              margin-bottom 6px
              font-size 0
              .star
                display inline-block
                margin-right 6px
                vertical-align top
              .delivery
                display inline-block
                vertical-align top
                line-height 12px
                font-size 10px
                color rgb(147, 153, 159)
            .text
              margin-bottom 8px
              line-height 18px
              color rgb(7, 17, 27)
              font-size 12px
            .recommend
              line-height 16px
              font-size 0
              .icon-thumb_up, .item
                display inline-block
                margin 0 8px 4px 0
                font-size 9px
              .icon-thumb_up
                color rgb(0, 160, 220)
              .item
                padding 0 6px
                border 1px solid rgba(7, 17, 27, 0.1)
                border-radius 1px
                color rgb(147, 153, 159)
                background #fff
            .time
              position absolute
              top 0
              right 0
              line-height 12px
              font-size 10px
              color rgb(147, 153, 159)
</style>
