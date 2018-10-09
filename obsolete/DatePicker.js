import React from 'react';
import autoBind from 'react-autobind';

// https://react-day-picker.js.org/
// http://react-day-picker.js.org/examples/basic

import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';

const FORMAT = 'M/D/YYYY';

function parseDate(str, format, locale) {
  const parsed = dateFnsParse(str, format, { locale });
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }
  return undefined;
}

function formatDate(date, format, locale) {
  return dateFnsFormat(date, format, { locale });
}


export default class DatePicker extends React.Component {

  /*****************************************************************************
   *
   * Constructor
   *
   ****************************************************************************/
  constructor(props) {
    super(props);

    autoBind(this);
  }

  handleDayChange(selectedDay, modifiers, dayPickerInput) {
    const value = dateFnsFormat(selectedDay, this.props.format)
    // console.log('name:', this.props.name, 'day:', value);
    
    let e = {}
    e.target = {}
    e.target.name = this.props.name
    e.target.value = value
    this.props.onChange(e)

    /*
    value = dayPickerInput.getInput();
    this.setState({
      selectedDay,
      isEmpty: !input.value.trim(),
      isValidDay: typeof selectedDay !== 'undefined',
      isDisabled: modifiers.disabled === true,
    });
    */
  }
  
  /*****************************************************************************
   *
   * This will render the datepicker on the screen.
   *
   ****************************************************************************/
  render() {
      let {format, ...props} =this.props
      if (!format) 
         format = 'M/D/YYYY'

      props.format = format

      return <DayPickerInput
                  {...props}
                  formatDate={formatDate}                  
                  parseDate={parseDate}
                  onDayChange={this.handleDayChange}
                  placeholder={`${dateFnsFormat(new Date(), format)}`}
              />
  }

}

