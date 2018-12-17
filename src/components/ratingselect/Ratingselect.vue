<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span @click="select(2)" class="block all" :class="{'active':selectType===2}">{{desc.ALL}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0)" class="block positive" :class="{'active':selectType===0}">{{desc.POSITIVE}}<span class="count">{{positives.length}}</span></span>
      <span @click="select(1)" class="block negative" :class="{'active':selectType===1}">{{desc.NEGATIVE}}<span class="count">{{negative.length}}</span></span>
  </div>
    <div class="switch" @click="toggle">
      <i class="icon-check_circle" :class="{'on':onlyContent===true}"></i>
      <!--动态绑定类名 当onlyContent为true时-->
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;


  export default {
      name: "ratingselect",
      props:{
        ratings:{
          type:Array,
          default(){
            return []
          }
        },
        selectType:{
          type: Number,
          default(){
            return ALL
          }
        },
        onlyContent:{
          type: Boolean,
          default : false
        },
        desc:{
          type: Object,
          default(){
            return {
              ALL : '全部',
              POSITIVE : '满意',
              NEGATIVE : '不满意'
            }
          }
        }
      },
      computed:{
        positives(){
          let arr = [];
          for(let i=0;i<this.ratings.length;i++){
            if(this.ratings[i].rateType===POSITIVE){
              arr.push(this.ratings[i])
            }
          }
          return arr
        },
        negative(){
          let arr = [];
          for(let i=0;i<this.ratings.length;i++){
            if(this.ratings[i].rateType===NEGATIVE){
              arr.push(this.ratings[i])
            }
          }
          return arr
        }
      },
      methods:{
        select(type){
          this.$emit('select',type)
        },
        toggle(){
          this.$emit('toggle')
        }
      }
  }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/icon.css"
  @import "../../common/stylus/mixin.styl"

  .ratingselect
    .rating-type
      padding 18px
      border-1px(rgba(7,17,27,0.1))
      font-size 0
      .block
        display inline-block
        padding 8px 12px
        margin-right 8px
        border-radius 1px
        font-size 12px
        color rgb(77,85,93)

        &.active
          color #fff
        .count
          font-size 8px
          margin-left 2px
          line-height 16px
        &.all
          background rgba(0,160,220,0.2)
          &.active
            background rgb(0,160,220)
        &.positive
          background rgba(0,160,220,0.2)
          &.active
            background rgb(0,160,220)
        &.negative
          background rgba(77,85,93,0.2)
          &.active
            background rgb(77,85,93)
    .switch
      padding 12px 18px
      line-height 24px
      border-bottom 1px solid rgba(7,17,27,0.1)
      color rgb(147,153,159)
      font-size 0
      .on
        &.icon-check_circle
          color #00c850
      .icon-check_circle
        display inline-block
        vertical-align top
        margin-right 4px
        font-size 24px
      .text
        display inline-block
        vertical-align top
        font-size 12px

</style>
