import React from 'react';
import { DatePicker, Space } from 'antd';
import type { DatePickerProps } from 'antd';
import './DatePicker.css';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const DatePickerCustom:React.FC<{setWeek: any}> = ({setWeek}) => {
    React.useEffect(() => {
        setWeek({
            startDate: dayjs().startOf('week').format('YYYY-MM-DD'),
            endDate: dayjs().endOf('week').format('YYYY-MM-DD')
        })
    }, [])
    const onChange = (date: any, dateString: any) => {
        if(dateString === '') return;
        const currentDate = date.$d;
        const startDateOfWeek = dayjs(currentDate).startOf('week').format('YYYY-MM-DD');
        const endDateOfWeek = dayjs(currentDate).endOf('week').format('YYYY-MM-DD');
        setWeek({
            startDate: startDateOfWeek,
            endDate: endDateOfWeek
        })
    }
    return (
        <Space direction="vertical" size={12} className='date'>

            <DatePicker onChange={onChange} defaultValue={dayjs()}  picker="date" format={'DD/MM/YYYY'} />
            
        </Space>
    );
}

export default DatePickerCustom;