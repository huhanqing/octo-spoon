<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,key) in goods" class="menu-li" :class="{'current':currentIndex===key}" @click="selectMenu(key,$event)">
          <span class="menu-text border-1px"><span class="menu-icon" v-show="item.type > 0" :class="classData[item.type]"></span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="goods-wrapper" ref="goodsWrapper">
      <ul>
        <li v-for="(item,key) in goods" class="goods-list border-1px" ref="goodList">
          <h1 class="goods-title">{{item.name}}</h1>
          <ul>
            <li v-for="(goodsItem,goodsKey) in item.foods" class="goods-li" @click="selectFood(goodsItem)">
              <div class="goods-icon">
                <img :src="goodsItem.icon" class="goods-icon-img">
              </div>
              <div class="goods-content">
                <h2 class="goods-content-name">{{goodsItem.name}}</h2>
                <span class="goods-content-text ">{{goodsItem.description}}</span>
                <div class="goods-sellCount">
                  <span class="goods-content-text">月售{{goodsItem.sellCount}}份</span>
                  <span class="goods-content-text goods-content-text1" v-show="goodsItem.rating">好评率{{goodsItem.rating}}%</span>
                </div>
                <div>
                  <span class="goods-price">￥{{goodsItem.price}}</span>
                  <span class="goods-oldPrice" v-show="goodsItem.oldPrice">￥{{goodsItem.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="goodsItem"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>

        </li>
        <li></li>
      </ul>
    </div>
    <food :food="selectedFood" ref="showFlag"></food>
    <shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import shopcart from '../shopcart/ShopCart'
  import cartcontrol from '../cartcontrol/cartcontrol'
  import food from '../food/food'

  const ERR_OK = 0;
  export default {
      name: "goods",
      data(){
        return{
          goods:[],
          listHeight:[],
          scrollY:0,
          selectedFood:{

          }
        }
      },
      props:[
        'seller'
      ],
      created(){
        this.$http.get('/api/goods').then(response => {
          //使用this.$http.get('请求地址')来发送请求,与后端数据交互
          response = response.body;
          if(response.errno === ERR_OK){
            //检查是否成功拿到字段
            this.goods = response.data;
            this.$nextTick(()=>{
              this._initScroll();
              this._calculateHeight();
            })
          }
        }, response => {
          // error callback
        });
        this.classData=[
          'decrease',
          'discount',
          'special',
          'invoice',
          'guarantee'
        ]
      },
      computed:{
        currentIndex(){
          for(let i=0;i<this.listHeight.length;i++){
            let height1 = this.listHeight[i];
            let height2 = this.listHeight[i+1];
            if(!height2 || (this.scrollY>=height1 && this.scrollY<height2)){
              return i
            }
          }
          return 0
        },
        selectFoods(){
          let foods = [];
          for(let i=0;i<this.goods.length;i++){
            let temp = this.goods[i];
            for(let j=0;j<temp.foods.length;j++){
              if(temp.foods[j].count){
                foods.push(temp.foods[j])
              }
            }
          }
          return foods
        }

      },
      methods:{
        selectMenu(key, event) {
          if (!event._constructed) {
            return;
          }
          let goodList = this.$refs.goodList;
          let el = goodList[key];
          this.goodsScroll.scrollToElement(el, 300);
        },
        _initScroll(){
          this.menuScroll = new BScroll(this.$refs.menuWrapper,{
            click: true
            // better-scroll阻止了默认的事件
          });

          this.goodsScroll = new BScroll(this.$refs.goodsWrapper,{
            click: true,
            probeType: 3
          });
          this.goodsScroll.on('scroll',(pos)=>{
            if (pos.y <= 0) {
              this.scrollY = Math.abs(Math.round(pos.y))
            }
          });
        },
        _calculateHeight(){
          let goodList = this.$refs.goodList;
          let height = 0;
          this.listHeight.push(height);
          for(let i=0 ;i<goodList.length;i++){
            let item = goodList[i];
            height += item.clientHeight;
            this.listHeight.push(height)
          }
        },
        selectFood(food){
          this.selectedFood = food;
          this.$refs.showFlag.show()
        }
        // addFood(target){
        //   this._drop(target);
        // },
        // _drop(target){
        //   this.$refs.shopcart.drop(target);
        // }
      },
      components:{
        shopcart,
        cartcontrol,
        food
      }
  }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/icon.css"

  .goods
    display flex
    position absolute
    width 100%
    top 174px
    bottom 46px
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background-color #f3f5f7
      .menu-li
        display table
        height 54px
        width 56px
        padding-left 12px
        padding-right 12px
        &.current
          position relative
          margin-top -1px
          z-index 9
          background #fff
          font-weight 700
          .menu-text
            border-none()
        .menu-icon
          display inline-block
          vertical-align top
          width 12px
          height 12px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            bg-img('decrease_3')
          &.discount
            bg-img('discount_3')
          &.guarantee
            bg-img('guarantee_3')
          &.invoice
            bg-img('invoice_3')
          &.special
            bg-img('special_3')
        .menu-text
          display table-cell
          border-1px(rgba(7,17,27,0.1))
          font-size 12px
          line-height 14px
          font-weight 200
          margin-left 2px
          vertical-align middle
    .goods-wrapper
      flex 1
      .goods-list
        .goods-title
          height 26px
          padding-left 14px
          font-size 12px
          line-height 26px
          color rgb(147,153,159)
          background #f3f5f7
        .goods-li
          display flex
          margin-top  18px
          margin-left 18px
          margin-right 18px
          padding-bottom 18px
          border-1px(rgba(7,17,27,0.1))
          &:last-child
            border-none()
          .goods-icon
            margin-right 10px
            .goods-icon-img
              width 57px
              height 57px
              background-size 57px 57px
              background-repeat no-repeat
          .goods-content
            flex 1
            .goods-content-name
              margin-top 2px
              margin-bottom 8px
              font-size 14px
              line-height 14px
              color rgb(7,17,27)
            .goods-content-text
              margin-bottom 8px
              font-size 10px
              line-height 10px
              color rgb(147,153,159)
          .goods-sellCount
            margin-top 8px
            margin-bottom 8px
            .goods-content-text1
              margin-left 12px
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 12px
          .goods-price
            font-size 14px
            font-weight 700
            line-height 24px
            color rgb(240,20,20)
          .goods-oldPrice
            font-size 10px
            line-height 24px
            text-decoration line-through
            color rgb(147,153,159)

</style>
