import React from 'react';
import './TimePicker.css';
import { Space, TimePicker } from 'antd';
import dayjs from 'dayjs';

function TimePickert() {
  return (
    <div>
      <Space wrap size={12} className='time'>
        <TimePicker defaultValue={dayjs('12:08:23', 'HH:mm:ss')} />
      </Space>
    </div>
  );
}

export default TimePickert