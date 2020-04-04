<template>
  <div class="calender-wrap">
    <div class="nav">
      <h1>Calender Sample</h1>
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
            <p>{{getHoliday(getCalenderDate(firstDay, (i+7*(numOfRow-1)-1)))}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import holidaysJp from '@holiday-jp/holiday_jp'
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
      const day = this.target.getDay() === 0 ? -5 : 2 - this.target.getDay()
      return new Date(this.target.getFullYear(), this.target.getMonth(), day)
    },

    /**
     *  カレンダーに表示する範囲の日付の祝日リスト
     */
    holidays: function () {
      return holidaysJp.between(
        this.firstDay,
        new Date(
          this.firstDay.getFullYear(),
          this.firstDay.getMonth(),
          this.firstDay.getDate() + 40
        )
      )
    }
  },
  methods: {
    /**
     * カレンダーに表示されるdateオブジェクトを取得する
     * @param {date} targetFitstDay カレンダーの左上に表示する基準となるdateオブジェクト
     * @param {number} add 戻り値に追加する日付
     */
    getCalenderDate: function (targetFirstDay, add) {
      const date = new Date(targetFirstDay)
      date.setDate(date.getDate() + add)
      return date
    },

    /**
     * カレンダーに表示するdateオブジェクトの月を指定する
     * @param {date} 指定する年月のdeteオブジェクト
     */
    selectTargetDate: function (date) {
      this.target = new Date(date.getFullYear(), date.getMonth(), 1)
      console.log(this.holidays)
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
     * 引数のdateオブジェクト同士が同一の年月日かチェックする
     * @param {date1} チェック対象のdate
     * @param {date2} チェック対象のdate
     */
    compareDate (date1, date2) {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      )
    },

    /**
     * 引数のdateオブジェクトの日付がthis.hodidaysのDateに含まれているかチェックする
     * 含まれている場合は休日の名称を文字列で返す
     * @param {date} チェック対象のdate
     */
    getHoliday (targetDate) {
      const match = this.holidays.find(({ date }) =>
        this.compareDate(date, targetDate)
      )
      return match ? match.name : null
    },

    /**
     * 引数のdateオブジェクトの日に合致するクラスを返す
     * @param {date} チェック対象のdate
     */
    addStyleToDate (date) {
      const value = []
      if (this.checkThisMonth(date)) value.push('this-month')
      if (this.compareDate(date, this.today)) value.push('today')
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
.nav h1 {
  font-size: 22px;
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
  padding: 5px;
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
  line-height: 20px;
}
.this-month {
  color: #545454;
}
.today span {
  width: 20px;
  height: 20px;
  color: white;
  display: inline-block;
  border-radius: 50%;
  background-color: #9dc6a7;
}
</style>
