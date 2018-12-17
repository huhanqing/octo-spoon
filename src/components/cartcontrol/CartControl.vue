<template>
    <div class="cartcontrol">
      <transition name="move">
        <div class="cart-decrease" v-show="food.count>0" @click.stop="decreaseCart">
          <div class="inner icon-remove_circle_outline"></div>
        </div>
      </transition>

      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add icon-add_circle" @click.stop="addCart"></div>
    </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
    export default {
        name: "cartcontrol",
        props:{
          food:{

          }
        },
        methods:{
          addCart(event){
            if(!event._constructed){
              return
            }
            if(!this.food.count){
              Vue.set(this.food,'count',1)
              /*在vue中给对象添加属性用set方法*/
            }
            else {
              this.food.count ++
            }
            // this.$emit('add', event.target);
            // 触发父组件的自定义事件，参数为addCart的事件源节点
          },
          decreaseCart(event){
            if(!event._constructed){
              return
            }
            if (this.food.count) {
              this.food.count--;
            }
          }

        }
    }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/icon.css"

  .cartcontrol
    font-size 0
    .cart-decrease
      display inline-block
      padding 6px
      /*通过padding增加可点击区域*/
      transform translate3d(0,0,0)
      .inner
        line-height 24px
        font-size 24px
        color rgb(0,160,220)
        transition: all 0.4s linear
        transform: rotate(0)
      &.move-enter-active,&.move-leave-active
        transition: all .4s linear
      &.move-enter,&.move-leave-active
        transform translate3d(24px,0,0)
        opacity: 0
        .inner
          transform rotate(180deg)
    .cart-count
      display inline-block
      vertical-align top
      width 12px
      padding-top 6px
      line-height 24px
      font-size 10px
      text-align center
      color rgb(147,153,159)
    .cart-add
      display inline-block
      padding 6px
      /*通过padding增加可点击区域*/
      line-height 24px
      font-size 24px
      color rgb(0,160,220)
</style>
