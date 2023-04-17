import React from 'react';
import { DatePicker, Space } from 'antd';
import type { DatePickerProps } from 'antd';
import './DatePicker.css';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const dateFormatList = ['DD/MM/YYYY'];

const DatePickerCustom = () => {
    return (
        <Space direction="vertical" size={12} className='date'>

            <DatePicker defaultValue={dayjs('01/01/2023', dateFormatList[0])} format={dateFormatList} />
            
        </Space>
    );
}

export default DatePickerCustom;