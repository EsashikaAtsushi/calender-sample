<template>
  <div class="calender-wrap">
    <div class="nav">
      <h1>Vue Calender Sample</h1>
      <div>
        <span>{{ target.getFullYear() + "年" + (target.getMonth() + 1) + "月"}}</span>
        <button @click="shiftTargetDate(-1)">
          <i class="fas fa-angle-left"></i>
        </button>
        <button class="select-today" @click="selectTargetDate(today)">今日</button>
        <button @click="shiftTargetDate(1)">
          <i class="fas fa-angle-right"></i>
        </button>
      </div>
    </div>

    <div class="calender">
      <div class="header row">
        <div class="col" v-for="i in daysOfWeek.length" :key="i">{{daysOfWeek[i-1]}}</div>
      </div>
      <div class="body">
        <div class="row" v-for="numOfRow in numOfRows" :key="numOfRow">
          <div
            class="col"
            v-for="i in daysOfWeek.length"
            :key="i"
            :class="addStyleToDate(getCalenderDate(firstDay, (i+7*(numOfRow-1)-1)))"
          >
            <span>{{getCalenderDate(firstDay, (i+7*(numOfRow-1)-1)).getDate()}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const dtToday = new Date()
export default {
  data: function () {
    return {
      daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      numOfRows: 6,
      today: dtToday,
      target: new Date(dtToday.getFullYear(), dtToday.getMonth(), 1),
      count: 0
    }
  },
  computed: {
    /**
     *  カレンダーに表示する最初の月曜日の日付オブジェクト
     */
    firstDay: function () {
      let day
      this.target.getDay() === 0 ? (day = -5) : (day = 2 - this.target.getDay())
      return new Date(this.target.getFullYear(), this.target.getMonth(), day)
    }
  },
  methods: {
    /**
     * カレンダーに表示されるdateオブジェクトを取得する
     * @param {date} targetFitstDay カレンダーの左上に表示する基準となるdateオブジェクト
     * @param {number} add 戻り値に追加する日付
     */
    getCalenderDate: function (targetFirstDay, add) {
      let date = new Date(targetFirstDay)
      date.setDate(date.getDate() + add)
      return date
    },

    /**
     * カレンダーに表示するdateオブジェクトの月を指定する
     * @param {date} 指定する年月のdeteオブジェクト
     */
    selectTargetDate: function (date) {
      this.target = new Date(date.getFullYear(), date.getMonth(), 1)
    },

    /**
     * カレンダーに表示するdateオブジェクトの月を引数の分だけシフトする
     * @param {number} 加減算する月の数値
     */
    shiftTargetDate: function (month) {
      this.target = new Date(
        this.target.getFullYear(),
        this.target.getMonth() + month,
        1
      )
    },

    /**
     * 引数のdateオブジェクトの月がtargetDateと同月かチェックする
     * @param {date} チェック対象のdate
     */
    checkThisMonth (date) {
      return date.getMonth() === this.target.getMonth()
    },

    /**
     * 引数のdateオブジェクトの日付がtodayと同日かチェックする
     * @param {date} チェック対象のdate
     */
    checkThisDate (date) {
      return (
        (date.getFullYear() === this.today.getFullYear()) &
        (date.getMonth() === this.today.getMonth()) &
        (date.getDate() === this.today.getDate())
      )
    },

    /**
     * 引数のdateオブジェクトの日に合致するクラスを返す
     * @param {date} チェック対象のdate
     */
    addStyleToDate (date) {
      let value = []
      if (this.checkThisMonth(date)) value.push('this-month')
      if (this.checkThisDate(date)) value.push('today')
      return value.join(' ')
    }
  }
}
</script>

<style scoped>
/*
 colors pallet (https://colorhunt.co/palette/177317)
 #d1f5d3
 #9dc6a7
 #7d5e2a
 #231903
 */
.calender-wrap {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 0 2vw;
}
.nav {
  padding-bottom: 10px;
  display: flex;
  align-items: baseline;
}
.nav > div {
  margin-left: auto;
}
.nav > div > span {
  margin-right: auto;
  font-size: 22px;
}
.nav button {
  line-height: 1;
  font-size: 12px;
  font-weight: 200;
}
.nav .select-today {
  border: #bbbbbb solid 1px;
  border-radius: 5px;
  padding: 3px 5px;
}
.calender {
  font-size: 12px;
  display: flex;
  flex: 1;
  flex-direction: column;
  box-sizing: border-box;
  min-width: 600px;
  padding-bottom: 10px;
  text-align: center;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-left: solid 1px #bbbbbb;
}
.col {
  flex: 1;
  border-right: #bbbbbb solid 1px;
}
.header .col {
  padding-top: 5px;
  line-height: 1;
  border-top: #bbbbbb solid 1px;
}
.body {
  font-weight: bold;
  display: flex;
  flex: 1;
  flex-direction: column;
  color: #bbbbbb;
}
.body .row {
  flex: 1;
  min-height: 40px;
  border-bottom: #bbbbbb 1px solid;
}
.body .col {
  padding-top: 5px;
  line-height: 25px;
}
.this-month {
  color: #545454;
}
.today span {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #d1f5d3;
}
</style>
