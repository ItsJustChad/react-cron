# react-cron
UI Component to create cron jobs clone of https://github.com/shawnchin/jquery-cron

```
import ReactCron from 'react-cron';

getCronValue() {
  const cronValue = this.refs.reactCron.__value;
}

render() {
  return () {
    <ReactCron ref='reactCron' />
  }
}

```


**TODO**
1. Improve readme
2. Clean up code for getWeekComponent,getMonthComponent... merging them
3. Clean up API, making it a controlled component. (Add value/onChange parameters to control changes from outside)
4. Add styling/css

*Work in Progress*
