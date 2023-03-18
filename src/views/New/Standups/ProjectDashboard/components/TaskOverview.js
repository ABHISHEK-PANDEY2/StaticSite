import React, { useState, useEffect } from 'react'
import { Card, Input, Badge } from 'components/ui'
import { Loading } from 'components/shared'
import { Chart } from 'components/shared'
import { COLORS } from 'constants/chart.constant'
import isEmpty from 'lodash/isEmpty'
import { useSelector } from 'react-redux'

const ChartLegend = ({ label, value, badgeClass, showBadge = true }) => {
    return (
        <div className="flex gap-2">
            {showBadge && <Badge className="mt-2.5" innerClass={badgeClass} />}
            <div>
                <h5 className="font-bold">{value}</h5>
                <p>{label}</p>
            </div>
        </div>
    )
}

const TaskOverview = ({ data = {}, className }) => {
    const [timeRange, setTimeRange] = useState(['weekly'])

    const [repaint, setRepaint] = useState(false)

    const sideNavCollapse = useSelector(
        (state) => state.theme.layout.sideNavCollapse
    )

    useEffect(() => {
        setRepaint(true)
        const timer1 = setTimeout(() => setRepaint(false), 300)

        return () => {
            clearTimeout(timer1)
        }
    }, [data, sideNavCollapse])

    return (
        <Card className={className}>
            <p>Tuesday</p>
            <h2>July 30</h2>
            <div className='py-4'>
                <h6 className='py-2'>What did you work on yesterday?</h6>
                <Input placeholder="Send emails to customers on new events, Implement sign up flow, Debug time tracker." textArea/>
            </div>
            <div className='py-3'>
                <h6 className='py-2'>What will you be working on today?</h6>
                <p className='py-1'>
                    Share 1-2 sentence summary of your day’s tasks or paste
                    ticket URLs
                </p>
                <Input placeholder="Test all the APIs functionality regarding forms, Complete and tests both ends." textArea/>
            </div>
            <div className='py-3'>
                <h6 className='py-2'>What issues are blocking you? (Optional)</h6>
                <Input placeholder="How can i connect to the database to registering users?" textArea />
            </div>
        </Card>
    )
}

export default TaskOverview
