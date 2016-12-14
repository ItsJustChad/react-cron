import React, { Component, PropTypes } from 'react';

export default class ReactCron extends Component {
  static propTypes = {
    className: PropTypes.string
  }

  _value: '* * * * *'

  state = {
    selectedPeriod: 'minute',
    selectedHourOption: {
      min: 0
    },
    selectedDayOption: {
      hour: 3,
      min: 42
    },
    selectedWeekOption: {
      day: 5,
      hour: 3,
      min: 42
    },
    selectedMonthOption: {
      day: 1,
      hour: 3,
      min: 42
    },
    selectedYearOption: {
      day: 1,
      mon: 1,
      hour: 3,
      min: 42
    },
    periodOptions: getPeriodOptions(),
    minuteOptions: getMinuteOptions(),
    hourOptions: getHourOptions(),
    dayOptions: getDayOptions(),
    monthDaysOptions: getMonthDaysOptions(),
    monthOptions: getMonthOptions()
  }

  onPeriodSelect = () => {
    return (event) => {
      this.setState({
        selectedPeriod: event.target.value
      }, this.changeValue);
    }
  }

  onHourOptionSelect = (key) => {
    return (event) => {
      const value = event.target.value;
      const obj = {};
      obj[key] = value;
      const { selectedHourOption } = this.state;
      const hourOption = Object.assign({}, selectedHourOption, obj);
      this.setState({
        selectedHourOption: hourOption
      }, this.changeValue);
    };
  }

  onDayOptionSelect = (key) => {
    return (event) => {
      const value = event.target.value;
      const obj = {};
      obj[key] = value;
      const { selectedDayOption } = this.state;
      const dayOption = Object.assign({}, selectedDayOption, obj);
      this.setState({
        selectedDayOption: dayOption
      }, this.changeValue);
    };
  }

  onWeekOptionSelect = (key) => {
    return (event) => {
      const value = event.target.value;
      const obj = {};
      obj[key] = value;
      const { selectedWeekOption } = this.state;
      const weekOption = Object.assign({}, selectedWeekOption, obj);
      this.setState({
        selectedWeekOption: weekOption
      });
    };
  }

  onMonthOptionSelect = (key) => {
    return (event) => {
      const value = event.target.value;
      const obj = {};
      obj[key] = value;
      const { selectedMonthOption } = this.state;
      const monthOption = Object.assign({}, selectedMonthOption, obj);
      this.setState({
        selectedMonthOption: monthOption
      }, this.changeValue);
    };
  }

  onYearOptionSelect = (key) => {
    return (event) => {
      const value = event.target.value;
      const obj = {};
      obj[key] = value;
      const { selectedYearOption } = this.state;
      const yearOption = Object.assign({}, selectedYearOption, obj);
      this.setState({
        selectedYearOption: yearOption
      }, this.changeValue);
    };
  }

  getOptionComponent = (key) => {
    return (o, i) => {
      return (
        <option key={`${key}_${i}`} value={o.value}>{o.label}</option>
      );
    }
  }

  getHourComponent = () => {
    const { minuteOptions, selectedHourOption } = this.state;

    return (
      (this.state.selectedPeriod === 'hour') &&
      <cron-hour-component>
        <select value={selectedHourOption.min} onChange={this.onHourOptionSelect('min')} className='m-r-xs'>
          {minuteOptions.map(this.getOptionComponent('minute_option'))}
        </select>
        minutes past the hour
      </cron-hour-component>
    );
  }

  getDayComponent = () => {
    const { hourOptions, minuteOptions, selectedDayOption } = this.state;

    return (
      (this.state.selectedPeriod === 'day') &&
      <cron-day-component>
        <select value={selectedDayOption.hour} onChange={this.onDayOptionSelect('hour')}>
          {hourOptions.map(this.getOptionComponent('hour_option'))}
        </select>
        :
        <select value={selectedDayOption.min} onChange={this.onDayOptionSelect('min')}>
          {minuteOptions.map(this.getOptionComponent('minute_option'))}
        </select>
      </cron-day-component>
    );
  }

  getWeekComponent = () => {
    const { hourOptions, minuteOptions, dayOptions, selectedWeekOption } = this.state;

    return (
      (this.state.selectedPeriod === 'week') &&
      <cron-week-component>
        <select value={selectedWeekOption.day} onChange={this.onWeekOptionSelect('day')}>
          {dayOptions.map(this.getOptionComponent('week_option'))}
        </select>
        <span className='m-l-xs m-r-xs'>at</span>
        <select value={selectedWeekOption.hour} onChange={this.onWeekOptionSelect('hour')}>
          {hourOptions.map(this.getOptionComponent('hour_option'))}
        </select>
        :
        <select value={selectedWeekOption.min} onChange={this.onWeekOptionSelect('min')}>
          {minuteOptions.map(this.getOptionComponent('minute_option'))}
        </select>
      </cron-week-component>
    );
  }

  getMonthComponent = () => {
    const { monthDaysOptions, hourOptions, minuteOptions, selectedMonthOption } = this.state;

    return (
      (this.state.selectedPeriod === 'month') &&
      <cron-month-component>
        <select value={selectedMonthOption.day} onChange={this.onMonthOptionSelect('day')}>
          {monthDaysOptions.map(this.getOptionComponent('month_days_option'))}
        </select>
        <span className='m-l-xs m-r-xs'>at</span>
        <select value={selectedMonthOption.hour} onChange={this.onMonthOptionSelect('hour')}>
          {hourOptions.map(this.getOptionComponent('hour_option'))}
        </select>
        :
        <select value={selectedMonthOption.min} onChange={this.onMonthOptionSelect('min')}>
          {minuteOptions.map(this.getOptionComponent('minute_option'))}
        </select>
      </cron-month-component>
    );
  }

  getYearComponent = () => {
    const { monthOptions, monthDaysOptions, hourOptions, minuteOptions, selectedYearOption } = this.state;

    return (
      (this.state.selectedPeriod === 'year') &&
      <cron-year-component>
        <select value={selectedYearOption.day} onChange={this.onYearOptionSelect('day')}>
          {monthDaysOptions.map(this.getOptionComponent('month_days_option'))}
        </select>
        <span className='m-l-xs m-r-xs'>of</span>
        <select value={selectedYearOption.mon} onChange={this.onYearOptionSelect('mon')}>
          {monthOptions.map(this.getOptionComponent('month_option'))}
        </select>
        <span className='m-l-xs m-r-xs'>at</span>
        <select value={selectedYearOption.hour} onChange={this.onYearOptionSelect('hour')}>
          {hourOptions.map(this.getOptionComponent('hour_option'))}
        </select>
        :
        <select value={selectedYearOption.min} onChange={this.onYearOptionSelect('min')}>
          {minuteOptions.map(this.getOptionComponent('minute_option'))}
        </select>
      </cron-year-component>
    );
  }

  changeValue() {
    this._value = getCron(this.state);
  }

  render() {
    const { className } = this.props;
    const { selectedPeriod, periodOptions } = this.state;

    const getPeriodPrep = () => {
      const option = periodOptions.find((o) => (o.value === selectedPeriod));
      return (
        <span className='m-l-xs m-r-xs'>{option.prep}</span>
      );
    }

    return (
      <div className={classnames(className, 'cron-row')}>
        <label className='control-label col-md-3'>Cron tab</label>
        <div className='col-md-9'>
          <div className='m-b-sm'>
            Every
            <select value={selectedPeriod} onChange={this.onPeriodSelect()} className='m-l-xs'>
              {periodOptions.map((t,index) => {
                return (
                  <option key={`period_option_${index}`} value={t.value}>{t.label}</option>
                );
              })}
            </select>
            {getPeriodPrep()}
            {this.getHourComponent()}
            {this.getDayComponent()}
            {this.getWeekComponent()}
            {this.getMonthComponent()}
            {this.getYearComponent()}
          </div>
          <input type='text' readOnly name='cron_tab' className='cron-input' value={getCron(this.state)}/>
        </div>
      </div>
    );
  }
}
