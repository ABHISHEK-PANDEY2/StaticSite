import React, { useEffect } from 'react'
import classNames from 'classnames'
import GridItem from './GridItem'
import ListItem from './ListItem'
import { Spinner, Card, Avatar } from 'components/ui'
import { getList } from '../store/dataSlice'
import { toggleNewProjectDialog } from '../store/stateSlice'
import { useDispatch, useSelector } from 'react-redux'
import { HiOutlinePlus } from 'react-icons/hi'

const ProjectListContent = () => {
    const dispatch = useDispatch()

    const loading = useSelector((state) => state.projectList.data.loading)
    const projectList = useSelector(
        (state) => state.projectList.data.projectList
    )
    const view = useSelector((state) => state.projectList.state.view)
    const { sort, search } = useSelector(
        (state) => state.projectList.state.query
    )

    const onAddNewProject = () => {
        dispatch(toggleNewProjectDialog(true))
    }

    useEffect(() => {
        dispatch(getList({ sort, search }))
    }, [dispatch, sort, search])

    return (
        <div
            className={classNames(
                'mt-6 h-full flex flex-col',
                loading && 'justify-center'
            )}
        >
            {loading && (
                <div className="flex justify-center">
                    <Spinner size={40} />
                </div>
            )}

            {view === 'grid' && projectList.length > 0 && !loading && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    <Card
                        bodyClass="h-full"
                        style={{ display: 'flex', flexDirection: 'columns' }}
                    >
                        <a onClick={onAddNewProject}>
                            <Avatar
                                shape="circle"
                                className="mr-4 bg-emerald-600"
                                icon={<HiOutlinePlus />}
                                style={{ marginLeft: '50%', marginTop: '40%' }}
                            />
                            <p style={{ marginTop: '10px', marginLeft: '40px' }}>
                                Start New Project
                            </p>
                        </a>
                    </Card>
                    {projectList.map((project) => (
                        <GridItem key={project.id} data={project} />
                    ))}
                </div>
            )}
            {/* {view === 'list' &&
                projectList.length > 0 &&
                !loading &&
                projectList.map((project) => (
                    <ListItem key={project.id} data={project} />
                ))} */}
        </div>
    )
}

export default ProjectListContent
