// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import firebase from 'firebase'
import 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyChHKAIrnMTUe0USYK8SKMZI39BiFYfoq0",
    authDomain: "one-click-website-builder.firebaseapp.com",
    projectId: "one-click-website-builder",
    storageBucket: "one-click-website-builder.appspot.com",
    messagingSenderId: "673375607295",
    appId: "1:673375607295:web:ea41653ae91c8923762fca",
    measurementId: "G-2QPSCWBNC2"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const firestore = firebase.firestore()

//Auth Functions

export const signInWithEmailAndPassword = async (email, password) => {
    let result
    try {
        const response = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(async (user) => {
                result = user
                let userDetails = user.user
                localStorage.setItem('useremail', userDetails.email)
                localStorage.setItem('userID', userDetails.uid)
            })
        let profliedata = await getProfileDetailsbyID()
        localStorage.setItem('scrumboardID', profliedata?.scrumBoardID)
        localStorage.setItem('username', profliedata?.fullname)
        localStorage.setItem('profileImage', profliedata?.photoURL)

        //result = 'success'
    } catch (error) {
        console.log('error.message')
        console.log(error.message)
        result = error.message
    }
    //console.log('result')
    //console.log(result)
    return result
}

export const signUpWithEmailAndPassword = async (
    firstname,
    lastname,
    password,
    email,
    userType,
    phone
) => {
    let result
    try {
        let response = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async (user) => {
                result = user
                let userDetails = user.user
                const boardid = await CreateBoard()
                await firestore
                    .collection('/users')
                    .doc(userDetails.uid)
                    .set({
                        email: email,
                        firstname: firstname,
                        lastname: lastname,
                        phone: phone,
                        fullname: `${firstname} ${lastname}`,
                        created_on: new Date(),
                        updated_on: new Date(),
                        uid: userDetails.uid,
                        lookingFor: userType,
                        scrumBoardID: boardid,
                    })

                localStorage.setItem('username', `${firstname} ${lastname}`)
                localStorage.setItem('useremail', userDetails.email)
                localStorage.setItem('userID', userDetails.uid)
            })

        //result = 'success'
    } catch (error) {
        console.log(error.message)
        result = error.message
    }
    return result
}

export const forgotPassword = async (email) => {
    let result = 'success'
    try {
        let result = await firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then((user) => {
                console.log('forgot')
                //navigate('/home')
            })
        result = 'success'
    } catch (error) {
        console.log(error.message)
        result = error.message
    }
    return result
}

export const ChangePassword = async (values) => {
    console.log(values)
    const { password, newPassword } = values
    let email = localStorage.getItem('useremail')
    let result = 'Your Password is Updated'
    try {
        await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(function (user) {
                firebase
                    .auth()
                    .currentUser.updatePassword(newPassword)
                    .then(async function () {
                        result = 'Your Password is Updated'
                    })
                    .catch(function (err) {
                        result = err
                    })
            })
            .catch(function (err) {
                console.log(err.message)
                result = 'Please Enter the Correct Old Password'
            })
        //result = 'success'
    } catch (error) {
        console.log(error.message)
        result = error.message
    }
    return result
}

export const SignOut = async (email) => {
    let result = 'success'
    try {
        let result = await firebase
            .auth()
            .signOut()
            .then((user) => {
                localStorage.clear()
            })
        result = 'success'
    } catch (error) {
        console.log(error.message)
        result = error.message
    }
    return result
}

//Profile Functions

export const getProfileDetailsbyID = async () => {
    let uid = localStorage.getItem('userID')
    try {
        let profileDetails = await firestore.collection(`/users`).doc(uid).get()
        return profileDetails.data()
    } catch (error) {
        console.log(error.message)
        return error.message
    }
}

export const updateProfileDetails = async (
    phonenumber,
    firstname,
    lastname,
    userPhotoURL
) => {
    let uid = localStorage.getItem('userID')
    try {
        let profileDetails = await firestore
            .collection(`/users`)
            .doc(uid)
            .update({
                firstname: firstname,
                lastname: lastname,
                fullname: `${firstname} ${lastname}`,
                photoURL: userPhotoURL,
                phone: phonenumber,
                updated_on: new Date(),
            })
        localStorage.setItem('username', `${firstname} ${lastname}`)
        localStorage.setItem('profileImage', userPhotoURL)

        return 'success'
    } catch (error) {
        console.log(error.message)
        return error.message
    }
}

//Teams Functions

export const uploadToStorage = (
    file,
    uploadStorageLocation,
    storeURLCallback
) => {
    const storageRef = firebase.storage().ref()

    if (firebase.auth().currentUser === null) {
        return
    }

    const uploadTask = storageRef
        .child(`${uploadStorageLocation}/${file.name}`)
        .put(file)

    uploadTask.on(
        'state_changed',
        (snapshot) => {
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                    break
                case firebase.storage.TaskState.RUNNING:
                    break
                default:
                    break
            }
        },
        (error) => {
            switch (error.code) {
                case 'storage/unauthorized':
                    break
                case 'storage/canceled':
                    break
                case 'storage/unknown':
                    break
                default:
                    break
            }
        },
        () => {
            storeURLCallback(uploadTask)
        }
    )
}

export const createTeam = async (team_name, team_description) => {
    let uid = localStorage.getItem('userID')
    try {
        let createTeamref = firestore.collection(`/teams`).doc()
        let createTeamMemberCollection = firestore
            .collection(`/teams/${createTeamref.id}/teams_members`)
            .doc(uid)
        let userref = firestore
            .collection(`/users/${uid}/team_access`)
            .doc(createTeamref.id)
        let InviteTeamMemberCollection = firestore
            .collection(`/teams/${createTeamref.id}/team_invited`)
            .doc(uid)
        let teamDetailsObj = {
            team_id: createTeamref.id,
            team_name: team_name,
            team_description: team_description,
            team_owner_id: uid,
            //member_list: [uid],
            created_on: new Date(),
            updated_on: new Date(),
        }
        let result = await createTeamref.set(teamDetailsObj)
        let result3 = await userref.set(teamDetailsObj)
        let result2 = await createTeamMemberCollection.set({
            user_uid: uid,
            added_on: new Date(),
            updated_on: new Date(),
            role: 'owner',
        })
        let result4 = await InviteTeamMemberCollection.set({
            invited_person_name: localStorage.getItem('username'),
            invited_person_email: localStorage.getItem('useremail'),
            invited_person_uid: localStorage.getItem('userID'),
            acceptence_status: 'accepted',
            invited_role: 'Owner',
            invited_on: new Date(),
            updated_on: new Date(),
        })

        return {
            status: 'success',
            team_id: createTeamref.id,
        }
    } catch (error) {
        console.log(error.message)
        return error.message
    }
}

export const getProfileDetailsbyEmail = async (email) => {
    let uid = localStorage.getItem('userID')
    try {
        let profileDetails = await firestore
            .collection(`/users`)
            .where('email', '==', email)
            .get()
        const data = []
        profileDetails.forEach(async (c) => {
            data.push({ ...c.data() })
        })
        console.log('data2369')
        console.log(data)
        return data[0]
    } catch (error) {
        console.log(error.message)
        return false
    }
}

export const inviteUserIntoTeam = async (
    email,
    role,
    team_uid,
    team_name,
    team_description
) => {
    try {
        let invited_user = await getProfileDetailsbyEmail(email)
        console.log('invited_user')
        console.log(invited_user)
        let inviteDetails = {
            acceptence_status: 'pending',
            invite_id: invited_user.uid,
            invited_person_name: invited_user.fullname,
            invited_person_email: invited_user.email,
            invited_person_uid: invited_user.uid,
            invited_role: role,
            invited_team_id: team_uid,
            inviter_details: {
                uid: localStorage.getItem('userID'),
                name: localStorage.getItem('username'),
                email: localStorage.getItem('useremail'),
            },
            inviter_uid: localStorage.getItem('userID'),
            team_details: {
                team_id: team_uid,
                team_name: team_name,
                team_description: team_description,
            },
            invited_on: new Date(),
            updated_on: new Date(),
        }
        if (invited_user === false && invited_user === undefined) {
            return 'failed'
        }
        let createTeamMemberCollection = firestore
            .collection(`/teams/${team_uid}/team_invited`)
            .doc(invited_user.uid)
        let Alerts = firestore
            .collection(`/alerts/${invited_user.uid}/invites`)
            .doc()
        let result = await createTeamMemberCollection.set(inviteDetails)
        let result2 = await Alerts.set({
            ...inviteDetails,
            notification_id: Alerts.id,
            notification_message: `You Are Invited to join this Team ${team_name} Click To join This Team`,
            notification_type: 'invite',
        })

        return 'success'
    } catch (error) {
        console.log(error.message)
        return error.message
    }
}

export const EditUserRoleInTeam = async (values, updated_role) => {
    const {
        team_details,
        invited_person_uid,
        acceptence_status,
        invited_person_email,
    } = values
    console.log(values)
    console.log(updated_role)
    try {
        let invitedTeamMembersCollectionPath, TeamMembersCollectionPath
        let alertCollectionPath = firestore
            .collection(`alerts/${invited_person_uid}/invites`)
            .doc()

        if (acceptence_status == 'pending') {
            invitedTeamMembersCollectionPath = firestore
                .collection(`teams/${team_details.team_id}/team_invited`)
                .doc(invited_person_uid)
                .update({ invited_role: updated_role })
        } else {
            TeamMembersCollectionPath = firestore
                .collection(`teams/${team_details.team_id}/teams_members`)
                .doc(invited_person_uid)
                .update({ role: updated_role })
            invitedTeamMembersCollectionPath = firestore
                .collection(`teams/${team_details.team_id}/team_invited`)
                .doc(invited_person_uid)
                .update({ invited_role: updated_role })
        }

        let response = await alertCollectionPath.set({
            invited_on: new Date(),
            notification_id: alertCollectionPath.id,
            notification_message: `Your team role is updated as a ${updated_role} in this ${team_details.team_name} team`,
            notification_type: 'update_team_role',
            updated_on: new Date(),
        })

        return 'success'
    } catch (error) {
        console.log(error.message)
        return error.message
    }
}

export const DeleteUserFromTeam = async (values) => {
    const {
        team_details,
        invited_person_uid,
        acceptence_status,
        invited_person_email,
    } = values
    try {
        let invitedTeamMembersCollectionPath,
            TeamMembersCollectionPath,
            DeleteUserFromUserTeamsCollection
        let alertCollectionPath = firestore
            .collection(`alerts/${invited_person_uid}/invites`)
            .doc()

        if (acceptence_status == 'pending') {
            invitedTeamMembersCollectionPath = await firestore
                .collection(`teams/${team_details.team_id}/team_invited`)
                .doc(invited_person_uid)
                .delete()
        } else {
            TeamMembersCollectionPath = await firestore
                .collection(`teams/${team_details.team_id}/teams_members`)
                .doc(invited_person_uid)
                .delete()
            invitedTeamMembersCollectionPath = await firestore
                .collection(`teams/${team_details.team_id}/team_invited`)
                .doc(invited_person_uid)
                .delete()
            DeleteUserFromUserTeamsCollection = await firestore
                .collection(
                    `users/${invited_person_uid}/team_access/${team_details.team_id}`
                )
                .delete()
        }

        let response = await alertCollectionPath.set({
            invited_on: new Date(),
            notification_id: alertCollectionPath.id,
            notification_message: `You are Removed from this Team ${team_details.team_name}`,
            notification_type: 'delete_user_from_team',
            updated_on: new Date(),
        })

        return 'success'
    } catch (error) {
        console.log(error.message)
        return error.message
    }
}

export const updateInviteStatus = async (teamDetails) => {
    const {
        invited_role,
        invited_team_id,
        notification_id,
        team_details,
        inviter_uid,
        invited_person_email,
    } = teamDetails
    try {
        let uid = localStorage.getItem('userID')
        //let teamsCollection = firestore.collection('teams').doc(team_uid)
        let updateTeamMemberCollection = firestore
            .collection(`/teams/${invited_team_id}/teams_members`)
            .doc(uid)
        let invitedTeamMemberCollection = firestore
            .collection(`/teams/${invited_team_id}/team_invited`)
            .doc(uid)

        let userref = firestore
            .collection(`users/${uid}/team_access`)
            .doc(invited_team_id)
        let alert = firestore
            .collection(`alerts/${uid}/invites/`)
            .doc(notification_id)
        let newAlert = firestore
            .collection(`alerts/${inviter_uid}/invites/`)
            .doc()
        let result = await updateTeamMemberCollection.set({
            user_uid: uid,
            added_on: new Date(),
            updated_on: new Date(),
            role: invited_role,
        })
        let result2 = await invitedTeamMemberCollection.update({
            acceptence_status: 'accepted',
            updated_on: new Date(),
        })
        let result3 = await userref.set({
            team_id: invited_team_id,
            team_name: team_details.team_name,
            team_description: team_details.team_description,
            team_owner_id: inviter_uid,
            //member_list: [uid],
            created_on: new Date(),
            updated_on: new Date(),
        })
        let result4 = await alert.update({ acceptence_status: 'accepted' })
        let result5 = await newAlert.set({
            notification_id: newAlert.id,
            notification_type: 'invite_accepted',
            notification_message: `${invited_person_email} has Accpted Your Team Invite For ${team_details.team_name} Team `,
            invited_on: new Date(),
            updated_on: new Date(),
        })

        return 'success'
    } catch (error) {
        console.log(error.message)
        return error.message
    }
}

export const getTeamMembersDetailsbyTeamID = async (team_id) => {
    try {
        let profileDetails = await firestore
            .collection(`/teams/${team_id}/team_invited`)
            .get()
        const data = []
        profileDetails.forEach(async (c) => {
            data.push({ ...c.data() })
        })
        return data
    } catch (error) {
        console.log(error.message)
        return error.message
    }
}

export const getAllNotificationbyUserID = async () => {
    let uid = localStorage.getItem('userID')
    try {
        let notificationDetails = await firestore
            .collection(`/alerts/${uid}/invites`)
            .get()

        const data = []
        notificationDetails.forEach(async (c) => {
            data.push({ ...c.data() })
        })
        // console.log('data')
        // console.log(data)
        return data
    } catch (error) {
        console.log(error.message)
        return error.message
    }
}

export const getTeamsbyuserID = async () => {
    let uid = localStorage.getItem('userID')
    try {
        let profileDetails = await firestore
            .collection(`/users/${uid}/team_access`)
            .get()
        const data = []
        profileDetails.forEach(async (c) => {
            data.push({ ...c.data() })
        })
        // console.log('teamss')
        // console.log(data)
        return data
    } catch (error) {
        console.log(error.message)
        return error.message
    }
}

//scrumBoard Functions

export const generateRandomString = () => {
    let string = Math.random().toString(36).slice(2, 20)
    return string
}

export const GetAllMembers = async () => {
    try {
        const UsersPath = firestore.collection('/users')
        const usersData = await UsersPath.get()
        const data = []
        usersData.forEach(async (c) => {
            const UserDetails = c.data()
            data.push({
                email: UserDetails.email,
                id: UserDetails.uid,
                img: UserDetails.photoURL,
                name: UserDetails.fullname,
            })
        })
        return data
    } catch (error) {
        console.log(error.message)
    }
}

export const GetAllBoardMembers = async () => {
    try {
        let scrumboardID = localStorage.getItem('scrumboardID')
        const scrumBoardPath = firestore
            .collection('/scrumboard')
            .doc(scrumboardID)
        const usersData = await scrumBoardPath.get()
        console.log(usersData.data().boardMembers)
        return usersData.data().boardMembers
    } catch (error) {
        console.log(error.message)
    }
}

export const CreateBoard = async () => {
    let uid = localStorage.getItem('userID')
    try {
        const scrumBoardPath = firestore.collection('/scrumboard').doc()
        localStorage.setItem('scrumboardID', scrumBoardPath.id)
        const allmembers = await GetAllMembers()
        await scrumBoardPath.set({
            allMembers: allmembers,
            boardMembers: [],
            columns: {},
            ordered: [],
            board_id: scrumBoardPath.id,
            board_owner_id: uid,
            board_name: 'ScrumBoard',
            board_description: 'RND Team Sprint 2',
        })
        return scrumBoardPath.id
    } catch (error) {
        console.log('error.message')
        console.log(error.message)
    }
}

export const getBoardData = async () => {
    try {
        let scrumboardID = localStorage.getItem('scrumboardID')
        const scrumBoardPath = firestore
            .collection('/scrumboard')
            .doc(scrumboardID)

        const columnName = await scrumBoardPath.get()
        const columnNameData = columnName.data().columns
        const orderedNameData = columnName.data().ordered
        return { columnData: columnNameData, orderedData: orderedNameData }
    } catch (error) {
        console.log('error.message')
        console.log(error.message)
    }
}

export const addColumnInBoard = async (ColumnName) => {
    let scrumboardID = localStorage.getItem('scrumboardID')
    try {
        const scrumBoardPath = firestore
            .collection('/scrumboard')
            .doc(scrumboardID)
        const columnName = await scrumBoardPath.get()
        const columnNameData = columnName.data().columns
        columnNameData[ColumnName] = []
        await scrumBoardPath.update({
            columns: columnNameData,
            ordered: firebase.firestore.FieldValue.arrayUnion(ColumnName),
        })
    } catch (error) {
        console.log('error.message')
        console.log(error.message)
    }
}

export const addCardInColumns = async (
    ColumnName,
    TaskName,
    Labels,
    TaskDescription
) => {
    let scrumboardID = localStorage.getItem('scrumboardID')
    let carddetails = {
        id: generateRandomString(),
        attachments: [],
        comments: [],
        cover: '',
        description: TaskDescription,
        labels: [Labels],
        members: [],
        name: TaskName,
        dueDate: new Date(),
        update_on: new Date(),
    }

    try {
        const scrumBoardPath = firestore
            .collection('/scrumboard')
            .doc(scrumboardID)

        let columnName = await scrumBoardPath.get()
        let columnNameData = columnName.data().columns
        let ColumnData = columnNameData[ColumnName]
        columnNameData[ColumnName] = [...ColumnData, carddetails]
        console.log(columnNameData)
        await scrumBoardPath.update({
            columns: columnNameData,
        })
    } catch (error) {
        console.log('error.message')
        console.log(error.message)
    }
}

export const addDescriptionInCard = async (description, CardId, ColumnName) => {
    try {
        let scrumboardID = localStorage.getItem('scrumboardID')
        const scrumBoardPath = firestore
            .collection('/scrumboard')
            .doc(scrumboardID)

        const columnName = await scrumBoardPath.get()
        const columnNameData = columnName.data().columns

        const Data = columnNameData[ColumnName]

        const Dataindex = Data.findIndex((value) => {
            return value.id == CardId
        })
        let filteredData = Data.filter((value) => {
            return value.id == CardId
        })

        filteredData[0].description = description
        Data[Dataindex] = filteredData[0]
        columnNameData[ColumnName] = Data

        await scrumBoardPath.update({
            columns: columnNameData,
        })
    } catch (error) {
        console.log('error.message')
        console.log(error.message)
    }
}

export const addCommentInCard = async (
    CommentMsg,
    CommenterName,
    CommenterPhotoUrl,
    CardId,
    ColumnName
) => {
    try {
        let CommentData = {
            id: generateRandomString(),
            message: CommentMsg,
            name: CommenterName,
            date: new Date(),
            update_on: new Date(),
            src: CommenterPhotoUrl,
        }

        let scrumboardID = localStorage.getItem('scrumboardID')
        const scrumBoardPath = firestore
            .collection('/scrumboard')
            .doc(scrumboardID)

        const columnName = await scrumBoardPath.get()
        const columnNameData = columnName.data().columns
        const Data = columnNameData[ColumnName]

        const Dataindex = Data.findIndex((value) => {
            return value.id == CardId
        })
        let filteredData = Data.filter((value) => {
            return value.id == CardId
        })

        const oldCommentData = filteredData[0]['comments']
        filteredData[0].comments = [...oldCommentData, CommentData]
        Data[Dataindex] = filteredData[0]
        columnNameData[ColumnName] = Data

        await scrumBoardPath.update({
            columns: columnNameData,
        })
    } catch (error) {
        console.log('error.message')
        console.log(error.message)
    }
}

export const addMemberInCard = async (member, CardId, ColumnName) => {
    try {
        let scrumboardID = localStorage.getItem('scrumboardID')
        const scrumBoardPath = firestore
            .collection('/scrumboard')
            .doc(scrumboardID)

        const columnName = await scrumBoardPath.get()
        const columnNameData = columnName.data().columns
        const Data = columnNameData[ColumnName]

        const Dataindex = Data.findIndex((value) => {
            console.log('Dataindex')
            console.log(value)
            return value.id == CardId
        })
        let filteredData = Data.filter((value) => {
            console.log('Dataindex')
            return value.id == CardId
        })

        filteredData[0].members = member
        Data[Dataindex] = filteredData[0]
        columnNameData[ColumnName] = Data

        await scrumBoardPath.update({
            columns: columnNameData,
        })
    } catch (error) {
        console.log('error.message')
        console.log(error.message)
    }
}

export const addAttchmentInCard = async (
    AttachmentObject,
    CardId,
    ColumnName
) => {
    try {
        let scrumboardID = localStorage.getItem('scrumboardID')
        const scrumBoardPath = firestore
            .collection('/scrumboard')
            .doc(scrumboardID)

        const columnName = await scrumBoardPath.get()
        const columnNameData = columnName.data().columns
        const Data = columnNameData[ColumnName]

        const Dataindex = Data.findIndex((value) => {
            return value.id == CardId
        })
        let filteredData = Data.filter((value) => {
            return value.id == CardId
        })

        const oldAttachmentsData = filteredData[0]['attachments']
        filteredData[0].attachments = [...oldAttachmentsData, AttachmentObject]
        Data[Dataindex] = filteredData[0]
        columnNameData[ColumnName] = Data

        await scrumBoardPath.update({
            columns: columnNameData,
        })
    } catch (error) {
        console.log('error.message')
        console.log(error.message)
    }
}

export const addLabelInCard = async (LabelName, CardId, ColumnName) => {
    try {
        let scrumboardID = localStorage.getItem('scrumboardID')
        const scrumBoardPath = firestore
            .collection('/scrumboard')
            .doc(scrumboardID)

        const columnName = await scrumBoardPath.get()
        const columnNameData = columnName.data().columns
        const Data = columnNameData[ColumnName]

        const Dataindex = Data.findIndex((value) => {
            return value.id == CardId
        })
        let filteredData = Data.filter((value) => {
            return value.id == CardId
        })

        const oldMemberData = filteredData[0]['labels']
        filteredData[0].labels = [...oldMemberData, LabelName]
        Data[Dataindex] = filteredData[0]
        columnNameData[ColumnName] = Data

        await scrumBoardPath.update({
            columns: columnNameData,
        })
    } catch (error) {
        console.log('error.message')
        console.log(error.message)
    }
}

export const addMemberInBoard = async (member) => {
    try {
        let MemberData = {
            id: member.id,
            email: member.email,
            name: member.name,
            date: new Date(),
            update_on: new Date(),
            img: member.img == undefined ? '' : member.img,
        }

        let scrumboardID = localStorage.getItem('scrumboardID')
        const scrumBoardPath = firestore
            .collection('/scrumboard')
            .doc(scrumboardID)

        await scrumBoardPath.update({
            boardMembers: firebase.firestore.FieldValue.arrayUnion(MemberData),
        })
    } catch (error) {
        console.log('error.message')
        console.log(error.message)
    }
}

export const deleteColumnInBoard = async (ColumnName) => {
    let scrumboardID = localStorage.getItem('scrumboardID')
    try {
        const scrumBoardPath = firestore
            .collection('/scrumboard')
            .doc(scrumboardID)
        //removing column from db
        const columnName = await scrumBoardPath.get()
        const columnNameData = columnName.data().columns
        delete columnNameData[ColumnName]
        console.log(columnNameData)

        //removing column name from ordered field
        const orderedData = columnName.data().ordered

        for (var i = 0; i < orderedData.length; i++) {
            if (orderedData[i] == ColumnName) {
                orderedData.splice(i, 1)
            }
        }

        await scrumBoardPath.update({
            columns: columnNameData,
            ordered: orderedData,
        })
    } catch (error) {
        console.log('error.message')
        console.log(error.message)
    }
}

export const RenameColumnInBoard = async (OldColumnName, NewColumnName) => {
    let scrumboardID = localStorage.getItem('scrumboardID')
    try {
        const scrumBoardPath = firestore
            .collection('/scrumboard')
            .doc(scrumboardID)

        //Rename the Column Name
        const columnName = await scrumBoardPath.get()
        const columnNameData = columnName.data().columns
        const oldColumnData = columnNameData[OldColumnName]
        delete columnNameData[OldColumnName]
        columnNameData[NewColumnName] = oldColumnData

        //Rename column name in ordered field
        const orderedData = columnName.data().ordered
        const Dataindex = orderedData.findIndex((value) => {
            return value == OldColumnName
        })
        orderedData[Dataindex] = NewColumnName

        await scrumBoardPath.update({
            columns: columnNameData,
            ordered: orderedData,
        })
    } catch (error) {
        console.log('error.message')
        console.log(error.message)
    }
}

export const moveCardInColumnInBoard = async (
    OldColumnName,
    NewColumnName,
    CardID
) => {
    let scrumboardID = localStorage.getItem('scrumboardID')
    try {
        const scrumBoardPath = firestore
            .collection('/scrumboard')
            .doc(scrumboardID)

        const columnName = await scrumBoardPath.get()
        const columnNameData = columnName.data().columns
        const oldColumnData = columnNameData[OldColumnName]
        const newColumnBeforeAddData = columnNameData[NewColumnName]
        let newColumnData

        for (var i = 0; i < oldColumnData.length; i++) {
            if (oldColumnData[i].id == CardID) {
                newColumnData = oldColumnData[i]
                oldColumnData.splice(i, 1)
            }
        }
        columnNameData[NewColumnName] = [
            ...newColumnBeforeAddData,
            newColumnData,
        ]
        await scrumBoardPath.update({
            columns: columnNameData,
        })
    } catch (error) {
        console.log('error.message')
        console.log(error.message)
    }
}

export const updateDraggbleColumnInBoard = async (newColumnData) => {
    let scrumboardID = localStorage.getItem('scrumboardID')
    try {
        const scrumBoardPath = firestore
            .collection('/scrumboard')
            .doc(scrumboardID)

        await scrumBoardPath.update({
            columns: newColumnData,
        })
    } catch (error) {
        console.log('error.message')
        console.log(error.message)
    }
}

export const getAllTasks = async () => {
    const task = await firestore
        .collection('tasks')
        .get()
        .then((snap) => {
            return snap.docs.map((doc, i) => {
                return {
                    ...doc.data(),
                    created_on: doc.data().created_on.toDate(),
                    id: doc.data().uid,
                    deadline: doc.data().deadline.toDate(),
                }
            })
        })
    return {
        data: task,
    }
}

export const getTaskById = async (id) => {
    const task = await firestore
        .collection('tasks')
        .doc(id.id)
        .get()
        .then((snap) => snap.data())
    return task
}

export const addTask = async (data) => {
    try {
        const userId = localStorage.getItem('userID')
        let newTask = firestore.collection('tasks').doc()
        let res = await newTask.set({
            ...data,
            created_on: firebase.firestore.FieldValue.serverTimestamp(),
        })
        return res
    } catch (e) {
        return e.message
    }
}

export const getAllUserDetails = async () => {
    try {
        const docRef = firestore.collection('users')
        const userData = []
        await docRef.get().then((snap) => {
            snap.docs.map((doc) => {
                userData.push(doc.data())
            })
        })
        console.log(userData)
        return userData
    } catch (e) {
        console.log(e.message)
    }
}
