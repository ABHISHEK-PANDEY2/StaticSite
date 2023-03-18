import { Button } from 'components/ui'
import React, { useState } from 'react'
import GetQuote from './GetQuote'
import Subscriptions from './Subscriptions'

const Index = () => {
    const [tabContent, setTabContent] = useState('getQuote')
    return (
        <div className="flex flex-col xl:flex-row gap-4">
            <div className="xl:w-[300px] flex flex-col gap-3 p-4">
                <Button
                    style={
                        tabContent === 'getQuote'
                            ? {
                                  backgroundColor: '#006D77',
                                  color: 'white',
                              }
                            : {}
                    }
                    onClick={() => {
                        setTabContent('getQuote')
                    }}
                >
                    Create Website
                </Button>
                <div className="flex items-center justify-between  ">
                    {' '}
                    <hr width="40%" />
                    <strong>Or</strong>
                    <hr width="40%" />
                </div>
                <Button
                    onClick={() => {
                        setTabContent('subscription')
                    }}
                    style={
                        tabContent === 'subscription'
                            ? {
                                  backgroundColor: '#006D77',
                                  color: 'white',
                              }
                            : {}
                    }
                >
                    Subscribe & Build Website
                </Button>
                <Button>Confirmation</Button>
            </div>

            <div className="flex flex-col gap-4 flex-auto p-4">
                {tabContent === 'subscription' && <Subscriptions />}
                {tabContent === 'getQuote' && <GetQuote />}
            </div>
        </div>
    )
}

export default Index
