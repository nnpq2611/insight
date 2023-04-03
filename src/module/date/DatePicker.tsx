import React from 'react';
import { DatePicker, Space } from 'antd';
import type { DatePickerProps } from 'antd';
import './DatePicker.css';

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
};

const DatePickerCustom = () => {
    return (
        <Space direction="vertical" className='date'>
            <DatePicker onChange={onChange} />
        </Space>
    );
}

export default DatePickerCustom;