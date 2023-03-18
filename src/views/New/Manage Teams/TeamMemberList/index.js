import React from 'react'
import ActionBar from './components/ActionBar'
import TeamMemberList from './components/TeamMemberList'
//import NewProjectDialog from './components/NewProjectDialog'
import { Container } from 'components/shared'
import reducer from './store'
import { injectReducer } from 'store/index'

injectReducer('projectList', reducer)

const TeamsList = () => {
    return (
        <Container className="h-full">
            <ActionBar />
            <TeamMemberList />
            {/* <NewProjectDialog /> */}
        </Container>
    )
}

export default TeamsList
